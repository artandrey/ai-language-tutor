'use client';

import React, { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import posthog from 'posthog-js';

function PaymentProcessingContent() {
  const searchParams = useSearchParams();
  const plan = searchParams.get('plan');
  useEffect(() => {
    posthog.capture('user_initialized_payment', { plan });
  }, [plan]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0a1837] to-[#1a1037] p-4">
      <div className="bg-white/10 rounded-xl p-8 text-center max-w-md w-full">
        <h1 className="text-2xl font-bold text-white mb-4">
          Failed to initialize payment! Sorry
        </h1>
        <p className="text-gray-300">
          Please try again later or contact support if the issue persists.
        </p>
      </div>
    </div>
  );
}

export default function PaymentProcessingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentProcessingContent />
    </Suspense>
  );
}
