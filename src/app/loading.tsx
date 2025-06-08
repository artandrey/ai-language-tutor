export default function RootLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white p-4">
      <div className="text-center">
        {/* Main spinner */}
        <div className="relative mb-6">
          <div className="w-16 h-16 mx-auto border-4 border-blue-100 border-t-blue-200 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-blue-100/30 to-transparent animate-pulse"></div>
        </div>

        {/* Loading text */}
        <div className="mb-4">
          <div className="text-gray-700 text-lg font-semibold mb-2">
            Loading...
          </div>
          <div className="text-gray-600 text-sm">Preparing your experience</div>
        </div>

        {/* Animated dots */}
        <div className="flex justify-center space-x-1">
          <div
            className="w-2 h-2 bg-blue-200 rounded-full animate-bounce"
            style={{ animationDelay: '0ms' }}
          ></div>
          <div
            className="w-2 h-2 bg-blue-200 rounded-full animate-bounce"
            style={{ animationDelay: '150ms' }}
          ></div>
          <div
            className="w-2 h-2 bg-blue-200 rounded-full animate-bounce"
            style={{ animationDelay: '300ms' }}
          ></div>
        </div>
      </div>
    </div>
  );
}
