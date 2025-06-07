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
  const prompt = `You are an expert English language tutor analyzing a transcript of a student's spoken English. This transcript is from an automatic speech-to-text engine and may contain phonetic spellings (e.g., "b to b" for "B2B"), transcription errors, and missing punctuation. Your goal is to identify and correct grammatical errors while being mindful of the spoken nature of the text.

**Analysis Guidelines:**
1.  **It's a Transcript, Not Writing:** Assume that phonetic spellings like "b to b," "for you," or "see see" are transcription variants of "B2B," "4U," or "CC." Use the conversation context to interpret these correctly. Your goal is to fix grammar, not transcription style. If "b to b" is used where "B2B" is grammatically correct, fix the surrounding grammar (e.g., add an article) but treat the core phrase as correct.
2.  **Focus on Core Grammar Errors:** Prioritize corrections for:
    *   **Articles (a, an, the):** Insert missing articles or correct wrong ones.
    *   **Verb Tenses & Agreement:** Fix incorrect verb forms (e.g., "he go" -> "he goes").
    *   **Prepositions:** Correct wrong prepositions (e.g., "arrive to the city" -> "arrive in the city").
    *   **Word Choice:** Correct words that are grammatically incorrect in the context (e.g., "I'm doing history" -> "I'm studying history").
3.  **Be Conservative:** Do NOT correct:
    *   Natural conversational fillers ("umm", "like", "you know").
    *   Sentence fragments or incomplete thoughts that are common in speech.
    *   Punctuation or capitalization, unless it critically changes the sentence's meaning.
4.  **Output Format:**
    *   Provide a list of corrections.
    *   For each correction, give the 'actual' sentence fragment with the error.
    *   Wrap the specific incorrect word(s) within the 'actual' text with \`<wrong>\` tags. Be as specific as possible.
    *   Provide the 'corrected' version with the fixed word(s) wrapped in \`<corrected>\` tags.
    *   Provide a concise 'explanation'.

**Good Example (Handling ASR and Grammar):**
*User's transcript says:* "I work for b to b company that sells software."
*Full conversation reveals they work in tech.*

*Your Output:*
\`\`\`json
{
  "corrections": [
    {
      "actual": "I work for <wrong>b to b</wrong> company",
      "corrected": "I work for <corrected>a B2B</corrected> company",
      "explanation": "The article 'a' is needed before 'B2B company'. 'B2B' is the standard written form for 'b to b' in a business context."
    }
  ]
}
\`\`\`

**Another Good Example (Word Choice):**
*User's transcript says:* "I am doing politics at university."

*Your Output:*
\`\`\`json
{
  "corrections": [
    {
      "actual": "I am <wrong>doing</wrong> politics",
      "corrected": "I am <corrected>studying</corrected> politics",
      "explanation": "When referring to an academic subject at a university, the verb 'studying' is more appropriate than 'doing'."
    }
  ]
}
\`\`\`

If no significant errors are found, return an empty \`corrections\` array.

**Full Conversation Context:**
---
${fullConversation}
---

**User's Speech to Analyze:**
---
${userTranscript}
---`;

  const result = await generateObject({
    model: openai('gpt-4.1'),
    schema: GrammarCorrectionSchema,
    system:
      'You are an expert English tutor specializing in grammar correction of transcribed speech.',
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
    model: openai('gpt-4.1'),
    schema: VocabularyEnhancementSchema,
    system:
      'You are an expert English tutor specializing in vocabulary enhancement and CEFR level assessment.',
    prompt,
  });

  return result.object;
}
