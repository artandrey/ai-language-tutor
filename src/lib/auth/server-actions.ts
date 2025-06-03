import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export async function createAnonymousUser() {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase.auth.signInAnonymously();

    if (error) {
      console.error('Failed to create anonymous user:', error);
      throw error;
    }

    return data.user;
  } catch (error) {
    console.error('Error in createAnonymousUser:', error);
    throw error;
  }
}

export async function ensureUserExists() {
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
