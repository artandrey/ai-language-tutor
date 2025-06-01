'use client';

import { motion } from 'motion/react';
import { useQuizStore } from '@/store/quiz';
import { useState, useEffect } from 'react';

interface FillerProps {
  questionId: string;
  placeholder?: string;
}

export const Filler = ({
  questionId,
  placeholder = 'Type your answer here...',
}: FillerProps) => {
  const { setAnswer, getAnswer } = useQuizStore();
  const currentAnswer = getAnswer(questionId);
  const [value, setValue] = useState((currentAnswer?.value as string) || '');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setAnswer(questionId, value);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [value, questionId, setAnswer]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-full p-4 rounded-2xl bg-gray-800/40 border-2 border-gray-700/50 text-white placeholder-gray-400 resize-none min-h-[120px] focus:outline-none focus:border-blue-500 transition-all duration-200"
        rows={4}
      />
    </motion.div>
  );
};
