import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[200] bg-nike-black flex items-center justify-center"
        >
          <div className="text-center">
            {/* Animated Nike Swoosh */}
            <motion.svg
              className="w-32 h-32 mb-8"
              viewBox="0 0 24 24"
              fill="white"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <motion.path
                d="M24 7.8L6.442 15.276c-1.456.616-2.679.925-3.668.925-1.456 0-2.406-.616-2.406-1.848 0-1.232 1.188-2.464 3.404-2.772l9.804-1.54c1.98-.308 3.143-.924 3.143-1.848 0-.924-.891-1.54-2.406-1.54-2.406 0-5.61 1.232-9.606 3.696L0 7.8C4.554 5.028 8.91 3.696 12.858 3.696c3.27 0 5.412 1.54 5.412 4.004 0 1.848-1.188 3.388-3.668 4.312L5.61 13.428c-.792.308-1.188.616-1.188 1.232 0 .616.495.924 1.485.924.792 0 1.881-.308 3.27-.924L24 7.8z"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
              />
            </motion.svg>

            {/* Loading text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-bold text-white">Loading Experience</h2>
              
              {/* Progress bar */}
              <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-nike-orange"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1.8, ease: 'easeInOut' }}
                />
              </div>
            </motion.div>

            {/* Floating particles */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-nike-orange rounded-full"
                initial={{
                  x: 0,
                  y: 0,
                  opacity: 0,
                }}
                animate={{
                  x: [0, (Math.random() - 0.5) * 200],
                  y: [0, (Math.random() - 0.5) * 200],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.2,
                  repeat: Infinity,
                }}
                style={{
                  left: '50%',
                  top: '50%',
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
