'use client';

import { useCartStore } from '@/lib/stores/cart-store';
import { useUIStore } from '@/lib/stores/ui-store';
import { Button } from '@/components/ui/button';
import { QuantityStepper } from '@/components/ui/quantity-stepper';
import { PriceDisplay } from '@/components/ui/price-display';
import { updateCartItem, removeCartItem } from '@/lib/api/cart';
import { formatCurrency } from '@/lib/utils/format';
import Link from 'next/link';
import { X, ShoppingCart, Trash2 } from 'lucide-react';

export function CartDrawer() {
  const { items, itemCount, subtotal, updateQuantity, removeItem } = useCartStore();
  const { isCartDrawerOpen, closeCartDrawer, addToast } = useUIStore();

  if (!isCartDrawerOpen) return null;

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

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/40" onClick={closeCartDrawer} />
      <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white shadow-xl">
        <div className="flex items-center justify-between border-b px-4 py-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Cart ({itemCount} {itemCount === 1 ? 'item' : 'items'})
          </h2>
          <button onClick={closeCartDrawer} className="p-1 text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 text-gray-400">
            <ShoppingCart className="h-12 w-12" />
            <p className="text-sm">Your cart is empty</p>
            <Link href="/products" onClick={closeCartDrawer}>
              <Button variant="primary" size="sm">Start Shopping</Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-4 py-4">
              <ul className="space-y-4">
                {items.map((item) => (
                  <li key={item.id} className="flex gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.image} alt={item.name} className="h-20 w-20 rounded-lg object-cover" />
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900 line-clamp-1">{item.name}</p>
                        <PriceDisplay price={item.price} />
                      </div>
                      <div className="flex items-center justify-between">
                        <QuantityStepper
                          value={item.quantity}
                          onChange={(q) => handleUpdateQuantity(item.id, q)}
                        />
                        <button
                          onClick={() => handleRemove(item.id)}
                          className="p-1 text-gray-400 hover:text-red-500"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t px-4 py-4">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Subtotal</span>
                <span className="text-lg font-bold text-gray-900">{formatCurrency(subtotal)}</span>
              </div>
              <Link href="/checkout" onClick={closeCartDrawer}>
                <Button size="lg" className="w-full">Checkout</Button>
              </Link>
              <Link
                href="/cart"
                onClick={closeCartDrawer}
                className="mt-2 block text-center text-sm text-green-600 hover:text-green-700"
              >
                View full cart
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}
