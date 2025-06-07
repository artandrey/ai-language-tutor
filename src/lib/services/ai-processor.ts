import { z } from 'zod';
import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';

const GrammarCorrectionSchema = z.object({
  corrections: z.array(
    z.object({
      actual: z.string(),
      corrected: z.string(),
      explanation: z.string().optional(),
    })
  ),
});

const VocabularyEnhancementSchema = z.object({
  vocabulary: z.array(
    z.object({
      actual: z.string(),
      synonyms: z.array(z.string()),
      difficulty: z.enum(['A1', 'A2', 'B1', 'B2', 'C1', 'C2']),
    })
  ),
});

export async function processGrammar(
  userTranscript: string,
  fullConversation: string
) {
  const prompt = `Analyze the user's speech from the following transcript and identify significant grammar errors. Pay close attention to the full conversation for context.

**Instructions:**
1.  **Focus only on the user's sentences.** Do not correct the agent's speech.
2.  **Identify clear grammatical mistakes**, such as incorrect verb tenses, subject-verb agreement, or wrong prepositions.
3.  **Crucially, identify words that are used incorrectly in the given context.** For example, using the verb "doing" when "studying" is appropriate for a field of study.
4.  **Do NOT correct simple punctuation** or capitalization unless it fundamentally changes the meaning of a sentence.
5.  **Do NOT correct incomplete sentences or natural conversational pauses.** Ignore sentence fragments that are common in spoken language.
6.  For each error, provide the 'actual' text and the 'corrected' version. In the 'actual' text, wrap the specific incorrect word(s) with '<wrong>' tags. In the 'corrected' text, wrap the replacement word(s) with '<corrected>' tags. Also, provide a brief 'explanation'.

**Example of a correction object:**
{
  "corrections": [
    {
      "actual": "I <wrong>does</wrong> not known",
      "corrected": "I <corrected>did</corrected> not know",
      "explanation": "The verb 'does' should be 'did' in the past tense."
    },
    {
      "actual": "I'm <wrong>doing</wrong> engineering.",
      "corrected": "I'm <corrected>studying</corrected> engineering.",
      "explanation": "The verb 'doing' is incorrect in this context. 'Studying' is the appropriate verb to use when referring to pursuing a field of study."
    }
  ]
}

If no significant grammar errors are found, return an empty corrections array.

**Full Conversation Context:**
---
${fullConversation}
---

**User's Speech to Analyze:**
---
${userTranscript}
---`;

  const result = await generateObject({
    model: openai('gpt-4o'),
    schema: GrammarCorrectionSchema,
    system:
      'You are an expert English tutor specializing in grammar correction and language assessment.',
    prompt,
  });

  return result.object;
}

export async function processVocabulary(
  userTranscript: string,
  fullConversation: string
) {
  const prompt = `Analyze the user's speech from the following transcript to identify simple, common vocabulary that could be enhanced with more advanced synonyms.

**Instructions:**
1.  **Target ONLY simple, common adjectives and adverbs.** Look for overused or basic words like "good," "bad," "happy," "sad," "hard," "easy," "nice," "really," "very."
2.  **DO NOT analyze or suggest synonyms for:**
    *   Conversational fillers (e.g., "Hi," "Yeah," "Okay," "Hmm").
    *   Proper nouns (e.g., names of people, places).
    *   Verbs, unless they are part of a very common and simple phrasal verb.
    *   Nouns, especially technical terms or specific concepts (e.g., "engineering," "software").
    *   Pronouns, articles, or conjunctions (e.g., "my," "a," "and").
3.  For each identified word, provide 2-3 contextually appropriate synonyms.
4.  Provide the CEFR difficulty level (A1-C2) for the original word.
5.  **If no suitable words for enhancement are found, return an empty 'vocabulary' array.** Do not force suggestions for words that are already appropriate or natural-sounding in context.

**Example of a good suggestion:**
User says: "The project was very hard."
Output:
{
  "vocabulary": [
    {
      "actual": "hard",
      "synonyms": ["challenging", "demanding", "arduous"],
      "difficulty": "A1"
    }
  ]
}

**Example of what to AVOID:**
User says: "Hi, my name is Andre."
AVOID THIS OUTPUT:
{
  "vocabulary": [
    { "actual": "Hi", "synonyms": ["Hello", "Hey"], "difficulty": "A1" },
    { "actual": "My", "synonyms": ["Mine"], "difficulty": "A1" }
  ]
}

**Full Conversation Context:**
---
${fullConversation}
---

**User's Speech to Analyze:**
---
${userTranscript}
---`;

  const result = await generateObject({
    model: openai('gpt-4o'),
    schema: VocabularyEnhancementSchema,
    system:
      'You are an expert English tutor specializing in vocabulary enhancement and CEFR level assessment.',
    prompt,
  });

  return result.object;
}
