'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Mic } from 'lucide-react';

export default function VoiceStartButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <Button
      className="w-full py-6 px-6 rounded-2xl font-semibold text-lg shadow-lg flex items-center justify-center gap-3"
      style={{
        background: 'linear-gradient(145deg, #3b82f6, #1d4ed8)',
        boxShadow:
          'inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 rgba(0, 0, 0, 0.2), 0 4px 12px rgba(59, 130, 246, 0.3)',
      }}
      loading={loading}
      disabled={loading}
      onClick={async () => {
        setLoading(true);
        try {
          await router.push('/voice/accept');
        } finally {
          setLoading(false);
        }
      }}
    >
      <Mic size={20} />
      Start Speaking Assessment
    </Button>
  );
}
