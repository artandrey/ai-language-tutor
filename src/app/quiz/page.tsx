import { QuizContainer } from '@/components/molecules/quiz-container';
import { Loader } from '@/components/ui/loader';
import { Suspense } from 'react';

const Quiz = () => {
  return (
    <Suspense fallback={<Loader />}>
      <QuizContainer />
    </Suspense>
  );
};

export default Quiz;
