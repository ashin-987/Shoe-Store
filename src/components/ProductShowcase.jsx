import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { useState } from 'react';

const ProductCard = ({ product, index }) => {
  const { setSelectedProduct, addToCart } = useStore();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(null);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    addToCart(product, selectedColor, selectedSize);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="glass rounded-2xl overflow-hidden group cursor-pointer"
    >
      {/* Product Image Placeholder */}
      <div className="relative aspect-square bg-gradient-to-br from-nike-grey-900 to-nike-black p-8 overflow-hidden">
        <motion.div
          whileHover={{ scale: 1.1, rotate: -5 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full flex items-center justify-center"
        >
          {/* Simplified shoe illustration */}
          <div className="relative w-full h-full">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <svg viewBox="0 0 200 120" className="w-full h-full opacity-80">
                <defs>
                  <linearGradient id={`gradient-${product.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="white" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#FF6B35" stopOpacity="0.6" />
                  </linearGradient>
                </defs>
                
                {/* Shoe sole */}
                <ellipse cx="100" cy="80" rx="80" ry="15" fill={`url(#gradient-${product.id})`} />
                
                {/* Shoe upper */}
                <path
                  d="M 40 80 Q 40 40, 80 40 L 160 40 Q 180 40, 180 60 L 180 80 Z"
                  fill={`url(#gradient-${product.id})`}
                />
                
                {/* Nike swoosh */}
                <path
                  d="M 120 55 Q 140 50, 150 55 L 130 60 Z"
                  fill="#FF6B35"
                  opacity="0.8"
                />
              </svg>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Category badge */}
        <div className="absolute top-4 left-4 px-3 py-1 bg-nike-orange/90 backdrop-blur-sm rounded-full text-xs font-semibold">
          {product.category}
        </div>
      </div>

      {/* Product Details */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-bold mb-1">{product.name}</h3>
          <p className="text-white/60 text-sm line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Color selector */}
        <div>
          <p className="text-xs text-white/50 mb-2">Colors</p>
          <div className="flex gap-2">
            {product.colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`px-3 py-1 text-xs rounded-full transition-all ${
                  selectedColor === color
                    ? 'bg-white text-nike-black'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                {color.split('/')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Size selector */}
        <div>
          <p className="text-xs text-white/50 mb-2">Select Size</p>
          <div className="grid grid-cols-4 gap-2">
            {product.sizes.slice(0, 8).map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`py-2 text-sm rounded-lg transition-all ${
                  selectedSize === size
                    ? 'bg-nike-orange text-white'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <span className="text-2xl font-bold text-gradient-orange">
            ${product.price}
          </span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            className="px-6 py-2 bg-white text-nike-black font-semibold rounded-full hover:bg-nike-orange hover:text-white transition-colors"
          >
            Add to Cart
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const ProductShowcase = () => {
  const { filteredProducts, selectedCategory, setSelectedCategory } = useStore();
  
  const categories = ['All', 'Running', 'Lifestyle', 'Training'];

  return (
    <section id="collection" className="py-20 bg-nike-black">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-nike-orange font-semibold tracking-wider uppercase text-sm">
            Our Collection
          </span>
          <h2 className="heading-display heading-lg mt-4 mb-6">
            Explore Performance
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Discover our curated selection of premium athletic footwear, designed for peak performance
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                selectedCategory === category
                  ? 'bg-nike-orange text-white'
                  : 'glass text-white/70 hover:text-white'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Product Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </motion.div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-secondary text-lg"
          >
            View All Products
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductShowcase;
