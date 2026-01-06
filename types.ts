
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number; // Price before discount
  category: string;
  image: string;
  description: string;
  moq?: string; // Minimum Order Quantity
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface SearchResult {
  products: Product[];
  aiAdvice?: string;
}

export interface CartItem extends Product {
  quantity: number;
}
