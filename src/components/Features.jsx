import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const FeatureCard = ({ icon, title, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="glass rounded-2xl p-8 border border-white/10 relative overflow-hidden group"
    >
      {/* Gradient glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-nike-orange/0 to-nike-orange/0 group-hover:from-nike-orange/10 group-hover:to-nike-orange/5 transition-all duration-500" />
      
      <div className="relative z-10">
        {/* Icon */}
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
          className="w-16 h-16 mb-6 bg-nike-orange/20 rounded-2xl flex items-center justify-center"
        >
          <div className="text-nike-orange text-3xl">{icon}</div>
        </motion.div>

        {/* Content */}
        <h3 className="text-2xl font-bold mb-4">{title}</h3>
        <p className="text-white/70 leading-relaxed">{description}</p>

        {/* Decorative corner */}
        <div className="absolute top-4 right-4 w-20 h-20 border-t-2 border-r-2 border-nike-orange/20 group-hover:border-nike-orange/50 transition-colors" />
      </div>
    </motion.div>
  );
};

const StatCard = ({ value, label, suffix = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-5xl md:text-6xl font-bold text-gradient-orange mb-2"
      >
        {value}{suffix}
      </motion.div>
      <p className="text-white/60 text-sm uppercase tracking-wider">{label}</p>
    </motion.div>
  );
};

const Features = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const features = [
    {
      icon: '⚡',
      title: 'Revolutionary Cushioning',
      description: 'Experience unparalleled comfort with our advanced Air Max technology, engineered to provide maximum impact protection and energy return.',
    },
    {
      icon: '🎯',
      title: 'Precision Engineering',
      description: 'Every detail meticulously crafted using cutting-edge materials and manufacturing techniques for peak performance.',
    },
    {
      icon: '🌟',
      title: 'Iconic Design',
      description: 'Bold aesthetics that push boundaries, combining timeless style with contemporary innovation.',
    },
    {
      icon: '♻️',
      title: 'Sustainable Innovation',
      description: 'Commitment to the planet with eco-friendly materials and manufacturing processes that reduce environmental impact.',
    },
    {
      icon: '🔬',
      title: 'Lab-Tested Performance',
      description: 'Rigorously tested by elite athletes and validated in state-of-the-art sports science laboratories.',
    },
    {
      icon: '🚀',
      title: 'Future-Ready Tech',
      description: 'Integration of smart materials and responsive technologies that adapt to your every movement.',
    },
  ];

  return (
    <section id="features" ref={containerRef} className="py-20 bg-gradient-to-b from-nike-black to-nike-grey-900 relative overflow-hidden">
      {/* Background effects */}
      <motion.div
        style={{ y, opacity }}
        className="absolute top-1/4 -right-1/4 w-96 h-96 bg-nike-orange/10 rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]) }}
        className="absolute bottom-1/4 -left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"
      />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-nike-orange font-semibold tracking-wider uppercase text-sm">
            Innovation
          </span>
          <h2 className="heading-display heading-lg mt-4 mb-6">
            Built for Excellence
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Every pair represents years of research, countless prototypes, and an unwavering commitment to pushing the boundaries of athletic performance.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 glass rounded-3xl p-12"
        >
          <StatCard value="50" suffix="+" label="Years of Innovation" />
          <StatCard value="1000" suffix="+" label="Patents Filed" />
          <StatCard value="150" suffix="+" label="Countries Worldwide" />
          <StatCard value="99" suffix="%" label="Athlete Satisfaction" />
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </div>

        {/* Technology Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 glass rounded-3xl p-12 border border-white/10 relative overflow-hidden"
        >
          <div className="absolute inset-0 gradient-mesh opacity-50" />
          
          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <h3 className="heading-display heading-md mb-6">
              The Science Behind <span className="text-gradient-orange">Performance</span>
            </h3>
            <p className="text-lg text-white/70 mb-8 leading-relaxed">
              Our research facilities work tirelessly to understand the biomechanics of movement, 
              translating insights into tangible innovations that elevate athletic performance to new heights.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                <div className="text-3xl mb-3">🧪</div>
                <h4 className="font-bold mb-2">Material Science</h4>
                <p className="text-sm text-white/60">Advanced polymers and textiles</p>
              </div>
              <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                <div className="text-3xl mb-3">📊</div>
                <h4 className="font-bold mb-2">Data Analytics</h4>
                <p className="text-sm text-white/60">AI-powered performance insights</p>
              </div>
              <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                <div className="text-3xl mb-3">👟</div>
                <h4 className="font-bold mb-2">Athlete Testing</h4>
                <p className="text-sm text-white/60">Real-world validation</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
