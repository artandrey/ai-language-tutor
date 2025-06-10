'use client';
import { useEffect } from 'react';

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

export const FacebookPixelPageView = () => {
  useEffect(() => {
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'PageView');
    }
  }, []);
  return null;
};

export const FacebookPixelPaymentPageOpened = () => {
  useEffect(() => {
    if (typeof window.fbq === 'function') {
      window.fbq('trackCustom', 'PaymentPageOpened');
    }
  }, []);
  return null;
};
