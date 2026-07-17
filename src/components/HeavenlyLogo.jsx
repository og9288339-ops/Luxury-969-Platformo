import React from 'react';
import { motion } from 'framer-motion';

/**
 * @component HeavenlyLogo
 * @description Renders the logo192.png inside a cinema-grade heavenly aura.
 * @version 1.0.0
 */
const HeavenlyLogo = () => {
  return (
    <div className="relative flex flex-col items-center justify-center bg-[#050505] overflow-hidden select-none">
      
      {/* 🌌 الهالة السماوية الخلفية (The Heavenly Aura Glow) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: [0.15, 0.4, 0.15], 
          scale: [1, 1.15, 1],
        }}
        transition={{ 
          duration: 6, 
          ease: "easeInOut", 
          repeat: Infinity 
        }}
        className="absolute w-[350px] h-[350px] rounded-full bg-gradient-to-r from-[#D4AF37]/20 via-[#FFF5D6]/10 to-transparent blur-[60px] pointer-events-none"
      />

      {/* 🔒 حاوية اللوجو مع تأثير النبض العتيق */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 p-6 rounded-full border border-white/[0.03] bg-black/40 backdrop-blur-md shadow-[0_0_50px_rgba(212,175,55,0.05)]"
      >
        {/* خط ذهبي ناعم بيلف حوالين اللوجو كأنه طوق من النور */}
        <div className="absolute inset-0 rounded-full border border-gradient-to-r from-gold/30 to-transparent animate-[spin_8s_linear_infinite]" />

        {/* 🖼️ استدعاء ملف الـ logo192.png بتاعك */}
        <motion.img 
          src="/logo192.png" 
          alt="Luxury 969 Institutional Core" 
          className="w-[140px] h-[140px] object-contain filter drop-shadow-[0_0_25px_rgba(255,245,214,0.3)]"
          animate={{ 
            filter: [
              "drop-shadow(0 0 20px rgba(212,175,55,0.2))", 
              "drop-shadow(0 0 40px rgba(255,245,214,0.5))", 
              "drop-shadow(0 0 20px rgba(212,175,55,0.2))"
            ] 
          }}
          transition={{
            duration: 4,
            ease: "easeInOut",
            repeat: Infinity
          }}
        />
      </motion.div>

      {/* ✍️ النص الفخم أسفل اللوجو بتأثير خطوط النور */}
      <motion.h1 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.9 }}
        transition={{ delay: 0.8, duration: 2 }}
        className="mt-8 text-xs font-light tracking-[0.4em] uppercase bg-gradient-to-b from-[#FFF5D6] via-[#D4AF37] to-[#8A7322] bg-clip-text text-transparent font-sans"
      >
        Sovereign Asset Vault
      </motion.h1>
    </div>
  );
};

export default HeavenlyLogo;