import {
  pgTable,
  uuid,
  text,
  jsonb,
  timestamp,
  boolean,
  unique,
  integer,
} from 'drizzle-orm/pg-core';

// Voice calls table with integrated session tracking
export const calls = pgTable(
  'calls',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').notNull(), // References existing users table

    // Call content
    transcript: text('transcript'),
    corrections: jsonb('corrections').$type<{
      corrections: Array<{
        actual: string;
        corrected: string;
        explanation?: string;
      }>;
    }>(),
    vocabulary: jsonb('vocabulary').$type<{
      vocabulary: Array<{
        actual: string;
        synonyms: string[];
        difficulty: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
      }>;
    }>(),
    joinUrl: text('join_url'),

    // Call metadata
    duration: text('duration'), // Duration in seconds
    status: text('status', {
      enum: ['pending', 'processing', 'completed', 'failed'],
    }).default('pending'),

    // Session tracking (integrated from call_sessions)
    agentId: text('agent_id'), // Ultravox agent ID
    ultravoxSessionId: text('ultravox_session_id').unique(),
    isActive: boolean('is_active').default(true),
    isPostProcessingCompleted: boolean('is_post_processing_completed').default(
      false
    ),

    // New: User's total speech duration in seconds
    usersSpeechDuration: integer('users_speech_duration'),

    // Timestamps
    callStartedAt: timestamp('call_started_at'),
    callEndedAt: timestamp('call_ended_at'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
  },
  (t) => [unique().on(t.userId)]
);

export const userEmails = pgTable('user_emails', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull(),
  email: text('email').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Type exports for TypeScript
export type Call = typeof calls.$inferSelect;
export type NewCall = typeof calls.$inferInsert;
