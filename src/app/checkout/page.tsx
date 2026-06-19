'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod/v4';
import { useCartStore } from '@/lib/stores/cart-store';
import { useAuthStore } from '@/lib/stores/auth-store';
import { useUIStore } from '@/lib/stores/ui-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils/format';
import { checkout } from '@/lib/api/orders';
import { getDeliveryQuote } from '@/lib/api/logistics';
import { initiatePayment } from '@/lib/api/payments';
import Link from 'next/link';

const checkoutFormSchema = z.object({
  street: z.string().min(1, 'Street address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zip: z.string().optional(),
});

type CheckoutForm = z.infer<typeof checkoutFormSchema>;

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCartStore();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const { addToast } = useUIStore();
  const [deliveryCost, setDeliveryCost] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'address' | 'payment'>('address');

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutFormSchema),
  });

  if (items.length === 0) {
    return (
      <div className="py-20 text-center">
        <h1 className="mb-2 text-xl font-semibold text-gray-900">Your cart is empty</h1>
        <Link href="/products"><Button>Shop Now</Button></Link>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="py-20 text-center">
        <h1 className="mb-2 text-xl font-semibold text-gray-900">Sign in to checkout</h1>
        <p className="mb-4 text-sm text-gray-500">You need to be logged in to complete your purchase.</p>
        <Link href="/auth/login"><Button>Sign In</Button></Link>
      </div>
    );
  }

  const handleGetQuote = async () => {
    const values = getValues();
    try {
      const quote = await getDeliveryQuote({
        street: values.street,
        city: values.city,
        state: values.state,
        zip: values.zip,
        country: 'Nigeria',
      });
      setDeliveryCost(quote.cost);
      setStep('payment');
    } catch {
      addToast('Failed to get delivery quote', 'error');
    }
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    const values = getValues();
    try {
      const { orderId } = await checkout({
        street: values.street,
        city: values.city,
        state: values.state,
        zip: values.zip,
        country: 'Nigeria',
      });

      const payment = await initiatePayment(orderId);
      clearCart();
      window.location.href = payment.checkoutUrl;
    } catch {
      addToast('Failed to place order', 'error');
    } finally {
      setLoading(false);
    }
  };

  const total = subtotal + (deliveryCost ?? 0);

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Checkout</h1>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">Delivery Address</h2>
              <form onSubmit={handleSubmit(handleGetQuote)} className="space-y-4">
                <Input
                  label="Street Address"
                  placeholder="123 Awolowo Road"
                  error={errors.street?.message}
                  {...register('street')}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="City"
                    placeholder="Ikeja"
                    error={errors.city?.message}
                    {...register('city')}
                  />
                  <Input
                    label="State"
                    placeholder="Lagos"
                    error={errors.state?.message}
                    {...register('state')}
                  />
                </div>
                <Input
                  label="ZIP Code (optional)"
                  placeholder="100001"
                  error={errors.zip?.message}
                  {...register('zip')}
                />
                {step === 'address' && (
                  <Button type="submit" className="w-full">
                    Get Delivery Quote
                  </Button>
                )}
              </form>
            </CardContent>
          </Card>

          {step === 'payment' && (
            <Card>
              <CardContent className="p-6">
                <h2 className="mb-4 text-lg font-semibold text-gray-900">Payment</h2>
                <p className="mb-4 text-sm text-gray-500">
                  You will be redirected to Paystack to complete your payment securely.
                </p>
                <Button
                  size="lg"
                  className="w-full"
                  loading={loading}
                  onClick={handlePlaceOrder}
                >
                  Pay {formatCurrency(total)}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        <div>
          <Card>
            <CardContent className="p-6">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">Order Summary</h2>
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.image} alt={item.name} className="h-12 w-12 rounded object-cover" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 line-clamp-1">{item.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium">{formatCurrency(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>
              <hr className="my-4" />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span>{deliveryCost ? formatCurrency(deliveryCost) : '—'}</span>
                </div>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between font-semibold text-gray-900">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
