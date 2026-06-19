import type { z } from 'zod';
import {
  productSchema,
  productListSchema,
  categorySchema,
  cartSchema,
  cartItemSchema,
  orderSchema,
  orderListSchema,
  loginResponseSchema,
  userSchema,
  addressSchema,
  deliveryQuoteSchema,
  paymentInitSchema,
} from './schemas';

export type Product = z.infer<typeof productSchema>;
export type ProductList = z.infer<typeof productListSchema>;
export type Category = z.infer<typeof categorySchema>;
export type Cart = z.infer<typeof cartSchema>;
export type CartItem = z.infer<typeof cartItemSchema>;
export type Order = z.infer<typeof orderSchema>;
export type OrderList = z.infer<typeof orderListSchema>;
export type LoginResponse = z.infer<typeof loginResponseSchema>;
export type User = z.infer<typeof userSchema>;
export type Address = z.infer<typeof addressSchema>;
export type DeliveryQuote = z.infer<typeof deliveryQuoteSchema>;
export type PaymentInit = z.infer<typeof paymentInitSchema>;

export interface PaginationParams {
  page?: number;
  limit?: number;
  cursor?: string;
}

export interface ProductFilters extends PaginationParams {
  category?: string;
  q?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
}

export interface ApiError {
  message: string;
  code: string;
  status: number;
}
