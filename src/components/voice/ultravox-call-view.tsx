'use client';

import { useUltravoxCall } from '@/lib/ultravox/hooks/use-ultravox-call';
import { TranscriptView } from './transcript-view';
import { AgentAvatar } from './agent-avatar';
import { CallCountdown } from './call-countdown';
import { Button } from '@/components/ui/button';
import { Captions, PhoneOff, Mic } from 'lucide-react';
import React from 'react';
import { useRouter } from 'next/navigation';

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
  const { currentAgentTranscript, joinCall, endCall, callStarted } =
    useUltravoxCall(joinUrl);
  const [showSubtitles, setShowSubtitles] = React.useState(false);
  const [callEnded, setCallEnded] = React.useState(false);
  const [countdownComplete, setCountdownComplete] = React.useState(false);
  const router = useRouter();

  // End call when countdown completes
  const handleCountdownComplete = () => {
    setCountdownComplete(true);
    setCallEnded(true);
    endCall();
  };

  // End call when hang up is pressed
  const handleEndCall = () => {
    setCallEnded(true);
    endCall();
  };

  // Handle skip for now (redirect to quiz or another page)
  const handleSkip = () => {
    router.replace('/voice/skip');
  };

  // If call ended, show a simple message (customize as needed)
  if (callEnded || countdownComplete) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-screen w-full p-4"
        style={{ background: 'transparent' }}
      >
        <div className="text-white text-lg font-semibold">
          Call ended. Thank you!
        </div>
      </div>
    );
  }

  // Pre-start screen
  if (!callStarted) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-screen w-full p-4"
        style={{ background: 'transparent' }}
      >
        <div className="flex flex-col items-center w-full max-w-xs mx-auto gap-8">
          {/* Timer at the top */}
          <CallCountdown
            staticTime={2 * 60 * 1000}
            size={120}
          />
          <div className="text-center text-white text-base font-medium">
            2 minutes call with AI tutor to assess your English and identify key
            growth areas
          </div>
          <div className="flex flex-row gap-4 w-full">
            <Button
              variant="outline"
              className="flex-1 py-6 px-6 rounded-2xl font-semibold text-lg shadow-lg border border-gray-300 text-gray-900 bg-white hover:bg-gray-100"
              onClick={handleSkip}
              style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}
            >
              Skip for now
            </Button>
            <Button
              className="flex-1 py-6 px-6 rounded-2xl font-semibold text-lg shadow-lg flex items-center justify-center gap-2 text-white"
              style={{
                background: 'linear-gradient(145deg, #3b82f6, #1d4ed8)',
                boxShadow:
                  'inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 rgba(0, 0, 0, 0.2), 0 4px 12px rgba(59, 130, 246, 0.3)',
              }}
              onClick={joinCall}
            >
              <Mic size={20} /> <span>Start Call</span>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // In-call UI
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen w-full p-4"
      style={{ background: 'transparent' }}
    >
      <div className="flex flex-col items-center w-full max-w-xs mx-auto gap-6">
        <div className="flex flex-row items-center w-full justify-between">
          <div />
          <button
            aria-label="Toggle subtitles"
            className={`p-2 rounded-lg transition-all duration-200 ${
              showSubtitles ? 'bg-blue-600/20' : 'bg-transparent'
            } text-white`}
            onClick={() => setShowSubtitles((v) => !v)}
            type="button"
          >
            <Captions size={28} />
          </button>
        </div>
        <AgentAvatar size={88} />
        <div className="text-center">
          <div className="text-lg font-semibold text-white">
            Assessment Call with Stacy
          </div>
        </div>
        <CallCountdown
          duration={2 * 60 * 1000}
          onComplete={handleCountdownComplete}
          size={120}
        />
        {showSubtitles && (
          <div className="w-full mt-4">
            <div className="rounded-2xl bg-white/10 backdrop-blur-md p-4 shadow-lg border border-blue-500/30">
              <div className="text-blue-100 text-base font-medium leading-relaxed font-mono whitespace-pre-line">
                <TranscriptView transcript={currentAgentTranscript} />
              </div>
            </div>
          </div>
        )}
        <Button
          variant="destructive"
          size="icon"
          className="mt-4"
          aria-label="End call"
          onClick={handleEndCall}
        >
          <PhoneOff size={32} />
        </Button>
      </div>
    </div>
  );
}
