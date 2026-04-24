import { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows, useGLTF } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { useStore } from '../store/useStore';

// 3D Shoe Model Component (using a simple geometric representation)
function ShoeModel({ color = '#ffffff' }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating animation
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
      // Auto-rotate when not interacting
      if (!hovered) {
        meshRef.current.rotation.y += 0.005;
      }
    }
  });

  return (
    <group
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Simplified shoe representation using geometric shapes */}
      {/* Sole */}
      <mesh position={[0, -0.3, 0]} castShadow>
        <boxGeometry args={[2, 0.3, 3]} />
        <meshStandardMaterial 
          color={color} 
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>
      
      {/* Upper */}
      <mesh position={[0, 0.2, -0.3]} rotation={[0.3, 0, 0]} castShadow>
        <boxGeometry args={[1.8, 0.8, 2]} />
        <meshStandardMaterial 
          color={color} 
          roughness={0.5}
          metalness={0.2}
        />
      </mesh>
      
      {/* Tongue */}
      <mesh position={[0, 0.5, 0.3]} rotation={[-0.2, 0, 0]} castShadow>
        <boxGeometry args={[1.2, 0.6, 0.4]} />
        <meshStandardMaterial 
          color={color} 
          roughness={0.6}
        />
      </mesh>
      
      {/* Nike Swoosh accent */}
      <mesh position={[0.5, 0.3, 0.5]} rotation={[0, 0, -0.3]} castShadow>
        <boxGeometry args={[0.8, 0.1, 0.05]} />
        <meshStandardMaterial 
          color="#FF6B35" 
          roughness={0.2}
          metalness={0.9}
          emissive="#FF6B35"
          emissiveIntensity={0.3}
        />
      </mesh>
    </group>
  );
}

const Product3DViewer = () => {
  const { selectedProduct, selectedColor } = useStore();
  const [autoRotate, setAutoRotate] = useState(true);
  
  // Color mapping for different shoe variants
  const colorMap = {
    'Black/White': '#1a1a1a',
    'Triple White': '#ffffff',
    'Volt/Black': '#d4ff00',
    'Blue/Orange': '#1e90ff',
    'All Black': '#000000',
    'White/Red': '#ff0000',
    'White/Red/Blue': '#ffffff',
    'All White': '#f5f5f5',
    'Crimson/White': '#dc143c',
    'Triple Black': '#0a0a0a',
    'Blue Void': '#1e3a8a',
    'Vintage Green': '#556b2f',
    'University Red': '#e63946',
    'Gym Red': '#ff0000',
    'Navy/Gold': '#000080',
  };
  
  const currentColor = selectedColor ? colorMap[selectedColor] || '#ffffff' : '#ffffff';

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-nike-black to-nike-grey-900 flex items-center justify-center py-20">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 3D Canvas */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[600px] glass rounded-3xl overflow-hidden"
          >
            <Canvas shadows camera={{ position: [5, 2, 5], fov: 50 }}>
              <PerspectiveCamera makeDefault position={[5, 2, 5]} />
              
              {/* Lighting */}
              <ambientLight intensity={0.5} />
              <spotLight 
                position={[10, 10, 10]} 
                angle={0.3} 
                penumbra={1} 
                intensity={2}
                castShadow
                shadow-mapSize={[2048, 2048]}
              />
              <pointLight position={[-10, 0, -5]} color="#FF6B35" intensity={0.5} />
              <pointLight position={[0, -10, 0]} intensity={0.5} />
              
              {/* Environment */}
              <Environment preset="city" />
              
              {/* 3D Model */}
              <Suspense fallback={null}>
                <ShoeModel color={currentColor} />
              </Suspense>
              
              {/* Shadow */}
              <ContactShadows 
                position={[0, -1, 0]} 
                opacity={0.5} 
                scale={10} 
                blur={2} 
                far={3} 
              />
              
              {/* Controls */}
              <OrbitControls 
                enableZoom={true}
                enablePan={false}
                minDistance={3}
                maxDistance={10}
                autoRotate={autoRotate}
                autoRotateSpeed={2}
                onStart={() => setAutoRotate(false)}
                onEnd={() => setTimeout(() => setAutoRotate(true), 3000)}
              />
            </Canvas>
            
            {/* Controls overlay */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="glass rounded-xl p-4 backdrop-blur-md">
                <p className="text-sm text-white/70 mb-2">
                  <span className="font-semibold text-white">Interact:</span> Drag to rotate • Scroll to zoom
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setAutoRotate(!autoRotate)}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors"
                  >
                    {autoRotate ? '⏸ Pause' : '▶ Auto-rotate'}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <motion.span 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-nike-orange font-semibold tracking-wider uppercase text-sm"
              >
                {selectedProduct.category}
              </motion.span>
              <h2 className="heading-display heading-lg mt-2 mb-4">
                {selectedProduct.name}
              </h2>
              <p className="text-xl text-white/70 leading-relaxed">
                {selectedProduct.description}
              </p>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Key Features</h3>
              <div className="grid grid-cols-2 gap-3">
                {selectedProduct.features.map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass rounded-lg p-4 border border-white/10"
                  >
                    <p className="text-sm text-white/80">{feature}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Price and CTA */}
            <div className="border-t border-white/10 pt-6">
              <div className="flex items-center justify-between mb-6">
                <span className="text-4xl font-bold text-gradient-orange">
                  ${selectedProduct.price}
                </span>
                <div className="text-right text-sm text-white/50">
                  <p>Free shipping</p>
                  <p>30-day returns</p>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full btn-primary text-lg py-5"
              >
                Explore Full Collection
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Product3DViewer;
