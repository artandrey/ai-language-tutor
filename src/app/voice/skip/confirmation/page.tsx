import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function VoiceSkipConfirmationPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900 p-4">
      <div className="bg-gray-900/90 rounded-3xl shadow-2xl max-w-lg w-full p-10 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">You're all set!</h1>
        <p className="text-gray-300 mb-8">
          You can always take the English assessment later from your dashboard.
        </p>
        <div className="flex flex-col items-center mb-8">
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mb-4">
            <span className="text-5xl">🧑‍🎤</span>
          </div>
        </div>
        <Link
          href="/"
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
            Go Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
