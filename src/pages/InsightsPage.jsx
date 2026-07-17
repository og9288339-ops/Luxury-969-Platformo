'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Activity, TrendingUp, Zap } from 'lucide-react';
import AllInsightsSection from '../components/home/AllInsightsSection.jsx';

// ============================================================================
// INSIGHTS PAGE COMPONENT
// ============================================================================

const InsightsPage = () => {
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
            scale: [1, 1.3, 1],
            opacity: [0.06, 0.1, 0.06],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-20 left-20 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-3xl"
        />

        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.08, 0.05],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 4,
          }}
          className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl"
        />

        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl mb-8 shadow-2xl shadow-cyan-500/30"
          >
            <BarChart3 className="w-10 h-10 text-white" />
          </motion.div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6">
            Platform
            <span className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent mt-2">
              Analytics
            </span>
          </h1>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12">
            Real-time insights powered by advanced data analytics. Monitor performance, track trends, and make data-driven decisions.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: <Activity className="w-5 h-5" />, label: 'Data Points', value: '2.4B' },
              { icon: <Zap className="w-5 h-5" />, label: 'Updates/Sec', value: '10K' },
              { icon: <TrendingUp className="w-5 h-5" />, label: 'Uptime', value: '99.99%' },
              { icon: <BarChart3 className="w-5 h-5" />, label: 'Latency', value: '< 50ms' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="bg-gray-900/40 backdrop-blur-xl rounded-2xl border border-gray-800/50 p-6"
              >
                <div className="flex items-center justify-center gap-2 mb-2 text-cyan-400">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-1">{stat.value}</div>
                <div className="text-gray-500 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* All Insights Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <AllInsightsSection />
      </div>
    </div>
  );
};

export default InsightsPage;