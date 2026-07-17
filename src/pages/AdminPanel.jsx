// pages/AdminPanel.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import { supabase } from '../supabaseClient';


/**
 * 🖥️ 969 Luxury Admin Panel - Bloomberg Terminal Experience
 * Enterprise-grade dashboard for luxury asset management
 * 
 * @version 2.0.0
 * @author 969 Luxury Admin Team
 */

const AdminPanel = () => {
  const { user, isAdmin, logout } = useAuth();
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Security: Redirect if not admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-gray-900 flex items-center justify-center">
        <div className="text-center p-12 max-w-md mx-auto">
          <div className="w-24 h-24 bg-slate-800/50 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <svg className="w-12 h-12 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-slate-200 mb-4 tracking-tight">Access Denied</h1>
          <p className="text-slate-400 mb-8">Administrator privileges required</p>
          <button
            onClick={logout}
            className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl transition-all duration-300"
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  // Dashboard data
  const [stats, setStats] = useState({
    totalValue: 2478000000,
    totalAssets: 1247,
    activeUsers: 874,
    transactions24h: 23,
    growthRate: 18.4,
    approvalPending: 12
  });

  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Chart data
  const marketGrowthData = useMemo(() => [
    { month: 'Jan', value: 120, growth: 2.4 },
    { month: 'Feb', value: 135, growth: 5.1 },
    { month: 'Mar', value: 152, growth: 8.7 },
    { month: 'Apr', value: 178, growth: 12.3 },
    { month: 'May', value: 205, growth: 16.8 },
    { month: 'Jun', value: 247, growth: 21.4 }
  ], []);

  const portfolioValueData = useMemo(() => [
    { day: 'D-5', value: 1.82 },
    { day: 'D-4', value: 1.91 },
    { day: 'D-3', value: 2.03 },
    { day: 'D-2', value: 2.18 },
    { day: 'D-1', value: 2.34 },
    { day: 'Today', value: 2.48 }
  ], []);

  const userActivityData = useMemo(() => [
    { name: 'Active', value: 874, color: '#d4af37' },
    { name: 'Pending', value: 156, color: '#f59e0b' },
    { name: 'Suspended', value: 23, color: '#ef4444' }
  ], []);

 // Load assets
  useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    const { data } = await supabase.from('products').select('*').order('created', { ascending: false });
    setAssets(data || []);
    setLoading(false);
  };

  fetchData();

  const channel = supabase
    .channel('realtime:products')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, (payload) => {
      setAssets((prev) => {
        if (payload.eventType === 'INSERT') return [payload.new, ...prev];
        if (payload.eventType === 'UPDATE') return prev.map(a => a.id === payload.new.id ? payload.new : a);
        if (payload.eventType === 'DELETE') return prev.filter(a => a.id !== payload.old.id);
        return prev;
      });
    })
    .subscribe();

  return () => supabase.removeChannel(channel);
}, []);

  const updateAssetStatus = async (assetId, status) => {
  await supabase.from('products').update({ status }).eq('id', assetId);
};

const exportToCSV = () => {
  const headers = ['Asset', 'Price', 'Owner', 'Status', 'Created'];
  const csvContent = [headers.join(','), ...assets.map(a => [a.name, a.price, a.owner, a.status, a.created].join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'assets_report.csv';
  a.click();
};

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 flex items-center justify-center p-8">
        <div className="max-w-4xl w-full space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
            {Array(6).fill(0).map((_, i) => (
              <div key={i} className="h-24 bg-slate-800/50 rounded-xl animate-pulse" />
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="h-96 bg-slate-800/50 rounded-2xl animate-pulse" />
            <div className="h-96 bg-slate-800/50 rounded-2xl animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 text-slate-100 overflow-hidden">
      {/* Header */}
      <motion.div 
        className="border-b border-slate-700/50 px-8 py-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black tracking-tight bg-gradient-to-r from-gold via-yellow-400 to-gold bg-clip-text text-transparent">
              969 LUXURY TERMINAL
            </h1>
            <p className="text-slate-400 font-mono text-sm mt-1">Administrator: {user?.email}</p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={logout}
              className="px-6 py-2 bg-slate-800/50 hover:bg-slate-700 border border-slate-600 text-slate-300 font-mono text-sm rounded-lg transition-all duration-300"
            >
              LOGOUT
            </button>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-8 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Stats Grid */}
        <motion.div 
          className="lg:col-span-1 space-y-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* KPI Cards */}
          {[
            { label: 'Total Portfolio Value', value: `$${stats.totalValue.toLocaleString()}`, change: '+12.4%', color: 'gold' },
            { label: 'Assets Under Management', value: stats.totalAssets.toLocaleString(), change: '+3.2%', color: 'emerald' },
            { label: 'Active Investors', value: stats.activeUsers.toLocaleString(), change: '+8.7%', color: 'blue' },
            { label: '24h Transactions', value: stats.transactions24h.toLocaleString(), change: '+23%', color: 'purple' },
            { label: 'Market Growth YTD', value: `${stats.growthRate}%`, change: '+18.4%', color: 'green' },
            { label: 'Pending Approvals', value: stats.approvalPending.toLocaleString(), color: 'orange' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="group p-6 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl hover:border-gold/50 transition-all duration-300 cursor-default"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02, borderColor: '#d4af37' }}
            >
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-2xl font-black text-white">{stat.value}</span>
                {stat.change && (
                  <span className={`text-sm font-mono font-bold ${
                    stat.change.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'
                  }`}>
                    {stat.change}
                  </span>
                )}
              </div>
              <p className="text-sm text-slate-400 font-mono uppercase tracking-wider">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Charts */}
        <motion.div 
          className="lg:col-span-2 space-y-8"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Market Growth Chart */}
            <motion.div 
              className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 h-80"
              whileHover={{ scale: 1.01 }}
            >
              <h3 className="text-xl font-bold text-slate-200 mb-6 uppercase tracking-wider font-mono">Market Growth</h3>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={marketGrowthData}>
                  <defs>
                    <linearGradient id="marketGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#d4af37" stopOpacity={0.8}/>
                      <stop offset="100%" stopColor="#d4af37" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} stroke="rgba(75,85,99,0.1)" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'slate-400' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'slate-400' }} />
                  <Tooltip 
                    contentStyle={{ 
                      background: 'rgba(15,23,42,0.95)', 
                      border: '1px solid rgba(75,85,99,0.3)',
                      borderRadius: '12px'
                    }}
                  />
                  <Line type="monotone" dataKey="value" stroke="#d4af37" strokeWidth={3} dot={false} />
                  <Line type="monotone" dataKey="growth" stroke="rgba(212,175,55,0.3)" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Portfolio Value Chart */}
            <motion.div 
              className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 h-80"
              whileHover={{ scale: 1.01 }}
            >
              <h3 className="text-xl font-bold text-slate-200 mb-6 uppercase tracking-wider font-mono">Portfolio Value ($B)</h3>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={portfolioValueData}>
                  <defs>
                    <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity={0.8}/>
                      <stop offset="100%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} stroke="rgba(75,85,99,0.1)" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'slate-400' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'slate-400' }} />
                  <Tooltip contentStyle={{ background: 'rgba(15,23,42,0.95)', borderRadius: '12px' }} />
                  <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#portfolioGradient)" />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* User Activity Pie */}
          <motion.div 
            className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6"
            whileHover={{ scale: 1.01 }}
          >
            <h3 className="text-xl font-bold text-slate-200 mb-6 uppercase tracking-wider font-mono">User Activity</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={userActivityData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {userActivityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={3} stroke="rgba(255,255,255,0.1)" />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: 'rgba(15,23,42,0.95)', borderRadius: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
              
              <div className="space-y-4">
                {userActivityData.map((entry, index) => (
                  <div key={entry.name} className="flex items-center space-x-4">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: entry.color }} />
                    <span className="font-mono text-slate-300">{entry.name}</span>
                    <span className="font-bold text-2xl text-white ml-auto">{entry.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Asset Management Table */}
      <motion.div 
        className="max-w-7xl mx-auto px-8 pb-24"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-3xl overflow-hidden">
          <div className="px-8 py-6 border-b border-slate-700/50 flex justify-between items-center">
            <button 
  onClick={exportToCSV} 
  className="px-6 py-2 bg-emerald-600/80 hover:bg-emerald-500 text-white font-mono text-sm font-bold rounded-xl transition-all duration-300"
>
  EXPORT CSV
</button>
            <h2 className="text-3xl font-black tracking-tight bg-gradient-to-r from-slate-200 to-slate-300 bg-clip-text text-transparent">
              Asset Management
            </h2>
            <p className="text-slate-400 font-mono mt-2">Pending Approvals: {stats.approvalPending}</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700/50">
                  {['Asset', 'Price', 'Owner', 'Status', 'Created', 'Actions'].map((header) => (
                    <th key={header} className="px-8 py-6 text-left font-mono text-sm uppercase tracking-wider text-slate-400 font-bold">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {assets.map((asset) => (
                  <tr key={asset.id} className="border-b border-slate-700/30 hover:bg-slate-700/20 transition-colors">
                    <td className="px-8 py-6 font-mono text-slate-200 max-w-xs truncate">{asset.name}</td>
                    <td className="px-8 py-6 font-mono font-bold text-gold">{asset.price}</td>
                    <td className="px-8 py-6 font-mono text-slate-400">{asset.owner}</td>
                    <td className="px-8 py-6">
                      <span className={`px-4 py-1 rounded-full text-xs font-mono font-bold ${
                        asset.status === 'approved' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                        asset.status === 'pending' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                        'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      }`}>
                        {asset.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-8 py-6 font-mono text-sm text-slate-500">{asset.created}</td>
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-2">
                        {asset.status !== 'approved' && (
                          <motion.button
                            onClick={() => updateAssetStatus(asset.id, 'approved')}
                            className="px-4 py-2 bg-emerald-600/80 hover:bg-emerald-500 text-white text-xs font-mono rounded-lg transition-all duration-300 whitespace-nowrap"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Approve
                          </motion.button>
                        )}
                        {asset.status !== 'rejected' && (
                          <motion.button
                            onClick={() => updateAssetStatus(asset.id, 'rejected')}
                            className="px-4 py-2 bg-rose-600/80 hover:bg-rose-500 text-white text-xs font-mono rounded-lg transition-all duration-300 whitespace-nowrap"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Reject
                          </motion.button>
                        )}
                        </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminPanel;