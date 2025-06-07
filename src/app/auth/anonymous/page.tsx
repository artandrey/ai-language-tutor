import Link from 'next/link';
import { createAnonymousSession } from '@/lib/auth/actions';

export default function AnonymousAuthPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome to Voice Practice
            </h1>

            <p className="text-gray-600">
              To get started, we&apos;ll create a temporary session for you to
              practice English conversation.
            </p>
          </div>

          <form className="space-y-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">
                What happens next:
              </h3>
              <ul className="text-blue-800 text-sm space-y-1">
                <li>• We&apos;ll create a temporary anonymous session</li>
                <li>• No personal information required</li>
                <li>• Start practicing immediately</li>
                <li>• Your session will be saved temporarily</li>
              </ul>
            </div>

            <button
              formAction={createAnonymousSession}
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Start Anonymous Session
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-gray-500 hover:text-gray-700 text-sm"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
