import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Search, Filter, Grid, List, Heart, Star } from 'lucide-react';

// ============================================================================
// MOCK DATA
// ============================================================================

const products = [
  {
    id: 1,
    name: 'Vintage Rolex Submariner',
    category: 'Watches',
    price: 12500,
    currentBid: 11200,
    image: '🕐',
    rating: 4.9,
    bids: 47,
    timeLeft: '2h 34m',
    featured: true,
  },
  {
    id: 2,
    name: 'Original Star Wars Poster',
    category: 'Collectibles',
    price: 3500,
    currentBid: 2800,
    image: '🎬',
    rating: 4.8,
    bids: 23,
    timeLeft: '5h 12m',
    featured: false,
  },
  {
    id: 3,
    name: '1960s Gibson Les Paul',
    category: 'Instruments',
    price: 45000,
    currentBid: 38000,
    image: '🎸',
    rating: 5.0,
    bids: 89,
    timeLeft: '1h 45m',
    featured: true,
  },
  {
    id: 4,
    name: 'Rare First Edition Book',
    category: 'Books',
    price: 8900,
    currentBid: 7500,
    image: '📚',
    rating: 4.7,
    bids: 31,
    timeLeft: '8h 20m',
    featured: false,
  },
  {
    id: 5,
    name: 'Antique Persian Rug',
    category: 'Art',
    price: 15000,
    currentBid: 12000,
    image: '🏺',
    rating: 4.9,
    bids: 56,
    timeLeft: '3h 10m',
    featured: true,
  },
  {
    id: 6,
    name: 'Classic Car Model',
    category: 'Automotive',
    price: 75000,
    currentBid: 62000,
    image: '🚗',
    rating: 4.8,
    bids: 124,
    timeLeft: '12h 30m',
    featured: false,
  },
];

const categories = ['All', 'Watches', 'Collectibles', 'Instruments', 'Books', 'Art', 'Automotive'];

// ============================================================================
// PRODUCT CARD COMPONENT
// ============================================================================

const ProductCard = ({ product, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group"
    >
      <motion.div
        animate={{
          y: isHovered ? -8 : 0,
          boxShadow: isHovered 
            ? '0 25px 50px -12px rgba(168, 85, 247, 0.3)' 
            : '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
        }}
        transition={{ duration: 0.3 }}
        className="relative bg-gray-900/40 backdrop-blur-xl rounded-2xl border border-gray-800/50 overflow-hidden"
      >
        {/* Featured Badge */}
        {product.featured && (
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-xs font-semibold rounded-full shadow-lg">
              Featured
            </span>
          </div>
        )}

        {/* Like Button */}
        <motion.button
          animate={{ scale: isLiked ? 1.2 : 1 }}
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-4 right-4 z-10 p-2 bg-gray-900/80 backdrop-blur-sm rounded-full hover:bg-gray-800 transition-colors"
        >
          <Heart 
            className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
          />
        </motion.button>

        {/* Image Placeholder */}
        <div className="relative h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
          <motion.div
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
            className="text-6xl"
          >
            {product.image}
          </motion.div>
          <motion.div
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"
          />
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Category */}
          <span className="text-xs font-medium text-purple-400 mb-2 block">
            {product.category}
          </span>

          {/* Name */}
          <h3 className="text-lg font-semibold text-white mb-2 line-clamp-1">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-600'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-400">{product.rating}</span>
            <span className="text-sm text-gray-500">({product.bids} bids)</span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs text-gray-500 mb-1">Current Bid</p>
              <p className="text-xl font-bold text-white">${product.currentBid.toLocaleString()}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500 mb-1">Time Left</p>
              <p className="text-sm font-semibold text-orange-400">{product.timeLeft}</p>
            </div>
          </div>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all"
          >
            Place Bid
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ============================================================================
// MARKETPLACE PAGE COMPONENT
// ============================================================================

const MarketplacePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              radial-gradient(circle at 2px 2px, #666 1px, transparent 0)
            `,
            backgroundSize: '40px 40px',
          }} />
        </div>

        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.08, 0.12, 0.08],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-20 left-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"
        />

        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl mb-8 shadow-2xl shadow-indigo-500/30"
          >
            <ShoppingBag className="w-10 h-10 text-white" />
          </motion.div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6">
            Global
            <span className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mt-2">
              Marketplace
            </span>
          </h1>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12">
            Discover rare collectibles, art, and exclusive items from trusted sellers worldwide.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-900/40 backdrop-blur-xl border border-gray-800/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                    : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* View Toggle */}
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800'
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1'
        }`}>
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <ShoppingBag className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketplacePage;
