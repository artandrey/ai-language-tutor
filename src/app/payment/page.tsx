'use client';

import { VocabularyStatsSummary } from '@/components/metrics/VocabularyStatsSummary';
import { VoiceMetricsSummary } from '@/components/metrics/VoiceMetricsSummary';
import { Loader } from '@/components/ui/loader';
import { useCallPolling } from '@/hooks/useCallPolling';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { useAnalytics } from '@/lib/analytics/hooks';
import { AnalyticsEvents } from '@/lib/analytics/events';
import { Button } from '@/components/ui/button';

const plans = [
  { name: '1-Week Plan', price: 9.99, perDay: '1.43', original: null },
  {
    name: '12-Week Plan',
    price: 44.99,
    perDay: '0.54',
    original: 89.98,
    popular: true,
  },
  { name: '52-Week Plan', price: 89.99, perDay: '0.25', original: 179.98 },
];

function PaymentContent() {
  const [selected, setSelected] = useState(1);
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const { trackEvent } = useAnalytics();

  // For voice metrics
  const {
    call,
    isLoading: isVoiceLoading,
    error: voiceError,
  } = useCallPolling();

  useEffect(() => {
    trackEvent(AnalyticsEvents.USER_OPENED_PAYMENT_PAGE, { type });
  }, [type, trackEvent]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-white p-4">
      <div className="w-full max-w-xl mx-auto">
        {/* Metrics summary */}
        {type === 'voice' && !isVoiceLoading && call && !voiceError && (
          <div className="mb-8">
            <VoiceMetricsSummary call={call} />
          </div>
        )}
        {type === 'test' && (
          <div className="mb-8">
            <VocabularyStatsSummary />
          </div>
        )}
        <div className="max-w-xl w-full">
          <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">
            What You'll Unlock with AI Tutor
          </h2>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-white/80 rounded-xl p-4 flex flex-col border border-gray-200/50">
              <div className="flex items-center gap-2 font-semibold text-orange-500">
                <span>🎤</span> Accent
              </div>
              <div className="text-xs text-gray-600">Sounds clear</div>
            </div>
            <div className="bg-white/80 rounded-xl p-4 flex flex-col border border-gray-200/50">
              <div className="flex items-center gap-2 font-semibold text-blue-500">
                <span>📘</span> Vocabulary
              </div>
              <div className="text-xs text-gray-600">Powerful idioms</div>
            </div>
            <div className="bg-white/80 rounded-xl p-4 flex flex-col border border-gray-200/50">
              <div className="flex items-center gap-2 font-semibold text-pink-500">
                <span>🖊️</span> Grammar
              </div>
              <div className="text-xs text-gray-600">Mistake-free</div>
            </div>
            <div className="bg-white/80 rounded-xl p-4 flex flex-col border border-gray-200/50">
              <div className="flex items-center gap-2 font-semibold text-cyan-500">
                <span>🌊</span> Fluency
              </div>
              <div className="text-xs text-gray-600">Flow naturally</div>
            </div>
          </div>
          <div className="bg-white/80 rounded-xl p-4 mb-8 border border-gray-200/50">
            <h3 className="text-lg font-semibold text-blue-700 mb-4">
              Choose your plan
            </h3>
            <div className="flex flex-col gap-4">
              {plans.map((plan, i) => (
                <div
                  key={plan.name}
                  className={`flex relative items-center justify-between rounded-xl border px-4 py-3 cursor-pointer transition-all ${
                    selected === i
                      ? 'border-blue-500 bg-blue-100/60'
                      : 'border-gray-200/50 bg-white'
                  }`}
                  onClick={() => setSelected(i)}
                >
                  <div>
                    <div className="font-semibold text-blue-700 flex items-center gap-2">
                      {plan.name}
                      {plan.popular && (
                        <span className="ml-2 bg-blue-500 text-xs text-white px-2 py-0.5 rounded-full absolute top-[-10px] right-0">
                          MOST POPULAR
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500">
                      {plan.original && (
                        <span className="line-through mr-2">
                          ${plan.original.toFixed(2)}
                        </span>
                      )}
                      ${plan.price.toFixed(2)}
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="text-lg font-bold text-blue-700">
                      ${plan.perDay}
                    </div>
                    <div className="text-xs text-gray-500">per day</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-4">
              <span className="text-xs text-blue-600 underline cursor-pointer">
                30-day money back guarantee
              </span>
            </div>
            <Button
              className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-400 text-white font-bold text-lg shadow-lg hover:from-blue-600 hover:to-blue-500 transition"
              onClick={() =>
                router.replace(
                  `/payment-processing?plan=${encodeURIComponent(
                    plans[selected].name
                  )}`
                )
              }
            >
              Get My Plan
            </Button>
          </div>
          <div className="bg-white/80 rounded-xl p-6 mb-8 border border-gray-200/50">
            <h3 className="text-lg font-semibold text-blue-700 mb-4">
              What you get
            </h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>
                ✔️ Full Access to Swiftly Premium with all features unlocked.
              </li>
              <li>
                ✔️ Unlimited Interactive Practice to speak and practice anytime,
                anywhere.
              </li>
              <li>
                ✔️ Personalized Study Plan with detailed conversation insights.
              </li>
              <li>✔️ Personalized Tasks based on your real conversations.</li>
              <li>
                ✔️ Real-time AI Feedback on your every English conversation.
              </li>
              <li>✔️ Control & Track your progress in real-time.</li>
            </ul>
          </div>
          <div className="bg-white/80 rounded-xl p-6 mb-8 flex items-center gap-4 border border-gray-200/50">
            <div className="bg-blue-500 rounded-full w-10 h-10 flex items-center justify-center text-white text-2xl">
              🛡️
            </div>
            <div>
              <div className="font-semibold text-blue-700">
                100% Money-Back Guarantee
              </div>
              <div className="text-xs text-gray-600">
                See results in 4 weeks or get a full refund — no questions
                asked.
              </div>
              <ul className="text-xs text-green-600 mt-2 space-y-1">
                <li>✔️ Refund within 30 days</li>
                <li>✔️ Easy cancellation process</li>
                <li>✔️ 24/7 support available</li>
              </ul>
            </div>
          </div>
          <footer className="flex flex-col items-center mt-8 mb-4">
            <div className="text-xs text-gray-400 mb-1">
              © 2025 Swiftly Inc.
            </div>
            <div className="flex gap-4 text-xs text-blue-600">
              <Link href="/terms">Terms of Service</Link>
              <Link href="/privacy">Privacy Policy</Link>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<Loader />}>
      <PaymentContent />
    </Suspense>
  );
}
