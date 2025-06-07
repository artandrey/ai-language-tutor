import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useAnimationFrame } from 'motion/react';
import { useQuiz } from '@/hooks/use-quiz';

export function VocabularyLoadingFiller() {
  const progress = useMotionValue(0);
  const [displayProgress, setDisplayProgress] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const duration = 9000; // 9 seconds
  const { goNext } = useQuiz();
  const hasCompleted = useRef(false);

  useAnimationFrame((t) => {
    if (startTimeRef.current === null) {
      startTimeRef.current = t;
    }
    const elapsed = t - startTimeRef.current;
    const percent = Math.min(1, elapsed / duration);
    progress.set(percent);
    setDisplayProgress(percent);
    if (percent >= 1 && !hasCompleted.current) {
      hasCompleted.current = true;
      goNext();
    }
  });

  useEffect(() => {
    startTimeRef.current = null;
    progress.set(0);
    setDisplayProgress(0);
    hasCompleted.current = false;
    // eslint-disable-next-line
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Evaluating your vocabulary skills
      </h2>
      <div className="flex flex-col items-center mb-8">
        <div className="relative w-36 h-36 flex items-center justify-center mb-4">
          <svg
            className="absolute top-0 left-0 w-full h-full"
            viewBox="0 0 120 120"
          >
            <circle
              cx="60"
              cy="60"
              r="54"
              stroke="#e5e7eb"
              strokeWidth="12"
              fill="none"
            />
            <motion.circle
              cx="60"
              cy="60"
              r="54"
              stroke="#3b82f6"
              strokeWidth="12"
              fill="none"
              strokeDasharray={339.292}
              strokeDashoffset={339.292 * (1 - displayProgress)}
              strokeLinecap="round"
            />
          </svg>
          <span className="text-4xl font-bold text-gray-900 z-10">
            {Math.round(displayProgress * 100)}%
          </span>
        </div>
        <div className="text-gray-600 text-lg">
          Evaluating your word selection versatility
        </div>
      </div>
      <div className="bg-white/60 border border-gray-200/50 rounded-2xl p-4 mt-8 w-full max-w-xl mx-auto shadow-sm">
        <div className="text-gray-700 mb-2">
          Your product is freaking amazing! I finally found something perfect
          for me to enhance my advanced English to the next level. Stellar work
          to you all!
        </div>
        <div className="flex items-center justify-between text-gray-500 text-xs">
          <div>
            <div>Maria Olimova</div>
            <div>Product manager</div>
          </div>
          <div className="flex gap-0.5 text-blue-500 text-lg">{'★★★★★'}</div>
        </div>
      </div>
    </div>
  );
}
