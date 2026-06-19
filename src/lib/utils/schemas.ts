import { z } from 'zod/v4';

export const productSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number().positive(),
  comparePrice: z.number().positive().nullable().optional(),
  images: z.array(z.string()),
  category: z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
  }),
  moq: z.number().int().positive().optional(),
  inStock: z.boolean(),
  rating: z.number().min(0).max(5).optional(),
  reviewCount: z.number().int().nonnegative().optional(),
  createdAt: z.string().datetime(),
});

export const productListSchema = z.object({
  data: z.array(productSchema),
  pagination: z.object({
    page: z.number().int(),
    limit: z.number().int(),
    total: z.number().int(),
    totalPages: z.number().int(),
    hasNextPage: z.boolean(),
    nextCursor: z.string().nullable(),
  }),
});

export const categorySchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  image: z.string().nullable().optional(),
  productCount: z.number().int().nonnegative().optional(),
});

export const cartItemSchema = z.object({
  id: z.string(),
  productId: z.string(),
  name: z.string(),
  price: z.number().positive(),
  quantity: z.number().int().positive(),
  image: z.string(),
  maxQuantity: z.number().int().positive().optional(),
});

export const cartSchema = z.object({
  id: z.string(),
  items: z.array(cartItemSchema),
  subtotal: z.number().nonnegative(),
  total: z.number().nonnegative(),
  itemCount: z.number().int().nonnegative(),
});

export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string().optional(),
  role: z.enum(['consumer', 'retailer', 'wholesaler']),
});

export const loginResponseSchema = z.object({
  user: userSchema,
  accessToken: z.string(),
  refreshToken: z.string(),
});

export const addressSchema = z.object({
  id: z.string().optional(),
  street: z.string().min(1, 'Street is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zip: z.string().optional(),
  country: z.string().default('Nigeria'),
});

export const deliveryQuoteSchema = z.object({
  provider: z.string(),
  service: z.string(),
  cost: z.number().positive(),
  estimatedDays: z.string(),
});

export const paymentInitSchema = z.object({
  reference: z.string(),
  checkoutUrl: z.string().url(),
});

export const orderItemSchema = z.object({
  id: z.string(),
  productId: z.string(),
  name: z.string(),
  price: z.number().positive(),
  quantity: z.number().int().positive(),
  image: z.string(),
});

export const orderSchema = z.object({
  id: z.string(),
  orderNumber: z.string(),
  status: z.enum(['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled']),
  items: z.array(orderItemSchema),
  subtotal: z.number().nonnegative(),
  deliveryFee: z.number().nonnegative(),
  total: z.number().nonnegative(),
  address: addressSchema,
  paymentReference: z.string().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const orderListSchema = z.object({
  data: z.array(orderSchema),
  pagination: z.object({
    page: z.number().int(),
    limit: z.number().int(),
    total: z.number().int(),
    totalPages: z.number().int(),
  }),
});

export const loginSchema = z.object({
  email: z.string().email('Valid email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z.object({
  email: z.string().email('Valid email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  phone: z.string().optional(),
});

export const otpSchema = z.object({
  email: z.string().email(),
  otp: z.string().length(6, 'OTP must be 6 digits'),
});

export const checkoutSchema = z.object({
  address: addressSchema,
  deliveryQuoteId: z.string().optional(),
});
