import { api } from './client';
import { orderListSchema, orderSchema } from '@/lib/utils/schemas';
import type { Order, Address } from '@/lib/utils/types';
import type { z } from 'zod';

export async function getOrders(page = 1, limit = 10): Promise<z.infer<typeof orderListSchema>> {
  const data = await api.get<Record<string, unknown>>('/orders', {
    params: { page, limit },
    tags: ['orders'],
  });
  return orderListSchema.parse(data);
}

export async function getOrder(id: string): Promise<Order> {
  const data = await api.get<Record<string, unknown>>(`/orders/${id}`, {
    tags: [`order-${id}`],
  });
  return orderSchema.parse(data);
}

export async function checkout(address: Address): Promise<{ orderId: string }> {
  return api.post<{ orderId: string }>('/orders/checkout', address);
}
