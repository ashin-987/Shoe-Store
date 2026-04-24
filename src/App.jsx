import { useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductShowcase from './components/ProductShowcase';
import Features from './components/Features';
import Footer from './components/Footer';
import Cart from './components/Cart';
import ScrollProgress from './components/ScrollProgress';
import LoadingScreen from './components/LoadingScreen';
import { useStore } from './store/useStore';

// Lazy load heavy components
const Product3DViewer = lazy(() => import('./components/Product3DViewer'));

function App() {
  const { updateScrollProgress } = useStore();

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Track scroll progress
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollTop / scrollHeight;
      updateScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      lenis.destroy();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [updateScrollProgress]);

  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <LoadingScreen />
      
      <div className="relative">
        <Navbar />
        <Cart />
        
        <main>
          {/* Hero Section */}
          <Hero />
          
          {/* 3D Product Viewer Section */}
          <Suspense fallback={<div className="h-screen bg-nike-black" />}>
            <section className="min-h-screen relative" id="experience">
              <Product3DViewer />
            </section>
          </Suspense>
          
          {/* Product Showcase */}
          <ProductShowcase />
          
          {/* Features Section */}
          <Features />
        </main>
        
        <Footer />
      </div>
    </>
  );
}

export default App;
