import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import { QueryProvider } from '@/lib/utils/query-provider';
import { ToastContainer } from '@/components/ui/toast';
import { Header } from '@/components/ui/header';
import { CartDrawer } from '@/features/cart/components/cart-drawer';
import { Footer } from '@/components/ui';


const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
});

export const metadata: Metadata = {
  title: {
    template: '%s | AfriTrader',
    default: 'AfriTrader — Africa\'s Premier Online Marketplace',
  },
  description: 'Shop quality products from trusted African sellers. Fashion, Electronics, Home Goods and more — delivered to your doorstep.',
  keywords: 'Africa marketplace, buy online, African products, fashion, electronics',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="min-h-screen bg-[#F5F5F0] font-sans text-gray-900 antialiased">
        <QueryProvider>
          <Header />
          <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</main>
          <Footer />
          <CartDrawer />
          <ToastContainer />
        </QueryProvider>
      </body>
    </html>
  );
}
