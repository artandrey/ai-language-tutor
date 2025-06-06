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
  const prompt = `Analyze the user's speech from the following transcript and identify significant grammar errors.

**Instructions:**
1.  **Focus only on the user's sentences.** Do not correct the agent's speech.
2.  **Identify clear grammatical mistakes** like verb tense, subject-verb agreement, and incorrect word usage.
3.  **Do NOT correct simple punctuation** or capitalization unless it fundamentally changes the meaning of a sentence.
4.  **Do NOT correct incomplete sentences or natural conversational pauses.** Ignore sentence fragments that are common in spoken language.
5.  For each error, provide the 'actual' text and the 'corrected' version. In the 'actual' text, wrap the specific incorrect word(s) with '<wrong>' tags. In the 'corrected' text, wrap the replacement word(s) with '<corrected>' tags. Also, provide a brief 'explanation'.

**Example of a correction object:**
{
  "corrections": [
    {
      "actual": "I <wrong>does</wrong> not known",
      "corrected": "I <corrected>did</corrected> not know",
      "explanation": "The verb 'does' should be 'did' in the past tense."
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
  const prompt = `Analyze the user's speech from the following transcript to identify vocabulary that could be enhanced.

**Instructions:**
1.  **Focus primarily on adjectives.** These are the safest words to replace with synonyms without losing the user's intended meaning.
2.  For each identified adjective, provide 2-3 synonyms that are contextually appropriate.
3.  Avoid replacing nouns or verbs, especially if they are technical terms or specific to the conversation's context (e.g., "testing," "programming").
4.  Provide the CEFR difficulty level (A1-C2) for the original word.

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
