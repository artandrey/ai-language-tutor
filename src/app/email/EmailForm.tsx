'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { emailSchema, EmailFormData } from './schema';
import { saveUserEmail } from './actions';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { trackEvent, AnalyticsEvents } from '@/lib/analytics/events';
import { ArrowRight } from 'lucide-react';

export default function EmailForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
  });

  async function onSubmit(data: EmailFormData) {
    setServerError(null);
    const formData = new FormData();
    formData.append('email', data.email);
    const result = await saveUserEmail({}, formData);
    if (result?.errors?.email) {
      setServerError(result.errors.email[0]);
      return;
    }
    trackEvent(AnalyticsEvents.EMAIL_ENTERED, { email: data.email });
  }

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="text-left">
        <label
          htmlFor="email"
          className="block text-gray-700 font-semibold mb-2"
        >
          Email Address
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          placeholder="user@mail.com"
          className="w-full rounded-xl px-4 py-3 bg-white/80 text-gray-900 placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
          autoComplete="email"
          required
        />
        {errors.email && (
          <p className="text-red-500 mt-2">{errors.email.message}</p>
        )}
        {serverError && <p className="text-red-500 mt-2">{serverError}</p>}
      </div>
      <Button
        type="submit"
        className="w-full py-6 px-6 rounded-2xl font-semibold text-lg shadow-lg mt-4 flex items-center justify-center gap-3"
        style={{
          background: 'linear-gradient(145deg, #3b82f6, #1d4ed8)',
          boxShadow:
            'inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 rgba(0, 0, 0, 0.2), 0 4px 12px rgba(59, 130, 246, 0.3)',
        }}
        disabled={!isDirty || !isValid || isSubmitting}
        loading={isSubmitting}
      >
        {isSubmitting ? 'Getting Your Plan...' : 'GET MY PLAN'}
        {!isSubmitting && <ArrowRight size={20} />}
      </Button>
    </form>
  );
}
