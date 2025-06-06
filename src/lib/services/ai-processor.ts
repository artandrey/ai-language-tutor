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

export async function processGrammar(transcript: string) {
  const prompt = `Analyze the following transcript and identify grammar errors that need correction. For each error, provide:
1. The actual text with the error
2. The corrected version
3. A brief explanation of the error (optional but helpful)

Focus on clear grammar mistakes like verb tense errors, subject-verb agreement, article usage, preposition errors, etc. Don't correct minor stylistic choices or regional variations.

If no grammar errors are found, return an empty corrections array.

Transcript:
${transcript}`;

  const result = await generateObject({
    model: openai('gpt-4o'),
    schema: GrammarCorrectionSchema,
    system:
      'You are an expert English tutor specializing in grammar correction and language assessment.',
    prompt,
  });

  return result.object;
}

export async function processVocabulary(transcript: string) {
  const prompt = `Analyze the following transcript and identify vocabulary words that could be enhanced with synonyms. For each word, provide:
1. The actual word used in the transcript
2. 2-3 synonyms that would be appropriate alternatives
3. The CEFR difficulty level (A1, A2, B1, B2, C1, C2) of the original word

Focus on meaningful words (nouns, verbs, adjectives, adverbs) that have good synonym alternatives. Avoid function words like articles, prepositions, etc.

Transcript:
${transcript}`;

  const result = await generateObject({
    model: openai('gpt-4o'),
    schema: VocabularyEnhancementSchema,
    system:
      'You are an expert English tutor specializing in vocabulary enhancement and CEFR level assessment.',
    prompt,
  });

  return result.object;
}
