import { Question } from '@/store/quiz';

export const sampleQuestions: Question[] = [
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
