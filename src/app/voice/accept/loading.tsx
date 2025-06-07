export default function VoiceAcceptLoading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-white p-4">
      <div className="w-full max-w-md mx-auto text-center">
        {/* Timer skeleton */}
        <div className="mb-8">
          <div className="w-24 h-8 bg-gray-300 rounded-lg animate-pulse mx-auto mb-2"></div>
          <div className="w-32 h-4 bg-gray-200 rounded animate-pulse mx-auto"></div>
        </div>

        {/* Agent avatar skeleton */}
        <div className="mb-8">
          <div className="w-32 h-32 bg-gray-300 rounded-full animate-pulse mx-auto mb-4"></div>
          <div className="w-40 h-4 bg-gray-200 rounded animate-pulse mx-auto"></div>
        </div>

        {/* Transcript area skeleton */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/20">
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
          </div>
        </div>

        {/* Control buttons skeleton */}
        <div className="flex justify-center space-x-4">
          <div className="w-12 h-12 bg-gray-300 rounded-full animate-pulse"></div>
          <div className="w-12 h-12 bg-gray-300 rounded-full animate-pulse"></div>
          <div className="w-12 h-12 bg-red-300 rounded-full animate-pulse"></div>
        </div>

        {/* Loading text */}
        <div className="mt-6">
          <div className="w-48 h-4 bg-gray-200 rounded animate-pulse mx-auto"></div>
        </div>
      </div>
    </div>
  );
}
