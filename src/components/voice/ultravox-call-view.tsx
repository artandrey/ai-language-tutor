'use client';

import { useUltravoxCall } from '@/lib/ultravox/hooks/use-ultravox-call';
import { TranscriptView } from './transcript-view';
import { AgentAvatar } from './agent-avatar';
import { CallCountdown } from './call-countdown';
import { Button } from '@/components/ui/button';
import { Captions, PhoneOff, Mic, Loader2 } from 'lucide-react';
import React from 'react';
import { useRouter } from 'next/navigation';
import posthog from 'posthog-js';
import { AnalyticsEvents } from '@/lib/analytics/events';

interface UltravoxCallInterfaceProps {
  callId: string;
  ultravoxCallId: string;
  joinUrl: string;
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function UltravoxCallView({
  joinUrl,
}: UltravoxCallInterfaceProps) {
  const { currentAgentTranscript, joinCall, endCall, callStarted } =
    useUltravoxCall(joinUrl);
  const [showSubtitles, setShowSubtitles] = React.useState(false);
  const [callEnded, setCallEnded] = React.useState(false);
  const [countdownComplete, setCountdownComplete] = React.useState(false);
  const [isStartingCall, setIsStartingCall] = React.useState(false);
  const router = useRouter();

  // End call when countdown completes
  const handleCountdownComplete = async () => {
    posthog.capture(AnalyticsEvents.USER_ENDED_CONVERSATION_BY_TIMEOUT);
    setCountdownComplete(true);
    setCallEnded(true);
    await wait(2000);
    router.replace('/voice/results');
  };

  // End call when hang up is pressed
  const handleEndCall = async () => {
    posthog.capture(AnalyticsEvents.USER_ENDED_CONVERSATION_BY_THEMSELF);
    setCallEnded(true);
    endCall();
    await wait(2000);
    router.replace('/voice/results');
  };

  // Handle skip for now (redirect to quiz or another page)
  const handleSkip = () => {
    router.replace('/voice/skip');
  };

  // Handle start call with loading state
  const handleStartCall = async () => {
    setIsStartingCall(true);
    posthog.capture(AnalyticsEvents.USER_STARTED_CONVERSATION);
    try {
      await joinCall();
    } finally {
      setIsStartingCall(false);
    }
  };

  // If call ended, redirect will happen automatically
  if (callEnded || countdownComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white p-4">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
          <div className="text-blue-700 text-lg font-semibold">
            Redirecting to results...
          </div>
        </div>
      </div>
    );
  }

  // Pre-start screen
  if (!callStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white p-4 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-200/20 to-blue-50/10" />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.2'/%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="relative z-10 flex flex-col items-center w-full max-w-md mx-auto">
          {/* Large Avatar */}
          <div className="mb-8">
            <AgentAvatar size={160} />
          </div>

          {/* Title and Description */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-3">
              Meet Your AI English Tutor
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              Ready for a 2-minute conversation to assess your English level and
              create your personalized learning path?
            </p>
          </div>

          {/* Timer */}
          <div className="mb-8">
            <CallCountdown
              staticTime={2 * 60 * 1000}
              size={140}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-4 w-full">
            <Button
              className="w-full py-6 px-6 rounded-2xl font-semibold text-lg shadow-lg flex items-center justify-center gap-3 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: isStartingCall
                  ? 'linear-gradient(145deg, #6b7280, #4b5563)'
                  : 'linear-gradient(145deg, #3b82f6, #1d4ed8)',
                boxShadow:
                  'inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 rgba(0, 0, 0, 0.2), 0 4px 12px rgba(59, 130, 246, 0.3)',
              }}
              onClick={handleStartCall}
              disabled={isStartingCall}
            >
              {isStartingCall ? (
                <>
                  <Loader2
                    size={20}
                    className="animate-spin"
                  />
                  <span>Connecting to Tutor...</span>
                </>
              ) : (
                <>
                  <Mic size={20} />
                  <span>Talk with AI Tutor</span>
                </>
              )}
            </Button>

            <Button
              variant="outline"
              className="w-full py-4 px-6 rounded-2xl font-medium text-base shadow-sm border-2 border-gray-300 text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all"
              onClick={handleSkip}
            >
              Maybe Later
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // In-call UI
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 to-white p-3 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-200/20 to-blue-50/10" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.2'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Floating CC Toggle Button - Top Right */}
      <button
        aria-label="Toggle captions"
        className={`fixed top-4 right-4 z-20 p-2.5 rounded-full transition-all duration-300 shadow-lg ${
          showSubtitles
            ? 'bg-blue-500 text-white shadow-blue-500/25'
            : 'bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-white shadow-gray-200/50'
        } border border-gray-200/50`}
        onClick={() => setShowSubtitles((v) => !v)}
        type="button"
      >
        <Captions size={20} />
        {showSubtitles && (
          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white"></div>
        )}
      </button>

      {/* Compact Transcript - Fixed at top when enabled */}
      {showSubtitles && (
        <div className="fixed top-16 left-3 right-3 z-10">
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-gray-200/50 max-h-20 overflow-hidden">
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <div className="min-h-[16px] flex-1">
                {currentAgentTranscript && (
                  <p
                    className="text-gray-800 text-sm leading-tight overflow-hidden"
                    style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {currentAgentTranscript}
                  </p>
                )}
              </div>
              {currentAgentTranscript && (
                <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse flex-shrink-0 mt-2"></div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Content - Centered */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 w-full max-w-sm mx-auto">
        {/* Avatar */}
        <div className="mb-4">
          <AgentAvatar size={120} />
        </div>

        {/* Minimal Agent Info */}
        <div className="text-center mb-6">
          <h2 className="text-lg font-bold text-gray-900">Alex</h2>
          <p className="text-sm text-gray-600">AI English Tutor</p>
        </div>

        {/* Timer */}
        <div className="mb-8">
          <CallCountdown
            duration={2 * 60 * 1000}
            onComplete={handleCountdownComplete}
            size={100}
          />
        </div>

        {/* End Call Button */}
        <Button
          variant="destructive"
          className="w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-red-500 hover:bg-red-600"
          aria-label="End call"
          onClick={handleEndCall}
        >
          <PhoneOff size={20} />
        </Button>
      </div>
    </div>
  );
}
