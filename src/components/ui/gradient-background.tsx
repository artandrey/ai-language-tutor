import React from 'react';

export const GradientBackground = ({
  children,
}: {
  children?: React.ReactNode;
}) => (
  <div
    className="min-h-screen h-full relative overflow-hidden"
    style={{
      background: 'linear-gradient(to bottom, #dbeafe 0%, #ffffff 100%)',
    }}
  >
    <div className="relative z-10 h-full min-h-screen flex flex-col">
      {children}
    </div>
  </div>
);
