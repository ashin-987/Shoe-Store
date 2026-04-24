import { motion } from 'framer-motion';
import { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Thank you for subscribing with: ${email}`);
    setEmail('');
  };

  const footerLinks = {
    Product: ['Running', 'Training', 'Lifestyle', 'Basketball', 'Football', 'New Releases'],
    Company: ['About Nike', 'News', 'Careers', 'Investors', 'Sustainability'],
    Support: ['Contact Us', 'Size Guide', 'Shipping & Delivery', 'Returns', 'Payment Options'],
  };

  const socialLinks = [
    { name: 'Twitter', icon: '𝕏', url: '#' },
    { name: 'Instagram', icon: '📷', url: '#' },
    { name: 'Facebook', icon: 'f', url: '#' },
    { name: 'YouTube', icon: '▶', url: '#' },
  ];

  return (
    <footer className="bg-gradient-to-b from-nike-grey-900 to-nike-black pt-20 pb-10 border-t border-white/10">
      <div className="container-custom">
        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-12 mb-16 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 gradient-mesh opacity-30" />
          <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-4">Stay Updated</h3>
            <p className="text-white/70 mb-8 max-w-2xl mx-auto">
              Get the latest news on product releases, exclusive offers, and Nike innovations delivered straight to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-6 py-4 bg-white/10 border border-white/20 rounded-full focus:outline-none focus:border-nike-orange transition-colors text-white placeholder:text-white/40"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="px-8 py-4 bg-nike-orange text-white font-semibold rounded-full hover:bg-nike-orange/90 transition-colors"
              >
                Subscribe
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <svg className="w-20 h-20 mb-6" viewBox="0 0 24 24" fill="white">
              <path d="M24 7.8L6.442 15.276c-1.456.616-2.679.925-3.668.925-1.456 0-2.406-.616-2.406-1.848 0-1.232 1.188-2.464 3.404-2.772l9.804-1.54c1.98-.308 3.143-.924 3.143-1.848 0-.924-.891-1.54-2.406-1.54-2.406 0-5.61 1.232-9.606 3.696L0 7.8C4.554 5.028 8.91 3.696 12.858 3.696c3.27 0 5.412 1.54 5.412 4.004 0 1.848-1.188 3.388-3.668 4.312L5.61 13.428c-.792.308-1.188.616-1.188 1.232 0 .616.495.924 1.485.924.792 0 1.881-.308 3.27-.924L24 7.8z" />
            </svg>
            <p className="text-white/60 mb-6 leading-relaxed">
              Bringing innovation and inspiration to every athlete in the world. If you have a body, you are an athlete.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-nike-orange transition-colors"
                  aria-label={social.name}
                >
                  <span className="text-lg">{social.icon}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-bold mb-4 text-lg">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-white/60 hover:text-white transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-white/40 text-sm">
              © {new Date().getFullYear()} Nike, Inc. All Rights Reserved. Built with passion for performance.
            </div>
            <div className="flex gap-6 text-white/40 text-sm">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Settings</a>
            </div>
          </div>
        </div>

        {/* Credit */}
        <div className="mt-8 pt-8 border-t border-white/10 text-center">
          <p className="text-white/30 text-xs">
            Developed as a portfolio showcase • Enhanced with 3D visualization and modern web technologies
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
