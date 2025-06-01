import { motion } from 'motion/react';
import { useQuizStore } from '@/store/quiz';

interface SingleChoiceProps {
  questionId: string;
  options: string[];
}

export const SingleChoice = ({ questionId, options }: SingleChoiceProps) => {
  const { setAnswer, getAnswer } = useQuizStore();
  const currentAnswer = getAnswer(questionId);
  const selectedValue = (currentAnswer?.value as string) || '';

  const handleSelect = (option: string) => {
    setAnswer(questionId, option);
  };

  return (
    <div className="space-y-4">
      {options.map((option, index) => {
        const isSelected = selectedValue === option;

        return (
          <motion.button
            key={option}
            onClick={() => handleSelect(option)}
            className={`w-full p-4 rounded-2xl text-left transition-all duration-200 ${
              isSelected
                ? 'bg-gradient-to-r from-blue-600/20 to-blue-500/20 border-2 border-blue-500 text-white'
                : 'bg-gray-800/40 border-2 border-gray-700/50 text-gray-300 hover:bg-gray-700/40 hover:border-gray-600'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">{option}</span>
              <div
                className={`w-5 h-5 rounded-full border-2 transition-all duration-200 ${
                  isSelected ? 'border-blue-500 bg-blue-500' : 'border-gray-500'
                }`}
              >
                {isSelected && (
                  <motion.div
                    className="w-full h-full rounded-full bg-white scale-50"
                    initial={{ scale: 0 }}
                    animate={{ scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </div>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
};
