import { api } from './client';
import { loginResponseSchema, userSchema } from '@/lib/utils/schemas';
import type { User } from '@/lib/utils/types';
import type { z } from 'zod';

export async function login(email: string, password: string): Promise<z.infer<typeof loginResponseSchema>> {
  const data = await api.post<Record<string, unknown>>('/auth/login', { email, password });
  return loginResponseSchema.parse(data);
}

export async function register(body: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}): Promise<void> {
  await api.post('/auth/register', body);
}

export async function verifyOtp(email: string, otp: string): Promise<z.infer<typeof loginResponseSchema>> {
  const data = await api.post<Record<string, unknown>>('/auth/otp/verify', { email, otp });
  return loginResponseSchema.parse(data);
}

export async function getProfile(): Promise<User> {
  const data = await api.get<Record<string, unknown>>('/auth/profile');
  return userSchema.parse(data);
}
