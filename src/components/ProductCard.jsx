import React, { useState, useEffect, useMemo } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Heart, Gavel, Timer } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// ============================================================================
// PROP TYPES
// ============================================================================

/**
 * High-End Auction Product Card Component
 * 
 * A luxury auction card with glassmorphism, 3D tilt effects, and auction-specific features.
 * Optimized with React.memo for performance.
 */
const ProductCard = React.memo(({
  id,
  title,
  category,
  description,
  currentBid,
  startingBid,
  bidsCount,
  endTime,
  imageUrl,
  status = 'Upcoming',
  onPlaceBid,
  onToggleFavorite,
  isFavorite = false,
  index = 0,
}) => {
  // 3D Tilt Effect State
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ['-10deg', '10deg']);

  // Countdown Timer State
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  // Countdown Logic
  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(endTime) - new Date();
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          mins: Math.floor((difference / 1000 / 60) % 60),
          secs: Math.floor((difference / 1000) % 60),
        };
      }
      return { days: 0, hours: 0, mins: 0, secs: 0 };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, [endTime]);

  // Status Badge Configuration
  const statusConfig = useMemo(() => ({
    Live: {
      color: 'from-green-500 to-emerald-600',
      textColor: 'text-green-400',
      borderColor: 'border-green-500/30',
      pulse: true,
    },
    Upcoming: {
      color: 'from-amber-500 to-orange-600',
      textColor: 'text-amber-400',
      borderColor: 'border-amber-500/30',
      pulse: false,
    },
    Ended: {
      color: 'from-gray-500 to-gray-600',
      textColor: 'text-gray-400',
      borderColor: 'border-gray-500/30',
      pulse: false,
    },
  }), []);

  const currentStatus = statusConfig[status] || statusConfig.Upcoming;

  // Card Variants for Staggered Entrance
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateX: 15,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
        delay: index * 0.1,
      },
    },
  };

  // Handle Mouse Move for 3D Tilt
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXVal = (e.clientX - rect.left) / width - 0.5;
    const mouseYVal = (e.clientY - rect.top) / height - 0.5;
    x.set(mouseXVal);
    y.set(mouseYVal);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Format Currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative"
    >
      <motion.div
        whileHover={{ 
          y: -12,
          transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
        }}
        whileTap={{ scale: 0.98 }}
        className="relative bg-gradient-to-b from-gray-900/60 to-gray-950/80 backdrop-blur-2xl rounded-3xl border border-gray-800/50 overflow-hidden shadow-2xl hover:shadow-amber-500/20 transition-all duration-500"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Image Container with Hover Zoom */}
        <div className="relative h-72 overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
          <motion.img
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
          
          {/* Sophisticated Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent opacity-90" />
          
          {/* Gold Accent Gradient at Bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-amber-500/10 to-transparent" />

          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`absolute top-4 left-4 px-4 py-2 rounded-full bg-gradient-to-r ${currentStatus.color} text-white text-xs font-bold uppercase tracking-wider shadow-lg ${currentStatus.borderColor} border backdrop-blur-sm`}
          >
            <div className="flex items-center gap-2">
              {currentStatus.pulse && (
                <motion.span
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-white"
                />
              )}
              {status}
            </div>
          </motion.div>

          {/* Favorite Button */}
          <motion.button
            whileHover={{ scale: 1.15, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onToggleFavorite && onToggleFavorite(id)}
            className="absolute top-4 right-4 p-3 bg-gray-950/80 backdrop-blur-md rounded-full border border-gray-700/50 hover:border-amber-500/50 transition-all z-10"
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart 
              className={`w-5 h-5 transition-colors ${isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}`} 
            />
          </motion.button>

          {/* Category Badge */}
          <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-lg bg-gray-950/70 backdrop-blur-md border border-gray-700/50">
            <span className="text-xs font-medium text-gray-300">{category}</span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 space-y-4">
          {/* Title */}
          <div>
            <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-amber-400 group-hover:to-amber-600 group-hover:bg-clip-text transition-all duration-300">
              {title}
            </h3>
            <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Auction Details */}
          <div className="space-y-3 pt-2">
            {/* Current Bid */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Gavel className="w-4 h-4 text-amber-400" />
                <span className="text-gray-400 text-sm">Current Bid</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                {formatCurrency(currentBid)}
              </span>
            </div>

            {/* Countdown Timer */}
            {status === 'Live' || status === 'Upcoming' ? (
              <div className="flex items-center justify-between bg-gray-800/50 rounded-xl p-3 border border-gray-700/50">
                <div className="flex items-center gap-2">
                  <Timer className="w-4 h-4 text-amber-400" />
                  <span className="text-gray-400 text-xs">Time Left</span>
                </div>
                <div className="flex items-center gap-2 text-white font-mono text-sm">
                  {timeLeft.days > 0 && (
                    <>
                      <span className="bg-gray-700/50 px-2 py-1 rounded">{timeLeft.days}d</span>
                      <span>:</span>
                    </>
                  )}
                  <span className="bg-gray-700/50 px-2 py-1 rounded">{timeLeft.hours.toString().padStart(2, '0')}</span>
                  <span>:</span>
                  <span className="bg-gray-700/50 px-2 py-1 rounded">{timeLeft.mins.toString().padStart(2, '0')}</span>
                  <span>:</span>
                  <span className="bg-gray-700/50 px-2 py-1 rounded">{timeLeft.secs.toString().padStart(2, '0')}</span>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between text-gray-500 text-sm">
                <span>Auction Ended</span>
                <span>{bidsCount} bids placed</span>
              </div>
            )}

            {/* Bids Count */}
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>{bidsCount} bids</span>
              <span>Starting: {formatCurrency(startingBid)}</span>
            </div>
          </div>

          {/* Place Bid Button */}
          {status !== 'Ended' && (
            <motion.button
              whileHover={{ 
                scale: 1.02,
                boxShadow: '0 0 30px rgba(251, 191, 36, 0.4)',
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onPlaceBid && onPlaceBid(id)}
              className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold rounded-xl shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 transition-all duration-300 flex items-center justify-center gap-2"
              aria-label={`Place bid on ${title}`}
            >
              <Gavel className="w-5 h-5" />
              <span>Place Bid</span>
            </motion.button>
          )}
        </div>

        {/* Glassmorphism Shine Effect */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none"
        />

        {/* Premium Border Glow */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 0.5 }}
          className="absolute inset-0 rounded-3xl bg-gradient-to-br from-amber-500/20 via-transparent to-purple-500/20 pointer-events-none blur-xl"
        />
      </motion.div>
    </motion.div>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;
