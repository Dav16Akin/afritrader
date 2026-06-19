'use client';

import { use, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { DUMMY_PRODUCTS } from '@/lib/dummy-data';
import { useCartStore } from '@/lib/stores/cart-store';
import { useUIStore } from '@/lib/stores/ui-store';
import {
  Star, Heart, ShoppingCart, Check, ArrowLeft,
  Truck, Shield, RotateCcw, ChevronRight,
} from 'lucide-react';

function formatPrice(price: number) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency', currency: 'NGN',
    minimumFractionDigits: 0, maximumFractionDigits: 0,
  }).format(price);
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductPage({ params }: PageProps) {
  const { slug } = use(params);
  const product = DUMMY_PRODUCTS.find((p) => p.slug === slug);
  if (!product) notFound();

  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const { addToast } = useUIStore();

  const discount = product.comparePrice
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : null;

  const handleAddToCart = () => {
    const timestamp = crypto.randomUUID();
    for (let i = 0; i < qty; i++) {
      addItem({
        id: `dummy-${product.id}-${timestamp}-${i}`,
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
      });
    }
    addToast(`${product.name} added to cart`, 'success');
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const related = DUMMY_PRODUCTS.filter(
    (p) => p.categorySlug === product.categorySlug && p.id !== product.id,
  ).slice(0, 4);

  return (
    <div className="space-y-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500">
        <Link href="/" className="hover:text-[#1A5C38] transition-colors">Home</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/products" className="hover:text-[#1A5C38] transition-colors">Products</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href={`/products?category=${product.categorySlug}`} className="hover:text-[#1A5C38] transition-colors capitalize">{product.category}</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-gray-900 font-medium line-clamp-1">{product.name}</span>
      </nav>

      {/* Main Content */}
      <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
        {/* Image */}
        <div className="space-y-3">
          <div className="relative aspect-square overflow-hidden rounded-3xl bg-gray-50 border border-gray-100">
            {product.badge && (
              <span className="absolute left-4 top-4 z-10 rounded-full bg-[#1A5C38] px-3 py-1 text-xs font-semibold text-white shadow">
                {product.badge}
              </span>
            )}
            {discount && (
              <span className="absolute right-4 top-4 z-10 rounded-full bg-[#E8A020] px-3 py-1 text-xs font-semibold text-white shadow">
                -{discount}% OFF
              </span>
            )}
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          {/* Thumbnail row (decorative) */}
          <div className="flex gap-3">
            {[product.image, product.image, product.image].map((src, i) => (
              <div key={i} className={`relative aspect-square w-20 overflow-hidden rounded-xl border-2 cursor-pointer transition-colors ${i === 0 ? 'border-[#1A5C38]' : 'border-gray-100 hover:border-gray-300'}`}>
                <Image src={src} alt={`${product.name} view ${i + 1}`} fill className="object-cover" sizes="80px" />
              </div>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="space-y-5">
          <div>
            <p className="mb-1 text-sm font-medium uppercase tracking-wider text-[#1A5C38]">
              {product.category}
            </p>
            <h1 style={{ fontFamily: 'var(--font-heading)' }} className="text-2xl font-bold text-gray-900 sm:text-3xl leading-tight">
              {product.name}
            </h1>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-3">
            <div className="flex">
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-[#E8A020] text-[#E8A020]' : 'fill-gray-200 text-gray-200'}`} />
              ))}
            </div>
            <span className="text-sm font-semibold text-gray-900">{product.rating}</span>
            <span className="text-sm text-gray-500">({product.reviewCount} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 rounded-2xl bg-gray-50 p-4">
            <span style={{ fontFamily: 'var(--font-heading)' }} className="text-3xl font-extrabold text-gray-900">
              {formatPrice(product.price)}
            </span>
            {product.comparePrice && (
              <>
                <span className="text-lg text-gray-400 line-through">{formatPrice(product.comparePrice)}</span>
                <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-sm font-semibold text-green-700">
                  Save {formatPrice(product.comparePrice - product.price)}
                </span>
              </>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>

          {/* Quantity + Cart */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900">Quantity</label>
            <div className="flex items-center gap-4">
              <div className="flex items-center rounded-xl border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors text-lg font-medium"
                >
                  −
                </button>
                <span className="px-4 py-2.5 text-sm font-semibold text-gray-900 min-w-[3rem] text-center border-x border-gray-200">
                  {qty}
                </span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors text-lg font-medium"
                >
                  +
                </button>
              </div>
              <span className="text-xs text-gray-400">In stock</span>
            </div>

            <div className="flex gap-3">
              <button
                id={`add-to-cart-pdp-${product.id}`}
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold transition-all duration-300 ${
                  added
                    ? 'bg-[#1A5C38] text-white'
                    : 'bg-[#1A5C38] text-white hover:bg-[#0F3D24]'
                } shadow-sm hover:shadow-md`}
              >
                {added ? <><Check className="h-4 w-4" />Added to Cart!</> : <><ShoppingCart className="h-4 w-4" />Add to Cart</>}
              </button>
              <button className="flex items-center justify-center rounded-xl border border-gray-200 p-3.5 text-gray-500 hover:text-red-500 hover:border-red-200 transition-colors">
                <Heart className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Trust info */}
          <div className="grid grid-cols-3 gap-3 rounded-2xl border border-gray-100 bg-gray-50/50 p-4">
            {[
              { icon: Truck, label: 'Free Delivery', sub: 'Orders over ₦50k' },
              { icon: Shield, label: 'Buyer Protection', sub: '100% guaranteed' },
              { icon: RotateCcw, label: 'Easy Returns', sub: '30-day returns' },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="text-center">
                <Icon className="mx-auto mb-1.5 h-5 w-5 text-[#1A5C38]" />
                <p className="text-xs font-semibold text-gray-900">{label}</p>
                <p className="text-[10px] text-gray-500">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 style={{ fontFamily: 'var(--font-heading)' }} className="text-2xl font-bold text-gray-900">
              You May Also Like
            </h2>
            <Link href={`/products?category=${product.categorySlug}`} className="flex items-center gap-1 text-sm font-medium text-[#1A5C38] hover:text-[#0F3D24]">
              View All <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-4">
            {related.map((rel) => (
              <Link key={rel.id} href={`/products/${rel.slug}`}>
                <div className="group relative rounded-2xl border border-gray-100 bg-white overflow-hidden hover:shadow-md transition-all">
                  <div className="relative aspect-square bg-gray-50">
                    <Image src={rel.image} alt={rel.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="25vw" />
                  </div>
                  <div className="p-3">
                    <p className="text-xs font-medium uppercase text-[#1A5C38]">{rel.category}</p>
                    <p className="mt-0.5 text-sm font-semibold text-gray-900 line-clamp-1 group-hover:text-[#1A5C38] transition-colors">{rel.name}</p>
                    <p style={{ fontFamily: 'var(--font-heading)' }} className="mt-1 text-sm font-bold text-gray-900">{formatPrice(rel.price)}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Back link */}
      <Link href="/products" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#1A5C38] transition-colors">
        <ArrowLeft className="h-4 w-4" />
        Back to Products
      </Link>
    </div>
  );
}
