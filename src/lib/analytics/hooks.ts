'use client';

import { usePostHog } from 'posthog-js/react';
import { AnalyticsEvents } from './events';

/**
 * Client-side PostHog Analytics Hook
 *
 * This hook provides a safe way to track analytics events that ensures:
 * - Events are only sent from client components
 * - Proper integration with PostHog React provider
 * - Type safety for all events
 * - Automatic null checks for PostHog instance
 *
 * Usage:
 * ```tsx
 * 'use client';
 *
 * import { useAnalytics } from '@/lib/analytics/hooks';
 * import { AnalyticsEvents } from '@/lib/analytics/events';
 *
 * function MyComponent() {
 *   const { trackEvent } = useAnalytics();
 *
 *   const handleClick = () => {
 *     trackEvent(AnalyticsEvents.BUTTON_CLICKED, { buttonName: 'submit' });
 *   };
 * }
 * ```
 *
 * IMPORTANT: This hook can only be used in client components marked with 'use client'
 */
export function useAnalytics() {
  const posthog = usePostHog();

  const trackEvent = (
    event: AnalyticsEvents,
    properties?: Record<string, any>
  ) => {
    if (posthog) {
      posthog.capture(event, properties);
    }
  };

  return { trackEvent };
}
