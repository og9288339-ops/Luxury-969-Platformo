

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { Clock, Users, TrendingUp, AlertCircle, RefreshCw, Filter, ChevronDown, Heart, Share2, Eye } from 'lucide-react';

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price);
};

const formatTimeRemaining = (endTime) => {
  const now = new Date();
  const end = new Date(endTime);
  const diff = end.getTime() - now.getTime();

  if (diff <= 0) return 'Ended';

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  if (minutes > 0) return `${minutes}m ${seconds}s`;
  return `${seconds}s`;
};

const getTimeRemainingColor = (endTime) => {
  const now = new Date();
  const end = new Date(endTime);
  const diff = end.getTime() - now.getTime();
  const hoursRemaining = diff / (1000 * 60 * 60);

  if (hoursRemaining <= 1) return 'text-red-500';
  if (hoursRemaining <= 24) return 'text-orange-500';
  return 'text-green-500';
};

const getConditionBadge = (condition) => {
  const badges = {
    new: { label: 'New', color: 'bg-green-500/20 text-green-400 border-green-500/30' },
    used: { label: 'Used', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
    refurbished: { label: 'Refurbished', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
    vintage: { label: 'Vintage', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
  };
  return badges[condition] || { label: '', color: '' };
};

// ============================================================================
// MOTION VARIANTS
// ============================================================================

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

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  hover: {
    y: -8,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

const skeletonVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const skeletonItemVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      repeat: Infinity,
      repeatType: 'reverse',
    },
  },
};

// ============================================================================
// SKELETON LOADING COMPONENT
// ============================================================================

const AuctionCardSkeleton = () => (
  <motion.div
    variants={skeletonItemVariants}
    className="relative bg-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-800/50"
  >
    <div className="aspect-[4/3] bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse" />
    <div className="p-5 space-y-4">
      <div className="h-4 bg-gray-800 rounded w-3/4 animate-pulse" />
      <div className="h-3 bg-gray-800/50 rounded w-1/2 animate-pulse" />
      <div className="flex items-center justify-between pt-2">
        <div className="h-6 bg-gray-800 rounded w-1/3 animate-pulse" />
        <div className="h-4 bg-gray-800/50 rounded w-1/4 animate-pulse" />
      </div>
    </div>
  </motion.div>
);

// ============================================================================
// ERROR COMPONENT
// ============================================================================

const ErrorState = ({ error, onRetry }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center justify-center py-20 px-6"
  >
    <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
      <AlertCircle className="w-10 h-10 text-red-500" />
    </div>
    <h3 className="text-2xl font-bold text-white mb-2">Unable to Load Auctions</h3>
    <p className="text-gray-400 text-center max-w-md mb-6">{error}</p>
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onRetry}
      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all"
    >
      <RefreshCw className="w-5 h-5" />
      Try Again
    </motion.button>
  </motion.div>
);

// ============================================================================
// EMPTY STATE COMPONENT
// ============================================================================

const EmptyState = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center justify-center py-20 px-6"
  >
    <div className="w-20 h-20 bg-gray-800/50 rounded-full flex items-center justify-center mb-6">
      <TrendingUp className="w-10 h-10 text-gray-600" />
    </div>
    <h3 className="text-2xl font-bold text-white mb-2">No Live Auctions</h3>
    <p className="text-gray-400 text-center max-w-md">
      There are currently no active auctions. Check back soon for new listings!
    </p>
  </motion.div>
);

// ============================================================================
// AUCTION CARD COMPONENT
// ============================================================================

const AuctionCard = React.memo(({ auction, index }) => {
  const [timeRemaining, setTimeRemaining] = useState(formatTimeRemaining(auction.endTime));
  const [isHovered, setIsHovered] = useState(false);
  const [isWatched, setIsWatched] = useState(false);

  const primaryImage = auction.images?.find(img => img.isPrimary) || auction.images?.[0];
  const conditionBadge = getConditionBadge(auction.condition);
  const timeColor = getTimeRemainingColor(auction.endTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(formatTimeRemaining(auction.endTime));
    }, 1000);

    return () => clearInterval(interval);
  }, [auction.endTime]);

  const handleWatchToggle = useCallback((e) => {
    e.stopPropagation();
    setIsWatched(prev => !prev);
  }, []);

  const handleShare = useCallback((e) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: auction.title,
        text: auction.description,
        url: window.location.href + `/auction/${auction.id}`,
      });
    }
  }, [auction]);

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group bg-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-800/50 hover:border-purple-500/50 transition-all duration-300 cursor-pointer"
      style={{ zIndex: isHovered ? 10 : 1 }}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <motion.img
          src={primaryImage?.url || '/placeholder.jpg'}
          alt={primaryImage?.alt || auction.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />

        {/* Status Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {auction.isFeatured && (
            <span className="px-3 py-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-semibold rounded-full shadow-lg">
              Featured
            </span>
          )}
          {auction.isVerified && (
            <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full border border-green-500/30 backdrop-blur-sm">
              Verified
            </span>
          )}
          {conditionBadge.label && (
            <span className={`px-3 py-1 text-xs font-semibold rounded-full border backdrop-blur-sm ${conditionBadge.color}`}>
              {conditionBadge.label}
            </span>
          )}
        </div>

        {/* Time Remaining Badge */}
        <div className="absolute top-3 right-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-900/80 backdrop-blur-sm rounded-lg border border-gray-700/50">
            <Clock className={`w-4 h-4 ${timeColor}`} />
            <span className={`text-sm font-semibold ${timeColor}`}>{timeRemaining}</span>
          </div>
        </div>

        {/* Action Buttons (Hover) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-3 right-3 flex gap-2"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleWatchToggle}
            className={`p-2 rounded-lg backdrop-blur-sm transition-colors ${
              isWatched 
                ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                : 'bg-gray-900/80 text-gray-300 border border-gray-700/50 hover:bg-gray-800'
            }`}
          >
            <Heart className={`w-4 h-4 ${isWatched ? 'fill-current' : ''}`} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleShare}
            className="p-2 rounded-lg bg-gray-900/80 text-gray-300 border border-gray-700/50 hover:bg-gray-800 backdrop-blur-sm transition-colors"
          >
            <Share2 className="w-4 h-4" />
          </motion.button>
        </motion.div>

        {/* View Count */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2 py-1 bg-gray-900/80 backdrop-blur-sm rounded-lg border border-gray-700/50">
          <Eye className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-xs text-gray-300">{auction.viewCount}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        {/* Category */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-purple-400 uppercase tracking-wider">
            {auction.category?.name}
          </span>
          {auction.location && (
            <>
              <span className="text-gray-600">•</span>
              <span className="text-xs text-gray-500">{auction.location}</span>
            </>
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-white line-clamp-2 group-hover:text-purple-400 transition-colors">
          {auction.title}
        </h3>

        {/* Description Preview */}
        <p className="text-sm text-gray-400 line-clamp-2">{auction.description}</p>

        {/* Seller Info */}
        <div className="flex items-center gap-3 pt-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white text-sm font-semibold">
            {auction.sellerName?.charAt(0)?.toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-medium text-white">{auction.sellerName}</p>
            <p className="text-xs text-gray-500">Seller</p>
          </div>
        </div>

        {/* Price & Bids */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-800/50">
          <div>
            <p className="text-xs text-gray-500 mb-1">Current Bid</p>
            <p className="text-xl font-bold text-white">{formatPrice(auction.currentBid)}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 mb-1 flex items-center justify-end gap-1">
              <Users className="w-3 h-3" />
              Bids
            </p>
            <p className="text-lg font-semibold text-purple-400">{auction.bidCount}</p>
          </div>
        </div>

        {/* Shipping Info */}
        {auction.shippingInfo && (
          <div className="pt-2">
            <span className={`text-xs font-medium ${
              auction.shippingInfo.isFree 
                ? 'text-green-400' 
                : 'text-gray-400'
            }`}>
              {auction.shippingInfo.isFree 
                ? '✓ Free Shipping' 
                : `+${formatPrice(auction.shippingInfo.cost)} shipping`}
            </span>
            {auction.shippingInfo.estimatedDays && (
              <span className="text-xs text-gray-500 ml-2">
                ({auction.shippingInfo.estimatedDays})
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
});

AuctionCard.displayName = 'AuctionCard';

// ============================================================================
// FILTER COMPONENT
// ============================================================================

const FilterBar = ({ filters, onFilterChange, categories }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800/50 p-4 mb-6">
      <div className="flex flex-wrap items-center gap-4">
        {/* Category Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={filters.category}
            onChange={(e) => onFilterChange({ category: e.target.value })}
            className="bg-gray-800/50 text-white text-sm rounded-lg px-3 py-2 border border-gray-700/50 focus:border-purple-500 focus:outline-none transition-colors"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <select
          value={filters.status}
          onChange={(e) => onFilterChange({ status: e.target.value })}
          className="bg-gray-800/50 text-white text-sm rounded-lg px-3 py-2 border border-gray-700/50 focus:border-purple-500 focus:outline-none transition-colors"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="ending-soon">Ending Soon</option>
          <option value="featured">Featured</option>
        </select>

        {/* Sort By */}
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-sm text-gray-400">Sort by:</span>
          <select
            value={filters.sortBy}
            onChange={(e) => onFilterChange({ sortBy: e.target.value })}
            className="bg-gray-800/50 text-white text-sm rounded-lg px-3 py-2 border border-gray-700/50 focus:border-purple-500 focus:outline-none transition-colors"
          >
            <option value="ending-soon">Ending Soon</option>
            <option value="price-high">Price: High to Low</option>
            <option value="price-low">Price: Low to High</option>
            <option value="most-bids">Most Bids</option>
            <option value="newest">Newest</option>
          </select>
        </div>

        {/* Expand Toggle */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <span>Advanced</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </motion.button>
      </div>

      {/* Advanced Filters */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-4 mt-4 border-t border-gray-800/50">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="text-sm text-gray-400 mb-2 block">Price Range</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.priceRange[0] || ''}
                      onChange={(e) => onFilterChange({ 
                        priceRange: [Number(e.target.value) || 0, filters.priceRange[1]] 
                      })}
                      className="flex-1 bg-gray-800/50 text-white text-sm rounded-lg px-3 py-2 border border-gray-700/50 focus:border-purple-500 focus:outline-none transition-colors"
                    />
                    <span className="text-gray-500">-</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.priceRange[1] === Infinity ? '' : filters.priceRange[1]}
                      onChange={(e) => onFilterChange({ 
                        priceRange: [filters.priceRange[0], Number(e.target.value) || Infinity] 
                      })}
                      className="flex-1 bg-gray-800/50 text-white text-sm rounded-lg px-3 py-2 border border-gray-700/50 focus:border-purple-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ============================================================================
// API SERVICE
// ============================================================================

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ============================================================================
// MAIN LIVE AUCTION GRID COMPONENT
// ============================================================================

const LiveAuctionGrid = () => {
  const [auctions, setAuctions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: '',
    status: '',
    priceRange: [0, Infinity],
    sortBy: 'ending-soon',
  });

  // Fetch auctions data
  useEffect(() => {
    let isMounted = true;

    const fetchAuctions = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await api.get('/auctions/live', {
          params: {
            limit: 20,
            status: 'active',
          },
        });

        if (isMounted) {
          if (response.data.success) {
            setAuctions(response.data.data);
            
            // Extract unique categories
            const uniqueCategories = Array.from(
              new Map(
                response.data.data.map(auction => [auction.category.id, auction.category])
              ).values()
            );
            setCategories(uniqueCategories);
          } else {
            setError(response.data.message || 'Failed to fetch auctions');
          }
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err.response?.data?.message || 
            err.message || 
            'An unexpected error occurred while fetching auctions'
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchAuctions();

    // Set up polling for real-time updates
    const pollInterval = setInterval(fetchAuctions, 30000); // Poll every 30 seconds

    return () => {
      isMounted = false;
      clearInterval(pollInterval);
    };
  }, []);

  // Filter and sort auctions
  const filteredAuctions = useMemo(() => {
    let result = [...auctions];

    // Filter by category
    if (filters.category) {
      result = result.filter(auction => auction.category?.id === filters.category);
    }

    // Filter by status
    if (filters.status === 'ending-soon') {
      const oneHourFromNow = new Date(Date.now() + 60 * 60 * 1000);
      result = result.filter(auction => new Date(auction.endTime) <= oneHourFromNow);
    } else if (filters.status === 'featured') {
      result = result.filter(auction => auction.isFeatured);
    }

    // Filter by price range
    result = result.filter(
      auction => auction.currentBid >= filters.priceRange[0] && 
                 auction.currentBid <= filters.priceRange[1]
    );

    // Sort auctions
    switch (filters.sortBy) {
      case 'ending-soon':
        result.sort((a, b) => new Date(a.endTime).getTime() - new Date(b.endTime).getTime());
        break;
      case 'price-high':
        result.sort((a, b) => b.currentBid - a.currentBid);
        break;
      case 'price-low':
        result.sort((a, b) => a.currentBid - b.currentBid);
        break;
      case 'most-bids':
        result.sort((a, b) => b.bidCount - a.bidCount);
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());
        break;
      default:
        break;
    }

    return result;
  }, [auctions, filters]);

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const handleRetry = useCallback(() => {
    // Trigger a re-fetch by reloading the page or calling the fetch function
    window.location.reload();
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Live Auctions
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Discover and bid on exclusive items from verified sellers. Don't miss out on these limited-time opportunities!
          </p>
        </motion.div>

        {/* Filter Bar */}
        {!loading && !error && auctions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <FilterBar
              filters={filters}
              onFilterChange={handleFilterChange}
              categories={categories}
            />
          </motion.div>
        )}

        {/* Loading State */}
        {loading && (
          <motion.div
            variants={skeletonVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {[...Array(8)].map((_, i) => (
              <AuctionCardSkeleton key={i} />
            ))}
          </motion.div>
        )}

        {/* Error State */}
        {error && <ErrorState error={error} onRetry={handleRetry} />}

        {/* Empty State */}
        {!loading && !error && filteredAuctions.length === 0 && auctions.length === 0 && (
          <EmptyState />
        )}

        {/* No Results After Filter */}
        {!loading && !error && filteredAuctions.length === 0 && auctions.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-gray-400 text-lg">No auctions match your current filters.</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilters({
                category: '',
                status: '',
                priceRange: [0, Infinity],
                sortBy: 'ending-soon',
              })}
              className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Clear Filters
            </motion.button>
          </motion.div>
        )}

        {/* Auction Grid */}
        <AnimatePresence mode="wait">
          {!loading && !error && filteredAuctions.length > 0 && (
            <motion.div
              key="auction-grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredAuctions.map((auction, index) => (
                <AuctionCard key={auction.id} auction={auction} index={index} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Count */}
        {!loading && !error && filteredAuctions.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center text-sm text-gray-500"
          >
            Showing {filteredAuctions.length} live auction{filteredAuctions.length !== 1 ? 's' : ''}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default React.memo(LiveAuctionGrid);