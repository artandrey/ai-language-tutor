import posthog from 'posthog-js';

export enum AnalyticsEvents {
  // Quiz events
  QUIZ_STARTED = 'quiz_started',
  USER_STARTED_TEST = 'user_started_test',
  USER_PASSED_LANGUAGE_TEST = 'user_passed_language_test',

  // Conversation events
  USER_STARTED_CONVERSATION = 'user_started_conversation',
  USER_ENDED_CONVERSATION_BY_TIMEOUT = 'user_ended_conversation_by_timeout',
  USER_ENDED_CONVERSATION_BY_THEMSELF = 'user_ended_conversation_by_themself',

  // Payment events
  USER_OPENED_PAYMENT_PAGE = 'user_opened_payment_page',
  USER_INITIALIZED_PAYMENT = 'user_initialized_payment',

  // View events
  USER_VIEWED_VOICE_SUMMARY = 'user_viewed_voice_summary',

  // System events
  PAGEVIEW = '$pageview',
}

/**
 * Type-safe analytics tracking helper
 */
export const trackEvent = (
  event: AnalyticsEvents,
  properties?: Record<string, any>
) => {
  posthog.capture(event, properties);
};
