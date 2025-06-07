'use client';

import { useCallPolling } from '@/hooks/useCallPolling';
import { ProcessingLoader } from '@/components/voice/processing-loader';
import { CallResults } from '@/components/voice/call-results';
import { motion } from 'motion/react';
import { Mic } from 'lucide-react';

export default function VoiceResultsPage() {
  const { call, isLoading, error, isProcessingCompleted } = useCallPolling();

  // Handle error states
  if (error) {
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

        <div className="relative z-10 flex flex-col max-w-2xl mx-auto p-4 pt-4 min-h-screen">
          <div className="flex-1 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-200/50 p-8 text-center shadow-lg"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
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
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Oops! Something went wrong
              </h2>
              <p className="text-gray-600 mb-6">
                We couldn't load your call results. Please try again.
              </p>
              <motion.a
                href="/voice"
                className="inline-block py-4 px-6 rounded-2xl font-semibold text-lg text-white shadow-lg relative overflow-hidden"
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
                  <Mic size={18} />
                  Try Speaking Assessment
                </span>
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  // Handle call not found
  if (call && call.error) {
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

        <div className="relative z-10 flex flex-col max-w-2xl mx-auto p-4 pt-4 min-h-screen">
          <div className="flex-1 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-200/50 p-8 text-center shadow-lg"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
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
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0l-5.898 6.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                No Calls Found
              </h2>
              <p className="text-gray-600 mb-6">
                You haven't completed any calls yet. Start a new session to get
                personalized feedback!
              </p>
              <motion.a
                href="/voice"
                className="inline-block py-4 px-6 rounded-2xl font-semibold text-lg text-white shadow-lg relative overflow-hidden"
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
                  <Mic size={18} />
                  Try Speaking Assessment
                </span>
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  // Show loading while processing
  if (isLoading || !call || !isProcessingCompleted) {
    return <ProcessingLoader />;
  }

  // Show results when processing is complete
  return <CallResults call={call} />;
}
