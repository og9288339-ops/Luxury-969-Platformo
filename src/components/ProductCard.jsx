
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart } from 'lucide-react';

// ============================================================================
// PROP TYPES
// ============================================================================

const ProductCard = ({
  title,
  price,
  imageSrc,
  description,
  onAddToCart,
  onToggleFavorite,
  isFavorite = false,
  currency = '$',
}) => {
  return (
    <motion.div
      whileHover={{ 
        scale: 1.03, 
        rotate: 1,
        transition: { duration: 0.3, ease: 'easeOut' }
      }}
      whileTap={{ scale: 0.98 }}
      className="group relative bg-gray-900/40 backdrop-blur-xl rounded-2xl border border-gray-800/50 overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover"
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />

        {/* Favorite Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onToggleFavorite}
          className="absolute top-4 right-4 p-2 bg-gray-900/80 backdrop-blur-sm rounded-full hover:bg-gray-800 transition-colors z-10"
        >
          <Heart 
            className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}`} 
          />
        </motion.button>

        {/* Quick Add Button - Shows on Hover */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileHover={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 0 }}
          className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onAddToCart}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-purple-500/30 transition-all"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Add to Cart</span>
          </motion.button>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-purple-400 transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {description}
        </p>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              {currency}
            </span>
            <span className="text-2xl font-bold text-white">
              {price.toLocaleString()}
            </span>
          </div>
          
          {/* View Details Link */}
          <motion.button
            whileHover={{ x: 5 }}
            className="text-purple-400 text-sm font-medium hover:text-purple-300 transition-colors"
          >
            View Details →
          </motion.button>
        </div>
      </div>

      {/* Glassmorphism Shine Effect */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"
      />
    </motion.div>
  );
};

// ============================================================================
// DEFAULT EXPORT
// ============================================================================

export default ProductCard;