import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AgentAvatar } from '@/components/voice/agent-avatar';

export default function VoiceSkipPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white p-4">
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl max-w-lg w-full p-10 text-center border border-gray-200/50">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          You can always take the{' '}
          <span className="text-blue-600">assessment</span> later!
        </h1>
        <p className="text-gray-600 mb-8">
          Whenever you're ready, you'll find this option in the app.
        </p>
        <div className="flex flex-col items-center mb-8">
          <div className="mb-4">
            <AgentAvatar size={112} />
          </div>
          <div className="text-blue-600 font-semibold">Let's talk later!</div>
        </div>
        <Link
          href="/voice/skip/confirmation"
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
            Continue
          </Button>
        </Link>
      </div>
    </div>
  );
}
