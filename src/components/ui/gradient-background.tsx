import React from 'react';

export const GradientBackground = ({
  children,
}: {
  children?: React.ReactNode;
}) => (
  <div className="min-h-screen h-full bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900 relative overflow-hidden">
    {/* Grainy gradient overlay */}
    <div className="absolute inset-0 opacity-20 pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-magenta-600/10" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E\")`,
        }}
      />
    </div>
    <div className="relative z-10 h-full min-h-screen flex flex-col">
      {children}
    </div>
  </div>
);
