'use client';

import { useUltravoxCall } from '@/lib/ultravox/hooks/use-ultravox-call';
import { TranscriptView } from './transcript-view';

interface UltravoxCallInterfaceProps {
  callId: string;
  ultravoxCallId: string;
  joinUrl: string;
}

export default function UltravoxCallView({
  callId,
  ultravoxCallId,
  joinUrl,
}: UltravoxCallInterfaceProps) {
  const { currentAgentTranscript, joinCall, endCall } =
    useUltravoxCall(joinUrl);

  return (
    <div>
      UltravoxCallInterface
      <p>Call ID: {callId}</p>
      <p>Ultravox Call ID: {ultravoxCallId}</p>
      <p>Join URL: {joinUrl}</p>
      <button onClick={joinCall}>Join Call</button>
      <button onClick={endCall}>End Call</button>
      <TranscriptView transcript={currentAgentTranscript} />
    </div>
  );
}
