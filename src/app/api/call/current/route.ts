import { NextRequest } from 'next/server';
import { getDatabase } from '@/lib/db';
import { calls } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';
import { validateUserSession } from '@/lib/auth/server';

export async function GET(request: NextRequest) {
  try {
    // Validate user session
    const user = await validateUserSession();
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const db = getDatabase();

    // Get the most recent call for this user
    const userCalls = await db
      .select()
      .from(calls)
      .where(eq(calls.userId, user.id))
      .orderBy(desc(calls.createdAt))
      .limit(1);

    if (userCalls.length === 0) {
      return Response.json(
        { error: 'No calls found for user' },
        { status: 404 }
      );
    }

    return Response.json(userCalls[0]);
  } catch (error) {
    console.error('Error fetching current user call:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
