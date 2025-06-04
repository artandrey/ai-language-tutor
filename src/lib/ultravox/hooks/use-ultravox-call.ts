import { useEffect, useState, useCallback } from 'react';
import { UltravoxSession } from 'ultravox-client';

export function useUltravoxCall(joinUrl: string) {
  const [ultravoxSession, setUltravoxSession] =
    useState<UltravoxSession | null>(null);
  const [currentAgentTranscript, setCurrentAgentTranscript] = useState('');

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

  const joinCall = useCallback(() => {
    ultravoxSession?.joinCall(joinUrl);
  }, [ultravoxSession, joinUrl]);

  const endCall = useCallback(() => {
    ultravoxSession?.leaveCall();
  }, [ultravoxSession]);

  return { currentAgentTranscript, ultravoxSession, joinCall, endCall };
}
