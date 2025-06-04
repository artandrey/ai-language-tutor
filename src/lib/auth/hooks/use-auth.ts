'use client';

import { useState, useEffect, useCallback } from 'react';
import { User } from '@supabase/supabase-js';
import {
  createAnonymousSession,
  getCurrentUser,
  onAuthStateChange,
  signOut,
} from '@/lib/auth/client';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export const useAuth = () => {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  // Initialize anonymous session if no user exists
  const initializeAuth = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      const currentUser = await getCurrentUser();

      if (!currentUser) {
        // Create anonymous session if no user exists
        const newUser = await createAnonymousSession();
        setState((prev) => ({ ...prev, user: newUser, loading: false }));
      } else {
        setState((prev) => ({ ...prev, user: currentUser, loading: false }));
      }
    } catch (error) {
      console.error('Failed to initialize auth:', error);
      setState((prev) => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Authentication failed',
        loading: false,
      }));
    }
  }, []);

  // Handle sign out
  const handleSignOut = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      await signOut();
      setState((prev) => ({ ...prev, user: null, loading: false }));
    } catch (error) {
      console.error('Failed to sign out:', error);
      setState((prev) => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Sign out failed',
        loading: false,
      }));
    }
  }, []);

  // Handle manual anonymous session creation
  const createNewAnonymousSession = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      const newUser = await createAnonymousSession();
      setState((prev) => ({ ...prev, user: newUser, loading: false }));
      return newUser;
    } catch (error) {
      console.error('Failed to create anonymous session:', error);
      setState((prev) => ({
        ...prev,
        error:
          error instanceof Error ? error.message : 'Failed to create session',
        loading: false,
      }));
      throw error;
    }
  }, []);

  useEffect(() => {
    // Listen to auth changes
    const {
      data: { subscription },
    } = onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        setState((prev) => ({ ...prev, user: session.user, loading: false }));
      } else if (event === 'SIGNED_OUT') {
        setState((prev) => ({ ...prev, user: null, loading: false }));
      }
    });

    // Initialize auth on mount
    initializeAuth();

    return () => {
      subscription.unsubscribe();
    };
  }, [initializeAuth]);

  return {
    user: state.user,
    loading: state.loading,
    error: state.error,
    signOut: handleSignOut,
    createAnonymousSession: createNewAnonymousSession,
    isAuthenticated: !!state.user,
    isAnonymous: state.user?.is_anonymous || false,
  };
};
