import { motion } from 'motion/react';
import { useQuizStore } from '@/store/quiz';
import { Check } from 'lucide-react';

interface MultipleChoiceProps {
  questionId: string;
  options: string[];
}

export const MultipleChoice = ({
  questionId,
  options,
}: MultipleChoiceProps) => {
  const { setAnswer, getAnswer } = useQuizStore();
  const currentAnswer = getAnswer(questionId);
  const selectedValues = (currentAnswer?.value as string[]) || [];

  const handleToggle = (option: string) => {
    const newValues = selectedValues.includes(option)
      ? selectedValues.filter((v) => v !== option)
      : [...selectedValues, option];

    setAnswer(questionId, newValues);
  };

  return (
    <div className="space-y-4">
      {options.map((option, index) => {
        const isSelected = selectedValues.includes(option);

        return (
          <motion.button
            key={option}
            onClick={() => handleToggle(option)}
            className={`w-full p-4 rounded-2xl text-left transition-all duration-200 ${
              isSelected
                ? 'bg-gradient-to-r from-blue-600/20 to-blue-500/20 border-2 border-blue-500 text-white'
                : 'bg-gray-800/40 border-2 border-gray-700/50 text-gray-300 hover:bg-gray-700/40 hover:border-gray-600'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">{option}</span>
              <div
                className={`w-5 h-5 rounded-md border-2 transition-all duration-200 flex items-center justify-center ${
                  isSelected ? 'border-blue-500 bg-blue-500' : 'border-gray-500'
                }`}
              >
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Check
                      size={12}
                      className="text-white"
                    />
                  </motion.div>
                )}
              </div>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
};
