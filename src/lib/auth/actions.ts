'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

export async function createAnonymousSession() {
  const supabase = await createClient();

  try {
    const { error } = await supabase.auth.signInAnonymously();

    if (error) {
      console.error('Failed to create anonymous session:', error);
      redirect('/error');
    }

    // Revalidate the layout to update auth state
    revalidatePath('/', 'layout');

    // Redirect back to voice page with new session
    redirect('/voice');
  } catch (error) {
    console.error('Error in createAnonymousSession:', error);
    redirect('/error');
  }
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
