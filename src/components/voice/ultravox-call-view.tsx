'use client';

import { useEffect, useState } from 'react';
import { UltravoxSession } from 'ultravox-client';
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
  console.log('callId', callId);
  console.log('ultravoxCallId', ultravoxCallId);
  const [ultravoxSession, setUltravoxSession] =
    useState<UltravoxSession | null>(null);
  const [currentAgentTranscript, setCurrentAgentTranscript] = useState('');

  const joinCall = () => {
    ultravoxSession!.joinCall(joinUrl);
  };

  const endCall = () => {
    ultravoxSession!.leaveCall();
  };

  useEffect(() => {
    const session = new UltravoxSession();
    setUltravoxSession(session);

    const handleTranscripts = (event: any) => {
      const transcripts = event.target.transcripts || [];
      const last =
        transcripts.length > 0 ? transcripts[transcripts.length - 1] : null;
      if (last && last.speaker === 'agent') {
        setCurrentAgentTranscript(last.text);
      }
    };
    session.addEventListener('transcripts', handleTranscripts);
    return () => {
      session.removeEventListener('transcripts', handleTranscripts);
    };
  }, []);

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
