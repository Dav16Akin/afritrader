export const env = {
  API_URL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080/v1',
  PAYSTACK_PUBLIC_KEY: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY ?? '',
  NODE_ENV: process.env.NODE_ENV ?? 'development',
} as const;
