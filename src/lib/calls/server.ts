import { getDatabase } from '@/lib/db';
import { calls } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';
import { createUltravoxCall } from '@/lib/ultravox/server';

export interface CallCreationResult {
  callId: string;
  joinUrl: string;
  isNewCall: boolean;
  ultravoxCallId?: string;
}

/**
 * Get existing active call for user
 */
export async function getExistingCall(userId: string) {
  try {
    const db = getDatabase();

    const existingCalls = await db
      .select()
      .from(calls)
      .where(
        and(
          eq(calls.userId, userId),
          eq(calls.isActive, true),
          eq(calls.status, 'pending') // Only pending calls can be reused
        )
      )
      .limit(1);

    return existingCalls.length > 0 ? existingCalls[0] : null;
  } catch (error) {
    console.error('Failed to get existing call:', error);
    return null;
  }
}

/**
 * Check if user has completed calls
 */
export async function hasCompletedCalls(userId: string): Promise<boolean> {
  try {
    const db = getDatabase();

    const completedCalls = await db
      .select()
      .from(calls)
      .where(and(eq(calls.userId, userId), eq(calls.status, 'completed')))
      .limit(1);

    return completedCalls.length > 0;
  } catch (error) {
    console.error('Failed to check completed calls:', error);
    return false;
  }
}

/**
 * Create a new call record with real Ultravox integration
 */
export async function createNewCall(
  userId: string
): Promise<{ callId: string; joinUrl: string; ultravoxCallId: string }> {
  try {
    // Create real Ultravox call
    console.log('Creating Ultravox call for user:', userId);
    const ultravoxCall = await createUltravoxCall();

    console.log('Ultravox call created:', ultravoxCall);

    const db = getDatabase();

    const newCall = await db
      .insert(calls)
      .values({
        userId,
        ultravoxSessionId: ultravoxCall.callId, // Store Ultravox call ID
        agentId: ultravoxCall.agentId,
        status: 'pending',
        isActive: true,
        createdAt: new Date(),
      })
      .returning({ id: calls.id });

    return {
      callId: newCall[0].id,
      joinUrl: ultravoxCall.joinUrl,
      ultravoxCallId: ultravoxCall.callId,
    };
  } catch (error) {
    console.error('Failed to create new call:', error);
    throw error;
  }
}

/**
 * Get or create call for user with real Ultravox integration
 */
export async function getOrCreateCall(
  userId: string
): Promise<CallCreationResult> {
  try {
    // First, check if there's an existing active call
    const existingCall = await getExistingCall(userId);

    if (existingCall && existingCall.ultravoxSessionId) {
      // For existing calls, we need to construct the join URL
      // Note: In a real implementation, you might want to store the join URL
      // or fetch it from Ultravox API if it's still active
      console.log('Found existing call:', existingCall.id);

      return {
        callId: existingCall.id,
        joinUrl: `https://call.ultravox.ai/${existingCall.ultravoxSessionId}`, // Reconstructed URL
        isNewCall: false,
        ultravoxCallId: existingCall.ultravoxSessionId,
      };
    }

    // Create new call if none exists
    console.log('No existing call found, creating new call');
    const { callId, joinUrl, ultravoxCallId } = await createNewCall(userId);

    return {
      callId,
      joinUrl,
      isNewCall: true,
      ultravoxCallId,
    };
  } catch (error) {
    console.error('Failed to get or create call:', error);
    throw error;
  }
}

/**
 * Update call status
 */
export async function updateCallStatus(
  callId: string,
  status: 'pending' | 'processing' | 'completed' | 'failed'
) {
  try {
    const db = getDatabase();

    await db
      .update(calls)
      .set({
        status,
        updatedAt: new Date(),
        ...(status === 'completed' && {
          callEndedAt: new Date(),
          isActive: false,
        }),
      })
      .where(eq(calls.id, callId));

    console.log(`Call ${callId} status updated to ${status}`);
  } catch (error) {
    console.error('Failed to update call status:', error);
    throw error;
  }
}
