import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  originalPrice?: number;
  size?: string;
  stock?: number;
  colors?: string[];
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
}

export interface Address {
  id: number;
  label: string;
  address: string;
  landmark: string;
  phone: string;
  name: string;
  pincode: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  saveForLater: (id: string) => void;
  savedItems: CartItem[];
  moveToWishlist: (id: string) => void;
  wishlistItems: CartItem[];
  selectedItems: string[];
  setSelectedItems: (ids: string[]) => void;
  removeSelectedItems: () => void;
  recentlyViewed: CartItem[];
  addToRecentlyViewed: (item: CartItem) => void;
  appliedCoupon: string | null;
  discount: number;
  applyCoupon: (code: string) => void;
  removeCoupon: () => void;
  orders: Order[];
  addOrder: () => void;
  addresses: Address[];
  addAddress: (address: Omit<Address, 'id'>) => void;
  updateAddress: (address: Address) => void;
  removeAddress: (id: number) => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      savedItems: [],
      wishlistItems: [],
      selectedItems: [],
      recentlyViewed: [],
      appliedCoupon: null,
      discount: 0,
      orders: [],
      addresses: [
          { id: 1, name: 'SAI', pincode: '560082', label: 'Home', address: 'Udaipalya village Bengaluru, Karnataka IN', landmark: 'Near the main road', phone: '7012345689' },
          { id: 2, name: 'Ravi Kumar', pincode: '560076', label: 'Work', address: 'Mysore Road, Bengaluru, Karnataka IN', landmark: 'Opposite tech park', phone: '7012345690' },
          { id: 3, name: 'Anjali Desai', pincode: '560078', label: 'Other', address: 'Electronic City, Bengaluru, Karnataka IN', landmark: 'Building A', phone: '7012345691' }
      ],
      addItem: (item) =>
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id);
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity: 1 }] };
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      updateQuantity: (id, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return {
              items: state.items.filter((item) => item.id !== id),
            };
          }
          return {
            items: state.items.map((item) =>
              item.id === id ? { ...item, quantity } : item
            ),
          };
        }),
      clearCart: () => set({ items: [] }),
      saveForLater: (id) =>
        set((state) => {
          const item = state.items.find((i) => i.id === id);
          if (!item) return state;
          return {
            items: state.items.filter((i) => i.id !== id),
            savedItems: [...state.savedItems, item],
          };
        }),
      moveToWishlist: (id) =>
        set((state) => {
          const item = state.items.find((i) => i.id === id);
          if (!item) return state;
          return {
            items: state.items.filter((i) => i.id !== id),
            wishlistItems: [...state.wishlistItems, item],
          };
        }),
      setSelectedItems: (ids) => set({ selectedItems: ids }),
      removeSelectedItems: () =>
        set((state) => ({
          items: state.items.filter((item) => !state.selectedItems.includes(item.id)),
          selectedItems: [],
        })),
      addToRecentlyViewed: (item) =>
        set((state) => ({
          recentlyViewed: [item, ...state.recentlyViewed.filter(i => i.id !== item.id)].slice(0, 4),
        })),
      applyCoupon: (code: string) => {
        const { items } = get();
        const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        
        const coupons = {
            "SAVE10": { type: "percentage", value: 0.1 },
            "SAVE20": { type: "percentage", value: 0.2 },
            "FREESHIP": { type: "shipping", value: 100 },
            "OFF250": { type: "fixed", value: 250 }
        };

        const coupon = coupons[code as keyof typeof coupons];

        if (coupon) {
            let discount = 0;
            if (coupon.type === 'percentage') {
                discount = subtotal * coupon.value;
            } else if (coupon.type === 'fixed') {
                discount = coupon.value;
            } else if (coupon.type === 'shipping') {
                // Shipping logic is handled in the component, but we can set discount if needed
                // For simplicity, we can say shipping discount is applied at checkout
                // Or let's assume a flat shipping fee that is waived
            }
            set({ appliedCoupon: code, discount });
        }
      },
      removeCoupon: () => {
        set({ appliedCoupon: null, discount: 0 });
      },
      addOrder: () => {
        set((state) => {
          const newOrder: Order = {
            id: `#${Math.floor(Math.random() * 900000) + 100000}`,
            date: new Date().toISOString(),
            items: state.items,
            total: state.items.reduce((sum, item) => sum + item.price * item.quantity, 0) + (state.items.reduce((sum, item) => sum + item.price * item.quantity, 0) * 0.18) - state.discount, // basic total calculation
          };
          return {
            orders: [...state.orders, newOrder],
            items: [], // Clear the cart
            appliedCoupon: null, // Reset coupon
            discount: 0, // Reset discount
          };
        });
      },
      addAddress: (address) => set((state) => ({ addresses: [...state.addresses, { ...address, id: Date.now() }] })),
      updateAddress: (address) => set((state) => ({ addresses: state.addresses.map(a => a.id === address.id ? address : a) })),
      removeAddress: (id) => set((state) => ({ addresses: state.addresses.filter(a => a.id !== id) })),
    }),
    {
      name: 'cart-storage',
    }
  )
);