'use client';

import { cn } from '@/lib/utils/cn';

interface QuantityStepperProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  className?: string;
}

export function QuantityStepper({ value, min = 1, max = 99, onChange, className }: QuantityStepperProps) {
  return (
    <div className={cn('flex items-center rounded-lg border border-gray-300', className)}>
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className="flex h-8 w-8 items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-30"
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className="flex h-8 w-10 items-center justify-center text-sm font-medium tabular-nums" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="flex h-8 w-8 items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-30"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
