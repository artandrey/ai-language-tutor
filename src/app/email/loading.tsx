export default function EmailLoading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#0a1837] to-[#1a1037] p-4">
      <div className="w-full max-w-md mx-auto">
        {/* Header skeleton */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gray-600 rounded-full animate-pulse mx-auto mb-4"></div>
          <div className="h-8 bg-gray-600 rounded animate-pulse mb-2"></div>
          <div className="h-6 bg-gray-700 rounded animate-pulse w-3/4 mx-auto"></div>
        </div>

        {/* Form skeleton */}
        <div className="space-y-6">
          {/* Email label skeleton */}
          <div>
            <div className="h-5 bg-gray-600 rounded animate-pulse mb-2 w-32"></div>
            {/* Email input skeleton */}
            <div className="h-12 bg-gray-700/60 rounded-xl animate-pulse border border-gray-600"></div>
          </div>

          {/* Submit button skeleton */}
          <div className="h-16 bg-gradient-to-r from-blue-500/60 to-blue-700/60 rounded-2xl animate-pulse mt-4"></div>
        </div>

        {/* Footer links skeleton */}
        <div className="text-center mt-8 space-y-2">
          <div className="h-4 bg-gray-700 rounded animate-pulse w-24 mx-auto"></div>
          <div className="h-4 bg-gray-700 rounded animate-pulse w-32 mx-auto"></div>
        </div>
      </div>
    </div>
  );
}
