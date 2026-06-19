'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '@/lib/utils/schemas';
import { register as registerUser } from '@/lib/api/auth';
import { useUIStore } from '@/lib/stores/ui-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { z } from 'zod/v4';

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const { addToast } = useUIStore();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    setLoading(true);
    try {
      await registerUser(data);
      addToast('Account created! Check your email for the OTP.', 'success');
      router.push(`/auth/verify-otp?email=${encodeURIComponent(data.email)}`);
    } catch {
      addToast('Registration failed. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-md">
      <Card>
        <CardContent className="p-6">
          <h1 className="mb-6 text-2xl font-bold text-gray-900">Create Account</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="First Name"
                error={errors.firstName?.message}
                {...register('firstName')}
              />
              <Input
                label="Last Name"
                error={errors.lastName?.message}
                {...register('lastName')}
              />
            </div>
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              error={errors.email?.message}
              {...register('email')}
            />
            <Input
              label="Phone (optional)"
              type="tel"
              placeholder="+234 800 000 0000"
              error={errors.phone?.message}
              {...register('phone')}
            />
            <Input
              label="Password"
              type="password"
              placeholder="At least 6 characters"
              error={errors.password?.message}
              {...register('password')}
            />
            <Button type="submit" className="w-full" loading={loading}>
              Create Account
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link href="/auth/login" className="font-medium text-green-600 hover:text-green-700">
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
