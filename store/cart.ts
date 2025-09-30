import { create } from 'zustand';
import { CartStore, CartItem, Product } from '@/types';

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isOpen: false,

  addItem: (product: Product, size: string, color: string, quantity: number) => {
    const { items } = get();
    const existingItem = items.find(
      item => 
        item.product.id === product.id && 
        item.size === size && 
        item.color === color
    );

    if (existingItem) {
      set({
        items: items.map(item =>
          item === existingItem
            ? { ...item, quantity: item.quantity + quantity }
            : item
        ),
      });
    } else {
      set({
        items: [...items, { product, size, color, quantity }],
      });
    }
  },

  removeItem: (productId: string, size: string, color: string) => {
    set({
      items: get().items.filter(
        item => !(
          item.product.id === productId && 
          item.size === size && 
          item.color === color
        )
      ),
    });
  },

  updateQuantity: (productId: string, size: string, color: string, quantity: number) => {
    if (quantity <= 0) {
      get().removeItem(productId, size, color);
      return;
    }

    set({
      items: get().items.map(item =>
        item.product.id === productId && 
        item.size === size && 
        item.color === color
          ? { ...item, quantity }
          : item
      ),
    });
  },

  clearCart: () => {
    set({ items: [] });
  },

  toggleCart: () => {
    set({ isOpen: !get().isOpen });
  },

  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },

  getTotalPrice: () => {
    return get().items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  },
}));

