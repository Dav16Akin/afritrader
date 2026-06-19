import { formatCurrency } from '@/lib/utils/format';
import { cn } from '@/lib/utils/cn';

interface PriceDisplayProps {
  price: number;
  comparePrice?: number | null;
  priceTier?: 'consumer' | 'retailer' | 'wholesaler';
  className?: string;
}

export function PriceDisplay({ price, comparePrice, priceTier = 'consumer', className }: PriceDisplayProps) {
  return (
    <div className={cn('flex items-baseline gap-2', className)}>
      <span className="text-lg font-bold text-gray-900">
        {formatCurrency(price)}
      </span>
      {comparePrice && comparePrice > price && (
        <span className="text-sm text-gray-500 line-through">
          {formatCurrency(comparePrice)}
        </span>
      )}
      {priceTier !== 'consumer' && (
        <span className="text-xs font-medium text-green-600 uppercase">
          {priceTier}
        </span>
      )}
    </div>
  );
}
