import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function AnonymousAuthPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white p-4">
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl max-w-lg w-full p-10 text-center border border-gray-200/50">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Welcome to <span className="text-blue-600">Swiftly</span>
        </h1>
        <p className="text-gray-600 mb-8 text-lg leading-relaxed">
          To get started, we&apos;ll create a temporary session for you to
          explore the app and see how it works.
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">
            What you can do:
          </h3>
          <ul className="text-left text-blue-800 space-y-2">
            <li>• Take our English level assessment</li>
            <li>• Get personalized feedback</li>
            <li>• Start practicing immediately</li>
            <li>• See your progress in real-time</li>
          </ul>
        </div>
        <Link
          href="/"
          className="block"
        >
          <Button
            className="w-full py-6 px-6 rounded-2xl font-semibold text-lg shadow-lg flex items-center justify-center gap-3"
            style={{
              background: 'linear-gradient(145deg, #3b82f6, #1d4ed8)',
              boxShadow:
                'inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 rgba(0, 0, 0, 0.2), 0 4px 12px rgba(59, 130, 246, 0.3)',
            }}
          >
            Begin My Assessment
            <ArrowRight size={20} />
          </Button>
        </Link>
      </div>
    </div>
  );
}
