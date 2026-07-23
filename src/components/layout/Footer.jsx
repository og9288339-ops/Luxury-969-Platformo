import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Icon placeholders - replace with actual icons (Lucide, Heroicons, etc.)
const IconPlaceholder = ({ name, className }) => (
  <div className={`flex items-center justify-center ${className}`}>
    <span className="text-xs opacity-50">{name}</span>
  </div>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  const linkHoverVariants = {
    hover: {
      x: 5,
      color: '#D4AF37', // Gold accent
      transition: {
        duration: 0.2,
        ease: 'easeInOut',
      },
    },
  };

  const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer /> {/* هنا يوضع الفوتر ليظهر في كل الصفحات */}
    </div>
  );
};

  return (
    <motion.footer
      className="bg-gray-950 text-gray-300"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Column 1: Brand */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center space-x-2">
              <IconPlaceholder name="LOGO" className="w-8 h-8 text-amber-400" />
              <h3 className="text-2xl font-bold text-white tracking-wider">
                AuctionHub
              </h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              The premier destination for luxury auctions. Discover exclusive collections,
              rare artifacts, and timeless treasures from the world's finest curators.
            </p>
            <div className="flex space-x-4 pt-2">
              <motion.button
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-amber-500/20 hover:text-amber-400 transition-colors duration-300"
              >
                <IconPlaceholder name="X" className="text-xs" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-purple-500/20 hover:text-purple-400 transition-colors duration-300"
              >
                <IconPlaceholder name="IG" className="text-xs" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-amber-500/20 hover:text-amber-400 transition-colors duration-300"
              >
                <IconPlaceholder name="LI" className="text-xs" />
              </motion.button>
            </div>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-white font-semibold text-lg tracking-wide mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { name: 'Live Auctions', path: '/auctions' },
                { name: 'Marketplace', path: '/marketplace' },
                { name: 'Analytics', path: '/analytics' },
                { name: 'Insights', path: '/insights' },
              ].map((link) => (
                <li key={link.name}>
                  <motion.div variants={linkHoverVariants} whileHover="hover">
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-amber-400 transition-colors duration-300 text-sm"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Support */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-white font-semibold text-lg tracking-wide mb-6">
              Support
            </h4>
            <ul className="space-y-3">
              {[
                { name: 'Help Center', path: '/help' },
                { name: 'Contact Us', path: '/contact' },
                { name: 'Privacy Policy', path: '/privacy' },
                { name: 'Terms of Service', path: '/terms' },
              ].map((link) => (
                <li key={link.name}>
                  <motion.div variants={linkHoverVariants} whileHover="hover">
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-purple-400 transition-colors duration-300 text-sm"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4: Newsletter */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-white font-semibold text-lg tracking-wide mb-6">
              Stay Updated
            </h4>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to receive exclusive auction alerts and curated collections.
            </p>
            <div className="space-y-3">
              <motion.input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all duration-300"
                whileFocus={{ scale: 1.02 }}
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-4 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-lg text-sm hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-lg shadow-amber-500/20"
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          variants={itemVariants}
          className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
        >
          <p className="text-gray-500 text-sm">
            © {currentYear} AuctionHub. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <Link
              to="/privacy"
              className="text-gray-500 hover:text-gray-300 text-sm transition-colors duration-300"
            >
              Privacy
            </Link>
            <Link
              to="/terms"
              className="text-gray-500 hover:text-gray-300 text-sm transition-colors duration-300"
            >
              Terms
            </Link>
            <Link
              to="/cookies"
              className="text-gray-500 hover:text-gray-300 text-sm transition-colors duration-300"
            >
              Cookies
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
