import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Activity, 
  Zap, 
  Globe,
  ArrowUpRight,
  Info
} from 'lucide-react';

// ============================================================================
// MOCK DATA
// ============================================================================

const insights = [
  {
    id: 'total-volume',
    title: 'Total Trading Volume',
    value: '$847.5M',
    change: '+24.7%',
    trend: 'up',
    icon: <DollarSign className="w-6 h-6" />,
    color: 'from-emerald-400 to-green-500',
    glowColor: 'shadow-emerald-500/50',
    description: 'Total value of all transactions processed on the platform.',
    liveIndicator: true,
  },
  {
    id: 'active-users',
    title: 'Active Users',
    value: '124,847',
    change: '+18.3%',
    trend: 'up',
    icon: <Users className="w-6 h-6" />,
    color: 'from-cyan-400 to-blue-500',
    glowColor: 'shadow-cyan-500/50',
    description: 'Number of unique users actively engaging with the platform.',
    liveIndicator: true,
  },
  {
    id: 'auctions-completed',
    title: 'Auctions Completed',
    value: '45,231',
    change: '+32.1%',
    trend: 'up',
    icon: <Activity className="w-6 h-6" />,
    color: 'from-purple-400 to-violet-500',
    glowColor: 'shadow-purple-500/50',
    description: 'Total number of successfully completed auctions.',
    liveIndicator: false,
  },
  {
    id: 'avg-bid-time',
    title: 'Avg. Bid Time',
    value: '0.8s',
    change: '-15.4%',
    trend: 'down',
    icon: <Zap className="w-6 h-6" />,
    color: 'from-yellow-400 to-orange-500',
    glowColor: 'shadow-yellow-500/50',
    description: 'Average time from bid placement to confirmation.',
    liveIndicator: true,
  },
  {
    id: 'global-reach',
    title: 'Global Reach',
    value: '147',
    change: '+5.2%',
    trend: 'up',
    icon: <Globe className="w-6 h-6" />,
    color: 'from-pink-400 to-rose-500',
    glowColor: 'shadow-pink-500/50',
    description: 'Number of countries with active platform users.',
    liveIndicator: false,
  },
  {
    id: 'success-rate',
    title: 'Success Rate',
    value: '98.7%',
    change: '+2.1%',
    trend: 'up',
    icon: <TrendingUp className="w-6 h-6" />,
    color: 'from-indigo-400 to-blue-500',
    glowColor: 'shadow-indigo-500/50',
    description: 'Percentage of auctions that successfully complete.',
    liveIndicator: true,
  },
];

// ============================================================================
// MOTION VARIANTS
// ============================================================================

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    filter: 'brightness(0.3)',
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'brightness(1)',
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// ============================================================================
// TOOLTIP COMPONENT
// ============================================================================

const Tooltip = ({ content, position, isVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.2 }}
          className="fixed z-50 px-4 py-3 bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-xl shadow-2xl max-w-xs pointer-events-none"
          style={{
            left: position.x + 15,
            top: position.y - 10,
          }}
        >
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-gray-300">{content}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ============================================================================
// LIVE INDICATOR COMPONENT
// ============================================================================

const LiveIndicator = () => {
  return (
    <div className="flex items-center gap-2">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [1, 0.5, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="w-2 h-2 bg-emerald-400 rounded-full"
      />
      <span className="text-xs font-medium text-emerald-400">LIVE</span>
    </div>
  );
};

// ============================================================================
// INSIGHT CARD COMPONENT
// ============================================================================

const InsightCard = React.memo(({ insight, index }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-5, 5]);
  const scale = useSpring(useMotionValue(1), { stiffness: 300, damping: 20 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    x.set(mouseX / rect.width);
    y.set(mouseY / rect.height);

    setTooltipPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setShowTooltip(false);
    x.set(0);
    y.set(0);
  };

  return (
    <>
      <motion.div
        variants={cardVariants}
        className="relative"
      >
        <motion.div
          ref={cardRef}
          style={{
            rotateX,
            rotateY,
            scale,
            transformStyle: 'preserve-3d',
          }}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="relative group"
        >
          {/* Card Container */}
          <motion.div
            animate={{
              boxShadow: isHovered 
                ? `0 30px 60px -15px ${insight.glowColor}` 
                : '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
            }}
            transition={{ duration: 0.3 }}
            className="relative bg-gray-900/40 backdrop-blur-xl rounded-2xl border border-gray-800/50 overflow-hidden"
            style={{ transform: 'translateZ(20px)' }}
          >
            {/* Holographic Gradient Overlay */}
            <motion.div
              animate={{
                opacity: isHovered ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100"
              style={{
                background: `linear-gradient(135deg, ${insight.color}30, transparent 50%, ${insight.color}15)`,
              }}
            />

            {/* Pulsing Glow Effect */}
            <motion.div
              animate={{
                opacity: isHovered ? 0.3 : 0.1,
                scale: isHovered ? 1.1 : 1,
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className={`absolute inset-0 bg-gradient-to-br ${insight.color} blur-3xl`}
            />

            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `
                  linear-gradient(to right, #666 1px, transparent 1px),
                  linear-gradient(to bottom, #666 1px, transparent 1px)
                `,
                backgroundSize: '20px 20px',
              }} />
            </div>

            {/* Content */}
            <div className="relative p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <motion.div
                  animate={{
                    rotate: isHovered ? 360 : 0,
                    scale: isHovered ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                  className={`w-12 h-12 bg-gradient-to-br ${insight.color} rounded-xl flex items-center justify-center shadow-lg ${insight.glowColor}`}
                  style={{ transform: 'translateZ(30px)' }}
                >
                  <div className="text-white">{insight.icon}</div>
                </motion.div>

                {insight.liveIndicator && (
                  <LiveIndicator />
                )}
              </div>

              {/* Value */}
              <motion.div
                animate={{
                  scale: isHovered ? 1.05 : 1,
                }}
                transition={{ duration: 0.3 }}
                className="mb-2"
                style={{ transform: 'translateZ(25px)' }}
              >
                <h3 className="text-3xl font-bold text-white mb-1">
                  {insight.value}
                </h3>
              </motion.div>

              {/* Title */}
              <p className="text-gray-400 text-sm mb-4">{insight.title}</p>

              {/* Change Indicator */}
              <motion.div
                animate={{
                  x: isHovered ? 5 : 0,
                }}
                transition={{ duration: 0.3 }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${
                  insight.trend === 'up'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'bg-red-500/10 text-red-400 border border-red-500/20'
                }`}
              >
                <ArrowUpRight className={`w-4 h-4 ${insight.trend === 'down' ? 'rotate-180' : ''}`} />
                <span className="text-sm font-semibold">{insight.change}</span>
              </motion.div>

              {/* Info Icon for Tooltip */}
              <motion.div
                animate={{
                  opacity: isHovered ? 1 : 0.5,
                }}
                className="absolute bottom-4 right-4"
              >
                <Info className="w-4 h-4 text-gray-500" />
              </motion.div>
            </div>

            {/* Animated Border */}
            <motion.div
              animate={{
                opacity: isHovered ? 1 : 0,
              }}
              className="absolute inset-0 rounded-2xl border-2 pointer-events-none"
              style={{
                borderColor: insight.color.split(' ')[1].replace('to-', ''),
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Tooltip */}
      <Tooltip content={insight.description} position={tooltipPosition} isVisible={showTooltip} />
    </>
  );
});

InsightCard.displayName = 'InsightCard';

// ============================================================================
// MAIN ALL INSIGHTS SECTION COMPONENT
// ============================================================================

const AllInsightsSection = () => {
  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 2px 2px, #666 1px, transparent 0)
          `,
          backgroundSize: '40px 40px',
        }} />
      </div>

      {/* Animated Background Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.06, 0.1, 0.06],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.05, 0.08, 0.05],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 4,
        }}
        className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-3xl"
      />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl mb-8 shadow-2xl shadow-cyan-500/30"
          >
            <Activity className="w-10 h-10 text-white" />
          </motion.div>
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6">
            Platform
            <span className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent mt-2">
              Analytics
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Real-time insights powered by advanced data analytics. Monitor performance, track trends, and make data-driven decisions.
          </p>
        </motion.div>

        {/* Insights Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {insights.map((insight, index) => (
            <InsightCard key={insight.id} insight={insight} index={index} />
          ))}
        </motion.div>

        {/* Bottom Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16"
        >
          <div className="bg-gray-900/40 backdrop-blur-xl rounded-2xl border border-gray-800/50 p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: 'Data Points', value: '2.4B' },
                { label: 'Updates/Sec', value: '10K' },
                { label: 'Uptime', value: '99.99%' },
                { label: 'Latency', value: '< 50ms' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-500 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default React.memo(AllInsightsSection);
