import React from 'react';

interface LoaderProps {
  className?: string;
}

export const Loader: React.FC<LoaderProps> = ({ className = '' }) => {
  return (
    <div
      className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white p-4 ${className}`}
    >
      <div className="text-center">
        {/* Spinner */}
        <div className="relative mb-4">
          <div className="w-12 h-12 mx-auto border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
          {/* Optional gradient overlay for the spinner */}
          <div className="absolute inset-0 w-12 h-12 mx-auto rounded-full bg-gradient-to-r from-blue-500/20 to-transparent animate-pulse"></div>
        </div>

        {/* Animated dots */}
        <div className="flex justify-center space-x-1">
          <div
            className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
            style={{ animationDelay: '0ms' }}
          ></div>
          <div
            className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
            style={{ animationDelay: '150ms' }}
          ></div>
          <div
            className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
            style={{ animationDelay: '300ms' }}
          ></div>
        </div>
      </div>
    </div>
  );
};
