import { cn } from '@/lib/utils/cn';
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'article' | 'section';
}

export function Card({ children, className, as: Tag = 'div' }: CardProps) {
  return (
    <Tag className={cn('rounded-xl border border-gray-200 bg-white shadow-sm', className)}>
      {children}
    </Tag>
  );
}

export function CardImage({ src, alt }: { src: string; alt: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} className="aspect-square w-full rounded-t-xl object-cover" loading="lazy" />;
}

export function CardContent({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('p-4', className)}>{children}</div>;
}
