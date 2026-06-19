/**
 * Dummy data for AfriTrader — used while backend services are offline.
 */

export interface DummyProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  comparePrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  category: string;
  categorySlug: string;
  inStock: boolean;
  badge?: string;
}

export interface DummyCategory {
  id: string;
  name: string;
  slug: string;
  icon: string;
  count: number;
  bgColor: string;
}

export const DUMMY_CATEGORIES: DummyCategory[] = [
  { id: '1', name: 'Fashion',     slug: 'fashion',     icon: '👗', count: 248, bgColor: '#FFF0E0' },
  { id: '2', name: 'Electronics', slug: 'electronics', icon: '📱', count: 180, bgColor: '#E8F4FD' },
  { id: '3', name: 'Home & Garden',slug: 'home',       icon: '🏠', count: 156, bgColor: '#E8F8E8' },
  { id: '4', name: 'Shoes',       slug: 'shoes',       icon: '👟', count: 134, bgColor: '#F8E8FF' },
  { id: '5', name: 'Bags',        slug: 'bags',        icon: '👜', count: 98,  bgColor: '#FFF8E0' },
  { id: '6', name: 'Jewelry',     slug: 'jewelry',     icon: '💍', count: 87,  bgColor: '#FFF0F0' },
  { id: '7', name: 'Laptops',     slug: 'laptops',     icon: '💻', count: 64,  bgColor: '#F0F8FF' },
  { id: '8', name: 'Books',       slug: 'books',       icon: '📚', count: 312, bgColor: '#F8F0E8' },
];

export const DUMMY_PRODUCTS: DummyProduct[] = [
  {
    id: 'p1',
    name: 'Ankara Dashiki Shirt',
    slug: 'ankara-dashiki-shirt',
    description: 'Vibrant hand-made Ankara Dashiki shirt crafted from 100% African wax cotton.',
    price: 12500,
    comparePrice: 18000,
    image: '/product-fashion.png',
    rating: 4.8,
    reviewCount: 127,
    category: 'Fashion',
    categorySlug: 'fashion',
    inStock: true,
    badge: 'Best Seller',
  },
  {
    id: 'p2',
    name: 'AURA Wireless Earbuds X8',
    slug: 'aura-wireless-earbuds-x8',
    description: 'IPX5 waterproof true wireless earbuds with 30-hour total battery life and active noise cancellation.',
    price: 28500,
    comparePrice: 35000,
    image: '/product-electronics.png',
    rating: 4.6,
    reviewCount: 312,
    category: 'Electronics',
    categorySlug: 'electronics',
    inStock: true,
    badge: 'Hot Deal',
  },
  {
    id: 'p3',
    name: 'Handcarved Zebra Wood Bowl',
    slug: 'handcarved-zebra-wood-bowl',
    description: 'Handcrafted decorative bowl with traditional African geometric carvings. Made from sustainably sourced wood.',
    price: 9800,
    image: '/product-homegoods.png',
    rating: 4.9,
    reviewCount: 84,
    category: 'Home & Garden',
    categorySlug: 'home',
    inStock: true,
  },
  {
    id: 'p4',
    name: 'Kente Leather Satchel',
    slug: 'kente-leather-satchel',
    description: 'Premium leather handbag with authentic Kente cloth accent trim. Spacious interior with multiple compartments.',
    price: 45000,
    comparePrice: 58000,
    image: '/product-bag.png',
    rating: 4.7,
    reviewCount: 53,
    category: 'Bags',
    categorySlug: 'bags',
    inStock: true,
    badge: 'New In',
  },
  {
    id: 'p5',
    name: 'Afrika Tribal Sneakers',
    slug: 'afrika-tribal-sneakers',
    description: 'Limited-edition sneakers featuring bold African geometric print. Comfortable sole with premium uppers.',
    price: 38000,
    comparePrice: 45000,
    image: '/product-shoes.png',
    rating: 4.5,
    reviewCount: 198,
    category: 'Shoes',
    categorySlug: 'shoes',
    inStock: true,
  },
  {
    id: 'p6',
    name: 'Masai Beaded Collar Necklace',
    slug: 'masai-beaded-collar-necklace',
    description: 'Authentic Masai-inspired beaded bib necklace with intricate gold-tone fringe. Handcrafted by artisans.',
    price: 7500,
    image: '/product-jewelry.png',
    rating: 4.8,
    reviewCount: 76,
    category: 'Jewelry',
    categorySlug: 'jewelry',
    inStock: true,
    badge: 'Artisan',
  },
  {
    id: 'p7',
    name: 'ProMax 15" Laptop',
    slug: 'promax-15-laptop',
    description: 'Powerful 15-inch laptop with M3 chip, 16GB RAM, and 512GB SSD. Perfect for professionals.',
    price: 895000,
    comparePrice: 1050000,
    image: '/product-laptop.png',
    rating: 4.7,
    reviewCount: 41,
    category: 'Electronics',
    categorySlug: 'electronics',
    inStock: true,
  },
  {
    id: 'p8',
    name: 'Phantom 5G Smartphone',
    slug: 'phantom-5g-smartphone',
    description: 'Flagship 5G smartphone with 200MP camera system, 5000mAh battery, and 256GB storage.',
    price: 285000,
    comparePrice: 320000,
    image: '/product-phone.png',
    rating: 4.6,
    reviewCount: 229,
    category: 'Electronics',
    categorySlug: 'electronics',
    inStock: true,
    badge: 'Popular',
  },
];

export const FEATURED_PRODUCTS = DUMMY_PRODUCTS.filter((p) => p.badge);
export const TRENDING_PRODUCTS = [...DUMMY_PRODUCTS].sort((a, b) => b.reviewCount - a.reviewCount);
