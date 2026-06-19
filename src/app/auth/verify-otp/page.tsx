'use client';

import { Suspense } from 'react';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { otpSchema } from '@/lib/utils/schemas';
import { verifyOtp } from '@/lib/api/auth';
import { useAuthStore } from '@/lib/stores/auth-store';
import { useUIStore } from '@/lib/stores/ui-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { z } from 'zod/v4';

type OtpForm = z.infer<typeof otpSchema>;

function VerifyOtpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') ?? '';
  const setAuth = useAuthStore((s) => s.setAuth);
  const { addToast } = useUIStore();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OtpForm>({
    resolver: zodResolver(otpSchema),
    defaultValues: { email },
  });

  const onSubmit = async (data: OtpForm) => {
    setLoading(true);
    try {
      const result = await verifyOtp(data.email, data.otp);
      setAuth(result.user, result.accessToken, result.refreshToken);
      addToast('Email verified! Welcome to NairaMarket.', 'success');
      router.push('/');
    } catch {
      addToast('Invalid or expired OTP', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <h1 className="mb-2 text-2xl font-bold text-gray-900">Verify OTP</h1>
        <p className="mb-6 text-sm text-gray-500">
          Enter the 6-digit code sent to {email || 'your email'}
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="OTP Code"
            placeholder="000000"
            maxLength={6}
            error={errors.otp?.message}
            {...register('otp')}
          />
          <input type="hidden" {...register('email')} />
          <Button type="submit" className="w-full" loading={loading}>
            Verify Email
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default function VerifyOtpPage() {
  return (
    <div className="mx-auto mt-10 max-w-md">
      <Suspense fallback={<Skeleton className="h-64 w-full rounded-xl" />}>
        <VerifyOtpForm />
      </Suspense>
    </div>
  );
}
