import { getDatabase } from '@/lib/db';
import { calls } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';
import { AgentsService, CallsService } from '../ultravox/client';
import { createUltravoxCall, getUltravoxCall } from '../ultravox/server';

export interface CallCreationResult {
  callId: string;
  joinUrl: string;
  isNewCall: boolean;
  ultravoxCallId?: string;
}

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
          eq(calls.status, 'pending')
        )
      )
      .limit(1);

    return existingCalls.length > 0 ? existingCalls[0] : null;
  } catch (error) {
    console.error('Failed to get existing call:', error);
    return null;
  }
}

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

export async function createNewCall(
  userId: string
): Promise<{ callId: string; joinUrl: string; ultravoxCallId: string }> {
  const db = getDatabase();

  const ultravoxCall = await createUltravoxCall();

  const newCall = await db
    .insert(calls)
    .values({
      userId,
      joinUrl: ultravoxCall.joinUrl!,
      ultravoxSessionId: ultravoxCall.callId,
      status: 'pending',
      isActive: true,
      createdAt: new Date(),
    })
    .returning({ id: calls.id });

  return {
    callId: newCall[0].id,
    joinUrl: ultravoxCall.joinUrl!,
    ultravoxCallId: ultravoxCall.callId,
  };
}

export async function getOrCreateCall(
  userId: string
): Promise<CallCreationResult> {
  const existingCall = await getExistingCall(userId);

  if (existingCall && existingCall.ultravoxSessionId) {
    return {
      callId: existingCall.id,
      joinUrl: existingCall.joinUrl!,
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
}

export async function updateCallStatus(
  callId: string,
  status: 'pending' | 'processing' | 'completed' | 'failed'
) {
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
}
