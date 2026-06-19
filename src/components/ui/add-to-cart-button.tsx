'use client';

import { useState } from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import { useCartStore } from '@/lib/stores/cart-store';
import { useUIStore } from '@/lib/stores/ui-store';
import type { DummyProduct } from '@/lib/dummy-data';

interface AddToCartButtonProps {
  product: DummyProduct;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const { addToast } = useUIStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addItem({
      id: `dummy-${product.id}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
    });

    addToast(`${product.name} added to cart`, 'success');
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (!product.inStock) {
    return (
      <button
        disabled
        className="mt-3 w-full rounded-xl bg-gray-100 py-2.5 text-xs font-semibold text-gray-400 cursor-not-allowed"
      >
        Out of Stock
      </button>
    );
  }

  return (
    <button
      id={`add-to-cart-${product.id}`}
      onClick={handleAddToCart}
      className={`mt-3 w-full rounded-xl py-2.5 text-xs font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
        added
          ? 'bg-[#1A5C38] text-white'
          : 'border border-[#1A5C38] text-[#1A5C38] hover:bg-[#1A5C38] hover:text-white'
      }`}
    >
      {added ? (
        <>
          <Check className="h-3.5 w-3.5" />
          Added!
        </>
      ) : (
        <>
          <ShoppingCart className="h-3.5 w-3.5" />
          Add to Cart
        </>
      )}
    </button>
  );
}
