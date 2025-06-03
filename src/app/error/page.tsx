export default function ErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Something went wrong
          </h1>

          <p className="text-gray-600 mb-8">
            We encountered an error while processing your request. This could be
            due to a temporary issue with our authentication system.
          </p>

          <div className="space-y-4">
            <a
              href="/auth/anonymous"
              className="block w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Try Again
            </a>

            <a
              href="/"
              className="block w-full bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Go Home
            </a>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              If the problem persists, please try refreshing the page or contact
              support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
