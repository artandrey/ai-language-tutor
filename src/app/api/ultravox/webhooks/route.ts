import { calls, getDatabase } from '@/lib/db';
import { processGrammar, processVocabulary } from '@/lib/services/ai-processor';
import { CallsService } from '@/lib/ultravox/client/sdk.gen';
import crypto from 'crypto';
import { eq } from 'drizzle-orm';
import { NextRequest } from 'next/server';

const ULTRAVOX_API_KEY = process.env.ULTRAVOX_API_KEY;

async function fetchTranscript(callId: string) {
  const response = await CallsService.callsMessagesList({
    path: { call_id: callId },
    headers: { 'X-API-Key': ULTRAVOX_API_KEY! },
  });
  // The response is an AxiosResponse
  if (!response || !response.data || !response.data.results) return null;
  return response.data.results.map((msg) => msg.text).join('\n');
}

export async function POST(request: NextRequest) {
  const requestBody = await request.text();
  const isValid = await verifyWebhookSignature(request, requestBody);
  if (!isValid) {
    return new Response('Unauthorized - Invalid webhook signature', {
      status: 401,
    });
  }

  let data;
  try {
    data = JSON.parse(requestBody);
  } catch (e) {
    return new Response('Invalid JSON', { status: 400 });
  }

  const event = data.event;
  const call = data.call;
  const callId = call.callId;
  const db = getDatabase();

  if (event === 'call.started') {
    try {
      // Check if call already exists
      const existingCall = await db
        .select()
        .from(calls)
        .where(eq(calls.ultravoxSessionId, callId))
        .limit(1);

      if (existingCall.length > 0) {
        console.log(`Call ${callId} already exists, updating status to active`);
        // Update existing call to ensure it's active
        await db
          .update(calls)
          .set({
            isActive: true,
            status: 'pending',
            callStartedAt: new Date(call.created),
            updatedAt: new Date(),
          })
          .where(eq(calls.ultravoxSessionId, callId));
      } else {
        console.log(`No existing call found, creating new call`);
        // Create new call
        await db.insert(calls).values({
          id: callId,
          userId: call.userId ?? crypto.randomUUID(),
          agentId: call.firstSpeaker,
          ultravoxSessionId: callId,
          callStartedAt: new Date(call.created),
          isActive: true,
          status: 'pending',
          createdAt: new Date(call.created),
          updatedAt: new Date(),
        });
      }
    } catch (err) {
      console.error('Error inserting call:', err);
      return new Response('DB insert error', { status: 500 });
    }
  }

  if (event === 'call.ended') {
    try {
      const transcript = await fetchTranscript(callId);
      let corrections = null;
      let vocabulary = null;

      if (transcript && transcript.trim()) {
        console.log(
          `Processing transcript for call ${callId}, length: ${transcript.length}`
        );

        try {
          // Process grammar corrections and vocabulary enhancements in parallel
          const [grammarResult, vocabularyResult] = await Promise.all([
            processGrammar(transcript).catch((error) => {
              console.error('Grammar processing failed:', error);
              return null; // Don't fail the whole request if grammar processing fails
            }),
            processVocabulary(transcript).catch((error) => {
              console.error('Vocabulary processing failed:', error);
              return null; // Don't fail the whole request if vocabulary processing fails
            }),
          ]);

          corrections = grammarResult;
          vocabulary = vocabularyResult;

          console.log(`AI processing completed for call ${callId}:`, {
            grammarCorrections: corrections?.corrections?.length || 0,
            vocabularyWords: vocabulary?.vocabulary?.length || 0,
          });
        } catch (aiError) {
          console.error('AI processing error:', aiError);
          // Continue with saving the transcript even if AI processing fails
        }
      } else {
        console.log(`No transcript found for call ${callId}`);
      }

      await db
        .update(calls)
        .set({
          transcript,
          corrections,
          vocabulary,
          callEndedAt: new Date(call.ended),
          isActive: false,
          status: 'completed',
          updatedAt: new Date(),
        })
        .where(eq(calls.id, callId));

      console.log(
        `Successfully updated call ${callId} with processing results`
      );
    } catch (err) {
      console.error('Error updating call:', err);

      // Try to update the call status to failed
      try {
        await db
          .update(calls)
          .set({
            status: 'failed',
            callEndedAt: new Date(call.ended),
            isActive: false,
            updatedAt: new Date(),
          })
          .where(eq(calls.id, callId));
      } catch (updateError) {
        console.error('Failed to update call status to failed:', updateError);
      }

      return new Response('DB update error', { status: 500 });
    }
  }

  return new Response('OK');
}

export async function verifyWebhookSignature(
  request: NextRequest,
  requestBody: string
): Promise<boolean> {
  const webhookSecret = process.env.ULTRAVOX_WEBHOOKS_SECRET!;

  const timestampHeader = request.headers.get('X-Ultravox-Webhook-Timestamp');
  const signatureHeader = request.headers.get('X-Ultravox-Webhook-Signature');

  if (!timestampHeader || !signatureHeader) {
    return false;
  }

  try {
    // 1. Timestamp Verification
    const requestTimestamp = new Date(timestampHeader);
    const now = new Date();
    const timeDifference = now.getTime() - requestTimestamp.getTime();

    if (timeDifference > 60000) {
      return false;
    }

    // Use the provided requestBody instead of reading again
    const concatenatedString = requestBody + timestampHeader;
    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(concatenatedString, 'utf8')
      .digest('hex');

    const signatures = signatureHeader.split(',').map((sig) => sig.trim());

    for (const signature of signatures) {
      if (
        crypto.timingSafeEqual(
          Buffer.from(signature, 'hex'),
          Buffer.from(expectedSignature, 'hex')
        )
      ) {
        return true;
      }
    }

    return false;
  } catch (error) {
    console.error('Error verifying webhook signature:', error);
    return false;
  }
}
