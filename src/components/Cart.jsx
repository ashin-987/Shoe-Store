import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';

const CartItem = ({ item, index, onUpdateQuantity, onRemove }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ delay: index * 0.1 }}
      className="flex gap-4 p-4 glass rounded-xl border border-white/10"
    >
      {/* Product thumbnail */}
      <div className="w-24 h-24 bg-gradient-to-br from-nike-grey-900 to-nike-black rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
        <img 
          src={item.product.image} 
          alt={item.product.name}
          className="w-full h-full object-contain p-2"
        />
      </div>

      {/* Product details */}
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold mb-1 truncate">{item.product.name}</h4>
        <p className="text-sm text-white/60 mb-2">
          {item.color} • Size {item.size}
        </p>
        
        {/* Quantity controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white/10 rounded-lg">
            <button
              onClick={() => onUpdateQuantity(index, item.quantity - 1)}
              className="px-3 py-1 hover:bg-white/20 transition-colors rounded-l-lg"
            >
              −
            </button>
            <span className="px-3 py-1 min-w-[2rem] text-center">{item.quantity}</span>
            <button
              onClick={() => onUpdateQuantity(index, item.quantity + 1)}
              className="px-3 py-1 hover:bg-white/20 transition-colors rounded-r-lg"
            >
              +
            </button>
          </div>
          <span className="font-bold text-nike-orange">
            ${(item.product.price * item.quantity).toFixed(2)}
          </span>
        </div>
      </div>

      {/* Remove button */}
      <button
        onClick={() => onRemove(index)}
        className="text-white/40 hover:text-nike-orange transition-colors self-start"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </motion.div>
  );
};

const Cart = () => {
  const { cart, cartOpen, toggleCart, removeFromCart, updateQuantity, getCartTotal, getCartItemCount } = useStore();
  
  const total = getCartTotal();
  const itemCount = getCartItemCount();

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          {/* Cart Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-nike-grey-900 shadow-2xl z-[70] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold">Shopping Cart</h2>
                <button
                  onClick={toggleCart}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-white/60">
                {itemCount} {itemCount === 1 ? 'item' : 'items'}
              </p>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center"
                >
                  <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-12 h-12 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
                  <p className="text-white/60 mb-6">Add some products to get started</p>
                  <button
                    onClick={toggleCart}
                    className="btn-primary"
                  >
                    Continue Shopping
                  </button>
                </motion.div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {cart.map((item, index) => (
                    <CartItem
                      key={`${item.product.id}-${item.color}-${item.size}`}
                      item={item}
                      index={index}
                      onUpdateQuantity={updateQuantity}
                      onRemove={removeFromCart}
                    />
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-white/10 space-y-4">
                {/* Subtotal */}
                <div className="space-y-2">
                  <div className="flex justify-between text-white/60">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-white/60">
                    <span>Shipping</span>
                    <span className="text-nike-orange">FREE</span>
                  </div>
                  <div className="flex justify-between text-white/60">
                    <span>Tax</span>
                    <span>${(total * 0.1).toFixed(2)}</span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between text-2xl font-bold pt-4 border-t border-white/10">
                  <span>Total</span>
                  <span className="text-gradient-orange">${(total * 1.1).toFixed(2)}</span>
                </div>

                {/* Checkout Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full btn-primary text-lg py-4"
                >
                  Proceed to Checkout
                </motion.button>

                {/* Continue Shopping */}
                <button
                  onClick={toggleCart}
                  className="w-full text-white/60 hover:text-white transition-colors text-sm"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;
