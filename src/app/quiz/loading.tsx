export default function QuizLoading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-white p-4">
      <div className="w-full max-w-2xl mx-auto">
        {/* Progress bar skeleton */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full">
            <div
              className="h-2 bg-gradient-to-r from-blue-100 to-blue-200 rounded-full animate-pulse"
              style={{ width: '20%' }}
            ></div>
          </div>
        </div>

        {/* Question content skeleton */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/20">
          {/* Question title skeleton */}
          <div className="mb-6">
            <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4"></div>
          </div>

          {/* Answer options skeleton */}
          <div className="space-y-4 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-12 bg-gray-100 rounded-xl animate-pulse"
              ></div>
            ))}
          </div>

          {/* Continue button skeleton */}
          <div className="h-12 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
