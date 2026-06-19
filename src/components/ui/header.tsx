'use client';

import Link from 'next/link';
import { useCartStore } from '@/lib/stores/cart-store';
import { useAuthStore } from '@/lib/stores/auth-store';
import { useUIStore } from '@/lib/stores/ui-store';
import { Button } from './button';
import {
  ShoppingCart, Menu, X, User, Search,
  ChevronDown, Globe, MapPin
} from 'lucide-react';
import { useState } from 'react';

const NAV_LINKS = [
  {
    label: 'Categories',
    href: '/products',
    children: [
      { label: 'Fashion', href: '/products?category=fashion' },
      { label: 'Electronics', href: '/products?category=electronics' },
      { label: 'Home & Garden', href: '/products?category=home' },
      { label: 'Shoes', href: '/products?category=shoes' },
      { label: 'Bags', href: '/products?category=bags' },
      { label: 'Jewelry', href: '/products?category=jewelry' },
    ],
  },
  { label: 'Deals', href: '/products?sort=price_asc' },
  { label: "What's New", href: '/products?sort=newest' },
  { label: 'Delivery', href: '/products' },
];

export function Header() {
  const itemCount = useCartStore((s) => s.itemCount);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu, openCartDrawer } = useUIStore();
  const [searchValue, setSearchValue] = useState('');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-40 shadow-sm">
      {/* ── Announcement Bar ── */}
      <div className="bg-[#1A5C38] text-white text-xs py-2 overflow-hidden">
        <div className="ticker-track gap-12 px-4">
          {[
            '📞 +234 (0) 800 AFRITRADER',
            '🎉 Get 50% Off on Selected Items',
            '🛍️ Shop Now — Free Delivery on orders above ₦50,000',
            '🌍 Serving all 36 Nigerian states',
            '🔒 100% Secure Payments',
            '📞 +234 (0) 800 AFRITRADER',
            '🎉 Get 50% Off on Selected Items',
            '🛍️ Shop Now — Free Delivery on orders above ₦50,000',
            '🌍 Serving all 36 Nigerian states',
            '🔒 100% Secure Payments',
          ].map((text, i) => (
            <span key={i} className="inline-flex items-center gap-6 mr-12">
              {text}
              {i % 5 !== 4 && <span className="text-white/30">|</span>}
            </span>
          ))}
        </div>
      </div>

      {/* ── Main Header ── */}
      <div className="bg-white border-b border-gray-100">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            href="/"
            onClick={closeMobileMenu}
            className="flex items-center gap-2 shrink-0"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1A5C38]">
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-white" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z" strokeLinejoin="round" strokeLinecap="round"/>
                <path d="M2 17l10 5 10-5" strokeLinecap="round"/>
                <path d="M2 12l10 5 10-5" strokeLinecap="round"/>
              </svg>
            </div>
            <span
              style={{ fontFamily: 'var(--font-heading)' }}
              className="text-xl font-bold tracking-tight"
            >
              <span className="text-[#1A5C38]">Afri</span>
              <span className="text-[#E8A020]">Trader</span>
            </span>
          </Link>

          {/* Search Bar */}
          <form
            action="/products"
            method="get"
            className="hidden flex-1 md:flex items-center max-w-xl mx-auto"
          >
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input
                name="q"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search Product"
                className="w-full rounded-full border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 transition focus:border-[#1A5C38] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1A5C38]/20"
              />
            </div>
          </form>

          {/* Right icons */}
          <div className="flex items-center gap-1 sm:gap-2 ml-auto md:ml-0">
            {/* Language picker (decorative) */}
            <button className="hidden sm:flex items-center gap-1 text-xs text-gray-500 hover:text-[#1A5C38] px-2 py-1 rounded-lg hover:bg-gray-50 transition">
              <Globe className="h-3.5 w-3.5" />
              <span>Eng</span>
              <ChevronDown className="h-3 w-3" />
            </button>

            {/* Location (decorative) */}
            <button className="hidden lg:flex items-center gap-1 text-xs text-gray-500 hover:text-[#1A5C38] px-2 py-1 rounded-lg hover:bg-gray-50 transition">
              <MapPin className="h-3.5 w-3.5" />
              <span>Location</span>
              <ChevronDown className="h-3 w-3" />
            </button>

            {/* Account */}
            {isAuthenticated ? (
              <Link
                href="/account/orders"
                className="flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-[#1A5C38] px-2 py-1 rounded-lg hover:bg-gray-50 transition"
              >
                <User className="h-5 w-5" />
                <span className="hidden sm:inline">{user?.firstName ?? 'Account'}</span>
              </Link>
            ) : (
              <Link href="/auth/login">
                <Button
                  variant="ghost"
                  size="sm"
                  className="hidden sm:flex items-center gap-1.5 !text-gray-700 hover:!text-[#1A5C38]"
                >
                  <User className="h-4 w-4" />
                  Account
                </Button>
              </Link>
            )}

            {/* Cart */}
            <button
              id="cart-button"
              onClick={openCartDrawer}
              className="relative flex items-center gap-1.5 px-2 py-1 text-gray-700 hover:text-[#1A5C38] rounded-lg hover:bg-gray-50 transition"
              aria-label={`Cart with ${itemCount} items`}
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="hidden sm:inline text-sm font-medium">Cart</span>
              {itemCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#1A5C38] text-[9px] font-bold text-white shadow-sm">
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-gray-700 md:hidden rounded-lg hover:bg-gray-50 transition"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Navigation Bar ── */}
      <nav className="hidden md:block bg-white border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 h-11">
            {NAV_LINKS.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.children && setOpenDropdown(link.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={link.href}
                  className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#1A5C38] rounded-lg hover:bg-gray-50 transition whitespace-nowrap"
                >
                  {link.label}
                  {link.children && <ChevronDown className="h-3.5 w-3.5 text-gray-400" />}
                </Link>

                {link.children && openDropdown === link.label && (
                  <div className="absolute left-0 top-full pt-1 z-50 animate-scale-in">
                    <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-2 min-w-[180px]">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-3 py-2 text-sm text-gray-700 hover:text-[#1A5C38] hover:bg-[#1A5C38]/5 rounded-lg transition"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* ── Mobile Menu ── */}
      {isMobileMenuOpen && (
        <nav className="border-t border-gray-100 bg-white px-4 py-4 md:hidden animate-slide-up">
          {/* Mobile Search */}
          <form action="/products" method="get" className="relative mb-4">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              name="q"
              placeholder="Search products..."
              className="w-full rounded-full border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm focus:border-[#1A5C38] focus:outline-none"
            />
          </form>
          <div className="flex flex-col gap-1">
            {[
              { label: 'Shop All', href: '/products' },
              { label: 'Fashion', href: '/products?category=fashion' },
              { label: 'Electronics', href: '/products?category=electronics' },
              { label: 'Home & Garden', href: '/products?category=home' },
              { label: 'Shoes', href: '/products?category=shoes' },
              { label: 'Bags & Accessories', href: '/products?category=bags' },
              { label: 'Deals', href: '/products?sort=price_asc' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-[#1A5C38]/5 hover:text-[#1A5C38] transition"
                onClick={closeMobileMenu}
              >
                {link.label}
              </Link>
            ))}
          </div>
          {!isAuthenticated && (
            <div className="mt-4 flex gap-2 border-t border-gray-100 pt-4">
              <Link href="/auth/login" className="flex-1" onClick={closeMobileMenu}>
                <Button variant="outline" size="md" className="w-full">Sign In</Button>
              </Link>
              <Link href="/auth/register" className="flex-1" onClick={closeMobileMenu}>
                <Button variant="primary" size="md" className="w-full !bg-[#1A5C38] hover:!bg-[#0F3D24]">Register</Button>
              </Link>
            </div>
          )}
        </nav>
      )}
    </header>
  );
}
