import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import ProductCard from './ProductCard.jsx';
import { getAllProducts } from '../services/productService.js';

// ============================================================================
// MOTION VARIANTS
// ============================================================================

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.9,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

// ============================================================================
// SKELETON LOADING COMPONENT
// ============================================================================

const SkeletonCard = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="bg-gray-900/40 backdrop-blur-xl rounded-2xl border border-gray-800/50 overflow-hidden"
  >
    <div className="h-64 bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse" />
    <div className="p-6 space-y-4">
      <div className="h-6 bg-gray-800 rounded animate-pulse" />
      <div className="h-4 bg-gray-800 rounded animate-pulse w-3/4" />
      <div className="h-8 bg-gray-800 rounded animate-pulse w-1/2" />
    </div>
  </motion.div>
);

// ============================================================================
// ERROR FALLBACK COMPONENT
// ============================================================================

const ErrorFallback = ({ onRetry }) => (
  <div className="flex flex-col items-center justify-center min-h-[400px] bg-gray-900/40 backdrop-blur-xl rounded-2xl border border-gray-800/50 p-8">
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', duration: 0.6 }}
      className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-4"
    >
      <AlertTriangle className="w-8 h-8 text-red-400" />
    </motion.div>
    <h3 className="text-xl font-bold text-white mb-2">Unable to Load Products</h3>
    <p className="text-gray-400 text-center mb-6">
      We encountered an error while fetching the product collection. Please try again.
    </p>
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onRetry}
      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all"
    >
      <RefreshCw className="w-5 h-5" />
      <span>Retry</span>
    </motion.button>
  </div>
);

// ============================================================================
// PRODUCT GALLERY COMPONENT
// ============================================================================

const ProductGallery = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavorite = (productId) => {
    setFavorites((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const handleAddToCart = (productId) => {
    console.log(`Added product ${productId} to cart`);
    // Add your cart logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 py-20 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto text-center mb-16"
      >
        <h1 className="text-5xl sm:text-6xl font-bold text-white mb-4">
          Featured
          <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mt-2">
            Collection
          </span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Discover our curated selection of rare and exclusive items from around the world.
        </p>
      </motion.div>

      {/* Loading State */}
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {[...Array(4)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </motion.div>
      )}

      {/* Error State */}
      {error && !loading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto"
        >
          <ErrorFallback onRetry={fetchProducts} />
        </motion.div>
      )}

      {/* Product Grid */}
      {!loading && !error && products.length > 0 && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              custom={index}
            >
              <ProductCard
                title={product.name || product.title}
                price={product.price}
                imageSrc={product.imageSrc || product.images?.[0]}
                description={product.description}
                onAddToCart={() => handleAddToCart(product.id)}
                onToggleFavorite={() => handleToggleFavorite(product.id)}
                isFavorite={favorites[product.id]}
              />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Empty State */}
      {!loading && !error && products.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto text-center py-20"
        >
          <div className="bg-gray-900/40 backdrop-blur-xl rounded-2xl border border-gray-800/50 p-12">
            <h3 className="text-2xl font-bold text-white mb-4">No Products Found</h3>
            <p className="text-gray-400 mb-6">
              Our collection is being updated. Check back soon for new arrivals.
            </p>
          </div>
        </motion.div>
      )}

      {/* Load More Button */}
      {!loading && !error && products.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-2xl shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all"
          >
            Load More Products
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

// ============================================================================
// DEFAULT EXPORT
// ============================================================================

export default ProductGallery;
