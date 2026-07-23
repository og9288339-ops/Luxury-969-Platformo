import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '../contexts/PortfolioContext';
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  CreditCard, 
  TrendingUp, 
  TrendingDown,
  Sparkles,
  Crown,
  Shield,
  Zap,
  Plus,
  History,
  DollarSign,
  PieChart,
  Activity
} from 'lucide-react';

/**
 * Legendary Wallet Page - Premium Luxury Experience
 * 
 * A world-class wallet experience with:
 * - Portfolio integration with real-time balance
 * - Transaction history with animations
 * - Quick funding and withdrawal options
 * - Portfolio performance analytics
 * - Premium glassmorphism design
 * - Cinematic animations
 */
const WalletPage = () => {
  const { assets, portfolioValue, getGrandTotal } = usePortfolio();
  const [activeTab, setActiveTab] = useState('overview');
  const [showFundingModal, setShowFundingModal] = useState(false);

  // Mock transaction data
  const transactions = [
    { id: 1, type: 'deposit', amount: 50000, date: '2024-01-15', status: 'completed' },
    { id: 2, type: 'purchase', amount: -12500, date: '2024-01-14', status: 'completed' },
    { id: 3, type: 'withdrawal', amount: -10000, date: '2024-01-13', status: 'completed' },
    { id: 4, type: 'deposit', amount: 25000, date: '2024-01-12', status: 'completed' },
  ];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(value);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <PieChart className="w-4 h-4" /> },
    { id: 'transactions', label: 'Transactions', icon: <History className="w-4 h-4" /> },
    { id: 'analytics', label: 'Analytics', icon: <Activity className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 p-6 md:p-12">
      {/* Premium Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.03, 0.06, 0.03],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.02, 0.05, 0.02],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Crown className="w-8 h-8 text-amber-400" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-amber-200 to-white bg-clip-text text-transparent">
              Premium Wallet
            </h1>
            <Crown className="w-8 h-8 text-amber-400" />
          </div>
          <p className="text-gray-400 text-lg">Manage your luxury assets and funds</p>
        </motion.div>

        {/* Balance Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-950/80 backdrop-blur-2xl rounded-3xl border border-gray-800/50 p-8 shadow-2xl relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-purple-500/5" />
            
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center">
                    <Wallet className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Total Balance</p>
                    <p className="text-gray-500 text-xs">Available Funds</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-400" />
                  <span className="text-green-400 text-sm font-medium">Secure</span>
                </div>
              </div>

              <div className="mb-8">
                <motion.h2
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                  className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent"
                >
                  {formatCurrency(1000000)}
                </motion.h2>
                <p className="text-gray-400 mt-2">≈ {formatCurrency(1000000 * 0.92)} EUR</p>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: <Plus className="w-5 h-5" />, label: 'Add Funds', color: 'from-green-500 to-emerald-600' },
                  { icon: <ArrowUpRight className="w-5 h-5" />, label: 'Withdraw', color: 'from-blue-500 to-indigo-600' },
                  { icon: <CreditCard className="w-5 h-5" />, label: 'Cards', color: 'from-purple-500 to-violet-600' },
                  { icon: <Zap className="w-5 h-5" />, label: 'Transfer', color: 'from-amber-500 to-orange-600' },
                ].map((action, index) => (
                  <motion.button
                    key={action.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center gap-2 p-4 bg-gray-800/50 rounded-xl border border-gray-700/50 hover:border-gray-600 transition-all group"
                  >
                    <div className={`w-10 h-10 bg-gradient-to-br ${action.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      {action.icon}
                    </div>
                    <span className="text-gray-300 text-sm font-medium">{action.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <div className="flex gap-2 bg-gray-900/50 p-2 rounded-2xl border border-gray-800/50">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/30'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                {tab.icon}
                <span className="font-medium">{tab.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {/* Portfolio Value */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="bg-gradient-to-br from-gray-900/60 to-gray-950/80 backdrop-blur-2xl rounded-3xl border border-gray-800/50 p-6 shadow-2xl"
              >
                <div className="flex items-center gap-3 mb-4">
                  <PieChart className="w-5 h-5 text-amber-400" />
                  <h3 className="text-xl font-bold text-white">Portfolio Value</h3>
                </div>
                <p className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent mb-2">
                  {getGrandTotal}
                </p>
                <div className="flex items-center gap-2 text-green-400 text-sm">
                  <TrendingUp className="w-4 h-4" />
                  <span>+12.5% this month</span>
                </div>
              </motion.div>

              {/* Asset Count */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 }}
                className="bg-gradient-to-br from-gray-900/60 to-gray-950/80 backdrop-blur-2xl rounded-3xl border border-gray-800/50 p-6 shadow-2xl"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                  <h3 className="text-xl font-bold text-white">Total Assets</h3>
                </div>
                <p className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent mb-2">
                  {assets.length}
                </p>
                <p className="text-gray-400 text-sm">Luxury items in portfolio</p>
              </motion.div>

              {/* Recent Activity */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                className="md:col-span-2 bg-gradient-to-br from-gray-900/60 to-gray-950/80 backdrop-blur-2xl rounded-3xl border border-gray-800/50 p-6 shadow-2xl"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Activity className="w-5 h-5 text-green-400" />
                    <h3 className="text-xl font-bold text-white">Recent Activity</h3>
                  </div>
                  <button className="text-amber-400 text-sm font-medium hover:text-amber-300 transition-colors">
                    View All
                  </button>
                </div>
                <div className="space-y-4">
                  {transactions.slice(0, 3).map((tx, index) => (
                    <motion.div
                      key={tx.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9 + index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl border border-gray-700/50"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          tx.type === 'deposit' ? 'bg-green-500/20' : 
                          tx.type === 'withdrawal' ? 'bg-blue-500/20' : 'bg-purple-500/20'
                        }`}>
                          {tx.type === 'deposit' ? <ArrowDownLeft className="w-5 h-5 text-green-400" /> :
                           tx.type === 'withdrawal' ? <ArrowUpRight className="w-5 h-5 text-blue-400" /> :
                           <CreditCard className="w-5 h-5 text-purple-400" />}
                        </div>
                        <div>
                          <p className="text-white font-medium capitalize">{tx.type}</p>
                          <p className="text-gray-400 text-sm">{tx.date}</p>
                        </div>
                      </div>
                      <p className={`font-bold ${
                        tx.amount > 0 ? 'text-green-400' : 'text-white'
                      }`}>
                        {tx.amount > 0 ? '+' : ''}{formatCurrency(tx.amount)}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}

          {activeTab === 'transactions' && (
            <motion.div
              key="transactions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-gradient-to-br from-gray-900/60 to-gray-950/80 backdrop-blur-2xl rounded-3xl border border-gray-800/50 p-6 shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <History className="w-5 h-5 text-amber-400" />
                <h3 className="text-xl font-bold text-white">Transaction History</h3>
              </div>
              <div className="space-y-4">
                {transactions.map((tx, index) => (
                  <motion.div
                    key={tx.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl border border-gray-700/50 hover:border-amber-500/30 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        tx.type === 'deposit' ? 'bg-green-500/20' : 
                        tx.type === 'withdrawal' ? 'bg-blue-500/20' : 'bg-purple-500/20'
                      }`}>
                        {tx.type === 'deposit' ? <ArrowDownLeft className="w-6 h-6 text-green-400" /> :
                         tx.type === 'withdrawal' ? <ArrowUpRight className="w-6 h-6 text-blue-400" /> :
                         <CreditCard className="w-6 h-6 text-purple-400" />}
                      </div>
                      <div>
                        <p className="text-white font-semibold capitalize">{tx.type}</p>
                        <p className="text-gray-400 text-sm">{tx.date}</p>
                        <p className="text-gray-500 text-xs capitalize">{tx.status}</p>
                      </div>
                    </div>
                    <p className={`text-xl font-bold ${
                      tx.amount > 0 ? 'text-green-400' : 'text-white'
                    }`}>
                      {tx.amount > 0 ? '+' : ''}{formatCurrency(tx.amount)}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'analytics' && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-gradient-to-br from-gray-900/60 to-gray-950/80 backdrop-blur-2xl rounded-3xl border border-gray-800/50 p-6 shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <Activity className="w-5 h-5 text-purple-400" />
                <h3 className="text-xl font-bold text-white">Performance Analytics</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: 'Total Invested', value: '$1,250,000', change: '+15.2%', positive: true },
                  { label: 'Total Returns', value: '$187,500', change: '+12.5%', positive: true },
                  { label: 'Monthly Growth', value: '$45,000', change: '+8.3%', positive: true },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 bg-gray-800/50 rounded-xl border border-gray-700/50"
                  >
                    <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
                    <p className="text-2xl font-bold text-white mb-2">{stat.value}</p>
                    <div className={`flex items-center gap-1 text-sm ${
                      stat.positive ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {stat.positive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      <span>{stat.change}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WalletPage;
