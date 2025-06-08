'use client';

import React, { useEffect } from 'react';
import { useAnalytics } from '@/lib/analytics/hooks';
import { AnalyticsEvents } from '@/lib/analytics/events';

interface VoiceMetricsSummaryProps {
  call: {
    usersSpeechDuration: number | null;
    corrections: {
      corrections: Array<{
        actual: string;
        corrected: string;
        explanation?: string;
      }>;
    } | null;
    vocabulary: {
      vocabulary: Array<{
        actual: string;
        synonyms: string[];
        difficulty: string;
      }>;
    } | null;
  };
}

function formatDuration(seconds: number | null): string {
  if (!seconds) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function VoiceMetricsSummary({ call }: VoiceMetricsSummaryProps) {
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    trackEvent(AnalyticsEvents.USER_VIEWED_VOICE_SUMMARY);
  }, [trackEvent]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto mb-8">
      <div className="text-center p-4 bg-white/40 border border-blue-200/50 rounded-2xl shadow-sm">
        <div className="text-2xl font-bold text-blue-600 mb-2">
          {formatDuration(call.usersSpeechDuration)}
        </div>
        <div className="text-sm text-blue-600">Speaking Time</div>
      </div>
      <div className="text-center p-4 bg-white/40 border border-blue-200/50 rounded-2xl shadow-sm">
        <div className="text-2xl font-bold text-blue-600 mb-2">
          {call.corrections?.corrections?.length || 0}
        </div>
        <div className="text-sm text-blue-600">Grammar Points</div>
      </div>
      <div className="text-center p-4 bg-white/40 border border-blue-200/50 rounded-2xl shadow-sm">
        <div className="text-2xl font-bold text-blue-600 mb-2">
          {call.vocabulary?.vocabulary?.length || 0}
        </div>
        <div className="text-sm text-blue-600">Vocabulary Tips</div>
      </div>
    </div>
  );
}
