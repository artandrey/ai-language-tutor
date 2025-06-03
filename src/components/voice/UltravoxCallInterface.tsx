'use client';

import { useEffect, useState } from 'react';
import { UltravoxSession } from 'ultravox-client';

interface UltravoxCallInterfaceProps {
  callId: string;
  ultravoxCallId: string;
  joinUrl: string;
}

export default function UltravoxCallInterface({
  callId,
  ultravoxCallId,
  joinUrl,
}: UltravoxCallInterfaceProps) {
  console.log('callId', callId);
  console.log('ultravoxCallId', ultravoxCallId);
  const [ultravoxSession, setUltravoxSession] =
    useState<UltravoxSession | null>(null);
  const joinCall = () => {
    ultravoxSession!.joinCall(joinUrl);
  };

  useEffect(() => {
    const session = new UltravoxSession();
    setUltravoxSession(session);
  }, []);

  return (
    <div>
      UltravoxCallInterface
      <p>Call ID: {callId}</p>
      <p>Ultravox Call ID: {ultravoxCallId}</p>
      <p>Join URL: {joinUrl}</p>
      <button onClick={joinCall}>Join Call</button>
    </div>
  );
}
