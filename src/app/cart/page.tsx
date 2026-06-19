'use client';

import { useCartStore } from '@/lib/stores/cart-store';
import { useUIStore } from '@/lib/stores/ui-store';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { QuantityStepper } from '@/components/ui/quantity-stepper';
import { PriceDisplay } from '@/components/ui/price-display';
import { updateCartItem, removeCartItem } from '@/lib/api/cart';
import { formatCurrency } from '@/lib/utils/format';
import Link from 'next/link';
import { Trash2, ShoppingCart, ArrowLeft } from 'lucide-react';

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeItem } = useCartStore();
  const { addToast } = useUIStore();

  const handleUpdateQuantity = async (itemId: string, quantity: number) => {
    const previousItems = useCartStore.getState().items;
    updateQuantity(itemId, quantity);
    try {
      await updateCartItem(itemId, quantity);
    } catch {
      useCartStore.getState().rollback(previousItems);
      addToast('Failed to update quantity', 'error');
    }
  };

  const handleRemove = async (itemId: string) => {
    const previousItems = useCartStore.getState().items;
    removeItem(itemId);
    try {
      await removeCartItem(itemId);
    } catch {
      useCartStore.getState().rollback(previousItems);
      addToast('Failed to remove item', 'error');
    }
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <ShoppingCart className="mb-4 h-16 w-16 text-gray-300" />
        <h1 className="mb-2 text-xl font-semibold text-gray-900">Your cart is empty</h1>
        <p className="mb-6 text-sm text-gray-500">Looks like you haven&apos;t added anything yet.</p>
        <Link href="/products">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
        <Link href="/products" className="flex items-center gap-1 text-sm text-green-600 hover:text-green-700">
          <ArrowLeft className="h-4 w-4" />
          Continue Shopping
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          {items.map((item) => (
            <Card key={item.id}>
              <CardContent className="flex gap-4 p-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.image} alt={item.name} className="h-24 w-24 rounded-lg object-cover" />
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <PriceDisplay price={item.price} />
                  </div>
                  <div className="flex items-center justify-between">
                    <QuantityStepper
                      value={item.quantity}
                      onChange={(q) => handleUpdateQuantity(item.id, q)}
                    />
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="flex items-center gap-1 text-sm text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                      Remove
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div>
          <Card>
            <CardContent className="p-4">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">Order Summary</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>
              <hr className="my-3" />
              <div className="mb-4 flex justify-between font-medium">
                <span>Estimated Total</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <Link href="/checkout">
                <Button size="lg" className="w-full">Proceed to Checkout</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
