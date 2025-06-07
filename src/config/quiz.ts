import { Question } from '@/store/quiz';

export const sampleQuestions: Question[] = [
  {
    id: '1',
    type: 'multiple',
    title: 'What do you want to improve the most in your English?',
    options: [
      { label: 'Speaking with confidence', value: 'Speaking with confidence' },
      {
        label: 'Pronunciation and clarity',
        value: 'Pronunciation and clarity',
      },
      { label: 'Expanding my vocabulary', value: 'Expanding my vocabulary' },
      { label: 'Using correct grammar', value: 'Using correct grammar' },
      {
        label: 'Understanding native speakers',
        value: 'Understanding native speakers',
      },
      { label: 'Writing fluently', value: 'Writing fluently' },
    ],
    required: true,
  },
  {
    id: '2',
    type: 'single',
    title: 'How often do you speak English in your daily life?',
    options: [
      { label: 'Every day', value: 'Every day' },
      { label: 'A few per week', value: 'A few per week' },
      { label: 'A few per month', value: 'A few per month' },
      { label: 'None', value: 'None' },
    ],
    required: true,
  },
  {
    id: '3',
    type: 'single',
    title: 'What is your main goal in learning English?',
    options: [
      { label: 'Advance my career', value: 'Advance my career' },
      { label: 'Support my education', value: 'Support my education' },
      { label: 'Study Abroad', value: 'Study Abroad' },
      { label: 'Living Abroad', value: 'Living Abroad' },
      { label: 'Travel Easily', value: 'Travel Easily' },
      { label: 'Personal Development', value: 'Personal Development' },
      { label: 'Connect with people', value: 'Connect with people' },
    ],
    required: true,
  },
  {
    id: '4',
    type: 'multiple',
    title: 'How did you try to learn?',
    options: [
      { label: 'Mobile app', value: 'Mobile app' },
      { label: 'Online teacher', value: 'Online teacher' },
      { label: 'School', value: 'School' },
      { label: 'Language courses', value: 'Language courses' },
      { label: 'Self education', value: 'Self education' },
      { label: 'Abroad', value: 'Abroad' },
    ],
    required: true,
  },
  {
    id: '5',
    type: 'single',
    title: 'How would you describe your previous English learning experiences?',
    options: [
      {
        label:
          "It was too expensive, and I didn't want to spend that much money",
        value:
          "It was too expensive, and I didn't want to spend that much money",
      },
      {
        label: "I struggled to dedicate time and couldn't continue",
        value: "I struggled to dedicate time and couldn't continue",
      },
      {
        label: "I didn't want to practice speaking in front of others",
        value: "I didn't want to practice speaking in front of others",
      },
      {
        label: "There wasn't a personalized program for me",
        value: "There wasn't a personalized program for me",
      },
      {
        label: "My schedule didn't match with my teacher's",
        value: "My schedule didn't match with my teacher's",
      },
      {
        label: 'I made progress, but I want to improve further',
        value: 'I made progress, but I want to improve further',
      },
    ],
    required: true,
  },
  {
    id: '6',
    type: 'multiple',
    title: 'What usually stops you from speaking English?',
    options: [
      { label: 'I freeze or panic', value: 'I freeze or panic' },
      {
        label: "I can't find the right words",
        value: "I can't find the right words",
      },
      { label: "My accent isn't clear", value: "My accent isn't clear" },
      { label: 'Grammar mistakes', value: 'Grammar mistakes' },
      { label: "I can't reply quickly", value: "I can't reply quickly" },
      { label: 'None of the above', value: 'None of the above' },
    ],
    required: true,
  },
  {
    id: '7',
    type: 'multiple',
    title: 'How do you use English in your daily life?',
    options: [
      {
        label: 'Using English at work or school',
        value: 'Using English at work or school',
      },
      {
        label: 'Reading English news or books',
        value: 'Reading English news or books',
      },
      {
        label: 'Watching shows or YouTube',
        value: 'Watching shows or YouTube',
      },
      {
        label: 'Listening to English music or podcasts',
        value: 'Listening to English music or podcasts',
      },
      {
        label: 'Chatting with English speakers',
        value: 'Chatting with English speakers',
      },
      { label: 'I rarely use English', value: 'I rarely use English' },
    ],
    required: true,
  },
  {
    id: '8',
    type: 'single',
    title: 'What field do you work in?',
    options: [
      { label: 'Tech / Engineering', value: 'Tech / Engineering' },
      { label: 'Business / Finance', value: 'Business / Finance' },
      { label: 'Student / Education', value: 'Student / Education' },
      { label: 'Creative / Media', value: 'Creative / Media' },
      { label: 'Skilled jobs / Services', value: 'Skilled jobs / Services' },
      { label: 'Marketing / Sales', value: 'Marketing / Sales' },
      { label: 'Healthcare / Science', value: 'Healthcare / Science' },
      { label: 'Currently not working', value: 'Currently not working' },
      { label: 'Other', value: 'Other' },
    ],
    required: true,
  },
  {
    id: '9',
    type: 'single',
    title: 'How old are you?',
    options: [
      { label: 'Under 18', value: 'Under 18' },
      { label: '18–24', value: '18–24' },
      { label: '25–34', value: '25–34' },
      { label: '35–44', value: '35–44' },
      { label: '45–54', value: '45–54' },
      { label: '55–64', value: '55–64' },
      { label: '65+', value: '65+' },
      { label: 'Prefer not to say', value: 'Prefer not to say' },
    ],
    required: true,
  },
  {
    id: '10',
    type: 'single',
    title: 'Select your gender.',
    options: [
      { label: 'Male', value: 'Male' },
      { label: 'Female', value: 'Female' },
      { label: 'Prefer not to say', value: 'Prefer not to say' },
    ],
    required: true,
  },
  {
    id: '11',
    type: 'multiple',
    title: 'How are you currently learning English?',
    options: [
      {
        label: 'Language courses or tutors',
        value: 'Language courses or tutors',
      },
      { label: 'Learning apps', value: 'Learning apps' },
      { label: 'Videos or movies', value: 'Videos or movies' },
      { label: 'Podcasts or audiobooks', value: 'Podcasts or audiobooks' },
      { label: 'Speaking with others', value: 'Speaking with others' },
      { label: 'Not learning right now', value: 'Not learning right now' },
    ],
    required: true,
  },
  {
    id: '12',
    type: 'multiple',
    title: 'What are the biggest challenges for you in learning English?',
    options: [
      { label: "It's hard to find time", value: "It's hard to find time" },
      {
        label: "It's hard to stay motivated",
        value: "It's hard to stay motivated",
      },
      {
        label: 'I feel nervous when speaking',
        value: 'I feel nervous when speaking',
      },
      {
        label: 'Lack of opportunities to speak',
        value: 'Lack of opportunities to speak',
      },
      { label: 'I forget what I learn', value: 'I forget what I learn' },
      { label: 'English feels too hard', value: 'English feels too hard' },
      {
        label: "No challenges, I'm doing great!",
        value: "No challenges, I'm doing great!",
      },
    ],
    required: true,
  },
  {
    id: '13',
    type: 'single',
    title: 'What is your current English level?',
    options: [
      {
        label: 'Beginner (I can buy things & order food)',
        value: 'Beginner (I can buy things & order food)',
      },
      {
        label: 'Intermediate (I can have simple conversations)',
        value: 'Intermediate (I can have simple conversations)',
      },
      {
        label:
          'Upper-Intermediate (I can explain ideas and join discussions on various topics)',
        value:
          'Upper-Intermediate (I can explain ideas and join discussions on various topics)',
      },
      {
        label: 'Advanced (I speak confidently at work and socially)',
        value: 'Advanced (I speak confidently at work and socially)',
      },
    ],
    required: true,
  },
  {
    id: '14',
    type: 'multiple',
    title:
      'What are your hobbies and interests? This helps Al pick the topics you like for your lessons. Select 3-5 options.',
    options: [
      { label: 'Science', value: 'Science' },
      { label: 'Literature', value: 'Literature' },
      { label: 'Politics', value: 'Politics' },
      { label: 'Psychology', value: 'Psychology' },
      { label: 'Philosophy', value: 'Philosophy' },
      { label: 'Business', value: 'Business' },
      { label: 'News', value: 'News' },
      { label: 'Finance', value: 'Finance' },
      { label: 'Marketing', value: 'Marketing' },
      { label: 'Pop Culture', value: 'Pop Culture' },
      { label: 'Cooking', value: 'Cooking' },
      { label: 'Pets', value: 'Pets' },
      { label: 'Food', value: 'Food' },
      { label: 'Travel', value: 'Travel' },
      { label: 'Shopping', value: 'Shopping' },
      { label: 'Movies', value: 'Movies' },
      { label: 'Technology', value: 'Technology' },
      { label: 'Music', value: 'Music' },
      { label: 'Health & Fitness', value: 'Health & Fitness' },
      { label: 'Fashion', value: 'Fashion' },
      { label: 'Culture', value: 'Culture' },
      { label: 'Career', value: 'Career' },
      { label: 'History', value: 'History' },
      { label: 'Social Media', value: 'Social Media' },
      { label: 'Art & Creativity', value: 'Art & Creativity' },
    ],
    required: true,
    redirect: '/voice',
  },
  // --- Vocabulary Self-Assessment ---
  {
    id: '15',
    type: 'multiple',
    title: 'Select all words you know',
    options: [
      // A1
      { label: 'book', value: 'book', metadata: { level: 'A1' } },
      { label: 'family', value: 'family', metadata: { level: 'A1' } },
      { label: 'happy', value: 'happy', metadata: { level: 'A1' } },
      // A2
      { label: 'animal', value: 'animal', metadata: { level: 'A2' } },
      { label: 'color', value: 'color', metadata: { level: 'A2' } },
      { label: 'different', value: 'different', metadata: { level: 'A2' } },
      // B1
      { label: 'improve', value: 'improve', metadata: { level: 'B1' } },
      { label: 'opportunity', value: 'opportunity', metadata: { level: 'B1' } },
      { label: 'decision', value: 'decision', metadata: { level: 'B1' } },
      // B2
      { label: 'achievement', value: 'achievement', metadata: { level: 'B2' } },
      { label: 'perspective', value: 'perspective', metadata: { level: 'B2' } },
      { label: 'facilitate', value: 'facilitate', metadata: { level: 'B2' } },
      // C1/C2
      { label: 'ubiquitous', value: 'ubiquitous', metadata: { level: 'C1' } },
      { label: 'ameliorate', value: 'ameliorate', metadata: { level: 'C1' } },
      {
        label: 'juxtaposition',
        value: 'juxtaposition',
        metadata: { level: 'C1' },
      },
      { label: 'paradigm', value: 'paradigm', metadata: { level: 'C2' } },
    ],
    required: true,
  },
  {
    id: '16',
    type: 'multiple',
    title: 'Select all words you know',
    options: [
      // A1
      { label: 'school', value: 'school', metadata: { level: 'A1' } },
      { label: 'water', value: 'water', metadata: { level: 'A1' } },
      { label: 'friend', value: 'friend', metadata: { level: 'A1' } },
      // A2
      { label: 'music', value: 'music', metadata: { level: 'A2' } },
      { label: 'city', value: 'city', metadata: { level: 'A2' } },
      { label: 'mother', value: 'mother', metadata: { level: 'A2' } },
      // B1
      { label: 'recognize', value: 'recognize', metadata: { level: 'B1' } },
      { label: 'solution', value: 'solution', metadata: { level: 'B1' } },
      { label: 'modify', value: 'modify', metadata: { level: 'B1' } },
      // B2
      { label: 'acquisition', value: 'acquisition', metadata: { level: 'B2' } },
      { label: 'sovereignty', value: 'sovereignty', metadata: { level: 'B2' } },
      {
        label: 'conscientious',
        value: 'conscientious',
        metadata: { level: 'B2' },
      },
      // C1/C2
      { label: 'ephemeral', value: 'ephemeral', metadata: { level: 'C1' } },
      {
        label: 'quintessential',
        value: 'quintessential',
        metadata: { level: 'C1' },
      },
      { label: 'conundrum', value: 'conundrum', metadata: { level: 'C2' } },
      { label: 'dichotomy', value: 'dichotomy', metadata: { level: 'C2' } },
    ],
    required: true,
  },
  {
    id: '17',
    type: 'multiple',
    title: 'Select all words you know',
    options: [
      // A1
      { label: 'food', value: 'food', metadata: { level: 'A1' } },
      { label: 'house', value: 'house', metadata: { level: 'A1' } },
      { label: 'day', value: 'day', metadata: { level: 'A1' } },
      // A2
      { label: 'car', value: 'car', metadata: { level: 'A2' } },
      { label: 'night', value: 'night', metadata: { level: 'A2' } },
      { label: 'work', value: 'work', metadata: { level: 'A2' } },
      // B1
      { label: 'many', value: 'many', metadata: { level: 'B1' } },
      { label: 'achievement', value: 'achievement', metadata: { level: 'B1' } },
      { label: 'decision', value: 'decision', metadata: { level: 'B1' } },
      // B2
      { label: 'paradigm', value: 'paradigm', metadata: { level: 'B2' } },
      { label: 'perspective', value: 'perspective', metadata: { level: 'B2' } },
      { label: 'facilitate', value: 'facilitate', metadata: { level: 'B2' } },
      // C1/C2
      {
        label: 'idiosyncratic',
        value: 'idiosyncratic',
        metadata: { level: 'C1' },
      },
      { label: 'magnanimous', value: 'magnanimous', metadata: { level: 'C1' } },
      { label: 'obfuscate', value: 'obfuscate', metadata: { level: 'C2' } },
      { label: 'perfunctory', value: 'perfunctory', metadata: { level: 'C2' } },
    ],
    required: true,
  },
];
