import { getDatabase } from '@/lib/db';
import { calls } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';

export interface CallCreationResult {
  callId: string;
  joinUrl: string;
  isNewCall: boolean;
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
 * Create a new call record
 */
export async function createNewCall(
  userId: string,
  joinUrl: string
): Promise<string> {
  try {
    const db = getDatabase();

    const newCall = await db
      .insert(calls)
      .values({
        userId,
        ultravoxSessionId: joinUrl, // Store the join URL as session ID for now
        status: 'pending',
        isActive: true,
        createdAt: new Date(),
      })
      .returning({ id: calls.id });

    return newCall[0].id;
  } catch (error) {
    console.error('Failed to create new call:', error);
    throw error;
  }
}

/**
 * Generate a mock call URL (replace with actual Ultravox integration later)
 */
export function generateCallUrl(): string {
  // This is a placeholder - replace with actual Ultravox API call
  const sessionId = `session_${Date.now()}_${Math.random()
    .toString(36)
    .substring(7)}`;
  return `https://ultravox.example.com/join/${sessionId}`;
}

/**
 * Get or create call for user
 */
export async function getOrCreateCall(
  userId: string
): Promise<CallCreationResult> {
  try {
    // First, check if there's an existing active call
    const existingCall = await getExistingCall(userId);

    if (existingCall && existingCall.ultravoxSessionId) {
      return {
        callId: existingCall.id,
        joinUrl: existingCall.ultravoxSessionId,
        isNewCall: false,
      };
    }

    // Create new call if none exists
    const joinUrl = generateCallUrl();
    const callId = await createNewCall(userId, joinUrl);

    return {
      callId,
      joinUrl,
      isNewCall: true,
    };
  } catch (error) {
    console.error('Failed to get or create call:', error);
    throw error;
  }
}
