import { api } from './client';
import { paymentInitSchema } from '@/lib/utils/schemas';
import type { z } from 'zod';

export async function initiatePayment(orderId: string): Promise<z.infer<typeof paymentInitSchema>> {
  const data = await api.post<Record<string, unknown>>('/payments/initiate', { orderId });
  return paymentInitSchema.parse(data);
}
