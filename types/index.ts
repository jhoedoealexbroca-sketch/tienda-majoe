export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  category: 'men' | 'women' | 'kids-boys' | 'kids-girls';
  subcategory: string;
  images: string[];
  sizes: Size[];
  colors: Color[];
  stock: number;
  featured?: boolean;
  isNew?: boolean;
  onSale?: boolean;
}

export interface Size {
  name: string;
  value: string;
  available: boolean;
}

export interface Color {
  name: string;
  value: string;
  available: boolean;
}

export interface CartItem {
  product: Product;
  size: string;
  color: string;
  quantity: number;
}

export interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, size: string, color: string, quantity: number) => void;
  removeItem: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

