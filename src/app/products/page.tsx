'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, SlidersHorizontal, Star, Heart, ArrowRight, X, Check } from 'lucide-react';
import { DUMMY_PRODUCTS, DUMMY_CATEGORIES, type DummyProduct } from '@/lib/dummy-data';
import { useCartStore } from '@/lib/stores/cart-store';
import { useUIStore } from '@/lib/stores/ui-store';

function formatPrice(price: number) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency', currency: 'NGN',
    minimumFractionDigits: 0, maximumFractionDigits: 0,
  }).format(price);
}

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} className={`h-3 w-3 ${i < Math.floor(rating) ? 'fill-[#E8A020] text-[#E8A020]' : 'fill-gray-200 text-gray-200'}`} />
        ))}
      </div>
      <span className="text-xs text-gray-500">({count})</span>
    </div>
  );
}

function ProductCard({ product }: { product: DummyProduct }) {
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const { addToast } = useUIStore();

  const discount = product.comparePrice
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : null;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ id: `dummy-${product.id}-${Date.now()}`, productId: product.id, name: product.name, price: product.price, quantity: 1, image: product.image });
    addToast(`${product.name} added to cart`, 'success');
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <article className="product-card group relative rounded-2xl border border-gray-100 bg-white overflow-hidden">
      <button className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm shadow-sm text-gray-400 hover:text-red-500 transition-colors">
        <Heart className="h-4 w-4" />
      </button>
      {(product.badge || discount) && (
        <span className={`absolute left-3 top-3 z-10 rounded-full px-2.5 py-0.5 text-[11px] font-semibold text-white ${product.badge ? 'bg-[#1A5C38]' : 'bg-red-500'}`}>
          {product.badge ?? `-${discount}%`}
        </span>
      )}
      <Link href={`/products/${product.slug}`}>
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <Image src={product.image} alt={product.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width:640px) 50vw,(max-width:1024px) 33vw,25vw" />
        </div>
      </Link>
      <div className="p-4">
        <p className="mb-1 text-[11px] font-medium uppercase tracking-wide text-[#1A5C38]">{product.category}</p>
        <Link href={`/products/${product.slug}`}>
          <h3 className="mb-1.5 text-sm font-semibold text-gray-900 line-clamp-2 leading-snug hover:text-[#1A5C38] transition-colors">{product.name}</h3>
        </Link>
        <StarRating rating={product.rating} count={product.reviewCount} />
        <div className="mt-2 flex items-baseline gap-2">
          <span style={{ fontFamily: 'var(--font-heading)' }} className="text-base font-bold text-gray-900">{formatPrice(product.price)}</span>
          {product.comparePrice && <span className="text-xs text-gray-400 line-through">{formatPrice(product.comparePrice)}</span>}
        </div>
        <button
          id={`add-to-cart-products-${product.id}`}
          onClick={handleAddToCart}
          className={`mt-3 w-full rounded-xl py-2.5 text-xs font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${added ? 'bg-[#1A5C38] text-white' : 'border border-[#1A5C38] text-[#1A5C38] hover:bg-[#1A5C38] hover:text-white'}`}
        >
          {added ? <><Check className="h-3.5 w-3.5" />Added!</> : <><svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>Add to Cart</>}
        </button>
      </div>
    </article>
  );
}

export default function ProductsPage() {
  const [searchQ, setSearchQ] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let list = [...DUMMY_PRODUCTS];
    if (searchQ) list = list.filter(p => p.name.toLowerCase().includes(searchQ.toLowerCase()) || p.description.toLowerCase().includes(searchQ.toLowerCase()));
    if (category) list = list.filter(p => p.categorySlug === category);
    if (sort === 'price_asc') list.sort((a, b) => a.price - b.price);
    else if (sort === 'price_desc') list.sort((a, b) => b.price - a.price);
    else if (sort === 'rating') list.sort((a, b) => b.rating - a.rating);
    else list.sort((a, b) => b.reviewCount - a.reviewCount);
    return list;
  }, [searchQ, category, sort]);

  return (
    <div>
      {/* Page header */}
      <div className="mb-6">
        <h1 style={{ fontFamily: 'var(--font-heading)' }} className="text-3xl font-bold text-gray-900">
          {category ? DUMMY_CATEGORIES.find(c => c.slug === category)?.name ?? 'Products' : 'All Products'}
        </h1>
        <p className="mt-1 text-sm text-gray-500">{filtered.length} products found</p>
      </div>

      <div className="flex gap-8">
        {/* ── Sidebar Filters ── */}
        <aside className={`${showFilters ? 'block' : 'hidden'} lg:block w-64 shrink-0`}>
          <div className="sticky top-32 rounded-2xl bg-white p-5 shadow-sm border border-gray-100 space-y-6">
            {/* Search */}
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)' }} className="mb-3 text-sm font-semibold text-gray-900">Search</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
                <input
                  value={searchQ}
                  onChange={(e) => setSearchQ(e.target.value)}
                  placeholder="Search products..."
                  className="w-full rounded-xl border border-gray-200 py-2 pl-9 pr-3 text-sm focus:border-[#1A5C38] focus:outline-none focus:ring-1 focus:ring-[#1A5C38]/20"
                />
              </div>
            </div>

            {/* Categories */}
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)' }} className="mb-3 text-sm font-semibold text-gray-900">Category</h3>
              <div className="space-y-1">
                <button
                  onClick={() => setCategory('')}
                  className={`w-full rounded-xl px-3 py-2 text-left text-sm transition-colors ${!category ? 'bg-[#1A5C38]/10 font-semibold text-[#1A5C38]' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  All Categories
                </button>
                {DUMMY_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setCategory(cat.slug)}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition-colors ${category === cat.slug ? 'bg-[#1A5C38]/10 font-semibold text-[#1A5C38]' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{cat.icon}</span>
                      {cat.name}
                    </span>
                    <span className="text-xs text-gray-400">{cat.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)' }} className="mb-3 text-sm font-semibold text-gray-900">Sort By</h3>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-[#1A5C38] focus:outline-none"
              >
                <option value="">Most Popular</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {(searchQ || category || sort) && (
              <button
                onClick={() => { setSearchQ(''); setCategory(''); setSort(''); }}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-500 hover:bg-gray-50 transition-colors"
              >
                <X className="h-3.5 w-3.5" />
                Clear Filters
              </button>
            )}
          </div>
        </aside>

        {/* ── Product Grid ── */}
        <div className="flex-1">
          {/* Mobile filter toggle */}
          <div className="mb-4 flex items-center justify-between lg:hidden">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {(searchQ || category || sort) && (
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#1A5C38] text-[9px] text-white">!</span>
              )}
            </button>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-[#1A5C38] focus:outline-none"
            >
              <option value="">Sort: Popular</option>
              <option value="price_asc">Price: Low–High</option>
              <option value="price_desc">Price: High–Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="mb-4 text-5xl">🔍</div>
              <h3 style={{ fontFamily: 'var(--font-heading)' }} className="mb-2 text-xl font-semibold text-gray-900">No products found</h3>
              <p className="mb-6 text-gray-500">Try adjusting your filters or search query.</p>
              <button
                onClick={() => { setSearchQ(''); setCategory(''); setSort(''); }}
                className="rounded-full bg-[#1A5C38] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#0F3D24] transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
