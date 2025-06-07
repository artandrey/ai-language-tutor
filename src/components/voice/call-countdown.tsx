import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useAnimationFrame } from 'motion/react';

interface CallCountdownProps {
  duration?: number; // ms
  onComplete?: () => void;
  size?: number;
  staticTime?: number; // ms, if set, show this time and 100% progress
}

export const CallCountdown: React.FC<CallCountdownProps> = ({
  duration = 120000,
  onComplete,
  size = 120,
  staticTime,
}) => {
  const progress = useMotionValue(0);
  const [displayProgress, setDisplayProgress] = useState(0);
  const [remaining, setRemaining] = useState(duration);
  const startTimeRef = useRef<number | null>(null);
  const hasCompleted = useRef(false);

  useAnimationFrame((t) => {
    if (staticTime !== undefined) return; // Don't animate if static
    if (startTimeRef.current === null) {
      startTimeRef.current = t;
    }
    const elapsed = t - startTimeRef.current;
    const percent = Math.min(1, elapsed / duration);
    progress.set(percent);
    setDisplayProgress(percent);
    setRemaining(Math.max(0, duration - elapsed));
    if (percent >= 1 && !hasCompleted.current) {
      hasCompleted.current = true;
      onComplete?.();
    }
  });

  useEffect(() => {
    if (staticTime !== undefined) {
      setRemaining(staticTime);
      setDisplayProgress(1); // Show full progress ring
      progress.set(1);
      return;
    }
    startTimeRef.current = null;
    progress.set(0);
    setDisplayProgress(0);
    setRemaining(duration);
    hasCompleted.current = false;
    // eslint-disable-next-line
  }, [duration, staticTime]);

  const minutes = Math.floor(remaining / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);
  const timeString = `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;

  const circleRadius = size / 2 - 6;
  const circleCircumference = 2 * Math.PI * circleRadius;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg
        className="absolute top-0 left-0 w-full h-full"
        viewBox={`0 0 ${size} ${size}`}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={circleRadius}
          stroke="#23263a"
          strokeWidth={12}
          fill="none"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={circleRadius}
          stroke="#3b82f6"
          strokeWidth={12}
          fill="none"
          strokeDasharray={circleCircumference}
          strokeDashoffset={circleCircumference * (1 - displayProgress)}
          strokeLinecap="round"
        />
      </svg>
      <span
        className="text-3xl font-bold text-blue-500 z-10"
        style={{ fontVariantNumeric: 'tabular-nums' }}
      >
        {timeString}
      </span>
    </div>
  );
};
