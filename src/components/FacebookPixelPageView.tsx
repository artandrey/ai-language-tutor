'use client';
import { useEffect } from 'react';

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

const FacebookPixelPageView = () => {
  useEffect(() => {
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'PageView');
    }
  }, []);
  return null;
};

export default FacebookPixelPageView;
