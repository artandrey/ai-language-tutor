import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import { getOrCreateCall, hasCompletedCalls } from '@/lib/calls/server';

export default async function VoicePage() {
  // Server-side authentication check
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  // If user is not authenticated, redirect to anonymous auth page
  if (error || !user) {
    redirect('/auth/anonymous');
  }

  try {
    // Check if user has already completed calls
    const hasCompleted = await hasCompletedCalls(user.id);

    if (hasCompleted) {
      redirect('/voice/results');
    }

    // Get or create call for the user
    const callData = await getOrCreateCall(user.id);

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Voice Language Practice
            </h1>
            <p className="text-lg text-gray-600">
              Practice your English conversation skills with our AI language
              tutor
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            {/* User Status Indicator */}
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-green-800 font-medium">
                  {user.is_anonymous
                    ? 'Anonymous Session Active'
                    : 'User Session Active'}
                </span>
                <span className="text-green-600 text-sm">
                  ({user.id.slice(0, 8)}...)
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Call Information */}
              <div className="space-y-6">
                <div className="bg-blue-50 rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-blue-900 mb-4">
                    {callData.isNewCall
                      ? 'New Session Created'
                      : 'Resume Your Session'}
                  </h2>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-blue-800">
                        Session ID: {callData.callId.slice(0, 8)}...
                      </span>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-blue-800">
                        Status: Ready to join
                      </span>
                    </div>

                    {!callData.isNewCall && (
                      <div className="bg-yellow-100 border border-yellow-200 rounded-lg p-3 mt-4">
                        <p className="text-yellow-800 text-sm">
                          💡 You have an existing session. Continuing where you
                          left off.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Instructions */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    How it works:
                  </h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700">
                    <li>
                      Click &quot;Join Voice Session&quot; to start practicing
                    </li>
                    <li>Have a natural conversation with the AI tutor</li>
                    <li>The AI will help you with grammar and vocabulary</li>
                    <li>Get personalized feedback after your session</li>
                  </ol>
                </div>
              </div>

              {/* Join Interface */}
              <div className="flex flex-col justify-center">
                <div className="text-center space-y-6">
                  <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto">
                    <svg
                      className="w-12 h-12 text-indigo-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                      />
                    </svg>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-900">
                    Ready to Practice?
                  </h3>

                  <p className="text-gray-600">
                    Join your voice session and start improving your English
                    conversation skills
                  </p>

                  <div className="space-y-4">
                    <a
                      href={callData.joinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-full bg-indigo-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition-colors"
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 002 2v8a2 2 0 002 2z"
                        />
                      </svg>
                      Join Voice Session
                    </a>

                    <p className="text-sm text-gray-500">
                      Session will open in a new window
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Info */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <details className="group">
                <summary className="cursor-pointer text-gray-600 hover:text-gray-900">
                  <span className="font-medium">Technical Information</span>
                  <span className="ml-2 group-open:rotate-180 transition-transform inline-block">
                    ▼
                  </span>
                </summary>
                <div className="mt-4 bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">
                        Call ID:
                      </span>
                      <span className="ml-2 text-gray-600 font-mono">
                        {callData.callId}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">
                        User ID:
                      </span>
                      <span className="ml-2 text-gray-600 font-mono">
                        {user.id.slice(0, 8)}...
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">
                        User Type:
                      </span>
                      <span className="ml-2 text-gray-600">
                        {user.is_anonymous ? 'Anonymous' : 'Registered'}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">
                        Session Type:
                      </span>
                      <span className="ml-2 text-gray-600">
                        {callData.isNewCall ? 'New' : 'Resumed'}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">
                        Created:
                      </span>
                      <span className="ml-2 text-gray-600">
                        {new Date().toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error in voice page:', error);

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Something went wrong
          </h1>
          <p className="text-gray-600 mb-6">
            We encountered an error while setting up your voice session.
          </p>
          <Link
            href="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    );
  }
}
