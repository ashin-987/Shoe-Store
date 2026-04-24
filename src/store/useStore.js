import { create } from 'zustand';

// Product data - in a real app, this would come from an API
const productData = [
  {
    id: 1,
    name: 'Air Max Pulse',
    category: 'Running',
    price: 149.99,
    colors: ['Black/White', 'Triple White', 'Volt/Black'],
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
    description: 'Experience the perfect fusion of style and performance with Air Max Pulse. Featuring revolutionary cushioning technology and a bold, contemporary design.',
    features: ['Max Air cushioning', 'Breathable mesh upper', 'Durable rubber outsole', 'Reflective details'],
    modelPath: '/models/shoe1.glb', // In real app, this would be actual 3D model
  },
  {
    id: 2,
    name: 'Pegasus Turbo',
    category: 'Running',
    price: 189.99,
    colors: ['Blue/Orange', 'All Black', 'White/Red'],
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
    description: 'The pinnacle of speed meets unparalleled comfort. Pegasus Turbo delivers elite-level performance for runners who demand the best.',
    features: ['ZoomX foam', 'Carbon fiber plate', 'Lightweight knit upper', 'Enhanced energy return'],
    modelPath: '/models/shoe2.glb',
  },
  {
    id: 3,
    name: 'Cortez Classic',
    category: 'Lifestyle',
    price: 89.99,
    colors: ['White/Red/Blue', 'All White', 'Black/White'],
    sizes: [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12, 13],
    description: 'An icon since 1972. The Cortez combines timeless style with legendary comfort, perfect for everyday wear.',
    features: ['Classic foam midsole', 'Premium leather upper', 'Herringbone outsole', 'Retro styling'],
    modelPath: '/models/shoe3.glb',
  },
  {
    id: 4,
    name: 'React Infinity',
    category: 'Running',
    price: 159.99,
    colors: ['Crimson/White', 'Triple Black', 'Blue Void'],
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
    description: 'Designed to keep you running. React Infinity provides superior cushioning and stability for your longest runs.',
    features: ['React foam technology', 'Flyknit upper', 'Rocker shape geometry', 'Injury prevention design'],
    modelPath: '/models/shoe4.glb',
  },
  {
    id: 5,
    name: 'Blazer Mid 77',
    category: 'Lifestyle',
    price: 109.99,
    colors: ['White/Black', 'Vintage Green', 'University Red'],
    sizes: [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12, 13],
    description: 'Basketball heritage meets modern street style. The Blazer Mid 77 brings vintage vibes with contemporary comfort.',
    features: ['Vintage styling', 'Leather and suede upper', 'Exposed foam tongue', 'Classic Nike branding'],
    modelPath: '/models/shoe5.glb',
  },
  {
    id: 6,
    name: 'Metcon 8',
    category: 'Training',
    price: 139.99,
    colors: ['Black/White', 'Gym Red', 'Navy/Gold'],
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12, 13],
    description: 'The ultimate training shoe. Metcon 8 delivers unmatched stability and durability for high-intensity workouts.',
    features: ['Wide, flat heel', 'Hyperlift insert', 'Rope grip tread', 'Reinforced sidewalls'],
    modelPath: '/models/shoe6.glb',
  },
];

export const useStore = create((set, get) => ({
  // Products state
  products: productData,
  selectedProduct: productData[0],
  filteredProducts: productData,
  
  // UI state
  selectedCategory: 'All',
  selectedColor: null,
  selectedSize: null,
  isLoading: false,
  view3DActive: true,
  
  // Cart state
  cart: [],
  cartOpen: false,
  
  // Animation state
  mousePosition: { x: 0, y: 0 },
  scrollProgress: 0,
  
  // Actions
  setSelectedProduct: (product) => set({ selectedProduct: product }),
  
  setSelectedCategory: (category) => {
    set({ selectedCategory: category });
    const products = get().products;
    const filtered = category === 'All' 
      ? products 
      : products.filter(p => p.category === category);
    set({ filteredProducts: filtered });
  },
  
  setSelectedColor: (color) => set({ selectedColor: color }),
  
  setSelectedSize: (size) => set({ selectedSize: size }),
  
  toggleView3D: () => set({ view3DActive: !get().view3DActive }),
  
  // Cart actions
  addToCart: (product, color, size) => {
    const cart = get().cart;
    const existingItem = cart.find(
      item => item.product.id === product.id && 
              item.color === color && 
              item.size === size
    );
    
    if (existingItem) {
      set({
        cart: cart.map(item =>
          item === existingItem
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      });
    } else {
      set({
        cart: [...cart, { product, color, size, quantity: 1 }],
      });
    }
  },
  
  removeFromCart: (index) => {
    const cart = get().cart;
    set({ cart: cart.filter((_, i) => i !== index) });
  },
  
  updateQuantity: (index, quantity) => {
    const cart = get().cart;
    if (quantity <= 0) {
      get().removeFromCart(index);
    } else {
      set({
        cart: cart.map((item, i) =>
          i === index ? { ...item, quantity } : item
        ),
      });
    }
  },
  
  toggleCart: () => set({ cartOpen: !get().cartOpen }),
  
  getCartTotal: () => {
    return get().cart.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  },
  
  getCartItemCount: () => {
    return get().cart.reduce((count, item) => count + item.quantity, 0);
  },
  
  // Mouse tracking
  updateMousePosition: (x, y) => set({ mousePosition: { x, y } }),
  
  // Scroll tracking
  updateScrollProgress: (progress) => set({ scrollProgress: progress }),
}));
