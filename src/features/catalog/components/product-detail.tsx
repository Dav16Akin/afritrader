'use client';

import { useState } from 'react';
import Image from 'next/image';
import { PriceDisplay } from '@/components/ui/price-display';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { QuantityStepper } from '@/components/ui/quantity-stepper';
import { useCartStore } from '@/lib/stores/cart-store';
import { useUIStore } from '@/lib/stores/ui-store';
import { addCartItem } from '@/lib/api/cart';
import type { Product } from '@/lib/utils/types';
import { ShoppingCart, Truck, Shield, RotateCcw } from 'lucide-react';

interface ProductDetailProps {
  product: Product;
  priceTier?: 'consumer' | 'retailer' | 'wholesaler';
}

export function ProductDetail({ product, priceTier = 'consumer' }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const { addToast } = useUIStore();

  const images = product.images.length > 0 ? product.images : ['/placeholder.svg'];

  const handleAddToCart = async () => {
    setAdding(true);
    const previousItems = useCartStore.getState().items;

    addItem({
      id: `optimistic-${product.id}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: images[0],
    });

    try {
      await addCartItem(product.id, quantity);
      addToast(`${product.name} added to cart`, 'success');
    } catch {
      useCartStore.getState().rollback(previousItems);
      addToast('Failed to add item', 'error');
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="space-y-4">
        <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100">
          <Image
            src={images[selectedImage]}
            alt={product.name}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        {images.length > 1 && (
          <div className="flex gap-2">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`h-16 w-16 overflow-hidden rounded-lg border-2 ${
                  i === selectedImage ? 'border-green-500' : 'border-transparent'
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-6">
        <div>
          <p className="mb-1 text-sm text-gray-500">{product.category.name}</p>
          <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
          <div className="mt-2 flex items-center gap-3">
            <PriceDisplay price={product.price} comparePrice={product.comparePrice} priceTier={priceTier} />
            <Badge variant={product.inStock ? 'success' : 'danger'}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </Badge>
          </div>
          {product.rating && (
            <div className="mt-2 flex items-center gap-1">
              <span className="text-yellow-500">{'★'.repeat(Math.round(product.rating))}</span>
              <span className="text-sm text-gray-400">({product.reviewCount ?? 0} reviews)</span>
            </div>
          )}
        </div>

        <p className="leading-relaxed text-gray-600">{product.description}</p>

        {product.inStock && (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700">Quantity:</span>
              <QuantityStepper value={quantity} onChange={setQuantity} max={product.moq ? undefined : 99} />
              {product.moq && (
                <span className="text-xs text-gray-400">MOQ: {product.moq}</span>
              )}
            </div>

            <Button size="lg" className="w-full md:w-auto" loading={adding} onClick={handleAddToCart}>
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart — {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 2 }).format(product.price * quantity)}
            </Button>
          </div>
        )}

        <div className="grid grid-cols-3 gap-4 border-t pt-6">
          <div className="text-center">
            <Truck className="mx-auto mb-1 h-5 w-5 text-green-600" />
            <p className="text-xs text-gray-500">Free Delivery</p>
            <p className="text-xs text-gray-400">On orders above ₦50,000</p>
          </div>
          <div className="text-center">
            <Shield className="mx-auto mb-1 h-5 w-5 text-green-600" />
            <p className="text-xs text-gray-500">Secure</p>
            <p className="text-xs text-gray-400">Paystack Payment</p>
          </div>
          <div className="text-center">
            <RotateCcw className="mx-auto mb-1 h-5 w-5 text-green-600" />
            <p className="text-xs text-gray-500">Returns</p>
            <p className="text-xs text-gray-400">7-day return policy</p>
          </div>
        </div>
      </div>
    </div>
  );
}
