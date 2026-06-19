import { ProductCard } from './product-card';
import type { Product } from '@/lib/utils/types';

interface ProductGridProps {
  products: Product[];
  priceTier?: 'consumer' | 'retailer' | 'wholesaler';
}

export function ProductGrid({ products, priceTier = 'consumer' }: ProductGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product} priceTier={priceTier} priority={i < 4} />
      ))}
    </div>
  );
}
