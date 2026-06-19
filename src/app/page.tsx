import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Truck, Shield, Headphones, Star, Heart } from 'lucide-react';
import {
  DUMMY_CATEGORIES,
  TRENDING_PRODUCTS,
  FEATURED_PRODUCTS,
  type DummyProduct,
} from '@/lib/dummy-data';
import { AddToCartButton } from '@/components/ui';


/* ─── Format price ─── */
function formatPrice(price: number) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

/* ─── Star rating ─── */
function StarRating({ rating, count }: { rating: number; count: number }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className={`h-3 w-3 ${i < full ? 'fill-[#E8A020] text-[#E8A020]' : i === full && half ? 'fill-[#E8A020]/50 text-[#E8A020]' : 'fill-gray-200 text-gray-200'}`}
          />
        ))}
      </div>
      <span className="text-xs text-gray-500">({count})</span>
    </div>
  );
}

/* ─── Product Card ─── */
function DummyProductCard({ product }: { product: DummyProduct }) {
  const discount = product.comparePrice
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : null;

  return (
    <article className="product-card group relative rounded-2xl border border-gray-100 bg-white overflow-hidden">
      {/* Wishlist */}
      <button className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm shadow-sm text-gray-400 hover:text-red-500 transition-colors">
        <Heart className="h-4 w-4" />
      </button>

      {/* Badge */}
      {product.badge && (
        <span className="absolute left-3 top-3 z-10 rounded-full bg-[#1A5C38] px-2.5 py-0.5 text-[11px] font-semibold text-white">
          {product.badge}
        </span>
      )}
      {discount && !product.badge && (
        <span className="absolute left-3 top-3 z-10 rounded-full bg-red-500 px-2.5 py-0.5 text-[11px] font-semibold text-white">
          -{discount}%
        </span>
      )}

      {/* Image */}
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        <p className="mb-1 text-[11px] font-medium uppercase tracking-wide text-[#1A5C38]">
          {product.category}
        </p>
        <Link href={`/products/${product.slug}`}>
          <h3 className="mb-1.5 text-sm font-semibold text-gray-900 line-clamp-2 leading-snug hover:text-[#1A5C38] transition-colors">
            {product.name}
          </h3>
        </Link>

        <StarRating rating={product.rating} count={product.reviewCount} />

        <div className="mt-2 flex items-baseline gap-2">
          <span style={{ fontFamily: 'var(--font-heading)' }} className="text-base font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>
          {product.comparePrice && (
            <span className="text-xs text-gray-400 line-through">
              {formatPrice(product.comparePrice)}
            </span>
          )}
        </div>

        <AddToCartButton product={product} />
      </div>
    </article>
  );
}

/* ─── Section Header ─── */
function SectionHeader({ title, href }: { title: string; href: string }) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <h2
        style={{ fontFamily: 'var(--font-heading)' }}
        className="text-2xl font-bold text-gray-900"
      >
        {title}
      </h2>
      <Link
        href={href}
        className="flex items-center gap-1 text-sm font-medium text-[#1A5C38] hover:text-[#0F3D24] transition-colors"
      >
        View All
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

/* ─── Page ─── */
export default function HomePage() {
  return (
    <div className="space-y-14">

      {/* ── Hero Banner ── */}
      <section className="relative -mx-4 -mt-6 sm:-mx-6 lg:-mx-8 overflow-hidden">
        <div className="relative min-h-[340px] sm:min-h-[440px] bg-[#1A5C38] flex items-center">
          {/* Background image */}

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F3D24]/80 via-[#1A5C38]/60 to-transparent" />

          {/* Content */}
          <div className="relative z-10 px-6 sm:px-12 lg:px-16 max-w-2xl">
            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-[#E8A020]/20 border border-[#E8A020]/40 px-3 py-1 text-xs font-semibold text-[#E8A020] backdrop-blur-sm">
              🎉 Special Offer — Up to 50% Off
            </span>
            <h1
              style={{ fontFamily: 'var(--font-heading)' }}
              className="mb-4 text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl"
            >
              Shop Quality<br />
              <span className="text-[#E8A020]">African</span> Products
            </h1>
            <p className="mb-8 text-base text-white/80 sm:text-lg max-w-md">
              Get the best prices on fashion, electronics, home goods and more —
              delivered to your doorstep across Africa.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-full bg-[#E8A020] px-7 py-3 text-sm font-bold text-white shadow-lg hover:bg-[#C8880A] transition-all hover:shadow-xl hover:-translate-y-0.5"
              >
                Shop Now
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/products?sort=price_asc"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 bg-white/10 px-7 py-3 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/20 transition-all"
              >
                Best Deals
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features Bar ── */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          {
            icon: Truck,
            label: 'Free Delivery',
            desc: 'On orders above ₦50,000',
            color: 'bg-[#E8F8EE]',
            iconColor: 'text-[#1A5C38]',
          },
          {
            icon: Shield,
            label: 'Secure Payment',
            desc: 'Protected by Paystack',
            color: 'bg-[#FFF8E8]',
            iconColor: 'text-[#E8A020]',
          },
          {
            icon: Headphones,
            label: '24/7 Support',
            desc: 'Call or chat with us',
            color: 'bg-[#F0F4FF]',
            iconColor: 'text-blue-600',
          },
        ].map(({ icon: Icon, label, desc, color, iconColor }) => (
          <div
            key={label}
            className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className={`rounded-xl p-3 ${color}`}>
              <Icon className={`h-5 w-5 ${iconColor}`} />
            </div>
            <div>
              <p style={{ fontFamily: 'var(--font-heading)' }} className="font-semibold text-gray-900">
                {label}
              </p>
              <p className="text-xs text-gray-500">{desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* ── Categories ── */}
      <section>
        <SectionHeader title="Popular Categories" href="/products" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {DUMMY_CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/products?category=${cat.slug}`}
              className="group flex flex-col items-center gap-2 rounded-2xl bg-white p-4 text-center shadow-sm border border-gray-100 hover:border-[#1A5C38]/30 hover:shadow-md transition-all"
            >
              <div
                className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl transition-transform group-hover:scale-110"
                style={{ backgroundColor: cat.bgColor }}
              >
                {cat.icon}
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-900 group-hover:text-[#1A5C38] transition-colors leading-tight">
                  {cat.name}
                </p>
                <p className="text-[10px] text-gray-400">{cat.count} items</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section>
        <SectionHeader title="Featured Products" href="/products" />
        <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
          {FEATURED_PRODUCTS.map((product) => (
            <DummyProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ── Promo Banner ── */}
      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-[#0F3D24] via-[#1A5C38] to-[#2D7A4F] p-8 sm:p-12">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="mb-2 inline-block rounded-full bg-[#E8A020]/20 px-3 py-1 text-xs font-semibold text-[#E8A020]">
              Limited Time Offer
            </span>
            <h2
              style={{ fontFamily: 'var(--font-heading)' }}
              className="text-2xl font-extrabold text-white sm:text-3xl"
            >
              Up to <span className="text-[#E8A020]">50% Off</span> on Electronics
            </h2>
            <p className="mt-2 text-sm text-white/70">
              Shop the latest gadgets at unbeatable prices. Offer ends soon.
            </p>
          </div>
          <Link
            href="/products?category=electronics"
            className="shrink-0 inline-flex items-center gap-2 rounded-full bg-[#E8A020] px-8 py-3.5 text-sm font-bold text-white hover:bg-[#C8880A] transition-all hover:-translate-y-0.5 shadow-lg"
          >
            Shop Electronics
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ── Trending Products ── */}
      <section>
        <SectionHeader title="Trending Now" href="/products" />
        <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
          {TRENDING_PRODUCTS.map((product) => (
            <DummyProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ── Trust Badges ── */}
      <section className="rounded-3xl bg-white p-8 shadow-sm border border-gray-100">
        <h2
          style={{ fontFamily: 'var(--font-heading)' }}
          className="mb-8 text-center text-2xl font-bold text-gray-900"
        >
          Why Shop with AfriTrader?
        </h2>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {[
            { emoji: '🛡️', title: 'Buyer Protection',    desc: '100% purchase protection on every order' },
            { emoji: '🚀', title: 'Fast Delivery',        desc: 'Same-day delivery in Lagos & Abuja' },
            { emoji: '↩️', title: 'Easy Returns',         desc: '30-day hassle-free return policy' },
            { emoji: '🌍', title: 'Pan-African Shipping', desc: 'We ship to 15+ African countries' },
          ].map(({ emoji, title, desc }) => (
            <div key={title} className="text-center">
              <div className="mb-3 text-4xl">{emoji}</div>
              <h3 style={{ fontFamily: 'var(--font-heading)' }} className="mb-1 font-semibold text-gray-900">
                {title}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
