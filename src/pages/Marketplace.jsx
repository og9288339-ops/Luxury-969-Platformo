// pages/Marketplace.jsx
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAI } from '../context/AIContext';
import { usePortfolio } from '../context/CartContext';
import api from '../api/axios';
import { GridIcon } from '../assets/icons';

/**
 * 🏛️ 969 Luxury Marketplace - Enterprise Asset Grid
 * High-performance, filterable showcase of $969M+ luxury assets
 * 
 * @version 2.0.0
 * @author 969 Luxury Engineering
 */

const Marketplace = () => {
  const { getAIValuation, isCalculating, GoldenSpinner: AISpinner } = useAI();
  const { addAsset, portfolioValue } = usePortfolio();
  
  // Sample luxury assets (replace with API data)
  const [assets, setAssets] = useState([]);
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: [0, 50000000],
    aiRecommended: false,
    search: ''
  });
  const [activeFilters, setActiveFilters] = useState(0);

  // Fetch assets on mount
  useEffect(() => {
    const fetchAssets = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1200));
        
        const luxuryAssets = [
          {
            id: 'ferrari-275gtb-001',
            name: '1965 Ferrari 275 GTB Alloy',
            category: 'cars',
            price: 2850000,
            btcPrice: 42.3,
            image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca3350?w=500&auto=format&fit=crop&q=80',
            details: { make: 'Ferrari', condition: 'Mint', mileage: '12,450' }
          },
          {
            id: 'patek-grandmaster-001',
            name: 'Patek Philippe Grandmaster Chime',
            category: 'watches',
            price: 8200000,
            btcPrice: 121.8,
            image: 'https://images.unsplash.com/photo-1587563871167-1ee9c731a64e?w=500&auto=format&fit=crop&q=80',
            details: { reference: '6300A', condition: 'Unworn' }
          },
          {
            id: 'monaco-penthouse-001',
            name: 'Monaco Oceanfront Penthouse',
            category: 'real-estate',
            price: 47000000,
            btcPrice: 698.4,
            image: 'https://images.unsplash.com/photo-1571896349840-0d6f5f44d49e?w=500&auto=format&fit=crop&q=80',
            details: { size: '12,500 sq ft', location: 'Monte Carlo' }
          },
          {
            id: 'rolex-daytona-001',
            name: 'Rolex Daytona Paul Newman',
            category: 'watches',
            price: 1250000,
            btcPrice: 18.6,
            image: 'https://images.unsplash.com/photo-1608043152266-119265fd3dc9?w=500&auto=format&fit=crop&q=80',
            details: { reference: '6263', condition: 'Original' }
          },
          {
            id: 'lamborghini-countach-001',
            name: '1985 Lamborghini Countach LP5000',
            category: 'cars',
            price: 3800000,
            btcPrice: 56.4,
            image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=500&auto=format&fit=crop&q=80',
            details: { mileage: '8,200', condition: 'Concours' }
          },
          {
            id: 'bahamas-island-001',
            name: 'Private Bahamas Island',
            category: 'real-estate',
            price: 125000000,
            btcPrice: 1856.2,
            image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&auto=format&fit=crop&q=80',
            details: { size: '45 acres', features: 'Private dock' }
          }
        ];
        
        setAssets(luxuryAssets);
      } catch (error) {
        console.error('Failed to fetch assets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssets();
  }, []);

  // Filter assets based on state
  const filtered = useMemo(() => {
    return assets.filter(asset => {
      const matchesCategory = filters.category === 'all' || asset.category === filters.category;
      const matchesPrice = asset.price >= filters.priceRange[0] && asset.price <= filters.priceRange[1];
      const matchesSearch = asset.name.toLowerCase().includes(filters.search.toLowerCase());
      const matchesAI = !filters.aiRecommended || asset.aiValuation; // AI recommended have valuation

      return matchesCategory && matchesPrice && matchesSearch && matchesAI;
    });
  }, [assets, filters]);

  useEffect(() => {
    setFilteredAssets(filtered);
  }, [filtered]);

  // Filter handlers
  const updateFilter = useCallback((key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setActiveFilters(prev => prev + 1);
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      category: 'all',
      priceRange: [0, 50000000],
      aiRecommended: false,
      search: ''
    });
    setActiveFilters(0);
  }, []);

  // Add to portfolio
  const handleAddToPortfolio = useCallback(async (asset) => {
    addAsset({
      ...asset,
      addedAt: new Date().toISOString()
    });
  }, [addAsset]);

  // Responsive grid columns
  const getColumns = () => {
    const width = window.innerWidth;
    return width < 768 ? 1 : width < 1024 ? 2 : width < 1440 ? 3 : 4;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-950 flex items-center justify-center">
        <div className="text-center space-y-8">
          <GoldenSpinner size="lg" />
          <div className="space-y-4">
            <motion.div 
              className="h-2 bg-gold/20 rounded-full mx-auto w-48"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
            <p className="text-xl text-gray-400 font-light tracking-widest uppercase">
              Loading Elite Assets
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900/50 to-gray-950 text-white overflow-hidden">
      {/* Header */}
      <motion.div 
        className="container mx-auto px-6 lg:px-12 xl:px-24 2xl:px-32 pt-24 pb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-widest uppercase bg-gradient-to-r from-gold via-yellow-400 to-gold bg-clip-text text-transparent mb-4">
              The Marketplace
            </h1>
            <p className="text-xl text-gray-300 font-light max-w-2xl">
              {filteredAssets.length} of {assets.length} Elite Assets Available
            </p>
          </div>
          
          <div className="flex items-center gap-4 text-sm">
            <span className="text-gold font-bold">Portfolio: ${portfolioValue.totalValuation.toLocaleString()}</span>
            <Link 
              to="/dashboard" 
              className="px-6 py-3 border border-gold text-gold text-sm uppercase font-bold rounded-full hover:bg-gold hover:text-black transition-all duration-300"
            >
              View Portfolio
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Filters & Grid */}
      <div className="container mx-auto px-6 lg:px-12 xl:px-24 2xl:px-32 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Filters Sidebar */}
          <motion.div 
            className="lg:col-span-1 space-y-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-black/30 backdrop-blur-xl border border-gray-800/50 rounded-3xl p-8 sticky top-24">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-light tracking-widest uppercase text-gold">Filters</h3>
                {activeFilters > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-gray-400 hover:text-gold transition-colors px-3 py-1 rounded-full hover:bg-gray-800/50"
                  >
                    Clear ({activeFilters})
                  </button>
                )}
              </div>

              {/* Search */}
              <div className="mb-8">
                <input
                  type="text"
                  placeholder="Search assets..."
                  value={filters.search}
                  onChange={(e) => updateFilter('search', e.target.value)}
                  className="w-full px-5 py-4 bg-black/50 border border-gray-700/50 rounded-2xl backdrop-blur-xl 
                           text-white placeholder-gray-500 focus:border-gold focus:outline-none transition-all duration-300"
                />
              </div>

              {/* Category Filter */}
              <div className="space-y-3 mb-8">
                <label className="text-sm uppercase tracking-wider text-gray-400 font-light block mb-3">Category</label>
                {['all', 'cars', 'watches', 'real-estate'].map(cat => (
                  <label key={cat} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      value={cat}
                      checked={filters.category === cat}
                      onChange={() => updateFilter('category', cat)}
                      className="w-4 h-4 text-gold bg-gray-800 border-gray-600 focus:ring-gold"
                    />
                    <span className="text-sm capitalize">{cat === 'all' ? 'All Assets' : cat.replace('-', ' ')}</span>
                  </label>
                ))}
              </div>

              {/* Price Range */}
              <div className="space-y-3 mb-8">
                <label className="text-sm uppercase tracking-wider text-gray-400 font-light block mb-3">Price Range</label>
                <div className="space-y-2">
                  {[
                    { label: 'Under $1M', range: [0, 1000000] },
                    { label: '$1M - $5M', range: [1000000, 5000000] },
                    { label: '$5M - $25M', range: [5000000, 25000000] },
                    { label: '$25M+', range: [25000000, Infinity] }
                  ].map((range, i) => (
                    <button
                      key={i}
                      onClick={() => updateFilter('priceRange', range.range)}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 ${
                        filters.priceRange[1] === range.range[1] 
                          ? 'bg-gold/10 border-2 border-gold text-gold' 
                          : 'bg-gray-800/30 border border-gray-700/50 hover:bg-gray-800/50'
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* AI Toggle */}
              <div className="pt-6 border-t border-gray-800/50">
                <label className="flex items-center justify-between p-4 rounded-2xl bg-gray-900/50 hover:bg-gray-800/50 transition-all cursor-pointer">
                  <span className="text-sm uppercase tracking-wider text-gray-300 font-light flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gold rounded-full" />
                    AI Recommended
                  </span>
                  <input
                    type="checkbox"
                    checked={filters.aiRecommended}
                    onChange={(e) => updateFilter('aiRecommended', e.target.checked)}
                    className="w-5 h-5 text-gold bg-gray-800 border-2 border-gray-700 rounded focus:ring-gold"
                  />
                </label>
              </div>
            </div>
          </motion.div>

          {/* Assets Grid */}
          <motion.div 
            className="lg:col-span-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <AnimatePresence>
              {isCalculating && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mb-12 p-8 text-center bg-black/50 rounded-3xl backdrop-blur-xl border border-gold/30"
                >
                  <AISpinner size="lg" />
                  <p className="mt-4 text-gold font-light tracking-wider uppercase">
                    Calculating AI Valuations...
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className={`grid grid-cols-1 md:grid-cols-${getColumns()} gap-8`}>
              <AnimatePresence>
                {filteredAssets.map((asset, index) => (
                  <motion.div
                    key={asset.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                    layout
                    className="group"
                  >
                    <Link to={`/asset/${asset.id}`} className="block">
                      <div className="relative h-96 rounded-3xl overflow-hidden bg-gradient-to-br from-black/60 to-gray-900/70 
                                     backdrop-blur-xl border border-gray-800/50 hover:border-gold/50 
                                     transition-all duration-700 hover:shadow-2xl hover:shadow-gold/20 hover:scale-[1.02]
                                     hover:-translate-y-4">
                        
                        {/* Lazy Loaded Image */}
                        <motion.img 
                          src={asset.image}
                          alt={asset.name}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          whileHover={{ scale: 1.1 }}
                        />
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent 
                                       opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        {/* Content */}
                        <div className="absolute bottom-6 left-6 right-6">
                          <div className="space-y-3">
                            {/* AI Valuation Badge */}
                            <motion.div 
                              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-gold/90 to-yellow-500/90 
                                        text-black text-xs uppercase font-bold tracking-wider rounded-full shadow-lg"
                              initial={{ scale: 0 }}
                              whileHover={{ scale: 1.05 }}
                            >
                              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              AI Verified Value
                            </motion.div>
                            
                            {/* Asset Name */}
                            <h3 className="text-2xl lg:text-3xl font-black text-white leading-tight line-clamp-2 group-hover:text-gold transition-colors">
                              {asset.name}
                            </h3>
                            
                            {/* Price */}
                            <div className="flex items-baseline space-x-4">
                              <span className="text-4xl lg:text-5xl font-black text-gold tracking-tight">
                                ${asset.price.toLocaleString()}
                              </span>
                              <span className="text-lg text-gray-400 font-mono">or {asset.btcPrice} ₿</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Add to Portfolio Button */}
                        <motion.button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleAddToPortfolio(asset);
                          }}
                          className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 
                                   bg-gold/90 hover:bg-gold text-black px-6 py-3 rounded-2xl font-bold uppercase 
                                   tracking-wider shadow-lg hover:shadow-xl hover:scale-105 transform"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Add to Portfolio
                        </motion.button>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* No Results */}
            {filteredAssets.length === 0 && !loading && (
              <motion.div 
                className="col-span-full text-center py-32"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="inline-block p-12 bg-black/30 rounded-3xl backdrop-blur-xl border border-gray-800/50">
                  <h3 className="text-3xl font-light tracking-widest uppercase text-gray-400 mb-4">
                    No Assets Found
                  </h3>
                  <p className="text-lg text-gray-500 mb-8 max-w-md mx-auto">
                    Try adjusting your filters or discover our full collection
                  </p>
                  <button
                    onClick={clearFilters}
                    className="px-8 py-4 border-2 border-gold text-gold font-bold uppercase rounded-full 
                             hover:bg-gold hover:text-black transition-all duration-300 transform hover:scale-105"
                  >
                    Show All Assets
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;