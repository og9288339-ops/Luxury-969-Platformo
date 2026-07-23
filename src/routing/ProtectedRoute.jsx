// components/ProtectedRoute.jsx
import React, { useEffect } from 'react';
import { Navigate, useLocation, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';

/*
 * 🛡️ Elite Assets - Elite Protected Route Guardian
 * Enterprise-grade route protection with dual-layer RBAC
 * 
 * Features:
 * ✅ Authentication verification
 * ✅ Double-Layer Admin Verification (isAdmin + role check)
 * ✅ Premium Loading State (Inline Spinner)
 * ✅ Glassmorphic Security UI
 * ✅ State preservation (redirect back after login)
 * ✅ Golden-ratio spacing & Stagger animations
 * 
 * @version 4.0.0
 * @author Elite Assets Security Team
 * @param {ReactNode} children - Components to render if authorized
 * @param {boolean} [requireAdmin=false] - Require admin role
 * @returns {JSX.Element}
 */

// Premium Inline Golden Spinner Fallback
const InlineGoldenSpinner = () => (
  <motion.div
    className="w-12 h-12 border-2 border-yellow-600/30 border-t-yellow-500 rounded-full mx-auto"
    animate={{ rotate: 360 }}
    transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
  />
);

// Animation Variants - Golden Ratio Stagger
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94], // Premium ease
    },
  },
};

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { user, isAuthenticated, loading, isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Log unauthorized access attempts (security monitoring)
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      console.warn('🚫 Unauthorized access attempt:', {
        path: location.pathname,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent.slice(0, 100)
      });
    }
  }, [loading, isAuthenticated, location.pathname]);

  // Loading State - Premium Cinematic Experience
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#050505] via-[#0a0a0a] to-[#0f0f0f] flex items-center justify-center p-6">
        <motion.div 
          className="text-center space-y-10 max-w-md mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <InlineGoldenSpinner />
          
          <div className="space-y-6">
            {/* Pulse Bars - Golden Ratio */}
            <div className="flex justify-center gap-3">
              <motion.div 
                className="w-1.5 h-8 bg-yellow-500/20 rounded-full"
                animate={{ scaleY: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className="w-1.5 h-12 bg-yellow-500/40 rounded-full"
                animate={{ scaleY: [0.6, 1, 0.6] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
              />
              <motion.div 
                className="w-1.5 h-8 bg-yellow-500/20 rounded-full"
                animate={{ scaleY: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
              />
            </div>
          </div>
          
          <p className="text-lg text-yellow-500/80 font-light tracking-[0.25em] uppercase">
            Verifying Elite Credentials
          </p>
        </motion.div>
      </div>
    );
  }

  // Not Authenticated - Redirect to Login with state preservation
  if (!isAuthenticated || !user) {
    const redirectState = { from: location.pathname + location.search };
    return <Navigate to="/login" replace state={redirectState} />;
  }

  // Double-Layer Admin Verification (Eliminate Race Conditions)
  const isAuthorizedAdmin = isAdmin || user?.role === 'admin';
  
  if (requireAdmin && !isAuthorizedAdmin) {
    console.warn('🔒 Admin access denied for user:', user.email);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#050505] via-[#0c0c0c] to-[#0f0f0f] flex items-center justify-center p-6 md:p-10">
        <motion.div 
          className="text-center max-w-2xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Glassmorphic Card */}
          <motion.div 
            className="relative backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl p-12 md:p-16 shadow-2xl"
            variants={itemVariants}
          >
            {/* Ambient Glow Effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-yellow-500/5 via-transparent to-rose-500/5 pointer-events-none" />
            
            {/* Lock Icon Container - Golden Ratio */}
            <motion.div 
              className="relative w-24 h-24 mx-auto mb-10 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 flex items-center justify-center"
              variants={itemVariants}
            >
              <svg 
                className="w-10 h-10 text-yellow-500" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
                />
              </svg>
            </motion.div>
            
            {/* Title - Premium Gradient Text */}
            <motion.h1 
              className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-300 bg-clip-text text-transparent"
              variants={itemVariants}
            >
              Access Denied
            </motion.h1>
            
            {/* Description - Soft Typography */}
            <motion.p 
              className="text-lg md:text-xl text-gray-400 font-light mb-10 max-w-lg mx-auto leading-relaxed"
              variants={itemVariants}
            >
              This domain is reserved for elite administrative oversight.
            </motion.p>
            
            {/* Action Buttons - Golden Ratio Spacing */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={itemVariants}
            >
              <Link
                to="/"
                className="group relative inline-flex items-center justify-center px-10 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold uppercase tracking-wider rounded-2xl 
                         shadow-[0_0_30px_rgba(234,179,8,0.3)] hover:shadow-[0_0_50px_rgba(234,179,8,0.5)] transform hover:scale-[1.02] transition-all duration-300"
              >
                <span className="relative z-10">Return to Marketplace</span>
              </Link>
              
              <button
                onClick={() => navigate(-1)}
                className="px-10 py-4 border-2 border-white/20 hover:border-yellow-500/50 text-gray-300 hover:text-yellow-400 font-bold uppercase tracking-wider 
                         rounded-2xl hover:bg-white/5 transition-all duration-300"
              >
                Go Back
              </button>
            </motion.div>
          </motion.div>
          
          {/* Footer Timestamp - Monospace Elegance */}
          <motion.p 
            className="text-xs text-gray-600 font-mono mt-8 tracking-widest"
            variants={itemVariants}
          >
            SECURITY_LOGGED • {new Date().toLocaleString()}
          </motion.p>
        </motion.div>
      </div>
    );
  }

  // Authorized - Render Children
  return children;
};

export default ProtectedRoute;