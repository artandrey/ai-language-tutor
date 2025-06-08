import { GradientBackground } from '@/components/ui/gradient-background';
import { CenteredCard } from '@/components/ui/centered-card';
import { Button } from '@/components/ui/button';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { Shield, Mail } from 'lucide-react';
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
          <div className="text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
              Enter your <span className="text-blue-600">email address</span>
            </h1>
            <p className="text-gray-600 mb-8 md:mb-10 text-base md:text-lg">
              Get your personalized learning plan and track your progress.
            </p>

            <EmailForm />

            {/* Security disclaimers */}
            <div className="space-y-4 mt-8 md:mt-10">
              <div className="flex items-center gap-3 p-3 rounded-lg border border-blue-200 bg-blue-50/50">
                <Shield
                  size={20}
                  className="flex-shrink-0 text-blue-600"
                />
                <span className="text-sm md:text-base text-blue-700">
                  Your information will remain confidential and secure
                </span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg border border-blue-200 bg-blue-50/50">
                <Mail
                  size={20}
                  className="flex-shrink-0 text-blue-600"
                />
                <span className="text-sm md:text-base text-blue-700">
                  We will never send spam or unwanted newsletters
                </span>
              </div>
            </div>
          </div>
        </CenteredCard>
      </div>
    </GradientBackground>
  );
}
