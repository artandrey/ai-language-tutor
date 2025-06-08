/**
 * Analytics Events Configuration
 *
 * This file defines all PostHog analytics events for the application.
 *
 * IMPORTANT: CLIENT-SIDE ONLY TRACKING
 * ====================================
 * All PostHog events in this application are sent ONLY from the client side.
 * This ensures:
 * - No server-side event tracking
 * - Better performance (no server-side PostHog calls)
 * - Proper user privacy controls
 * - Consistent event attribution
 *
 * Usage Guidelines:
 * - Use the `useAnalytics()` hook in client components for event tracking
 * - The `trackEvent()` helper function includes client-side safety checks
 * - Never import `posthog-js` directly in components - use the hook instead
 * - All components that track events must be client components ('use client')
 */

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

  // New event
  EMAIL_ENTERED = 'user_entered_email',
}

/**
 * Type-safe analytics tracking helper that only works on the client side
 * This ensures no PostHog events are sent from the server
 *
 * @deprecated Use the `useAnalytics()` hook instead for better type safety and React integration
 */
export const trackEvent = (
  event: AnalyticsEvents,
  properties?: Record<string, any>
) => {
  // Only track events on the client side
  if (typeof window !== 'undefined') {
    // Dynamically import posthog only on client side
    import('posthog-js').then((posthog) => {
      posthog.default.capture(event, properties);
    });
  }
};
