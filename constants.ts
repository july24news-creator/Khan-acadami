
import { Product, Category } from './types';

export const CATEGORIES: Category[] = [
  { id: '1', name: 'Apparel & Accessories', icon: 'shirt' },
  { id: '2', name: 'Consumer Electronics', icon: 'smartphone' },
  { id: '3', name: 'Sports & Entertainment', icon: 'dumbbell' },
  { id: '4', name: 'Beauty', icon: 'sparkles' },
  { id: '5', name: 'Jewelry, Eyewear & Watches', icon: 'watch' },
  { id: '6', name: 'Home & Garden', icon: 'home' },
  { id: '7', name: 'Machinery', icon: 'factory' },
  { id: '8', name: 'Vehicles & Accessories', icon: 'car' },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Smart Watch Ultra 2nd Gen',
    price: 5500,
    originalPrice: 7500,
    category: 'Consumer Electronics',
    image: 'https://picsum.photos/seed/watch/300/300',
    description: 'High-end smart watch with blood oxygen sensor and always-on display.',
    moq: '5 pieces'
  },
  {
    id: 'p2',
    name: 'Business Sedan Luxury Edition',
    price: 3000000,
    originalPrice: 3200000,
    category: 'Vehicles & Accessories',
    image: 'https://picsum.photos/seed/car/300/300',
    description: 'Electric sedan with autonomous driving features.',
    moq: '1 unit'
  },
  {
    id: 'p3',
    name: 'iPhone 15 Pro Max Clone',
    price: 24000,
    originalPrice: 28000,
    category: 'Consumer Electronics',
    image: 'https://picsum.photos/seed/phone/300/300',
    description: 'High-quality smartphone with 5G connectivity and triple camera.',
    moq: '10 pieces'
  },
  {
    id: 'p4',
    name: 'Cotton Hoodie Premium',
    price: 1500,
    originalPrice: 1800,
    category: 'Apparel & Accessories',
    image: 'https://picsum.photos/seed/hoodie/300/300',
    description: '100% organic cotton hoodie with custom branding options.',
    moq: '100 pieces'
  },
  {
    id: 'p5',
    name: 'Skincare Serum Vitamin C',
    price: 450,
    originalPrice: 600,
    category: 'Beauty',
    image: 'https://picsum.photos/seed/serum/300/300',
    description: 'Anti-aging skin repair serum with high concentration of Vit-C.',
    moq: '500 units'
  },
  {
    id: 'p6',
    name: 'Industrial Laser Welder',
    price: 540000,
    category: 'Machinery',
    image: 'https://picsum.photos/seed/machine/300/300',
    description: 'High precision handheld fiber laser welding machine.',
    moq: '1 unit'
  }
];
