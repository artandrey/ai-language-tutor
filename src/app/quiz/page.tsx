import { QuizContainer } from '@/components/molecules/quiz-container';
import { Suspense } from 'react';

const Quiz = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QuizContainer />
    </Suspense>
  );
};

export default Quiz;
