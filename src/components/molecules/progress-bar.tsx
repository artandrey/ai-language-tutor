import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { useQuizStore } from '@/store/quiz';

interface ProgressBarProps {
  onBack?: () => void;
}

export const ProgressBar = ({ onBack }: ProgressBarProps) => {
  const { currentQuestionIndex, questions, previousQuestion } = useQuizStore();

  const progress =
    questions.length > 0
      ? ((currentQuestionIndex + 1) / questions.length) * 100
      : 0;
  const canGoBack = currentQuestionIndex > 0;

  const handleBack = () => {
    if (canGoBack) {
      previousQuestion();
      onBack?.();
    }
  };

  return (
    <div className="w-full flex items-center gap-4 mb-2">
      <button
        onClick={handleBack}
        disabled={!canGoBack}
        className={`p-2 rounded-lg transition-all duration-200 ${
          canGoBack
            ? 'text-white hover:bg-white/10 hover:scale-105'
            : 'text-gray-500 cursor-not-allowed'
        }`}
      >
        <ArrowLeft size={24} />
      </button>

      <div className="flex-1 bg-gray-800/50 rounded-full h-2 overflow-hidden backdrop-blur-sm">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
      </div>

      <span className="text-sm text-gray-400 min-w-[3rem]">
        {currentQuestionIndex + 1}/{questions.length}
      </span>
    </div>
  );
};
