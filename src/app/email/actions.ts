'use server';

import { createClient } from '@/utils/supabase/server';
import { getDatabase } from '@/lib/db';
import { userEmails } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { redirect, RedirectType } from 'next/navigation';
import { emailSchema } from './schema';

export async function saveUserEmail(prevState: any, formData: FormData) {
  const result = emailSchema.safeParse({
    email: formData.get('email'),
  });

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  const email = result.data.email;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { errors: { email: ['Not authenticated.'] } };
  }

  const db = getDatabase();
  const existing = await db
    .select()
    .from(userEmails)
    .where(eq(userEmails.userId, user.id))
    .limit(1);

  if (existing.length > 0) {
    await db
      .update(userEmails)
      .set({ email, updatedAt: new Date() })
      .where(eq(userEmails.userId, user.id));
  } else {
    await db.insert(userEmails).values({
      userId: user.id,
      email,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  redirect('/voice', RedirectType.replace);
}
