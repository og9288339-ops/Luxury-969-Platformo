/**
 * @module AdminDashboard
 * @description Luxury dark-themed admin dashboard
 * @author Senior UI/UX Architect
 * @version 1.0.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  Package, 
  ShoppingBag, 
  Users, 
  Settings, 
  Plus, 
  Image, 
  DollarSign, 
  CheckCircle, 
  Clock, 
  Truck 
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showProductForm, setShowProductForm] = useState(false);

  // Mock data
  const stats = [
    { title: 'Total Revenue', value: '$2.4M', change: '+12%', icon: DollarSign, color: 'gold' },
    { title: 'Total Orders', value: '1,234', change: '+8%', icon: ShoppingBag, color: 'emerald' },
    { title: 'Active Users', value: '892', change: '+15%', icon: Users, color: 'blue' },
  ];

  const recentOrders = [
    { id: '#ORD-1234', customer: 'John Doe', total: '$12,450', status: 'paid', date: '2024-01-15' },
    { id: '#ORD-1233', customer: 'Jane Smith', total: '$8,950', status: 'pending', date: '2024-01-14' },
    { id: '#ORD-1232', customer: 'Mike Johnson', total: '$24,800', status: 'shipped', date: '2024-01-13' },
  ];

  const categories = ['Watches', 'Handbags', 'Jewelry', 'Art', 'Cars'];

  const statusColors = {
    paid: 'bg-emerald-500 text-white',
    pending: 'bg-amber-500 text-white',
    shipped: 'bg-blue-500 text-white',
  };

  const Sidebar = () => (
    <motion.div
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-slate-900 to-black border-r border-gold/20 backdrop-blur-xl z-50 shadow-2xl"
    >
      <div className="p-8 border-b border-gold/10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-gold to-yellow-500 rounded-xl flex items-center justify-center shadow-lux-glow">
            <BarChart3 className="w-6 h-6 text-slate-900" />
          </div>
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-gold to-yellow-400 bg-clip-text text-transparent">
              Admin Portal
            </h2>
            <p className="text-xs text-slate-500 font-medium">Enterprise Control</p>
          </div>
        </div>
      </div>

      <nav className="p-4 space-y-2">
        {[
          { name: 'Dashboard', icon: BarChart3, href: 'dashboard', active: activeTab === 'dashboard' },
          { name: 'Products', icon: Package, href: 'products', active: activeTab === 'products' },
          { name: 'Orders', icon: ShoppingBag, href: 'orders', active: activeTab === 'orders' },
          { name: 'Users', icon: Users, href: 'users', active: activeTab === 'users' },
          { name: 'Settings', icon: Settings, href: 'settings', active: activeTab === 'settings' },
        ].map((item) => (
          <motion.button
            key={item.href}
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            className={`
              w-full flex items-center space-x-3 p-4 rounded-2xl text-left transition-all duration-300
              ${item.active 
                ? 'bg-gradient-to-r from-gold/20 to-yellow-500/20 border border-gold/50 text-gold shadow-lux-glow' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50 border border-transparent'
              }
            `}
            onClick={() => setActiveTab(item.href)}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.name}</span>
          </motion.button>
        ))}
      </nav>
    </motion.div>
  );

  const StatsCard = ({ title, value, change, icon: Icon, color }) => (
    <motion.div
      whileHover={{ y: -4 }}
      className="group bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 hover:border-gold/50 hover:shadow-lux-glow transition-all duration-500 cursor-pointer relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 -translate-x-40 group-hover:translate-x-0 transition-transform duration-1000" />
      <div className="relative z-10 flex items-start justify-between">
        <div className="space-y-3">
          <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">{title}</p>
          <p className="text-3xl font-bold bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
            {value}
          </p>
          <p className={`text-sm font-semibold ${change.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>
            {change} from last month
          </p>
        </div>
        <div className={`w-16 h-16 bg-gradient-to-br from-${color}-500 to-${color}-600 rounded-2xl flex items-center justify-center shadow-xl shadow-${color}/25 group-hover:scale-110 transition-all duration-300`}>
          <Icon className="w-7 h-7 text-white drop-shadow-lg" />
        </div>
      </div>
    </motion.div>
  );

  const StatusBadge = ({ status }) => {
    const badges = {
      paid: { color: 'emerald', label: 'Paid' },
      pending: { color: 'amber', label: 'Pending' },
      shipped: { color: 'blue', label: 'Shipped' },
    };

    const badge = badges[status] || badges.pending;
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-bold bg-${badge.color}-500/20 text-${badge.color}-400 border border-${badge.color}-500/30`}>
        {badge.label}
      </span>
    );
  };

  const ProductForm = ({ isOpen, onClose }) => (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="bg-gradient-to-b from-slate-900/95 to-black/90 backdrop-blur-3xl border border-gold/20 rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl shadow-gold/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-serif font-bold bg-gradient-to-r from-gold via-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Add Luxury Product
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-800 rounded-xl transition-all duration-200 hover:scale-105"
              >
                <Close className="w-6 h-6 text-slate-400 hover:text-white" />
              </button>
            </div>

            <form className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Product Title
                </label>
                <input
                  type="text"
                  placeholder="Rolex Submariner Date"
                  className="w-full px-5 py-4 bg-slate-800/50 border border-slate-700/50 rounded-2xl backdrop-blur-sm focus:ring-4 focus:ring-gold/20 focus:border-gold/50 transition-all duration-300 text-white placeholder-slate-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Price (USD)
                  </label>
                  <input
                    type="number"
                    placeholder="12500"
                    className="w-full px-5 py-4 bg-slate-800/50 border border-slate-700/50 rounded-2xl backdrop-blur-sm focus:ring-4 focus:ring-gold/20 focus:border-gold/50 transition-all duration-300 text-white placeholder-slate-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Category
                  </label>
                  <select className="w-full px-5 py-4 bg-slate-800/50 border border-slate-700/50 rounded-2xl backdrop-blur-sm focus:ring-4 focus:ring-gold/20 focus:border-gold/50 transition-all duration-300 text-white">
                    <option>Watches</option>
                    <option>Handbags</option>
                    <option>Jewelry</option>
                    <option>Art</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Product Images
                </label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-slate-700/50 rounded-2xl cursor-pointer hover:border-gold/50 hover:bg-slate-800/30 transition-all duration-300 group">
                    <Image className="w-12 h-12 text-slate-500 group-hover:text-gold mb-4" />
                    <p className="text-sm text-slate-500 group-hover:text-gold">
                      Click to upload or drag and drop
                    </p>
                    <input type="file" className="hidden" multiple accept="image/*" />
                  </label>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-gold via-yellow-400 to-orange-500 hover:from-gold/90 text-slate-900 font-bold py-4 px-8 rounded-2xl shadow-lux-glow hover:shadow-lux hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <Plus className="w-5 h-5" />
                  Add Product
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 bg-slate-800/50 hover:bg-slate-700 border border-slate-700/50 text-slate-300 hover:text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-black to-slate-900 overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-0 md:ml-64 p-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-5xl md:text-6xl font-serif font-bold bg-gradient-to-r from-gold via-yellow-400 to-orange-500 bg-clip-text text-transparent mb-4">
                Admin Dashboard
              </h1>
              <p className="text-xl text-slate-400 font-medium">
                Control center for luxury asset management
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowProductForm(true)}
              className="group bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-2xl shadow-xl shadow-emerald/25 hover:shadow-emerald/40 transition-all duration-300 flex items-center gap-3"
            >
              <Plus className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              New Product
            </motion.button>
          </div>
        </div>

        {/* Stats Cards */}
        {activeTab === 'dashboard' && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          >
            {stats.map((stat, index) => (
              <StatsCard
                key={stat.title}
                title={stat.title}
                value={stat.value}
                change={stat.change}
                icon={stat.icon}
                color={stat.color}
              />
            ))}
          </motion.div>
        )}

        {/* Recent Orders Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 mb-16"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Recent Orders</h3>
              <p className="text-slate-400">Latest luxury transactions</p>
            </div>
            <button className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700 transition-all duration-200">
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700/50">
                  <th className="text-left py-4 pr-6 font-semibold text-slate-300">Order ID</th>
                  <th className="text-left py-4 pr-6 font-semibold text-slate-300">Customer</th>
                  <th className="text-left py-4 pr-6 font-semibold text-slate-300">Total</th>
                  <th className="text-left py-4 pr-6 font-semibold text-slate-300">Status</th>
                  <th className="text-left py-4 font-semibold text-slate-300">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, index) => (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-all duration-200"
                  >
                    <td className="py-4 pr-6 font-mono text-gold">{order.id}</td>
                    <td className="py-4 pr-6 font-semibold text-white">{order.customer}</td>
                    <td className="py-4 pr-6 font-bold bg-gradient-to-r from-gold to-yellow-400 bg-clip-text text-transparent">
                      {order.total}
                    </td>
                    <td className="py-4 pr-6">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="py-4 text-slate-400 font-mono text-sm">{order.date}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Product Form Modal */}
        <ProductForm isOpen={showProductForm} onClose={() => setShowProductForm(false)} />
      </div>

      {/* Mobile Sidebar Overlay */}
      <div className="md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm invisible" />
    </div>
  );
};

export default AdminDashboard;