export default function EmailLoading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-white p-4">
      <div className="w-full max-w-md mx-auto">
        {/* Main content card skeleton */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-12 md:p-16 shadow-lg border border-white/20">
          <div className="text-left">
            {/* Header skeleton */}
            <div className="mb-8">
              <div className="h-8 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="h-6 bg-gray-100 rounded animate-pulse w-3/4 mb-8"></div>
            </div>

            {/* Form skeleton */}
            <div className="space-y-6 mb-8">
              {/* Email label skeleton */}
              <div>
                <div className="h-5 bg-gray-200 rounded animate-pulse mb-2 w-32"></div>
                {/* Email input skeleton */}
                <div className="h-12 bg-white/80 rounded-xl animate-pulse border border-gray-300 shadow-sm"></div>
              </div>

              {/* Submit button skeleton */}
              <div className="h-16 bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl animate-pulse shadow-lg"></div>
            </div>

            {/* Security disclaimers skeleton */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-lg border border-blue-200 bg-blue-50/50">
                <div className="w-5 h-5 bg-blue-100 rounded animate-pulse"></div>
                <div className="h-4 bg-blue-100 rounded animate-pulse flex-1"></div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg border border-blue-200 bg-blue-50/50">
                <div className="w-5 h-5 bg-blue-100 rounded animate-pulse"></div>
                <div className="h-4 bg-blue-100 rounded animate-pulse flex-1"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
