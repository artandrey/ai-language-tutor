import { NextRequest } from 'next/server';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  const requestBody = await request.text();
  const isValid = await verifyWebhookSignature(request, requestBody);
  let data;
  try {
    data = JSON.parse(requestBody);
  } catch (e) {
    return new Response('Invalid JSON', { status: 400 });
  }
  console.log(data.call.callId);

  if (!isValid) {
    return new Response('Unauthorized - Invalid webhook signature', {
      status: 401,
    });
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
