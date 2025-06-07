import { motion } from 'motion/react';
import { useQuizStore } from '@/store/quiz';
import { Check } from 'lucide-react';
import { Option } from '@/store/quiz';

interface MultipleChoiceProps {
  questionId: string;
  options: Option[];
  columns?: number; // Optional, default 1
}

export const MultipleChoice = ({
  questionId,
  options,
  columns = 1,
}: MultipleChoiceProps) => {
  const { setAnswer, getAnswer } = useQuizStore();
  const currentAnswer = getAnswer(questionId);
  const selectedValues = (currentAnswer?.value as string[]) || [];

  const handleToggle = (option: Option) => {
    const newValues = selectedValues.includes(option.value)
      ? selectedValues.filter((v) => v !== option.value)
      : [...selectedValues, option.value];
    setAnswer(questionId, newValues);
  };

  return (
    <div
      className="grid gap-4"
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
    >
      {options.map((option, index) => {
        const isSelected = selectedValues.includes(option.value);
        return (
          <motion.button
            key={option.value}
            onClick={() => handleToggle(option)}
            className={`w-full p-4 rounded-2xl text-left transition-all duration-200 ${
              isSelected
                ? 'bg-gradient-to-r from-blue-600/20 to-blue-500/20 border-2 border-blue-500 text-white'
                : 'bg-gray-800/40 border-2 border-gray-700/50 text-gray-300 hover:bg-gray-700/40 hover:border-gray-600'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">{option.label}</span>
              <div
                className={`grow-0 shrink-0 ml-2 basis-5 h-5 rounded-md border-2 transition-all duration-200 flex items-center justify-center ${
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
