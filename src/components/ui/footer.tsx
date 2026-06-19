import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.47a2.78 2.78 0 00-1.95 1.95C1 8.12 1 12 1 12s0 3.88.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95C23 15.88 23 12 23 12s0-3.88-.46-5.58z"/>
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="mt-16 bg-[#0F3D24] text-white">
      {/* Upper section */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1A5C38]">
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-white" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" strokeLinejoin="round" strokeLinecap="round"/>
                  <path d="M2 17l10 5 10-5" strokeLinecap="round"/>
                  <path d="M2 12l10 5 10-5" strokeLinecap="round"/>
                </svg>
              </div>
              <span style={{ fontFamily: 'var(--font-heading)' }} className="text-xl font-bold">
                <span className="text-white">Afri</span>
                <span className="text-[#E8A020]">Trader</span>
              </span>
            </div>
            <p className="text-sm text-white/70 leading-relaxed mb-5">
              Africa&apos;s premier online marketplace connecting buyers and sellers across the continent with quality products and trusted service.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: FacebookIcon, href: '#', label: 'Facebook' },
                { Icon: TwitterIcon, href: '#', label: 'Twitter' },
                { Icon: InstagramIcon, href: '#', label: 'Instagram' },
                { Icon: YoutubeIcon, href: '#', label: 'YouTube' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white/70 hover:bg-[#E8A020] hover:text-white transition-all"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{ fontFamily: 'var(--font-heading)' }} className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#E8A020]">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Shop All Products', href: '/products' },
                { label: 'Fashion & Clothing', href: '/products?category=fashion' },
                { label: 'Electronics', href: '/products?category=electronics' },
                { label: 'Home & Garden', href: '/products?category=home' },
                { label: "Today's Deals", href: '/products?sort=price_asc' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/70 hover:text-[#E8A020] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 style={{ fontFamily: 'var(--font-heading)' }} className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#E8A020]">
              Customer Service
            </h3>
            <ul className="space-y-2.5">
              {[
                { label: 'My Account', href: '/account/orders' },
                { label: 'Track Your Order', href: '/account/orders' },
                { label: 'Returns & Refunds', href: '/products' },
                { label: 'Help Center', href: '/products' },
                { label: 'Size Guide', href: '/products' },
              ].map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-sm text-white/70 hover:text-[#E8A020] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 style={{ fontFamily: 'var(--font-heading)' }} className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#E8A020]">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-white/70">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#E8A020]" />
                <span>14 Broad Street, Lagos Island, Lagos, Nigeria</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/70">
                <Phone className="h-4 w-4 shrink-0 text-[#E8A020]" />
                <span>+234 800 AFRITRADER</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/70">
                <Mail className="h-4 w-4 shrink-0 text-[#E8A020]" />
                <span>hello@afritrader.ng</span>
              </li>
            </ul>

            {/* Newsletter */}
            <div className="mt-5">
              <p className="mb-2 text-xs font-medium text-white/80">Subscribe for deals & updates</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter email"
                  className="flex-1 rounded-lg bg-white/10 px-3 py-2 text-sm text-white placeholder-white/40 focus:bg-white/20 focus:outline-none focus:ring-1 focus:ring-[#E8A020]"
                />
                <button className="rounded-lg bg-[#E8A020] px-3 py-2 text-xs font-semibold text-white hover:bg-[#C8880A] transition-colors">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lower bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} AfriTrader. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
              <a key={item} href="#" className="text-xs text-white/50 hover:text-white/80 transition-colors">
                {item}
              </a>
            ))}
          </div>
          {/* Payment badges */}
          <div className="flex items-center gap-2">
            {['Mastercard', 'Visa', 'Paystack'].map((badge) => (
              <span
                key={badge}
                className="rounded bg-white/10 px-2 py-1 text-[10px] font-medium text-white/60"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
