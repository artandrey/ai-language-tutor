import { useEffect, useState, useCallback } from 'react';
import { UltravoxSession } from 'ultravox-client';

const ACTIVE_STATUSES = ['listening', 'thinking', 'speaking'];
const END_STATUSES = ['disconnected', 'disconnecting'];

interface UseUltravoxCallOptions {
  onCallEnd?: () => void;
}

export function useUltravoxCall(
  joinUrl: string,
  options?: UseUltravoxCallOptions
) {
  const [ultravoxSession, setUltravoxSession] =
    useState<UltravoxSession | null>(null);
  const [currentAgentTranscript, setCurrentAgentTranscript] = useState('');
  const [callStarted, setCallStarted] = useState(false);
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

    const handleStatus = () => {
      if (ACTIVE_STATUSES.includes(session.status)) {
        setCallStarted(true);
      }
      if (END_STATUSES.includes(session.status)) {
        if (options?.onCallEnd) {
          options.onCallEnd();
        }
      }
    };
    session.addEventListener('status', handleStatus);

    return () => {
      session.removeEventListener('transcripts', handleTranscripts);
      session.removeEventListener('status', handleStatus);
    };
  }, [options]);

  const joinCall = useCallback(() => {
    ultravoxSession?.joinCall(joinUrl);
  }, [ultravoxSession, joinUrl]);

  const endCall = useCallback(() => {
    ultravoxSession?.leaveCall();
  }, [ultravoxSession]);

  return {
    currentAgentTranscript,
    ultravoxSession,
    joinCall,
    endCall,
    callStarted,
  };
}
