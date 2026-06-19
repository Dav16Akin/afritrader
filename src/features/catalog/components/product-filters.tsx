'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Search, SlidersHorizontal, X } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  slug: string;
}

export function ProductFilters({ categories }: { categories: Category[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [showMobile, setShowMobile] = useState(false);

  const currentCategory = searchParams.get('category') ?? '';
  const currentQ = searchParams.get('q') ?? '';
  const currentSort = searchParams.get('sort') ?? '';
  const currentMinPrice = searchParams.get('minPrice') ?? '';
  const currentMaxPrice = searchParams.get('maxPrice') ?? '';

  const setParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      params.delete('page');
      router.push(`${pathname}?${params.toString()}`);
    },
    [searchParams, router, pathname],
  );

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setParam('q', (form.get('q') as string) ?? '');
  };

  const clearFilters = () => {
    router.push(pathname);
  };

  const hasFilters = currentCategory || currentQ || currentSort || currentMinPrice || currentMaxPrice;

  return (
    <>
      <div className="hidden lg:block space-y-6">
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            name="q"
            defaultValue={currentQ}
            placeholder="Search products..."
            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-3 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
          />
        </form>

        <div>
          <h3 className="mb-3 text-sm font-semibold text-gray-900">Category</h3>
          <div className="space-y-1.5">
            <button
              onClick={() => setParam('category', '')}
              className={`block w-full rounded px-3 py-1.5 text-left text-sm ${!currentCategory ? 'bg-green-50 font-medium text-green-700' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setParam('category', cat.slug)}
                className={`block w-full rounded px-3 py-1.5 text-left text-sm ${currentCategory === cat.slug ? 'bg-green-50 font-medium text-green-700' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold text-gray-900">Price Range</h3>
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Min"
              defaultValue={currentMinPrice}
              onChange={(e) => setParam('minPrice', e.target.value)}
              className="w-full rounded border border-gray-300 px-2 py-1.5 text-sm focus:border-green-500 focus:outline-none"
            />
            <span className="text-gray-400">—</span>
            <input
              type="number"
              placeholder="Max"
              defaultValue={currentMaxPrice}
              onChange={(e) => setParam('maxPrice', e.target.value)}
              className="w-full rounded border border-gray-300 px-2 py-1.5 text-sm focus:border-green-500 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold text-gray-900">Sort By</h3>
          <select
            value={currentSort}
            onChange={(e) => setParam('sort', e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
          >
            <option value="">Newest</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="name_asc">Name: A-Z</option>
          </select>
        </div>

        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="w-full">
            <X className="mr-1.5 h-3.5 w-3.5" />
            Clear Filters
          </Button>
        )}
      </div>

      <div className="lg:hidden">
        <Button variant="outline" size="sm" onClick={() => setShowMobile(!showMobile)} className="w-full">
          <SlidersHorizontal className="mr-1.5 h-4 w-4" />
          Filters
          {hasFilters && <span className="ml-1.5 rounded-full bg-green-600 px-1.5 text-xs text-white">!</span>}
        </Button>
        {showMobile && (
          <div className="mt-4 rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
            <form onSubmit={handleSearch} className="relative mb-4">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                name="q"
                defaultValue={currentQ}
                placeholder="Search..."
                className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-3 text-sm"
              />
            </form>
            <div className="grid grid-cols-2 gap-4">
              <select
                value={currentCategory}
                onChange={(e) => setParam('category', e.target.value)}
                className="rounded border border-gray-300 px-2 py-1.5 text-sm"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.slug}>{cat.name}</option>
                ))}
              </select>
              <select
                value={currentSort}
                onChange={(e) => setParam('sort', e.target.value)}
                className="rounded border border-gray-300 px-2 py-1.5 text-sm"
              >
                <option value="">Sort</option>
                <option value="price_asc">Price: Low</option>
                <option value="price_desc">Price: High</option>
              </select>
            </div>
            {hasFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="mt-3 w-full">
                Clear Filters
              </Button>
            )}
          </div>
        )}
      </div>
    </>
  );
}
