import React from 'react';

export function TranscriptView({ transcript }: { transcript: string }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
        <span className="text-sm font-medium text-gray-700">Live Captions</span>
      </div>

      <div className="min-h-[60px] flex items-center">
        {transcript && (
          <p className="text-gray-800 text-base leading-relaxed">
            {transcript}
          </p>
        )}
      </div>

      {transcript && (
        <div className="flex justify-end">
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
            <span>Live</span>
          </div>
        </div>
      )}
    </div>
  );
}
