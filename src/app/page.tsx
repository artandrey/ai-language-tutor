import { createAnonymousSession } from '@/lib/auth/actions';
import { GradientBackground } from '@/components/ui/gradient-background';
import { CenteredCard } from '@/components/ui/centered-card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import HomeStartButton from '@/components/ui/home-start-button';

export default function Home() {
  return (
    <GradientBackground>
      <div className="flex flex-1 items-center justify-center min-h-screen">
        <CenteredCard className="p-12 md:p-16">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 md:mb-10">
            Welcome to your{' '}
            <span className="text-blue-600">AI English Tutor!</span>
          </h1>
          <p className="text-gray-600 mb-12 md:mb-14 text-base md:text-lg">
            Let&apos;s personalize your learning journey in just a few quick
            questions.
            <br />
            This will help me create the perfect learning plan just for you!
          </p>
          <HomeStartButton />
        </CenteredCard>
      </div>
    </GradientBackground>
  );
}
