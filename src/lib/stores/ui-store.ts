import { create } from 'zustand';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface UIState {
  isMobileMenuOpen: boolean;
  isCartDrawerOpen: boolean;
  toasts: Toast[];
  activeModal: string | null;

  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
  toggleCartDrawer: () => void;
  addToast: (message: string, type: Toast['type']) => void;
  removeToast: (id: string) => void;
  openModal: (id: string) => void;
  closeModal: () => void;
}

let toastCounter = 0;

export const useUIStore = create<UIState>()((set) => ({
  isMobileMenuOpen: false,
  isCartDrawerOpen: false,
  toasts: [],
  activeModal: null,

  toggleMobileMenu: () => set((s) => ({ isMobileMenuOpen: !s.isMobileMenuOpen })),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  openCartDrawer: () => set({ isCartDrawerOpen: true }),
  closeCartDrawer: () => set({ isCartDrawerOpen: false }),
  toggleCartDrawer: () => set((s) => ({ isCartDrawerOpen: !s.isCartDrawerOpen })),

  addToast: (message, type) => {
    const id = `toast-${++toastCounter}`;
    set((s) => ({ toasts: [...s.toasts, { id, message, type }] }));
    setTimeout(() => {
      set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }));
    }, 4000);
  },

  removeToast: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),

  openModal: (id) => set({ activeModal: id }),
  closeModal: () => set({ activeModal: null }),
}));
