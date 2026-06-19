'use client';

import Link from 'next/link';
import { Card, CardContent, CardImage } from '@/components/ui/card';
import { PriceDisplay } from '@/components/ui/price-display';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/lib/stores/cart-store';
import { useUIStore } from '@/lib/stores/ui-store';
import { addCartItem } from '@/lib/api/cart';
import { useState } from 'react';
import type { Product } from '@/lib/utils/types';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  priceTier?: 'consumer' | 'retailer' | 'wholesaler';
  priority?: boolean;
}

export function ProductCard({ product, priceTier = 'consumer' }: ProductCardProps) {
  const [adding, setAdding] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const { addToast } = useUIStore();
  const image = product.images[0] ?? '/placeholder.svg';

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setAdding(true);
    const previousItems = useCartStore.getState().items;

    addItem({
      id: `optimistic-${product.id}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image,
    });

    try {
      await addCartItem(product.id, 1);
      addToast(`${product.name} added to cart`, 'success');
    } catch {
      useCartStore.getState().rollback(previousItems);
      addToast('Failed to add item', 'error');
    } finally {
      setAdding(false);
    }
  };

  return (
    <Link href={`/products/${product.slug}`}>
      <Card as="article" className="group transition-shadow hover:shadow-md">
        <div className="relative">
          <CardImage src={image} alt={product.name} />
          {!product.inStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <Badge variant="danger">Out of Stock</Badge>
            </div>
          )}
        </div>
        <CardContent>
          <p className="mb-1 text-xs text-gray-500">{product.category.name}</p>
          <h3 className="mb-1 text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-green-600">
            {product.name}
          </h3>
          <PriceDisplay price={product.price} comparePrice={product.comparePrice} priceTier={priceTier} />
          {product.rating && (
            <div className="mt-1 flex items-center gap-1">
              <span className="text-xs text-yellow-500">{'★'.repeat(Math.round(product.rating))}</span>
              <span className="text-xs text-gray-400">({product.reviewCount ?? 0})</span>
            </div>
          )}
          {product.inStock && (
            <Button
              variant="primary"
              size="sm"
              className="mt-3 w-full"
              loading={adding}
              onClick={handleAddToCart}
            >
              <ShoppingCart className="mr-1.5 h-3.5 w-3.5" />
              Add to Cart
            </Button>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
