import { GradientBackground } from '@/components/ui/gradient-background';
import { CenteredCard } from '@/components/ui/centered-card';
import { Button } from '@/components/ui/button';

const EmailPage = () => {
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
          <form className="flex flex-col gap-6">
            <div className="text-left">
              <label
                htmlFor="email"
                className="block text-gray-200 font-semibold mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="user@mail.com"
                className="w-full rounded-xl px-4 py-3 bg-gray-800/60 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoComplete="email"
              />
            </div>
            <Button
              type="button"
              className="w-full py-6 px-6 rounded-2xl font-semibold text-lg shadow-lg mt-4"
              style={{
                background: 'linear-gradient(145deg, #3b82f6, #1d4ed8)',
                boxShadow:
                  'inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 rgba(0, 0, 0, 0.2), 0 4px 12px rgba(59, 130, 246, 0.3)',
              }}
            >
              GET MY PLAN
            </Button>
          </form>
        </CenteredCard>
      </div>
    </GradientBackground>
  );
};

export default EmailPage;
