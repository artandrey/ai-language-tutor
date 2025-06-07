'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export function ProcessingLoader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return prev; // Stop at 95% to avoid reaching 100% before processing is done
        return prev + Math.random() * 3 + 1; // Random increment between 1-4%
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

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

      <div className="relative z-10 flex flex-col max-w-2xl mx-auto p-4 pt-4 min-h-screen">
        <div className="flex-1 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-900/40 backdrop-blur-sm rounded-3xl border border-gray-700/30 p-8 text-center w-full max-w-md"
          >
            {/* Animated Icon */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="relative mb-8"
            >
              <div className="w-16 h-16 mx-auto mb-6 relative">
                {/* Inner icon */}
                <div className="relative w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
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
                      d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                    />
                  </svg>
                </div>
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="space-y-4 mb-8"
            >
              <h1 className="text-3xl font-bold text-white">
                Analyzing your conversation...
              </h1>
              <p className="text-gray-300 text-lg">
                Swiftly AI is processing your speech patterns, grammar, and
                vocabulary to provide personalized feedback.
              </p>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="w-full"
            >
              <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                <span>Processing...</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-gray-800/50 rounded-full h-3 backdrop-blur-sm overflow-hidden">
                <motion.div
                  className="bg-gradient-to-r from-blue-500 to-blue-400 h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
              </div>
              <p className="text-gray-400 text-sm mt-3">
                This usually takes 10-30 seconds
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
