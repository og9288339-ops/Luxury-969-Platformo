

import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { 
  Zap, 
  Shield, 
  Globe, 
  Sparkles, 
  Cpu, 
  Lock, 
  TrendingUp, 
  ArrowRight
} from 'lucide-react';

// ============================================================================
// MOCK DATA
// ============================================================================

const features = [
  {
    id: 'instant-bidding',
    title: 'Instant Bidding',
    description: 'Lightning-fast bid processing with real-time updates. Never miss a winning moment with our sub-millisecond latency engine.',
    icon: <Zap className="w-6 h-6" />,
    color: 'from-yellow-500 to-orange-500',
    glowColor: 'shadow-yellow-500/50',
    stats: {
      value: '< 50ms',
      label: 'Latency',
    },
  },
  {
    id: 'ai-security',
    title: 'AI-Powered Security',
    description: 'Advanced machine learning algorithms detect and prevent fraud in real-time. Your transactions are protected by neural networks.',
    icon: <Shield className="w-6 h-6" />,
    color: 'from-green-500 to-emerald-500',
    glowColor: 'shadow-green-500/50',
    stats: {
      value: '99.9%',
      label: 'Detection Rate',
    },
  },
  {
    id: 'global-access',
    title: 'Global Marketplace',
    description: 'Connect with collectors and sellers from 147 countries. Our decentralized infrastructure ensures worldwide accessibility.',
    icon: <Globe className="w-6 h-6" />,
    color: 'from-blue-500 to-cyan-500',
    glowColor: 'shadow-blue-500/50',
    stats: {
      value: '147+',
      label: 'Countries',
    },
  },
  {
    id: 'smart-recommendations',
    title: 'Smart Recommendations',
    description: 'Personalized AI analyzes your preferences to suggest items you\'ll love. Discover hidden gems tailored to your taste.',
    icon: <Sparkles className="w-6 h-6" />,
    color: 'from-purple-500 to-pink-500',
    glowColor: 'shadow-purple-500/50',
    stats: {
      value: '94%',
      label: 'Match Accuracy',
    },
  },
  {
    id: 'quantum-encryption',
    title: 'Quantum Encryption',
    description: 'Military-grade encryption protects your data and transactions. Security that evolves with emerging threats.',
    icon: <Lock className="w-6 h-6" />,
    color: 'from-red-500 to-rose-500',
    glowColor: 'shadow-red-500/50',
    stats: {
      value: '256-bit',
      label: 'Encryption',
    },
  },
  {
    id: 'real-time-analytics',
    title: 'Real-Time Analytics',
    description: 'Comprehensive dashboards with live data visualization. Track market trends and make informed decisions instantly.',
    icon: <TrendingUp className="w-6 h-6" />,
    color: 'from-indigo-500 to-violet-500',
    glowColor: 'shadow-indigo-500/50',
    stats: {
      value: 'Live',
      label: 'Data Stream',
    },
  },
];

// ============================================================================
// PARTICLE COMPONENT
// ============================================================================

const Particle = React.memo(({ x, y, isActive }) => {
  return (
    <motion.div
      className="absolute w-1 h-1 bg-white rounded-full"
      style={{
        left: x,
        top: y,
      }}
      animate={{
        opacity: isActive ? [0.2, 0.8, 0.2] : [0.1, 0.3, 0.1],
        scale: isActive ? [1, 1.5, 1] : [0.5, 0.8, 0.5],
      }}
      transition={{
        duration: isActive ? 1.5 : 3,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
});

Particle.displayName = 'Particle';

// ============================================================================
// 3D TILT CARD COMPONENT
// ============================================================================

const FeatureCard = React.memo(({ feature, index }) => {
  const cardRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [particles, setParticles] = useState([]);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-10, 10]);
  const scale = useSpring(useMotionValue(1), { stiffness: 300, damping: 20 });

  useEffect(() => {
    // Generate random particles
    const newParticles = Array.from({ length: 20 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));
    setParticles(newParticles);
  }, []);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    setMousePosition({ x: mouseX, y: mouseY });

    x.set(mouseX / rect.width);
    y.set(mouseY / rect.height);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 60,
        rotateX: 10,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        rotateX: 0,
      }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="relative perspective-1000"
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
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative group"
      >
        {/* 3D Card Container */}
        <motion.div
          animate={{
            boxShadow: isHovered 
              ? `0 25px 50px -12px ${feature.glowColor}` 
              : '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
          }}
          transition={{ duration: 0.3 }}
          className="relative bg-gray-900/40 backdrop-blur-xl rounded-3xl border border-gray-800/50 overflow-hidden"
          style={{ transform: 'translateZ(20px)' }}
        >
          {/* Holographic Gradient Border */}
          <motion.div
            animate={{
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100"
            style={{
              background: `linear-gradient(135deg, ${feature.color}40, transparent 50%, ${feature.color}20)`,
            }}
          />

          {/* Particle Layer */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((particle, i) => (
              <Particle
                key={i}
                x={particle.x}
                y={particle.y}
                isActive={isHovered}
              />
            ))}
          </div>

          {/* Inner Glow */}
          <motion.div
            animate={{
              opacity: isHovered ? 0.2 : 0,
            }}
            transition={{ duration: 0.3 }}
            className={`absolute inset-0 bg-gradient-to-br ${feature.color} blur-3xl`}
          />

          {/* Content */}
          <div className="relative p-8">
            {/* Icon Container */}
            <motion.div
              animate={{
                rotate: isHovered ? 360 : 0,
                scale: isHovered ? 1.1 : 1,
              }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg ${feature.glowColor}`}
              style={{ transform: 'translateZ(30px)' }}
            >
              <div className="text-white">{feature.icon}</div>
            </motion.div>

            {/* Title */}
            <motion.h3
              animate={{
                color: isHovered ? '#a78bfa' : '#ffffff',
              }}
              transition={{ duration: 0.3 }}
              className="text-2xl font-bold text-white mb-3"
              style={{ transform: 'translateZ(25px)' }}
            >
              {feature.title}
            </motion.h3>

            {/* Description */}
            <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
              {feature.description}
            </p>

            {/* Stats */}
            {feature.stats && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-center gap-3 mb-6"
              >
                <div className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  {feature.stats.value}
                </div>
                <div className="text-gray-500 text-sm">{feature.stats.label}</div>
              </motion.div>
            )}

            {/* Magnetic CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group/btn relative px-6 py-3 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden"
              style={{ transform: 'translateZ(35px)' }}
            >
              <motion.div
                animate={{
                  x: mousePosition.x * 0.1,
                  y: mousePosition.y * 0.1,
                }}
                transition={{ type: 'spring', stiffness: 150, damping: 15 }}
                className="relative flex items-center gap-2 text-white font-medium"
              >
                <span>Learn More</span>
                <motion.div
                  animate={{ x: isHovered ? 5 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </motion.div>
              
              {/* Button Glow */}
              <motion.div
                animate={{
                  opacity: isHovered ? 1 : 0,
                }}
                className="absolute inset-0 bg-gradient-to-r opacity-0"
                style={{
                  background: `linear-gradient(90deg, ${feature.color}30, transparent)`,
                }}
              />
            </motion.button>
          </div>

          {/* Corner Accents */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gray-700/50 rounded-tl-2xl" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gray-700/50 rounded-tr-2xl" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-gray-700/50 rounded-bl-2xl" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gray-700/50 rounded-br-2xl" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
});

FeatureCard.displayName = 'FeatureCard';

// ============================================================================
// MAIN FEATURES SECTION COMPONENT
// ============================================================================

const FeaturesSection = () => {
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
          scale: [1, 1.3, 1],
          opacity: [0.08, 0.12, 0.08],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.06, 0.1, 0.06],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 3,
        }}
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl"
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
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-3xl mb-8 shadow-2xl shadow-purple-500/30"
          >
            <Cpu className="w-10 h-10 text-white" />
          </motion.div>
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6">
            Powered by
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mt-2">
              Advanced Technology
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Experience the future of digital auctions with cutting-edge features designed for the modern collector.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={feature.id} feature={feature} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-2xl shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all"
          >
            Explore All Features
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default React.memo(FeaturesSection);
