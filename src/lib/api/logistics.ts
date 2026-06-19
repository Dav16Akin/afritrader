import { api } from './client';
import { deliveryQuoteSchema } from '@/lib/utils/schemas';
import type { Address } from '@/lib/utils/types';
import type { z } from 'zod';

export async function getDeliveryQuote(address: Address): Promise<z.infer<typeof deliveryQuoteSchema>> {
  const data = await api.post<Record<string, unknown>>('/logistics/quote', { address });
  return deliveryQuoteSchema.parse(data);
}
