import { api } from './client';
import { cartSchema } from '@/lib/utils/schemas';
import type { Cart } from '@/lib/utils/types';

export async function getCart(): Promise<Cart> {
  const data = await api.get<Record<string, unknown>>('/orders/cart', {
    tags: ['cart'],
  });
  return cartSchema.parse(data);
}

export async function addCartItem(productId: string, quantity: number): Promise<Cart> {
  const data = await api.post<Record<string, unknown>>('/orders/cart/items', {
    productId,
    quantity,
  });
  return cartSchema.parse(data);
}

export async function updateCartItem(itemId: string, quantity: number): Promise<Cart> {
  const data = await api.put<Record<string, unknown>>(`/orders/cart/items/${itemId}`, {
    quantity,
  });
  return cartSchema.parse(data);
}

export async function removeCartItem(itemId: string): Promise<void> {
  await api.delete(`/orders/cart/items/${itemId}`);
}
