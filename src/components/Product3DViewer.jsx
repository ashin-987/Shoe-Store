import { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows, useGLTF } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { useStore } from '../store/useStore';

// GLB Model Loader - For professional 3D models
function GLBShoeModel({ modelPath }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  // Load GLB model
  const { scene } = useGLTF(modelPath);
  
  useFrame((state) => {
    if (meshRef.current) {
      // Smooth floating animation
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.15;
      // Auto-rotate when not hovered
      if (!hovered) {
        meshRef.current.rotation.y += 0.003;
      }
    }
  });

  return (
    <primitive
      ref={meshRef}
      object={scene}
      scale={3}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    />
  );
}

// Enhanced 3D Shoe Model - Much More Realistic!
function EnhancedShoeModel({ productImage }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  // Load product image as texture for the shoe
  const texture = useLoader(THREE.TextureLoader, productImage);

  useFrame((state) => {
    if (meshRef.current) {
      // Smooth floating animation
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.15;
      // Auto-rotate when not hovered
      if (!hovered) {
        meshRef.current.rotation.y += 0.003;
      }
    }
  });

  return (
    <group
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      rotation={[0, Math.PI * 0.15, 0]}
    >
      {/* OUTSOLE - Bottom of shoe */}
      <mesh position={[0, -0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.2, 0.25, 3.5]} />
        <meshStandardMaterial 
          color="#1a1a1a"
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      {/* MIDSOLE - Cushioning layer */}
      <mesh position={[0, -0.25, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.1, 0.3, 3.4]} />
        <meshStandardMaterial 
          color="#ffffff"
          roughness={0.4}
          metalness={0.2}
        />
      </mesh>

      {/* HEEL CUP - Back support */}
      <mesh position={[0, 0.3, -1.4]} castShadow receiveShadow>
        <boxGeometry args={[1.8, 1.2, 0.6]} />
        <meshStandardMaterial 
          map={texture}
          roughness={0.6}
          metalness={0.1}
        />
      </mesh>

      {/* UPPER - Main body curved */}
      <mesh position={[0, 0.1, -0.3]} rotation={[0.15, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.9, 0.9, 2.5]} />
        <meshStandardMaterial 
          map={texture}
          roughness={0.5}
          metalness={0.15}
        />
      </mesh>

      {/* TOE BOX - Front rounded */}
      <mesh position={[0, 0, 1.2]} rotation={[0.2, 0, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.9, 16, 16]} />
        <meshStandardMaterial 
          map={texture}
          roughness={0.5}
          metalness={0.1}
        />
      </mesh>

      {/* TONGUE - Top padded section */}
      <mesh position={[0, 0.5, 0.2]} rotation={[-0.3, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.4, 0.8, 0.3]} />
        <meshStandardMaterial 
          map={texture}
          roughness={0.7}
        />
      </mesh>

      {/* NIKE SWOOSH - Iconic logo (left side) */}
      <mesh position={[1.0, 0.2, 0.2]} rotation={[0, 0, -0.3]} castShadow>
        <boxGeometry args={[0.05, 0.3, 1.2]} />
        <meshStandardMaterial 
          color="#FF6B35"
          roughness={0.2}
          metalness={0.8}
          emissive="#FF6B35"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* NIKE SWOOSH - Iconic logo (right side) */}
      <mesh position={[-1.0, 0.2, 0.2]} rotation={[0, 0, 0.3]} castShadow>
        <boxGeometry args={[0.05, 0.3, 1.2]} />
        <meshStandardMaterial 
          color="#FF6B35"
          roughness={0.2}
          metalness={0.8}
          emissive="#FF6B35"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* LACE GUARD - Top reinforcement */}
      <mesh position={[0, 0.7, 0.4]} castShadow>
        <boxGeometry args={[1.2, 0.15, 0.8]} />
        <meshStandardMaterial 
          color="#2a2a2a"
          roughness={0.6}
        />
      </mesh>

      {/* AIR UNIT - Visible cushioning (if applicable) */}
      <mesh position={[0, -0.3, -0.8]} castShadow>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial 
          color="#FF6B35"
          transparent={true}
          opacity={0.6}
          roughness={0.1}
          metalness={0.9}
          emissive="#FF6B35"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Ambient glow around shoe */}
      <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[3, 32]} />
        <meshBasicMaterial 
          color="#FF6B35"
          transparent={true}
          opacity={0.05}
        />
      </mesh>
    </group>
  );
}

const Product3DViewer = () => {
  const { selectedProduct, selectedColor } = useStore();
  const [autoRotate, setAutoRotate] = useState(true);

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
            <Canvas shadows camera={{ position: [0, 0, 8], fov: 50 }}>
              <PerspectiveCamera makeDefault position={[0, 0, 8]} />
              
              {/* Lighting */}
              <ambientLight intensity={0.6} />
              <spotLight 
                position={[10, 10, 10]} 
                angle={0.3} 
                penumbra={1} 
                intensity={2}
                castShadow
                shadow-mapSize={[1024, 1024]}
              />
              <pointLight position={[-10, 0, -5]} color="#FF6B35" intensity={0.8} />
              <pointLight position={[0, -5, 0]} intensity={0.5} />
              
              {/* Environment */}
              <Environment preset="city" />
              
              {/* 3D Model - GLB or Enhanced Procedural */}
              <Suspense fallback={null}>
                {selectedProduct.useGLBModel && selectedProduct.modelPath ? (
                  <GLBShoeModel modelPath={selectedProduct.modelPath} />
                ) : (
                  <EnhancedShoeModel productImage={selectedProduct.image} />
                )}
              </Suspense>
              
              {/* Shadow */}
              <ContactShadows 
                position={[0, -2, 0]} 
                opacity={0.4} 
                scale={10} 
                blur={2} 
                far={4} 
              />
              
              {/* Controls */}
              <OrbitControls 
                enableZoom={true}
                enablePan={false}
                minDistance={5}
                maxDistance={15}
                autoRotate={autoRotate}
                autoRotateSpeed={1.5}
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
