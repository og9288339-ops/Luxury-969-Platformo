

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { TrendingUp, Users, DollarSign, Globe, ArrowUpRight, Activity } from 'lucide-react';

// ============================================================================
// MOCK DATA
// ============================================================================

const mockStats = [
  {
    id: 'total-auctions',
    label: 'Total Auctions',
    value: 12847,
    suffix: '',
    decimals: 0,
    icon: <TrendingUp className="w-6 h-6" />,
    trend: {
      value: 12.5,
      isPositive: true,
      label: 'vs last month',
    },
    color: 'from-purple-500 to-indigo-500',
    glowColor: 'shadow-purple-500/50',
  },
  {
    id: 'active-bidders',
    label: 'Active Bidders',
    value: 45230,
    suffix: '',
    decimals: 0,
    icon: <Users className="w-6 h-6" />,
    trend: {
      value: 8.3,
      isPositive: true,
      label: 'vs last week',
    },
    color: 'from-blue-500 to-cyan-500',
    glowColor: 'shadow-blue-500/50',
  },
  {
    id: 'tvl',
    label: 'Total Value Locked',
    value: 8.92,
    prefix: '$',
    suffix: 'M',
    decimals: 2,
    icon: <DollarSign className="w-6 h-6" />,
    trend: {
      value: 24.7,
      isPositive: true,
      label: 'vs last quarter',
    },
    color: 'from-green-500 to-emerald-500',
    glowColor: 'shadow-green-500/50',
  },
  {
    id: 'global-reach',
    label: 'Global Reach',
    value: 147,
    suffix: ' countries',
    decimals: 0,
    icon: <Globe className="w-6 h-6" />,
    trend: {
      value: 5.2,
      isPositive: true,
      label: 'new regions',
    },
    color: 'from-orange-500 to-red-500',
    glowColor: 'shadow-orange-500/50',
  },
];

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

const formatNumber = (value, decimals = 0) => {
  if (value >= 1000000) {
    return (value / 1000000).toFixed(decimals) + 'M';
  }
  if (value >= 1000) {
    return (value / 1000).toFixed(decimals) + 'K';
  }
  return value.toFixed(decimals);
};

// ============================================================================
// ANIMATED NUMBER COMPONENT
// ============================================================================

const AnimatedNumber = React.memo(({ 
  value, 
  decimals = 0, 
  duration = 2 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const animatedValue = useTransform(motionValue, (latest) => 
    formatNumber(latest, decimals)
  );

  useEffect(() => {
    if (isInView) {
      const controls = animate(motionValue, value, {
        duration,
        ease: [0.25, 0.46, 0.45, 0.94],
      });
      return controls.stop;
    }
  }, [isInView, motionValue, value, duration]);

  return <span ref={ref}>{animatedValue}</span>;
});

AnimatedNumber.displayName = 'AnimatedNumber';

// ============================================================================
// STAT CARD COMPONENT
// ============================================================================

const StatCard = React.memo(({ stat, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group"
    >
      {/* Glassmorphism Card */}
      <motion.div
        animate={{
          y: isHovered ? -8 : 0,
          boxShadow: isHovered 
            ? `0 20px 40px -10px ${stat.glowColor}` 
            : '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="relative bg-gray-900/40 backdrop-blur-xl rounded-2xl border border-gray-800/50 overflow-hidden"
      >
        {/* Animated Gradient Border */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(135deg, ${stat.color.split(' ')[0].replace('from-', '')}20, transparent)`,
          }}
        />

        {/* Inner Glow Effect */}
        <motion.div
          animate={{
            opacity: isHovered ? 0.3 : 0,
            scale: isHovered ? 1.2 : 1,
          }}
          transition={{ duration: 0.4 }}
          className={`absolute inset-0 bg-gradient-to-br ${stat.color} blur-3xl`}
        />

        {/* Pulse Animation */}
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${stat.color} rounded-full blur-2xl opacity-20`}
        />

        {/* Content */}
        <div className="relative p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <motion.div
              animate={{
                rotate: isHovered ? 360 : 0,
                scale: isHovered ? 1.1 : 1,
              }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              className={`p-3 bg-gradient-to-br ${stat.color} rounded-xl shadow-lg`}
            >
              <div className="text-white">{stat.icon}</div>
            </motion.div>

            {/* Trend Badge */}
            <motion.div
              animate={{
                x: isHovered ? 5 : 0,
              }}
              transition={{ duration: 0.3 }}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg ${
                stat.trend.isPositive 
                  ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                  : 'bg-red-500/10 text-red-400 border border-red-500/20'
              }`}
            >
              <ArrowUpRight className="w-4 h-4" />
              <span className="text-sm font-semibold">{stat.trend.value}%</span>
            </motion.div>
          </div>

          {/* Value */}
          <div className="mb-2">
            <div className="flex items-baseline gap-1">
              {stat.prefix && (
                <span className="text-2xl sm:text-3xl font-bold text-gray-400">
                  {stat.prefix}
                </span>
              )}
              <span className="text-4xl sm:text-5xl font-bold text-white">
                <AnimatedNumber 
                  value={stat.value} 
                  decimals={stat.decimals} 
                  duration={2.5} 
                />
              </span>
              {stat.suffix && (
                <span className="text-xl sm:text-2xl font-semibold text-gray-400">
                  {stat.suffix}
                </span>
              )}
            </div>
          </div>

          {/* Label */}
          <p className="text-gray-400 text-sm sm:text-base mb-4">{stat.label}</p>

          {/* Trend Info */}
          <div className="flex items-center gap-2 text-sm">
            <Activity className={`w-4 h-4 ${stat.trend.isPositive ? 'text-green-400' : 'text-red-400'}`} />
            <span className="text-gray-500">{stat.trend.label}</span>
          </div>

          {/* Hover Indicator Line */}
          <motion.div
            className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r"
            style={{
              background: `linear-gradient(90deg, ${stat.color.split(' ')[0].replace('from-', '')}, ${stat.color.split(' ')[1].replace('to-', '')})`,
            }}
            initial={{ width: '0%' }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
});

StatCard.displayName = 'StatCard';

// ============================================================================
// MAIN STATS COMPONENT
// ============================================================================

const Stats = () => {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950" />
      
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, #666 1px, transparent 1px),
            linear-gradient(to bottom, #666 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }} />
      </div>

      {/* Animated Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-20 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
        className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
      />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Platform Statistics
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Real-time metrics showcasing our growth and global impact in the auction marketplace.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockStats.map((stat, index) => (
            <StatCard key={stat.id} stat={stat} index={index} />
          ))}
        </div>

        {/* Bottom Info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-500 text-sm">
            Data updated in real-time • Last refresh: {new Date().toLocaleTimeString()}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default React.memo(Stats);