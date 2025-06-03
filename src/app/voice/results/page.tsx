import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';

export default async function VoiceResultsPage() {
  // Server-side authentication check
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  // If user is not authenticated, redirect to home
  if (error || !user) {
    redirect('/');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Call Results
          </h1>
          <p className="text-lg text-gray-600">
            Your conversation analysis and feedback
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Results Page Coming Soon
            </h2>

            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              This page will display your conversation analysis, grammar
              corrections, vocabulary suggestions, and personalized feedback
              from your voice session.
            </p>

            <div className="bg-blue-50 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">
                What you&apos;ll see here:
              </h3>
              <ul className="text-left text-blue-800 space-y-2 max-w-md mx-auto">
                <li>• Full conversation transcript</li>
                <li>• Grammar corrections with explanations</li>
                <li>• Vocabulary enhancement suggestions</li>
                <li>• Pronunciation feedback</li>
                <li>• Overall language proficiency assessment</li>
              </ul>
            </div>

            <div className="space-x-4">
              <Link
                href="/voice"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Start New Session
              </Link>

              <Link
                href="/"
                className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Go Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
