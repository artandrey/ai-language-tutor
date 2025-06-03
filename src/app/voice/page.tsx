import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import { getOrCreateCall, hasCompletedCalls } from '@/lib/calls/server';
import UltravoxCallInterface from '@/components/voice/UltravoxCallInterface';

export default async function VoicePage() {
  // Server-side authentication check
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  // If user is not authenticated, redirect to anonymous auth page
  if (error || !user) {
    redirect('/auth/anonymous');
  }

  // const hasCompleted = await hasCompletedCalls(user.id);

  // if (hasCompleted) {
  //   redirect('/voice/results');
  // }

  const callData = await getOrCreateCall(user.id);

  return (
    <div>
      {callData.ultravoxCallId && (
        <UltravoxCallInterface
          callId={callData.callId}
          ultravoxCallId={callData.ultravoxCallId}
          joinUrl={callData.joinUrl}
        />
      )}
    </div>
  );
}
