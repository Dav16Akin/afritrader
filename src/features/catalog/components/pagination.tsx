'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
}

export function Pagination({ currentPage, totalPages, hasNextPage }: PaginationProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    router.push(`${pathname}?${params.toString()}`);
  };

  if (totalPages <= 1) return null;

  return (
    <nav className="mt-8 flex items-center justify-center gap-2" aria-label="Pagination">
      <Button
        variant="outline"
        size="sm"
        disabled={currentPage <= 1}
        onClick={() => goToPage(currentPage - 1)}
      >
        <ChevronLeft className="h-4 w-4" />
        Previous
      </Button>
      <div className="flex items-center gap-1">
        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
          const page = i + 1;
          return (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`flex h-8 w-8 items-center justify-center rounded text-sm ${
                page === currentPage
                  ? 'bg-green-600 font-medium text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {page}
            </button>
          );
        })}
        {totalPages > 5 && <span className="text-gray-400">...</span>}
      </div>
      <Button
        variant="outline"
        size="sm"
        disabled={!hasNextPage}
        onClick={() => goToPage(currentPage + 1)}
      >
        Next
        <ChevronRight className="h-4 w-4" />
      </Button>
    </nav>
  );
}
