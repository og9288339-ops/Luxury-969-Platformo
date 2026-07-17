// pages/Login.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAI } from '@/context/AIContext';

/**
 * 🔐 969 Luxury Assets - Elite Login Portal
 * Glassmorphism masterpiece for high-net-worth investors
 * 
 * @version 2.0.0
 * @author 969 Luxury Design Team
 */

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { login, loading, error: authError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Auto-redirect if already authenticated
  useEffect(() => {
    if (mounted && !loading) {
      if (location.state?.from) {
        navigate(location.state.from, { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    }
  }, [mounted, loading, navigate, location]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Elite email address required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Access code required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Access code must be at least 8 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const result = await login(formData);
    
    if (result.success) {
      // Success handled by AuthContext redirect
    }
  };

  const handleCryptoLogin = () => {
    // Web3 wallet integration placeholder
    window.open('https://ledger.com', '_blank');
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900/90 to-gray-900/70 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 mix-blend-overlay"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.9)), 
                              url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2960&q=80')`
          }}
        />
        {/* Floating particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-gold/20 rounded-full absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <motion.div 
        className="relative z-10 flex items-center justify-center min-h-screen px-4 py-16"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.2,
              delayChildren: 0.4
            }
          }
        }}
      >
        {/* Glassmorphism Card */}
        <motion.div
          variants={{
            hidden: { scale: 0.8, opacity: 0, rotateX: -10 },
            visible: {
              scale: 1,
              opacity: 1,
              rotateX: 0,
              transition: {
                type: 'spring',
                stiffness: 100,
                damping: 12,
                mass: 0.8
              }
            }
          }}
          className="w-full max-w-md backdrop-blur-3xl bg-white/5 border border-white/20 
                     rounded-4xl shadow-2xl shadow-black/40 hover:shadow-4xl hover:shadow-gold/20 
                     transition-all duration-700 p-10 lg:p-12"
        >
          {/* Header */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 }
            }}
            className="text-center mb-12"
          >
            <motion.h1 
              className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-4 
                        bg-gradient-to-r from-gold via-yellow-400/90 to-gold bg-clip-text text-transparent 
                        drop-shadow-2xl leading-tight"
              variants={{
                hidden: { scale: 0.9 },
                visible: { scale: 1 }
              }}
            >
              Elite Access
            </motion.h1>
            <motion.p 
              className="text-lg text-slate-300 font-light tracking-wide"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 }
              }}
            >
              Enter the world's most exclusive marketplace
            </motion.p>
          </motion.div>

          {/* Auth Error */}
          <AnimatePresence mode="wait">
            {authError && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                className="mb-8 p-4 bg-rose-500/20 border border-rose-500/40 rounded-2xl backdrop-blur-sm text-rose-300 text-sm font-mono"
              >
                {authError}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Login Form */}
          <motion.form onSubmit={handleSubmit} noValidate className="space-y-6">
            
            {/* Email Field */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 }
              }}
              className="relative"
            >
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-5 py-4 bg-white/5 border border-white/20 rounded-2xl backdrop-blur-xl 
                          text-white placeholder-slate-400 text-lg font-light transition-all duration-300 
                          focus:border-gold/70 focus:outline-none focus:ring-4 focus:ring-gold/20 
                          peer ${errors.email ? 'border-rose-500/50 focus:border-rose-500/70' : ''}`}
                placeholder=" "
              />
              <label 
                className="absolute left-5 top-4 text-slate-400 text-lg font-light transition-all duration-300 
                          peer-placeholder-shown:top-4 peer-placeholder-shown:text-lg peer-focus:-top-2 
                          peer-focus:text-xs peer-focus:text-gold peer-valid:-top-2 peer-valid:text-xs peer-valid:text-gold
                          peer-focus:scale-75 peer-valid:scale-75"
              >
                Elite Email
              </label>
              {errors.email && (
                <motion.p 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="absolute -bottom-6 left-0 text-rose-400 text-xs font-mono mt-1"
                >
                  {errors.email}
                </motion.p>
              )}
            </motion.div>

            {/* Password Field */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, x: 20 },
                visible: { opacity: 1, x: 0 }
              }}
              className="relative"
            >
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-5 py-4 bg-white/5 border border-white/20 rounded-2xl backdrop-blur-xl 
                          text-white placeholder-slate-400 text-lg font-light transition-all duration-300 
                          focus:border-gold/70 focus:outline-none focus:ring-4 focus:ring-gold/20 pr-12
                          peer ${errors.password ? 'border-rose-500/50 focus:border-rose-500/70' : ''}`}
                placeholder=" "
              />
              <label 
                className="absolute left-5 top-4 text-slate-400 text-lg font-light transition-all duration-300 
                          peer-placeholder-shown:top-4 peer-placeholder-shown:text-lg peer-focus:-top-2 
                          peer-focus:text-xs peer-focus:text-gold peer-valid:-top-2 peer-valid:text-xs peer-valid:text-gold
                          peer-focus:scale-75 peer-valid:scale-75"
              >
                Access Code
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-gold transition-colors"
              >
                {showPassword ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </svg>
                )}
              </button>
              {errors.password && (
                <motion.p 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="absolute -bottom-6 left-0 text-rose-400 text-xs font-mono mt-1"
                >
                  {errors.password}
                </motion.p>
              )}
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              className="w-full py-5 px-8 bg-gradient-to-r from-gold to-yellow-500/90 
                       hover:from-yellow-400 hover:to-gold text-black font-black text-xl uppercase 
                       rounded-3xl shadow-2xl hover:shadow-gold/50 transform hover:scale-[1.02] 
                       active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
                       disabled:transform-none relative overflow-hidden group"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <GoldenSpinner size="sm" />
              ) : (
                <>
                  <span>Sign In</span>
                  <motion.div 
                    className="absolute inset-0 bg-white/20 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                    initial={{ translateX: '-100%' }}
                    whileHover={{ translateX: '100%' }}
                  />
                </>
              )}
            </motion.button>
          </motion.form>

          {/* Divider */}
          <motion.div 
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 }
            }}
            className="relative my-10"
          >
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="px-4 bg-gradient-to-r from-black/50 to-transparent text-slate-500 font-mono tracking-wider">
                or
              </span>
            </div>
          </motion.div>

          {/* Crypto Wallet Login */}
          <motion.button
            onClick={handleCryptoLogin}
            className="w-full py-4 px-6 border-2 border-white/20 hover:border-gold/70 
                     bg-white/5 backdrop-blur-xl rounded-2xl text-slate-300 hover:text-gold 
                     font-bold uppercase text-sm tracking-wider transition-all duration-400 
                     hover:shadow-xl hover:shadow-gold/20 flex items-center justify-center space-x-3
                     hover:bg-white/10 group"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.002 6.002 0 0111.945 0l1.176 4.243a3 3 0 01-2.653 4.787H6.809a3 3 0 01-2.653-4.787l1.176-4.243zM10 15a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            <span>Login with Ledger</span>
          </motion.button>

          {/* Register Link */}
          <motion.p 
            className="text-center mt-10"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 }
            }}
          >
            <span className="text-slate-400 text-sm font-mono tracking-wider mr-2">New to 969 Luxury?</span>
            <Link 
              to="/register"
              className="text-gold hover:text-yellow-400 font-bold text-sm uppercase tracking-wider transition-colors duration-300 hover:underline"
            >
              Create Elite Account
            </Link>
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;