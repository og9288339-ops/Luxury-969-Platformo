
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  Minus, 
  Plus, 
  Heart, 
  Share2, 
  Star,
  Shield,
  Truck,
  ArrowRight
} from 'lucide-react';

// ============================================================================
// MOCK PRODUCT DATA (In production, this would come from an API)
// ============================================================================

const mockProducts = {
  '1': {
    id: '1',
    name: 'Vintage Rolex Submariner',
    price: 12500,
    currency: '$',
    description: 'A pristine 1960s Rolex Submariner in excellent condition. Features original dial and bracelet. This timepiece represents the pinnacle of Swiss watchmaking craftsmanship.',
    images: [
      'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1548171915-e79a380a2a4b?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=800&h=800&fit=crop',
    ],
    category: 'Watches',
    brand: 'Rolex',
    rating: 4.9,
    reviews: 127,
    inStock: true,
    features: [
      'Original 1960s movement',
      'Certified authentic',
      'Includes original box and papers',
      '1-year warranty included',
    ],
  },
};

// ============================================================================
// MOTION VARIANTS
// ============================================================================

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// ============================================================================
// PRODUCT DETAILS COMPONENT
// ============================================================================

const ProductDetails = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  // Get product data (in production, this would be an API call)
  const product = mockProducts[id] || mockProducts['1'];

  const handleQuantityChange = (delta) => {
    const newQuantity = Math.max(1, quantity + delta);
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    console.log(`Added ${quantity} of ${product.name} to cart`);
    // Add your cart logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-charcoal-950 via-charcoal-900 to-charcoal-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2 text-sm mb-8"
        >
          <Link to="/" className="text-gray-400 hover:text-white transition-colors">
            Home
          </Link>
          <ChevronLeft className="w-4 h-4 text-gray-500 rotate-180" />
          <Link to="/marketplace" className="text-gray-400 hover:text-white transition-colors">
            Marketplace
          </Link>
          <ChevronLeft className="w-4 h-4 text-gray-500 rotate-180" />
          <span className="text-gold-500 font-medium">{product.name}</span>
        </motion.div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Link
            to="/marketplace"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Marketplace</span>
          </Link>
        </motion.div>

        {/* Split-Screen Layout */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16"
        >
          {/* Left Side - Image Gallery */}
          <motion.div variants={fadeInUp} className="space-y-4">
            {/* Main Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative aspect-square bg-gradient-to-br from-charcoal-800 to-charcoal-900 rounded-3xl overflow-hidden shadow-glass-lg"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
              
              {/* Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/50 to-transparent" />
            </motion.div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((image, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? 'border-gold-500 shadow-neon-gold'
                      : 'border-gray-700 hover:border-gray-500'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {selectedImage === index && (
                    <div className="absolute inset-0 bg-gold-500/20" />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Product Details */}
          <motion.div variants={fadeInUp} className="space-y-8">
            {/* Glassmorphism Container */}
            <div className="bg-glass-medium backdrop-blur-xl rounded-3xl border border-charcoal-700/50 p-8 shadow-glass">
              {/* Brand & Category */}
              <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-gold-500/10 text-gold-500 text-xs font-semibold rounded-full border border-gold-500/20">
                  {product.brand}
                </span>
                <span className="text-gray-400 text-sm">{product.category}</span>
              </motion.div>

              {/* Product Name */}
              <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl font-bold text-white mb-4">
                {product.name}
              </motion.h1>

              {/* Rating */}
              <motion.div variants={fadeInUp} className="flex items-center gap-2 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-gold-500 text-gold-500'
                          : 'text-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-white font-semibold">{product.rating}</span>
                <span className="text-gray-400 text-sm">({product.reviews} reviews)</span>
              </motion.div>

              {/* Price */}
              <motion.div variants={fadeInUp} className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold bg-gradient-to-r from-gold-400 to-gold-500 bg-clip-text text-transparent">
                    {product.currency}
                  </span>
                  <span className="text-5xl font-bold text-white">
                    {product.price.toLocaleString()}
                  </span>
                </div>
                {product.inStock && (
                  <span className="inline-flex items-center gap-1.5 text-emerald-400 text-sm mt-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    In Stock
                  </span>
                )}
              </motion.div>

              {/* Description */}
              <motion.p variants={fadeInUp} className="text-gray-300 leading-relaxed mb-8">
                {product.description}
              </motion.p>

              {/* Features */}
              <motion.div variants={fadeInUp} className="mb-8">
                <h3 className="text-white font-semibold mb-4">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-300">
                      <div className="w-1.5 h-1.5 bg-gold-500 rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Quantity Selector */}
              <motion.div variants={fadeInUp} className="mb-8">
                <label className="text-white font-semibold mb-3 block">Quantity</label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center bg-charcoal-800/50 rounded-xl border border-charcoal-700">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity === 1}
                      className="p-3 text-white hover:text-gold-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Minus className="w-5 h-5" />
                    </motion.button>
                    <span className="w-16 text-center text-white font-semibold text-lg">
                      {quantity}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleQuantityChange(1)}
                      className="p-3 text-white hover:text-gold-500 transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                    </motion.button>
                  </div>
                  <span className="text-gray-400 text-sm">
                    Total: {product.currency}{(product.price * quantity).toLocaleString()}
                  </span>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 mb-8">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-600 text-charcoal-950 font-bold rounded-2xl shadow-neon-gold hover:shadow-neon-gold/50 transition-all"
                >
                  <span>Premium Buy Now</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
                
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="p-4 bg-charcoal-800/50 border border-charcoal-700 rounded-xl hover:border-gold-500/50 transition-all"
                  >
                    <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-4 bg-charcoal-800/50 border border-charcoal-700 rounded-xl hover:border-gold-500/50 transition-all"
                  >
                    <Share2 className="w-5 h-5 text-white" />
                  </motion.button>
                </div>
              </motion.div>

              {/* Trust Badges */}
              <motion.div variants={fadeInUp} className="flex flex-wrap gap-6 pt-6 border-t border-charcoal-700/50">
                <div className="flex items-center gap-2 text-gray-400">
                  <Shield className="w-5 h-5 text-gold-500" />
                  <span className="text-sm">Authenticity Guaranteed</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Truck className="w-5 h-5 text-gold-500" />
                  <span className="text-sm">Free Shipping</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Star className="w-5 h-5 text-gold-500" />
                  <span className="text-sm">Premium Support</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetails;
