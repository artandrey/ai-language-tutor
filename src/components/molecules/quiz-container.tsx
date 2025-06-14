'use client';

import { useQuizStore } from '@/store/quiz';
import { AnimatePresence, motion, useAnimation } from 'motion/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ScrollArea } from '../ui/scroll-area';
import { Filler } from './filler';
import { MultipleChoice } from './multiple-choice';
import { ProgressBar } from './progress-bar';
import { SingleChoice } from './single-choice';
import { useAnalytics } from '@/lib/analytics/hooks';
import { useEffect } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { AnalyticsEvents } from '@/lib/analytics/events';

export const QuizContainer = () => {
  const { questions, canProceed, isCompleted } = useQuizStore();
  // Controls for item visibility
  const itemControls = useAnimation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const q = Number(searchParams.get('q') || 1);
  const currentQuestionIndex = q - 1;
  const { trackEvent } = useAnalytics();

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    trackEvent(AnalyticsEvents.QUIZ_STARTED);
  }, [trackEvent]);

  // Fire user_started_test event when reaching question 15 (vocabulary test)
  useEffect(() => {
    if (currentQuestion?.id === '15') {
      trackEvent(AnalyticsEvents.USER_STARTED_TEST);
    }
  }, [currentQuestion?.id, trackEvent]);

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-100 to-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">
            No questions available
          </h2>
          <p className="text-gray-600">
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
            columns={currentQuestion.columns}
          />
        );
      case 'multiple':
        return (
          <MultipleChoice
            questionId={currentQuestion.id}
            options={currentQuestion.options || []}
            columns={currentQuestion.columns}
          />
        );
      case 'filler':
        return (
          <Filler questionId={currentQuestion.id}>
            {currentQuestion.filler}
          </Filler>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-full bg-gradient-to-br from-blue-100 to-white relative overflow-hidden">
      {/* Light gradient overlay */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-200/20 to-blue-50/10" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.2'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col max-w-2xl mx-auto p-4 pt-4 h-full">
        <ProgressBar
          currentIndex={currentQuestionIndex}
          total={questions.length}
          canGoBack={currentQuestionIndex > 0}
          onBack={() => router.replace(`/quiz?q=${q - 1}`)}
          hideBackButton={!!currentQuestion.hideBackButton}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-200/50 flex-1 flex flex-col shadow-lg"
          >
            <div className="pt-6 p-4 flex-1 flex flex-col">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl font-bold text-gray-900 mb-8 leading-tight"
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

            {!currentQuestion.hideContinueButton && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="p-6 pt-0"
              >
                <motion.button
                  onClick={async () => {
                    if (!canProceed(currentQuestion.id)) return;

                    await itemControls.start({
                      opacity: 0,
                      transition: { duration: 0.4 },
                    });
                    if (currentQuestion.redirect) {
                      router.replace(currentQuestion.redirect);
                    } else if (currentQuestionIndex === questions.length - 1) {
                      router.replace('/payment?type=test');
                    } else {
                      router.replace(`/quiz?q=${q + 1}`);
                    }
                  }}
                  disabled={!canProceed(currentQuestion.id)}
                  className={`w-full py-6 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 relative overflow-hidden ${
                    canProceed(currentQuestion.id)
                      ? 'text-white shadow-lg'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  style={{
                    background: canProceed(currentQuestion.id)
                      ? 'linear-gradient(145deg, #3b82f6, #1d4ed8)'
                      : undefined,
                    boxShadow: canProceed(currentQuestion.id)
                      ? 'inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 rgba(0, 0, 0, 0.2), 0 4px 12px rgba(59, 130, 246, 0.3)'
                      : undefined,
                  }}
                  whileTap={
                    canProceed(currentQuestion.id) ? { scale: 0.95 } : {}
                  }
                  transition={{ duration: 0.1, ease: 'easeInOut' }}
                >
                  {canProceed(currentQuestion.id) && (
                    <div
                      className="absolute inset-0 rounded-2xl"
                      style={{
                        background:
                          'linear-gradient(145deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(0, 0, 0, 0.1) 100%)',
                      }}
                    />
                  )}
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {currentQuestionIndex === questions.length - 1 ? (
                      <>
                        <Sparkles size={18} />
                        See My Results
                      </>
                    ) : (
                      <>
                        Continue
                        <ArrowRight size={18} />
                      </>
                    )}
                  </span>
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
