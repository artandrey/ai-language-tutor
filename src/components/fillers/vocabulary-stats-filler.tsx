'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useQuizStore } from '@/store/quiz';
import { useQuiz } from '@/hooks/use-quiz';
import {
  getVocabularyStats,
  LEVELS,
  LEVEL_COLORS,
} from '@/utils/vocabularyStats';

export function VocabularyStatsFiller() {
  const { answers, questions } = useQuizStore();
  const { goNext } = useQuiz();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const stats = useMemo(() => {
    return isClient
      ? getVocabularyStats(answers, questions)
      : {
          counts: { A1: 0, A2: 0, B1: 0, B2: 0, C1: 0, C2: 0 },
          total: 0,
          score: 0,
          totalScore: 0,
          belowAvg: 50,
          activeVocab: 0,
          level: 'A1' as const,
          levelScore: { A1: 0, A2: 0, B1: 0, B2: 0, C1: 0, C2: 0 },
        };
  }, [isClient, answers, questions]);

  useEffect(() => {
    if (isClient) {
      console.log('Client-side stats:', stats);
    }
  }, [isClient, stats]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] p-3 sm:p-8 w-full">
      <div className="text-center mb-4 sm:mb-8 w-full max-w-xs sm:max-w-xl">
        <div className="text-sm sm:text-lg text-gray-600 mb-2">
          Your Vocabulary Level
        </div>
        <div className="text-xl sm:text-4xl font-bold text-gray-900 mb-2">
          <span className="text-blue-600">{stats.level}</span>
        </div>
        <div className="text-base sm:text-2xl text-gray-700 mb-3 sm:mb-6">
          {stats.totalScore} out of 100
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-8 mb-4 sm:mb-8 w-full max-w-xs sm:max-w-xl space-y-2 sm:space-y-0">
        <div className="bg-white/60 border border-gray-200/50 rounded-2xl p-3 sm:p-6 w-full text-center shadow-sm flex-1">
          <div className="text-lg sm:text-3xl font-bold text-gray-900 mb-1">
            {stats.activeVocab.toLocaleString()}
          </div>
          <div className="text-gray-500 text-xs sm:text-sm">
            Active vocabulary
          </div>
        </div>
        <div className="bg-white/60 border border-gray-200/50 rounded-2xl p-3 sm:p-6 w-full text-center shadow-sm flex-1">
          <div className="text-lg sm:text-3xl font-bold text-gray-900 mb-1">
            {stats.belowAvg}%
          </div>
          <div className="text-gray-500 text-xs sm:text-sm">
            Below average for your level
          </div>
        </div>
      </div>
      <div className="w-full max-w-xs sm:max-w-xl overflow-x-auto pb-2 mb-4 sm:mb-8">
        <div
          className="flex gap-1 items-end min-w-[220px] justify-center"
          style={{ height: 90 }}
        >
          {LEVELS.map((lvl) => (
            <div
              key={lvl}
              className="shrink-0 flex flex-col items-center justify-end w-8"
            >
              <div
                className={`w-full rounded-t-xl bg-gradient-to-t ${LEVEL_COLORS[lvl]}`}
                style={{
                  height: `${stats.levelScore[lvl] * 1.2}px`,
                  transition: 'height 0.5s',
                }}
              />
              <div className="text-gray-700 text-[10px] font-bold mt-2">
                {lvl}
              </div>
              <div className="text-gray-600 text-[10px]">
                {stats.levelScore[lvl]}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
