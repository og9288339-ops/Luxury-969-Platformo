// pages/HeroLanding.jsx
import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAI } from '@/context/AIContext';
import { usePortfolio } from '../context/CartContext';

/**
 * 🌟 969 Luxury Marketplace - Cinematic Hero Landing
 * Ultra-premium full-screen experience with cinematic scroll animations
 * 
 * @version 1.0.0
 */

const HeroLanding = () => {
  const { getMarketTrends, marketTrends, GoldenSpinner } = useAI();
  const { portfolioValue } = usePortfolio();
  const [mounted, setMounted] = useState(false);
  const [stats, setStats] = useState({
    totalVolume: '2.4B',
    assetsListed: '1,247',
    investors: '8,742'
  });

  // Animate stats counters
  useEffect(() => {
    setMounted(true);
    
    const animateStats = () => {
      const duration = 3000;
      const startTime = Date.now();
      
      const timer = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        setStats({
          totalVolume: `$${Math.floor(24 * progress).toLocaleString()}B`,
          assetsListed: Math.floor(1247 * progress).toLocaleString(),
          investors: Math.floor(8742 * progress).toLocaleString()
        });
        
        if (progress >= 1) clearInterval(timer);
      }, 16);
      
      return () => clearInterval(timer);
    };
    
    const timeout = setTimeout(animateStats, 500);
    return () => clearTimeout(timeout);
  }, []);

  // Scroll animations
  const { scrollYProgress } = useScroll();
  const yText = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Cinematic Background */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: yBg }}
      >
        <div 
          className="absolute inset-0 bg-fixed bg-cover bg-center bg-no-repeat opacity-40"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.9)), 
                              url('https://images.unsplash.com/photo-1558618047-3c8c76ca3350?ixlib=rb-4.0.3&auto=format&fit=crop&w=2960&q=80')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80" />
      </motion.div>

      {/* Main Hero Content */}
      <motion.div 
        className="relative z-10 flex flex-col min-h-screen pt-20 px-6 lg:px-12 xl:px-24 2xl:px-32"
        style={{ opacity }}
      >
        {/* Hero Title Section */}
        <motion.div 
          className="flex-1 flex flex-col justify-center items-start text-left max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[10rem] font-light tracking-widest uppercase bg-gradient-to-r from-gold via-yellow-400 to-gold bg-clip-text text-transparent mb-8 leading-[0.85] drop-shadow-2xl"
            style={{ translateY: yText }}
          >
            INVEST IN
            <br />
            <span className="font-black tracking-widest">EXCELLENCE</span>
          </motion.h1>

          <motion.p 
            className="text-xl md:text-2xl lg:text-3xl text-gray-300 font-light max-w-2xl leading-relaxed mb-12 opacity-90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            The world's most exclusive marketplace for luxury assets. 
            <br />
            <span className="text-gold font-semibold">Porsche. Patek. Private Islands.</span>
          </motion.p>

          {/* Golden CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <Link
              to="/marketplace"
              className="group relative px-12 py-6 text-xl font-bold uppercase tracking-widest bg-transparent border-2 border-gold text-gold rounded-full 
                       hover:bg-gold hover:text-black hover:shadow-2xl hover:shadow-gold/50 
                       transition-all duration-500 ease-out transform hover:scale-105 hover:rotate-2
                       overflow-hidden"
            >
              <span className="relative z-10">ENTER MARKETPLACE</span>
              <motion.div 
                className="absolute inset-0 bg-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />
              <motion.div 
                className="absolute -inset-2 bg-gradient-to-r from-gold via-yellow-400 to-gold opacity-75 blur-xl group-hover:opacity-100 transition-all duration-500"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1.2, opacity: 1 }}
              />
            </Link>
          </motion.div>
        </motion.div>

        {/* Stats Bar */}
        <motion.div 
          className="grid grid-cols-3 gap-12 lg:gap-20 pb-20 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          {Object.entries(stats).map(([key, value], index) => (
            <motion.div
              key={key}
              className="text-center group"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8 + index * 0.1 }}
            >
              <div className="text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl font-black text-gold mb-2 tracking-wide drop-shadow-lg">
                {value}
              </div>
              <div className="text-sm md:text-base uppercase tracking-widest text-gray-400 font-light">
                {key === 'totalVolume' ? 'Trading Volume' : 
                 key === 'assetsListed' ? 'Premium Assets' : 'Global Investors'}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Featured Assets Preview */}
      <motion.section 
        id="featured"
        className="relative py-32 bg-gradient-to-b from-black/50 to-gray-900 overflow-hidden"
        initial={{ y: 100 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="container mx-auto px-6 lg:px-12 xl:px-24 2xl:px-32">
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-light tracking-widest uppercase text-center mb-24 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            Featured Masterpieces
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              { name: '1965 Ferrari 275 GTB', price: '$2.85M', img: 'https://images.unsplash.com/photo-1558618047-3c8c76ca3350?w=400' },
              { name: 'Patek Philippe Grandmaster', price: '$8.2M', img: 'https://images.unsplash.com/photo-1587563871167-1ee9c731a64e?w=400' },
              { name: 'Monaco Penthouse', price: '$47M', img: 'https://images.unsplash.com/photo-1571896349840-0d6f5f44d49e?w=400' }
            ].map((asset, index) => (
              <motion.div
                key={asset.name}
                className="group relative overflow-hidden rounded-3xl bg-black/50 backdrop-blur-xl border border-gray-800/50 hover:border-gold/50 transition-all duration-700 cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <div className="relative h-80 overflow-hidden">
                  <img 
                    src={asset.img} 
                    alt={asset.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                
                <div className="p-8">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gold transition-colors">{asset.name}</h3>
                  <div className="text-2xl font-black text-gold tracking-wide">{asset.price}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Trusted By Scroll */}
      <motion.div 
        className="py-20 bg-gray-950/50 overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6 lg:px-12 xl:px-24">
          <h3 className="text-2xl md:text-3xl font-light uppercase tracking-widest text-center mb-12 text-gray-400">
            Trusted by Global Visionaries
          </h3>
          <div className="flex gap-16 animate-marquee items-center whitespace-nowrap">
            {['UBS', 'JPMorgan', 'Sothebys', 'Christies', 'Knight Frank', 'Family Offices'].map((brand) => (
              <motion.div
                key={brand}
                className="text-2xl md:text-3xl font-black uppercase tracking-widest text-gray-500 hover:text-gold transition-colors cursor-default flex-shrink-0 py-8"
                whileHover={{ scale: 1.1, y: -5 }}
              >
                {brand}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default HeroLanding;