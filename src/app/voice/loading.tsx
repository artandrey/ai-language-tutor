export default function VoiceLoading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-white p-4">
      <div className="w-full max-w-2xl mx-auto text-center">
        {/* Progress bar skeleton */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
            <div className="w-16 h-4 bg-gray-300 rounded animate-pulse"></div>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full">
            <div
              className="h-2 bg-blue-300 rounded-full animate-pulse"
              style={{ width: '60%' }}
            ></div>
          </div>
        </div>

        {/* Main content skeleton */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/20">
          {/* Title skeleton */}
          <div className="mb-6">
            <div className="w-16 h-16 bg-gray-300 rounded-full animate-pulse mx-auto mb-4"></div>
            <div className="h-8 bg-gray-300 rounded animate-pulse mb-2"></div>
            <div className="h-8 bg-gray-300 rounded animate-pulse w-3/4 mx-auto"></div>
          </div>

          {/* Description skeleton */}
          <div className="mb-8 space-y-3">
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-4/5 mx-auto"></div>
          </div>

          {/* Features list skeleton */}
          <div className="mb-8 space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center space-x-3"
              >
                <div className="w-5 h-5 bg-gray-300 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse flex-1"></div>
              </div>
            ))}
          </div>

          {/* Action buttons skeleton */}
          <div className="space-y-4">
            <div className="h-12 bg-gray-300 rounded-xl animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded-xl animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
