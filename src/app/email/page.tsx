import { GradientBackground } from '@/components/ui/gradient-background';
import { CenteredCard } from '@/components/ui/centered-card';
import { Button } from '@/components/ui/button';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import EmailForm from './EmailForm';

export default async function EmailPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect('/auth/anonymous');
  }

  return (
    <GradientBackground>
      <div className="flex flex-1 items-center justify-center min-h-screen">
        <CenteredCard className="p-12 md:p-16">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 md:mb-10">
            Enter your email address
          </h1>
          <p className="text-gray-300 mb-12 md:mb-14 text-base md:text-lg">
            Your information will be confidential and will not be shared with
          </p>
          <EmailForm />
        </CenteredCard>
      </div>
    </GradientBackground>
  );
}
