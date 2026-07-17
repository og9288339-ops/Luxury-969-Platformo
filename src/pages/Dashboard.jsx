// pages/Dashboard.jsx
import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LineChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { usePortfolio } from '../context/CartContext';
import { useAI } from '../context/AIContext';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

/**
 * 📊 969 Luxury Assets - Elite Investor Dashboard
 * Personalized portfolio intelligence for high-net-worth individuals
 * 
 * @version 2.1.0
 * @author 969 Luxury Portfolio Team
 */

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { portfolioValue, assets } = usePortfolio();
  const { marketTrends, getMarketTrends, recentValuations } = useAI();
  const [stats, setStats] = useState({
    totalAssets: 0,
    netWorthUSD: 0,
    netWorthBTC: 0,
    performanceYTD: 0,
    unrealizedGains: 0
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // Portfolio chart data
  const portfolioChartData = [
    { period: 'Jan', value: 1.2, benchmark: 1.1 },
    { period: 'Feb', value: 1.35, benchmark: 1.18 },
    { period: 'Mar', value: 1.52, benchmark: 1.25 },
    { period: 'Apr', value: 1.78, benchmark: 1.32 },
    { period: 'May', value: 2.05, benchmark: 1.41 },
    { period: 'Jun', value: 2.48, benchmark: 1.52 }
  ];

  // Load dashboard data
  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true);
      try {
        // Fetch market trends
        await getMarketTrends();
        
        // Simulate personalized stats
        setTimeout(() => {
          setStats({
            totalAssets: assets.length || 0,
            netWorthUSD: portfolioValue.grandTotal || 0,
            netWorthBTC: Math.round((portfolioValue.grandTotal || 0) / 56800),
            performanceYTD: 24.7,
            unrealizedGains: Math.round((portfolioValue.grandTotal || 0) * 0.127)
          });
          setLoading(false);
        }, 1200);
      } catch (error) {
        console.error('Dashboard load failed:', error);
        setLoading(false);
      }
    };

    loadDashboard();
  }, [portfolioValue.grandTotal, assets.length, getMarketTrends]);

  const handleLogout = async () => {
    await logout();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-gray-900 flex items-center justify-center p-8">
        <motion.div 
          className="text-center space-y-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              {Array(4).fill(0).map((_, i) => (
                <div key={i} className="h-32 bg-slate-800/50 rounded-3xl animate-pulse" />
              ))}
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <div className="h-96 bg-slate-800/50 rounded-3xl animate-pulse" />
              <div className="h-96 bg-slate-800/50 rounded-3xl animate-pulse hidden xl:block" />
            </div>
          </div>
          <p className="text-2xl text-slate-400 font-light tracking-widest uppercase">
            Loading Elite Intelligence
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900/80 to-gray-900/60 text-white overflow-hidden">
      {/* Header */}
      <motion.div 
        className="border-b border-slate-800/50 backdrop-blur-xl px-8 py-8 sticky top-0 z-50"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-gold via-yellow-400 to-gold bg-clip-text text-transparent mb-2">
              Elite Portfolio
            </h1>
            <p className="text-xl text-slate-300 font-light">
              Welcome back, <span className="font-bold text-gold">{user?.fullName || user?.email?.split('@')[0]}</span>
            </p>
          </div>
          
          <div className="flex items-center gap-4 self-start lg:self-end">
            <Link 
              to="/marketplace"
              className="px-8 py-4 bg-gradient-to-r from-slate-800/50 to-slate-700/50 border border-slate-700/50 
                     hover:from-gold/90 hover:to-yellow-500 hover:border-gold hover:text-black font-bold uppercase 
                     rounded-2xl transition-all duration-500 shadow-xl hover:shadow-gold/25 transform hover:scale-105"
            >
              Continue Shopping
            </Link>
            <button
              onClick={handleLogout}
              className="px-8 py-4 bg-rose-600/90 hover:bg-rose-500 text-white font-bold uppercase 
                       rounded-2xl transition-all duration-300 shadow-xl hover:shadow-rose-500/25 
                       transform hover:scale-105 whitespace-nowrap border-2 border-rose-600/50 hover:border-rose-500"
            >
              Secure Logout
            </button>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-8 py-12 lg:py-24">
        
        {/* KPI Stats */}
        <motion.section 
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 gap-8 mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, staggerChildren: 0.1 }}
        >
          {[
            { 
              label: 'Total Assets', 
              value: stats.totalAssets, 
              suffix: '', 
              color: 'emerald',
              change: '+2 this month'
            },
            { 
              label: 'Net Worth USD', 
              value: stats.netWorthUSD.toLocaleString(), 
              suffix: 'USD', 
              color: 'gold',
              change: `+${stats.performanceYTD}% YTD`
            },
            { 
              label: 'Net Worth BTC', 
              value: stats.netWorthBTC.toLocaleString(), 
              suffix: '₿', 
              color: 'orange',
              change: '+18.4% vs benchmark'
            },
            { 
              label: 'Unrealized Gains', 
              value: `$${stats.unrealizedGains.toLocaleString()}`, 
              suffix: '', 
              color: 'emerald',
              change: '+12.7% QoQ'
            },
            { 
              label: 'Portfolio Beta', 
              value: '1.23', 
              suffix: 'x', 
              color: 'purple',
              change: 'Low volatility'
            }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="group p-8 bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 
                       rounded-3xl hover:border-gold/50 hover:shadow-2xl hover:shadow-gold/20 
                       transition-all duration-500 cursor-default h-48 flex flex-col justify-between"
              whileHover={{ scale: 1.02, y: -8 }}
            >
              <div>
                <p className="text-slate-400 font-mono text-sm uppercase tracking-wider mb-2">{stat.label}</p>
                <div className="flex items-baseline space-x-2 mb-1">
                  <span className={`text-4xl xl:text-5xl font-black bg-gradient-to-r from-${stat.color}-400 to-${stat.color}-300 bg-clip-text text-transparent`}>
                    {stat.value}
                  </span>
                  <span className="text-2xl font-black text-slate-500">{stat.suffix}</span>
                </div>
              </div>
              <p className="text-emerald-400 text-sm font-mono font-bold group-hover:text-emerald-300 transition-colors">
                {stat.change}
              </p>
            </motion.div>
          ))}
        </motion.section>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
          
          {/* Portfolio Performance Chart */}
          <motion.section 
            className="xl:col-span-2 bg-slate-900/30 backdrop-blur-xl border border-slate-800/50 rounded-3xl p-8"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-black tracking-tight bg-gradient-to-r from-slate-200 to-slate-300 bg-clip-text text-transparent">
                Portfolio Performance
              </h2>
              <div className="flex items-center space-x-4 text-sm font-mono text-slate-400">
                <span>Benchmark: S&P 500</span>
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              </div>
            </div>
            
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={portfolioChartData}>
                <defs>
                  <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.8} />
                    <stop offset="70%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="rgba(75,85,99,0.1)" strokeDasharray="3 3" />
                <XAxis 
                  dataKey="period" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 14, fill: 'slate-400', fontWeight: 500 }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 14, fill: 'slate-400', fontWeight: 500 }}
                  tickFormatter={(value) => `$${value}B`}
                />
                <Tooltip 
                  contentStyle={{
                    background: 'rgba(15,23,42,0.98)',
                    border: '1px solid rgba(75,85,99,0.3)',
                    borderRadius: '16px',
                    fontFamily: 'monospace'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#10b981" 
                  strokeWidth={4}
                  dot={{ fill: '#10b981', strokeWidth: 3 }}
                  activeDot={{ r: 8, strokeWidth: 3 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="benchmark" 
                  stroke="rgba(148,163,184,0.5)" 
                  strokeWidth={2}
                  dot={false}
                />
                <Area type="monotone" dataKey="value" stroke={false} fillOpacity={0.1} fill="url(#portfolioGradient)" />
              </LineChart>
            </ResponsiveContainer>
          </motion.section>

          {/* Quick Actions & Insights */}
          <motion.div 
            className="space-y-8 xl:col-span-1"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            
            {/* Market Insights */}
            <motion.div 
              className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 rounded-3xl p-8"
              whileHover={{ scale: 1.01 }}
            >
              <h3 className="text-2xl font-black text-gold mb-6 uppercase tracking-wider font-mono">Market Pulse</h3>
              <div className="space-y-4">
                {marketTrends?.hotAssets?.slice(0, 3).map((asset, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-slate-800/30 rounded-2xl">
                    <span className="font-mono text-slate-300">{asset.category}</span>
                    <span className="font-bold text-emerald-400 text-lg">{asset.trend}</span>
                  </div>
                ))}
                {!marketTrends && (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-slate-800/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <svg className="w-10 h-10 text-slate-600 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </div>
                    <p className="text-slate-500 font-mono text-sm">Loading intelligence...</p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div 
              className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 rounded-3xl p-8"
              whileHover={{ scale: 1.01 }}
            >
              <h3 className="text-2xl font-black text-slate-200 mb-6 uppercase tracking-wider font-mono">Recent Activity</h3>
              <div className="space-y-4">
                {recentValuations.slice(0, 3).map((valuation, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-slate-800/30 rounded-2xl text-sm">
                    <span className="font-mono text-slate-400 truncate flex-1 mr-4">
                      {valuation.asset?.make} {valuation.asset?.model}
                    </span>
                    <span className="font-bold text-gold">
                      ${valuation.result?.fairMarketPrice?.toLocaleString()}
                    </span>
                  </div>
                ))}
                {recentValuations.length === 0 && (
                  <p className="text-center py-12 text-slate-500 font-mono">
                    No recent valuations
                  </p>
                )}
              </div>
            </motion.div>

            {/* Portfolio Summary */}
            <motion.div 
              className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border border-emerald-500/30 
                       backdrop-blur-xl rounded-3xl p-8 text-center"
              whileHover={{ scale: 1.01 }}
            >
              <h4 className="text-lg font-bold text-emerald-400 uppercase tracking-wider mb-4 font-mono">Portfolio Health</h4>
              <div className="space-y-2">
                <div className="text-3xl font-black text-emerald-300">
                  {assets.length} Assets
                </div>
                <div className="w-full bg-emerald-500/20 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-emerald-400 to-emerald-500 h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${Math.min((assets.length / 10) * 100, 100)}%` }}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;