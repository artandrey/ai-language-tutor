import { createClient } from '@/utils/supabase/server';
import type { User } from '@supabase/supabase-js';

export async function createAnonymousUser(): Promise<User> {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase.auth.signInAnonymously();

    if (error) {
      console.error('Failed to create anonymous user:', error);
      throw error;
    }

    if (!data.user) {
      throw new Error('No user returned from anonymous sign in');
    }

    return data.user;
  } catch (error) {
    console.error('Error in createAnonymousUser:', error);
    throw error;
  }
}

export async function ensureUserExists(): Promise<User> {
  const supabase = await createClient();

  try {
    // First, check if user already exists
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (user && !error) {
      return user;
    }

    // If no user, create anonymous user
    const newUser = await createAnonymousUser();
    return newUser;
  } catch (error) {
    console.error('Error ensuring user exists:', error);
    throw error;
  }
}
