'use client';

import { Button } from '@/components/ui/button';
import { AgentAvatar } from '@/components/voice/agent-avatar';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function VoiceSkipConfirmationPage() {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white p-4">
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl max-w-lg w-full p-10 text-center border border-gray-200/50">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          You're all set!
        </h1>
        <p className="text-gray-600 mb-8">
          You can always take the{' '}
          <span className="text-blue-600">English assessment</span> later from
          your dashboard.
        </p>
        <div className="flex flex-col items-center mb-8">
          <div className="mb-4">
            <AgentAvatar size={112} />
          </div>
        </div>
        <Button
          className="w-full py-6 px-6 rounded-2xl font-semibold text-lg shadow-lg flex items-center justify-center gap-3"
          style={{
            background: 'linear-gradient(145deg, #3b82f6, #1d4ed8)',
            boxShadow:
              'inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 rgba(0, 0, 0, 0.2), 0 4px 12px rgba(59, 130, 246, 0.3)',
          }}
          loading={isNavigating}
          disabled={isNavigating}
          onClick={async () => {
            setIsNavigating(true);
            router.replace('/quiz?q=15');
          }}
        >
          {isNavigating ? (
            'Loading...'
          ) : (
            <>
              <ArrowRight size={20} />
              Continue with Questions
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
