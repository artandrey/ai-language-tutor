import React from 'react';
import { useQuizStore, QuizAnswer, Question } from '@/store/quiz';
import { useQuiz } from '@/hooks/use-quiz';

// Define CEFR levels
type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
const LEVELS: Level[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const LEVEL_COLORS = {
  A1: 'from-blue-400 to-blue-600',
  A2: 'from-blue-300 to-blue-500',
  B1: 'from-purple-400 to-purple-600',
  B2: 'from-purple-300 to-purple-500',
  C1: 'from-pink-400 to-pink-600',
  C2: 'from-pink-300 to-pink-500',
} as Record<Level, string>;

// Stats shape
interface Stats {
  counts: Record<Level, number>;
  total: number;
  score: number;
  totalScore: number;
  belowAvg: number;
  activeVocab: number;
  level: Level;
  levelScore: Record<Level, number>;
}

// Aggregate quiz answers into stats
function getStats(answers: QuizAnswer[], questions: Question[]): Stats {
  // Flatten all selected words from the three questions
  const selected: Level[] = [];
  for (const qid of ['15', '16', '17']) {
    const ans = answers.find((a) => a.questionId === qid);
    const q = questions.find((q) => q.id === qid);
    if (ans && Array.isArray(ans.value) && q && q.options) {
      for (const val of ans.value as string[]) {
        const opt = q.options.find((o) => o.value === val);
        if (opt && typeof opt.metadata?.level === 'string') {
          selected.push(opt.metadata.level as Level);
        }
      }
    }
  }

  // Count per level
  const counts: Record<Level, number> = {} as Record<Level, number>;
  LEVELS.forEach((lvl) => {
    counts[lvl] = 0;
  });
  selected.forEach((lvl) => {
    if (counts[lvl] !== undefined) counts[lvl]++;
  });

  const total = selected.length;

  // Calculate level percentages for the chart
  const levelScore: Record<Level, number> = {} as Record<Level, number>;
  LEVELS.forEach((lvl) => {
    levelScore[lvl] = total > 0 ? Math.round((counts[lvl] / total) * 100) : 0;
  });

  // Determine dominant level (level with most selections)
  let dominantLevel: Level = 'A1';
  let maxCount = 0;
  LEVELS.forEach((lvl) => {
    if (counts[lvl] > maxCount) {
      maxCount = counts[lvl];
      dominantLevel = lvl;
    }
  });

  // Calculate vocabulary score based on CEFR complexity weights
  const levelWeights: Record<Level, number> = {
    A1: 1,
    A2: 2,
    B1: 3,
    B2: 4,
    C1: 5,
    C2: 6,
  };

  let weightedScore = 0;
  let maxPossibleScore = 0;
  LEVELS.forEach((lvl) => {
    weightedScore += counts[lvl] * levelWeights[lvl];
    // Estimate max possible (assuming roughly equal distribution of words per level)
    maxPossibleScore += (total / 6) * levelWeights[lvl];
  });

  const score =
    maxPossibleScore > 0
      ? Math.round((weightedScore / maxPossibleScore) * 100)
      : 0;

  // Calculate total score out of 100 based on vocabulary performance
  // This represents the user's overall vocabulary score for display
  const totalScore = Math.min(100, Math.round(total * 2.5 + score * 0.3));

  // Estimate active vocabulary (extrapolate from sample)
  // Rough estimate: if user knows X words from our sample, they likely know ~100-200x that in total
  const activeVocab = Math.round(total * 150);

  // Estimate if below average (simplified logic)
  // For B2 level, average might be around 70-80% of advanced words
  const advancedWordCount = counts.B2 + counts.C1 + counts.C2;
  const belowAvg =
    total > 0
      ? Math.max(0, Math.round(100 - (advancedWordCount / total) * 150))
      : 50;

  return {
    counts,
    total,
    score,
    totalScore,
    belowAvg,
    activeVocab,
    level: dominantLevel,
    levelScore,
  };
}

export function VocabularyStatsFiller() {
  const { answers, questions } = useQuizStore();
  const { goNext } = useQuiz();
  const stats = getStats(answers, questions);

  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] p-3 sm:p-8 w-full">
      <div className="text-center mb-4 sm:mb-8 w-full max-w-xs sm:max-w-xl">
        <div className="text-sm sm:text-lg text-gray-600 mb-2">
          Your Vocabulary Level
        </div>
        <div className="text-xl sm:text-4xl font-bold text-gray-900 mb-2">
          Upper-Intermediate <span className="text-blue-600">B2</span>
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
      <div className="bg-white/60 border border-gray-200/50 rounded-xl p-2 sm:p-4 text-gray-700 text-[11px] sm:text-sm mb-4 sm:mb-8 max-w-xs sm:max-w-xl w-full text-center shadow-sm">
        This shows <b>only 25% of your English skills</b>. To get your complete
        profile with pronunciation, grammar, and fluency scores, we need to hear
        you speak!
      </div>
    </div>
  );
}
