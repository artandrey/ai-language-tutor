'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface CallResultsProps {
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
    transcript: string | null;
    duration: string | null;
  };
}

export function CallResults({ call }: CallResultsProps) {
  const [currentStage, setCurrentStage] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const stages = ['duration', 'corrections', 'vocabulary', 'summary'];

  const formatDuration = (seconds: number | null) => {
    if (!seconds) return '0 mins';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins === 0) return `${secs} secs`;
    if (secs === 0) return `${mins} mins`;
    return `${mins} mins ${secs} secs`;
  };

  const nextStage = () => {
    if (currentStage < stages.length - 1) {
      setCurrentStage(currentStage + 1);
    }
  };

  const prevStage = () => {
    if (currentStage > 0) {
      setCurrentStage(currentStage - 1);
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

      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {/* Simple confetti effect with colored dots */}
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-500 rounded-full"
              initial={{
                y: -10,
                x: Math.random() * window.innerWidth,
                opacity: 1,
              }}
              animate={{
                y: window.innerHeight + 100,
                rotate: 360,
                opacity: 0,
              }}
              transition={{
                duration: 3,
                delay: Math.random() * 2,
                ease: 'easeOut',
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 flex flex-col max-w-2xl mx-auto p-4 pt-4 min-h-screen">
        {/* Progress indicator */}
        <div className="w-full flex items-center gap-4 mb-2">
          <button
            onClick={prevStage}
            disabled={currentStage === 0}
            className={`p-2 rounded-lg transition-all duration-200 ${
              currentStage > 0
                ? 'text-white hover:bg-white/10 hover:scale-105'
                : 'text-gray-500 cursor-not-allowed'
            }`}
          >
            <ArrowLeft size={24} />
          </button>

          <div className="flex-1 bg-gray-800/50 rounded-full h-2 overflow-hidden backdrop-blur-sm">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
              initial={{ width: 0 }}
              animate={{
                width: `${((currentStage + 1) / stages.length) * 100}%`,
              }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            />
          </div>

          <span className="text-sm text-gray-400 min-w-[3rem]">
            {currentStage + 1}/{stages.length}
          </span>
        </div>

        {/* Main content card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStage}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="bg-gray-900/40 backdrop-blur-sm rounded-3xl border border-gray-700/30 flex-1 flex flex-col p-8"
          >
            {/* Stage 0: Speech Duration */}
            {currentStage === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-center flex-1 flex flex-col justify-center"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-12 h-12 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">
                  You talked{' '}
                  <span className="text-blue-400">
                    {formatDuration(call.usersSpeechDuration)}
                  </span>
                </h2>
                <p className="text-xl text-gray-300 mb-6">Great job!</p>

                {/* Progress bar visualization */}
                <div className="max-w-md mx-auto mb-6">
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                    <span>0 min</span>
                    <span>2 min</span>
                  </div>
                  <div className="w-full bg-gray-800/50 rounded-full h-4 backdrop-blur-sm">
                    <motion.div
                      className="bg-gradient-to-r from-blue-500 to-green-500 h-4 rounded-full"
                      initial={{ width: 0 }}
                      animate={{
                        width: `${Math.min(
                          100,
                          ((call.usersSpeechDuration || 0) / 120) * 100
                        )}%`,
                      }}
                      transition={{
                        delay: 0.5,
                        duration: 1.5,
                        ease: 'easeOut',
                      }}
                    />
                  </div>
                  <p className="text-sm text-gray-400 mt-2">
                    {call.usersSpeechDuration
                      ? `${Math.round((call.usersSpeechDuration / 120) * 100)}%`
                      : '0%'}{' '}
                    of target time
                  </p>
                </div>
              </motion.div>
            )}

            {/* Stage 1: Grammar Corrections */}
            {currentStage === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex-1"
              >
                <h2 className="text-2xl font-bold text-white mb-6">
                  Grammar Feedback
                </h2>
                {call.corrections?.corrections &&
                call.corrections.corrections.length > 0 ? (
                  <div className="space-y-4">
                    {call.corrections.corrections.map((correction, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-gray-800/40 border border-red-500/30 rounded-2xl p-4"
                      >
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-red-400 font-semibold text-sm">
                              {index + 1}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="mb-3">
                              <div className="text-sm text-gray-400 mb-1">
                                You said:
                              </div>
                              <div
                                className="text-gray-200"
                                dangerouslySetInnerHTML={{
                                  __html: correction.actual,
                                }}
                              />
                            </div>
                            <div className="mb-3">
                              <div className="text-sm text-gray-400 mb-1">
                                Suggested:
                              </div>
                              <div
                                className="text-green-400 font-medium"
                                dangerouslySetInnerHTML={{
                                  __html: correction.corrected,
                                }}
                              />
                            </div>
                            {correction.explanation && (
                              <div className="text-sm text-gray-300 bg-gray-800/60 p-3 rounded-xl border border-gray-600/30">
                                <strong>Explanation:</strong>{' '}
                                {correction.explanation}
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 flex-1 flex flex-col justify-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Perfect Grammar!
                    </h3>
                    <p className="text-gray-300">
                      No grammar corrections needed. Well done!
                    </p>
                  </div>
                )}
              </motion.div>
            )}

            {/* Stage 2: Vocabulary */}
            {currentStage === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex-1"
              >
                <h2 className="text-2xl font-bold text-white mb-6">
                  Vocabulary Enhancement
                </h2>
                {call.vocabulary?.vocabulary &&
                call.vocabulary.vocabulary.length > 0 ? (
                  <div className="space-y-4">
                    {call.vocabulary.vocabulary.map((word, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-gray-800/40 border border-blue-500/30 rounded-2xl p-4"
                      >
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-blue-400 font-semibold text-sm">
                              {index + 1}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="mb-3">
                              <div className="flex items-center space-x-3 mb-2">
                                <span className="text-lg font-medium text-white">
                                  "{word.actual}"
                                </span>
                                <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-lg border border-blue-500/30">
                                  {word.difficulty}
                                </span>
                              </div>
                              <div className="text-sm text-gray-400 mb-2">
                                Try these alternatives:
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {word.synonyms.map((synonym, idx) => (
                                  <span
                                    key={idx}
                                    className="px-3 py-1 bg-green-500/20 text-green-400 rounded-xl text-sm font-medium border border-green-500/30"
                                  >
                                    {synonym}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 flex-1 flex flex-col justify-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Great Vocabulary!
                    </h3>
                    <p className="text-gray-300">
                      Your word choice was excellent. No suggestions needed!
                    </p>
                  </div>
                )}
              </motion.div>
            )}

            {/* Stage 3: Summary */}
            {currentStage === 3 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-center flex-1 flex flex-col justify-center"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-12 h-12 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">
                  Well Done!
                </h2>
                <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                  You've completed your conversation assessment with Swiftly.
                  Keep practicing to improve your English speaking skills!
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
                  <div className="text-center p-4 bg-gray-800/40 border border-blue-500/30 rounded-2xl">
                    <div className="text-2xl font-bold text-blue-400 mb-2">
                      {formatDuration(call.usersSpeechDuration)}
                    </div>
                    <div className="text-sm text-gray-400">Speaking Time</div>
                  </div>
                  <div className="text-center p-4 bg-gray-800/40 border border-red-500/30 rounded-2xl">
                    <div className="text-2xl font-bold text-red-400 mb-2">
                      {call.corrections?.corrections?.length || 0}
                    </div>
                    <div className="text-sm text-gray-400">Grammar Points</div>
                  </div>
                  <div className="text-center p-4 bg-gray-800/40 border border-green-500/30 rounded-2xl">
                    <div className="text-2xl font-bold text-green-400 mb-2">
                      {call.vocabulary?.vocabulary?.length || 0}
                    </div>
                    <div className="text-sm text-gray-400">Vocabulary Tips</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <Link
                    href="/voice"
                    className="flex-1"
                  >
                    <motion.button
                      className="w-full py-4 px-6 rounded-2xl font-semibold text-lg text-white shadow-lg relative overflow-hidden"
                      style={{
                        background: 'linear-gradient(145deg, #3b82f6, #1d4ed8)',
                        boxShadow:
                          'inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 rgba(0, 0, 0, 0.2), 0 4px 12px rgba(59, 130, 246, 0.3)',
                      }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.1, ease: 'easeInOut' }}
                    >
                      <div
                        className="absolute inset-0 rounded-2xl"
                        style={{
                          background:
                            'linear-gradient(145deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(0, 0, 0, 0.1) 100%)',
                        }}
                      />
                      <span className="relative z-10">Start New Session</span>
                    </motion.button>
                  </Link>
                  <Link
                    href="/"
                    className="flex-1"
                  >
                    <button className="w-full py-4 px-6 rounded-2xl font-semibold text-lg bg-gray-800/40 border-2 border-gray-700/50 text-gray-300 hover:bg-gray-700/40 hover:border-gray-600 transition-all duration-200">
                      Go Home
                    </button>
                  </Link>
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        {currentStage < 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-6 pt-4"
          >
            <motion.button
              onClick={nextStage}
              className="w-full py-6 px-6 rounded-2xl font-semibold text-lg text-white shadow-lg relative overflow-hidden"
              style={{
                background: 'linear-gradient(145deg, #3b82f6, #1d4ed8)',
                boxShadow:
                  'inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 rgba(0, 0, 0, 0.2), 0 4px 12px rgba(59, 130, 246, 0.3)',
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.1, ease: 'easeInOut' }}
            >
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background:
                    'linear-gradient(145deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(0, 0, 0, 0.1) 100%)',
                }}
              />
              <span className="relative z-10 flex items-center justify-center gap-2">
                Next <ArrowRight size={20} />
              </span>
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
