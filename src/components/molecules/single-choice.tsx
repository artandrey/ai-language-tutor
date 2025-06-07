import { motion } from 'motion/react';
import { useQuizStore } from '@/store/quiz';
import { Option } from '@/store/quiz';

interface SingleChoiceProps {
  questionId: string;
  options: Option[];
}

export const SingleChoice = ({ questionId, options }: SingleChoiceProps) => {
  const { setAnswer, getAnswer } = useQuizStore();
  const currentAnswer = getAnswer(questionId);
  const selectedValue = (currentAnswer?.value as string) || '';

  const handleSelect = (option: Option) => {
    setAnswer(questionId, option.value);
  };

  return (
    <div className="space-y-4">
      {options.map((option, index) => {
        const isSelected = selectedValue === option.value;
        return (
          <motion.button
            key={option.value}
            onClick={() => handleSelect(option)}
            className={`w-full p-4 rounded-2xl text-left transition-all duration-200 ${
              isSelected
                ? 'bg-gradient-to-r from-blue-600/20 to-blue-500/20 border-2 border-blue-500 text-white'
                : 'bg-gray-800/40 border-2 border-gray-700/50 text-gray-300 hover:bg-gray-700/40 hover:border-gray-600'
            }`}
            initial={{ opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: index * 0.1,
              duration: 0.4,
              ease: 'circInOut',
            }}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">{option.label}</span>
              <div
                className={`grow-0 shrink-0 ml-2 basis-5 h-5 rounded-full border-2 transition-all duration-200 ${
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
