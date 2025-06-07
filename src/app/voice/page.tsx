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
        <div className="flex flex-col items-center mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 w-full max-w-xs mb-4 shadow-lg">
            <div className="flex justify-center gap-2 mb-2">
              <span className="bg-blue-600 text-white rounded-full px-3 py-1 text-xs font-semibold">
                A1
              </span>
              <span className="bg-blue-500 text-white rounded-full px-3 py-1 text-xs font-semibold">
                A2
              </span>
              <span className="bg-blue-400 text-white rounded-full px-3 py-1 text-xs font-semibold">
                B1
              </span>
              <span className="bg-blue-300 text-white rounded-full px-3 py-1 text-xs font-semibold border-2 border-white">
                B2
              </span>
              <span className="bg-purple-500 text-white rounded-full px-3 py-1 text-xs font-semibold">
                C1
              </span>
              <span className="bg-purple-700 text-white rounded-full px-3 py-1 text-xs font-semibold">
                C2
              </span>
            </div>
            <div className="text-white text-lg font-semibold mb-2">
              Upper-Intermediate <span className="text-blue-100">B2</span>
            </div>
            <div className="flex justify-center gap-4 text-xs text-blue-100">
              <div>
                <div className="font-bold text-lg">85%</div>
                <div>Pronunciation</div>
              </div>
              <div>
                <div className="font-bold text-lg">75%</div>
                <div>Filler Words</div>
              </div>
              <div>
                <div className="font-bold text-lg">65%</div>
                <div>Vocabulary</div>
              </div>
              <div>
                <div className="font-bold text-lg">70%</div>
                <div>Grammar</div>
              </div>
              <div>
                <div className="font-bold text-lg">45%</div>
                <div>Fluency</div>
              </div>
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
