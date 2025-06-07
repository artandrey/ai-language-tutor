'use client';

import { motion } from 'motion/react';

interface FillerProps {
  questionId: string;
  children: React.ReactNode;
}

export const Filler = ({ children }: FillerProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};
