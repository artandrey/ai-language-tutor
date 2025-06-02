'use client';

import { useRouter } from 'next/navigation';
import { GradientBackground } from '@/components/ui/gradient-background';
import { CenteredCard } from '@/components/ui/centered-card';
import { Button } from '@/components/ui/button';

const Home = () => {
  const router = useRouter();
  return (
    <GradientBackground>
      <div className="flex flex-1 items-center justify-center min-h-screen">
        <CenteredCard className="p-12 md:p-16">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 md:mb-10">
            Welcome to your AI English Tutor!
          </h1>
          <p className="text-gray-300 mb-12 md:mb-14 text-base md:text-lg">
            Let's personalize your learning journey in just a few quick
            questions.
            <br />
            This will help me create the perfect learning plan just for you!
          </p>
          <Button
            className="w-full py-6 px-6 rounded-2xl font-semibold text-lg shadow-lg"
            style={{
              background: 'linear-gradient(145deg, #3b82f6, #1d4ed8)',
              boxShadow:
                'inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 rgba(0, 0, 0, 0.2), 0 4px 12px rgba(59, 130, 246, 0.3)',
            }}
            onClick={() => router.push('/quiz')}
          >
            Get Started!
          </Button>
        </CenteredCard>
      </div>
    </GradientBackground>
  );
};

export default Home;
