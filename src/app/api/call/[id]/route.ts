import { NextRequest } from 'next/server';
import { getDatabase } from '@/lib/db';
import { calls } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const callId = id;
    const db = getDatabase();

    const call = await db
      .select()
      .from(calls)
      .where(eq(calls.id, callId))
      .limit(1);

    if (call.length === 0) {
      return Response.json({ error: 'Call not found' }, { status: 404 });
    }

    return Response.json(call[0]);
  } catch (error) {
    console.error('Error fetching call:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
