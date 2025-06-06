import { useQuizStore } from '@/store/quiz';
import { useSearchParams, useRouter } from 'next/navigation';

export function useQuiz() {
  const store = useQuizStore();
  const searchParams = useSearchParams();
  const router = useRouter();
  const q = Number(searchParams.get('q') || 1);
  const currentQuestionIndex = q - 1;
  const currentQuestion = store.questions[currentQuestionIndex];
  const canGoBack = currentQuestionIndex > 0;

  function goBack() {
    if (canGoBack) {
      router.replace(`/quiz?q=${currentQuestionIndex}`);
    }
  }

  return {
    ...store,
    currentQuestionIndex,
    currentQuestion,
    canGoBack,
    goBack,
  };
}
