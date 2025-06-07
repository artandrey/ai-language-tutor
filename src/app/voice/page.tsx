import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function VoiceInitPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white p-4">
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl max-w-lg w-full p-10 text-center relative border border-gray-200/50">
        <Link
          href="/voice/skip"
          className="block mb-4"
        >
          <Button
            variant="ghost"
            className="w-full text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            Skip
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Let's analyze your <span className="text-blue-600">English</span>
        </h1>
        <p className="text-gray-600 mb-8">
          A 4-minute conversation will help us understand your strengths and
          create the right learning path for you.
        </p>

        {/* Redesigned Stats Preview */}
        <div className="mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 shadow-lg">
            {/* Level Badges */}
            <div className="flex justify-center gap-1 mb-4">
              <span className="bg-white text-blue-600 rounded-full px-2 py-1 text-xs font-medium">
                A1
              </span>
              <span className="bg-white text-blue-600 rounded-full px-2 py-1 text-xs font-medium">
                A2
              </span>
              <span className="bg-white text-blue-600 rounded-full px-2 py-1 text-xs font-medium">
                B1
              </span>
              <span className="bg-white text-blue-600 rounded-full px-2 py-1 text-xs font-bold border-2 border-white">
                B2
              </span>
              <span className="bg-white text-blue-600 rounded-full px-2 py-1 text-xs font-medium">
                C1
              </span>
              <span className="bg-white text-blue-600 rounded-full px-2 py-1 text-xs font-medium">
                C2
              </span>
            </div>

            {/* Current Level */}
            <div className="text-white mb-6">
              <div className="text-xl font-bold mb-1">Upper-Intermediate</div>
              <div className="text-blue-100 text-sm">Your estimated level</div>
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-xl p-3 shadow-sm">
                <div className="text-blue-600 font-bold text-lg">85%</div>
                <div className="text-gray-600 text-xs">Pronunciation</div>
              </div>
              <div className="bg-white rounded-xl p-3 shadow-sm">
                <div className="text-blue-600 font-bold text-lg">75%</div>
                <div className="text-gray-600 text-xs">Grammar</div>
              </div>
              <div className="bg-white rounded-xl p-3 shadow-sm">
                <div className="text-blue-600 font-bold text-lg">65%</div>
                <div className="text-gray-600 text-xs">Vocabulary</div>
              </div>
              <div className="bg-white rounded-xl p-3 shadow-sm">
                <div className="text-blue-600 font-bold text-lg">70%</div>
                <div className="text-gray-600 text-xs">Fluency</div>
              </div>
            </div>

            <div className="mt-4 text-blue-100 text-xs">
              ✨ Sample assessment results
            </div>
          </div>
        </div>

        <Link
          href="/voice/accept"
          className="block"
        >
          <Button
            className="w-full py-6 px-6 rounded-2xl font-semibold text-lg shadow-lg"
            style={{
              background: 'linear-gradient(145deg, #3b82f6, #1d4ed8)',
              boxShadow:
                'inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 rgba(0, 0, 0, 0.2), 0 4px 12px rgba(59, 130, 246, 0.3)',
            }}
          >
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  );
}
