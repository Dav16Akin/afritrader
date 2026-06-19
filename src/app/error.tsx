'use client';

import { Button } from '@/components/ui/button';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <h1 className="mb-2 text-2xl font-bold text-gray-900">Something went wrong</h1>
      <p className="mb-6 text-gray-500">An unexpected error occurred.</p>
      <Button onClick={reset}>Try Again</Button>
    </div>
  );
}
