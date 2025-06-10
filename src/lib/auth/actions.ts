'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

export async function createAnonymousSession() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInAnonymously();

  if (error) {
    console.error('Failed to create anonymous session:', error);
    redirect('/error');
  }

  // Redirect back to voice page with new session
  redirect('/quiz');
}

export async function signOut() {
  const supabase = await createClient();

  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Failed to sign out:', error);
      redirect('/error');
    }

    revalidatePath('/', 'layout');
    redirect('/');
  } catch (error) {
    console.error('Error in signOut:', error);
    redirect('/error');
  }
}

export async function ensureUserAndRedirectToVoiceAccept() {
  const supabase = await createClient();

  // Check if user exists
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user || error) {
    // If no user, create anonymous user
    const { error: signInError } = await supabase.auth.signInAnonymously();
    if (signInError) {
      console.error('Failed to create anonymous session:', signInError);
      redirect('/error');
    }
  }

  // Redirect to /voice/accept after ensuring user exists
  redirect('/voice/accept');
}
