import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProgressBarProps {
  currentIndex: number;
  total: number;
  canGoBack?: boolean;
  onBack?: () => void;
  hideBackButton?: boolean;
}

export const ProgressBar = ({
  currentIndex,
  total,
  canGoBack = true,
  onBack,
  hideBackButton = false,
}: ProgressBarProps) => {
  const progress = total > 0 ? ((currentIndex + 1) / total) * 100 : 0;

  const handleBack = () => {
    if (canGoBack) {
      onBack?.();
    }
  };

  return (
    <div className="w-full flex items-center gap-4 mb-2">
      {hideBackButton ? (
        <div className="p-2 rounded-lg w-10 h-10" />
      ) : (
        <Button
          onClick={handleBack}
          disabled={!canGoBack}
          className={`p-2 rounded-lg transition-all duration-200 bg-white border border-gray-200 shadow-sm ${
            canGoBack
              ? 'text-gray-700 hover:bg-gray-100 hover:scale-105'
              : 'text-gray-400 cursor-not-allowed'
          }`}
          style={{ minWidth: 36 }}
          aria-label="Back"
        >
          <ArrowLeft size={24} />
        </Button>
      )}

      <div className="flex-1 bg-gray-200/50 rounded-full h-2 overflow-hidden backdrop-blur-sm">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
      </div>

      <span className="text-sm text-gray-500 min-w-[3rem]">
        {currentIndex + 1}/{total}
      </span>
    </div>
  );
};
