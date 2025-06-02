import React from 'react';

export const CenteredCard = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`max-w-md w-full mx-auto text-center bg-gray-900/40 backdrop-blur-sm rounded-3xl border border-gray-700/30 p-8 shadow-lg ${className}`}
  >
    {children}
  </div>
);
