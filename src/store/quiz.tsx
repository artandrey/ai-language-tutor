import { create } from 'zustand';
import { sampleQuestions } from '@/config/quiz';
export type QuestionType = 'single' | 'multiple' | 'filler';

export interface Option {
  label: string;
  value: string;
  description?: string;
  metadata?: Record<string, string | number | boolean>;
}

export interface Question {
  id: string;
  type: QuestionType;
  title: string;
  options?: Option[];
  required?: boolean;
  redirect?: string;
  columns?: number;
  filler?: React.ReactNode;
  hideContinueButton?: boolean;
  hideBackButton?: boolean;
}

export interface QuizAnswer {
  questionId: string;
  value: string | string[];
}

interface QuizState {
  questions: Question[];
  answers: QuizAnswer[];
  setQuestions: (questions: Question[]) => void;
  setAnswer: (questionId: string, value: string | string[]) => void;
  getAnswer: (questionId: string) => QuizAnswer | undefined;
  resetQuiz: () => void;
  canProceed: (questionId: string) => boolean;
  isCompleted: boolean;
}

const STORAGE_KEY = 'quiz-answers';

function loadFromStorage(): QuizAnswer[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored) as QuizAnswer[];
  } catch {
    return [];
  }
}

export const useQuizStore = create<QuizState>((set, get) => ({
  questions: sampleQuestions,
  answers: loadFromStorage(),

  setQuestions: (questions) => {
    set({ questions, answers: [] });
    localStorage.removeItem(STORAGE_KEY);
  },

  setAnswer: (questionId, value) => {
    const { answers } = get();
    const existingAnswerIndex = answers.findIndex(
      (a) => a.questionId === questionId
    );
    let newAnswers;
    if (existingAnswerIndex >= 0) {
      newAnswers = [...answers];
      newAnswers[existingAnswerIndex] = { questionId, value };
    } else {
      newAnswers = [...answers, { questionId, value }];
    }
    set({ answers: newAnswers });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newAnswers));
  },

  getAnswer: (questionId) => {
    const { answers } = get();
    return answers.find((a) => a.questionId === questionId);
  },

  resetQuiz: () => {
    set({ answers: [] });
    localStorage.removeItem(STORAGE_KEY);
  },

  canProceed: (questionId) => {
    const { questions, answers } = get();
    const question = questions.find((q) => q.id === questionId);
    if (!question?.required) return true;
    const answer = answers.find((a) => a.questionId === questionId);
    if (!answer) return false;
    if (Array.isArray(answer.value)) {
      return answer.value.length > 0;
    }
    return answer.value.trim().length > 0;
  },

  get isCompleted() {
    const { questions, answers } = get();
    return questions.every(
      (q) => !q.required || answers.some((a) => a.questionId === q.id)
    );
  },
}));
