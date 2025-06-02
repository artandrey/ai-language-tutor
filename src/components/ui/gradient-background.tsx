import React from 'react';

export const GradientBackground = ({
  children,
}: {
  children?: React.ReactNode;
}) => (
  <div
    className="min-h-screen h-full relative overflow-hidden"
    style={{
      background: 'linear-gradient(to bottom, #0a2233 0%, #256080 100%)',
    }}
  >
    <div className="relative z-10 h-full min-h-screen flex flex-col">
      {children}
    </div>
  </div>
);
