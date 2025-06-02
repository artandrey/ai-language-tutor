'use client';

import { useQuizStore } from '@/store/quiz';
import { AnimatePresence, motion, useAnimation } from 'motion/react';
import { useRouter } from 'next/navigation';
import { ScrollArea } from '../ui/scroll-area';
import { Filler } from './filler';
import { MultipleChoice } from './multiple-choice';
import { ProgressBar } from './progress-bar';
import { SingleChoice } from './single-choice';

export const QuizContainer = () => {
  const {
    questions,
    currentQuestionIndex,
    nextQuestion,
    canProceed,
    isCompleted,
  } = useQuizStore();
  // Controls for item visibility
  const itemControls = useAnimation();
  const router = useRouter();

  const currentQuestion = questions[currentQuestionIndex];

  if (isCompleted) {
    return null;
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">No questions available</h2>
          <p className="text-gray-300">
            Please add questions to start the quiz.
          </p>
        </div>
      </div>
    );
  }

  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case 'single':
        return (
          <SingleChoice
            questionId={currentQuestion.id}
            options={currentQuestion.options || []}
          />
        );
      case 'multiple':
        return (
          <MultipleChoice
            questionId={currentQuestion.id}
            options={currentQuestion.options || []}
          />
        );
      case 'filler':
        return <Filler questionId={currentQuestion.id} />;
      default:
        return null;
    }
  };

  return (
    <div className="h-full bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900 relative overflow-hidden">
      {/* Grainy gradient overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-magenta-600/10" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col max-w-2xl mx-auto p-4 pt-4 h-full">
        <ProgressBar />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="bg-gray-900/40 backdrop-blur-sm rounded-3xl border border-gray-700/30 flex-1 flex flex-col"
          >
            <div className="pt-6 p-4 flex-1 flex flex-col">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl font-bold text-white mb-8 leading-tight"
              >
                {currentQuestion.title}
              </motion.h2>

              {/* Item container with no visible animation, controlled by Framer */}
              <div className="grow basis-0 overflow-hidden">
                <ScrollArea className="h-full">
                  <motion.div
                    animate={itemControls}
                    initial={{ opacity: 1 }}
                    className="flex-1"
                  >
                    {renderQuestion()}
                  </motion.div>
                </ScrollArea>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 pt-0"
            >
              <motion.button
                onClick={async () => {
                  if (!canProceed()) return;

                  await itemControls.start({
                    opacity: 0,
                    transition: { duration: 0.4 },
                  });
                  if (currentQuestionIndex === questions.length - 1) {
                    router.replace('/plan');
                  } else {
                    nextQuestion();
                  }
                }}
                disabled={!canProceed()}
                className={`w-full py-6 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 relative overflow-hidden ${
                  canProceed()
                    ? 'text-white shadow-lg'
                    : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                }`}
                style={{
                  background: canProceed()
                    ? 'linear-gradient(145deg, #3b82f6, #1d4ed8)'
                    : undefined,
                  boxShadow: canProceed()
                    ? 'inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 rgba(0, 0, 0, 0.2), 0 4px 12px rgba(59, 130, 246, 0.3)'
                    : undefined,
                }}
                whileTap={canProceed() ? { scale: 0.95 } : {}}
                transition={{ duration: 0.1, ease: 'easeInOut' }}
              >
                {canProceed() && (
                  <div
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      background:
                        'linear-gradient(145deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(0, 0, 0, 0.1) 100%)',
                    }}
                  />
                )}
                <span className="relative z-10">
                  {currentQuestionIndex === questions.length - 1
                    ? 'Complete'
                    : 'Continue'}
                </span>
              </motion.button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
