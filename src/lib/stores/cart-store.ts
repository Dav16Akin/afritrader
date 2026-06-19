import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem } from '@/lib/utils/types';

interface CartState {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  isSyncing: boolean;
  lastSynced: number | null;

  // Optimistic actions
  addItem: (item: CartItem) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;

  // Sync state
  setSyncing: (syncing: boolean) => void;
  setLastSynced: (timestamp: number) => void;
  rollback: (previousItems: CartItem[]) => void;
  setItems: (items: CartItem[]) => void;
}

function calculateTotals(items: CartItem[]) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);
  return { subtotal, itemCount };
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      itemCount: 0,
      subtotal: 0,
      isSyncing: false,
      lastSynced: null,

      addItem: (item) => {
        const items = get().items;
        const existing = items.find((i) => i.productId === item.productId);
        let newItems: CartItem[];

        if (existing) {
          newItems = items.map((i) =>
            i.productId === item.productId
              ? { ...i, quantity: i.quantity + item.quantity }
              : i,
          );
        } else {
          newItems = [...items, item];
        }

        set({ items: newItems, ...calculateTotals(newItems) });
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity < 1) return;
        const items = get().items.map((i) =>
          i.id === itemId ? { ...i, quantity } : i,
        );
        set({ items, ...calculateTotals(items) });
      },

      removeItem: (itemId) => {
        const items = get().items.filter((i) => i.id !== itemId);
        set({ items, ...calculateTotals(items) });
      },

      clearCart: () => {
        set({ items: [], itemCount: 0, subtotal: 0, lastSynced: null });
      },

      setSyncing: (isSyncing) => set({ isSyncing }),
      setLastSynced: (timestamp) => set({ lastSynced: timestamp }),

      rollback: (previousItems) => {
        set({ items: previousItems, ...calculateTotals(previousItems), isSyncing: false });
      },

      setItems: (items) => {
        set({ items, ...calculateTotals(items), isSyncing: false, lastSynced: Date.now() });
      },
    }),
    {
      name: 'nairamarket-cart',
      partialize: (state) => ({
        items: state.items,
        itemCount: state.itemCount,
        subtotal: state.subtotal,
      }),
    },
  ),
);
