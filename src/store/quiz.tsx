import { create } from 'zustand';
import { sampleQuestions } from '@/config/quiz';
export type QuestionType = 'single' | 'multiple' | 'filler';

export interface Question {
  id: string;
  type: QuestionType;
  title: string;
  options?: string[];
  required?: boolean;
}

export interface QuizAnswer {
  questionId: string;
  value: string | string[];
}

interface QuizState {
  questions: Question[];
  currentQuestionIndex: number;
  answers: QuizAnswer[];
  isCompleted: boolean;

  // Actions
  setQuestions: (questions: Question[]) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  setAnswer: (questionId: string, value: string | string[]) => void;
  getAnswer: (questionId: string) => QuizAnswer | undefined;
  resetQuiz: () => void;
  canProceed: () => boolean;
}

export const useQuizStore = create<QuizState>((set, get) => ({
  questions: sampleQuestions,
  currentQuestionIndex: 0,
  answers: [],
  isCompleted: false,

  setQuestions: (questions) =>
    set({
      questions,
      currentQuestionIndex: 0,
      answers: [],
      isCompleted: false,
    }),

  nextQuestion: () => {
    const { currentQuestionIndex, questions } = get();
    if (currentQuestionIndex < questions.length - 1) {
      set({ currentQuestionIndex: currentQuestionIndex + 1 });
    } else {
      set({ isCompleted: true });
    }
  },

  previousQuestion: () => {
    const { currentQuestionIndex } = get();
    if (currentQuestionIndex > 0) {
      set({ currentQuestionIndex: currentQuestionIndex - 1 });
    }
  },

  setAnswer: (questionId, value) => {
    const { answers } = get();
    const existingAnswerIndex = answers.findIndex(
      (a) => a.questionId === questionId
    );

    if (existingAnswerIndex >= 0) {
      const newAnswers = [...answers];
      newAnswers[existingAnswerIndex] = { questionId, value };
      set({ answers: newAnswers });
    } else {
      set({ answers: [...answers, { questionId, value }] });
    }
  },

  getAnswer: (questionId) => {
    const { answers } = get();
    return answers.find((a) => a.questionId === questionId);
  },

  resetQuiz: () =>
    set({
      currentQuestionIndex: 0,
      answers: [],
      isCompleted: false,
    }),

  canProceed: () => {
    const { questions, currentQuestionIndex, answers } = get();
    const currentQuestion = questions[currentQuestionIndex];

    if (!currentQuestion?.required) return true;

    const answer = answers.find((a) => a.questionId === currentQuestion.id);
    if (!answer) return false;

    if (Array.isArray(answer.value)) {
      return answer.value.length > 0;
    }

    return answer.value.trim().length > 0;
  },
}));
