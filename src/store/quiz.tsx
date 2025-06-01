import { create } from 'zustand';

export type QuestionType = 'single' | 'multiple' | 'filler';
const sampleQuestions: Question[] = [
  {
    id: '1',
    type: 'single',
    title: 'What part of your English do you want to improve the most?',
    options: [
      'Speaking with confidence',
      'Improving pronunciation',
      'Expanding vocabulary',
      'Using grammar correctly',
      'Understanding native speakers',
      'Writing more fluently',
    ],
    required: true,
  },
  {
    id: '2',
    type: 'single',
    title: 'How often do you speak English in your daily life?',
    options: ['Every day', 'A few per month', 'A few per week', 'None'],
    required: true,
  },
  {
    id: '3',
    type: 'multiple',
    title:
      'What methods have you used to learn English? (Select all that apply)',
    options: [
      'Language exchange apps',
      'Online courses',
      'Private tutoring',
      'Group classes',
      'Self-study with books',
      'Watching movies/TV shows',
      'Listening to podcasts',
    ],
    required: true,
  },
  {
    id: '4',
    type: 'filler',
    title: 'What specific challenges do you face when speaking English?',
    required: true,
  },
];
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
