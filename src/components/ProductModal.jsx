import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getInvestmentAdvice } from '../utils/aiService';

export default function ProductModal({ asset, onClose }) {
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getInvestmentAdvice(asset).then((res) => {
      setAdvice(res);
      setLoading(false);
    });
  }, [asset]);

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>

        <motion.div 
          initial={{ scale: 0.9, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          className="relative bg-[#0a0a0a]/90 border border-white/10 p-8 rounded-[32px] shadow-2xl max-w-xl w-full overflow-hidden"
        >
          {/* تأثير توهج خلفي خفيف */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-yellow-500/10 blur-[100px] rounded-full" />

          <div className="relative z-10">
            <h2 className="text-xs uppercase tracking-[0.3em] text-yellow-500/70 mb-2">AI Investment Analysis</h2>
            <h1 className="text-4xl font-light text-white mb-6">{asset.title}</h1>

            <div className="min-h-[200px] bg-black/40 p-6 rounded-2xl border border-white/5">
              {loading ? (
                <div className="flex flex-col gap-3">
                  <div className="h-4 w-3/4 bg-white/5 rounded animate-pulse" />
                  <div className="h-4 w-full bg-white/5 rounded animate-pulse" />
                  <div className="h-4 w-1/2 bg-white/5 rounded animate-pulse" />
                </div>
              ) : (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-lg text-gray-300 leading-relaxed font-light"
                >
                  {advice}
                </motion.p>
              )}
            </div>

            <button 
              onClick={onClose}
              className="mt-8 w-full group relative overflow-hidden py-4 bg-white/5 hover:bg-white/10 rounded-2xl transition-all"
            >
              <span className="relative z-10 font-bold tracking-widest uppercase text-sm">Close Terminal</span>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}