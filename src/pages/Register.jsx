// pages/Register.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


/**
 * 👑 969 Luxury Assets - Elite Registration Portal
 * Sophisticated two-column glassmorphism experience for HNWIs
 * 
 * @version 2.0.0
 * @author 969 Luxury Design Team
 */

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    category: 'diversified'
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { register, loading, error: authError } = useAuth();
  const navigate = useNavigate();

  const categories = [
    { value: 'diversified', label: 'Diversified Portfolio' },
    { value: 'cars', label: 'Classic Automobiles' },
    { value: 'watches', label: 'Fine Horology' },
    { value: 'real-estate', label: 'Prime Real Estate' },
    { value: 'art', label: 'Contemporary Art' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required for verification';
    } else if (formData.fullName.length < 2) {
      newErrors.fullName = 'Please enter your full legal name';
    }

    if (!formData.email) {
      newErrors.email = 'Elite email address required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Enterprise-grade password required';
    } else if (formData.password.length < 12) {
      newErrors.password = 'Password must be 12+ characters with complexity';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(formData.password)) {
      newErrors.password = 'Include uppercase, lowercase, number, and special character';
    }

    if (!termsAccepted) {
      newErrors.terms = 'You must accept our Elite Terms & Conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const result = await register({
      ...formData,
      fullName: formData.fullName.trim(),
      userType: 'elite'
    });

    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        navigate('/dashboard', { 
          state: { 
            message: `Welcome to 969 Luxury, ${formData.fullName}!` 
          },
          replace: true 
        });
      }, 3000);
    }
  };

  // Success Animation
  if (success) {
    return (
      <motion.div 
        className="min-h-screen bg-gradient-to-br from-black via-emerald-900/90 to-gray-900/70 flex items-center justify-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0, rotate: -180 }}
          animate={{ 
            scale: 1, 
            opacity: 1, 
            rotate: 0,
            transition: {
              type: 'spring',
              stiffness: 200,
              damping: 20
            }
          }}
          className="text-center backdrop-blur-3xl bg-white/10 border border-emerald-500/40 rounded-4xl p-16 max-w-lg w-full shadow-2xl shadow-emerald-500/20"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: 2,
              repeat: 1,
              ease: 'easeInOut'
            }}
            className="w-32 h-32 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl"
          >
            <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-400 bg-clip-text text-transparent mb-6 tracking-tight">
            Account Created
          </h1>
          <p className="text-xl text-emerald-100 font-light mb-12 max-w-sm mx-auto leading-relaxed">
            Welcome to the elite world of 969 Luxury. 
            <br />
            Redirecting to your private dashboard...
          </p>
          
          <GoldenSpinner size="lg" />
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900/90 to-gray-900/70 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.95)), 
                              url('https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=2960&q=80')`
          }}
        />
        {/* Luxury particles */}
        <div className="absolute inset-0 opacity-30">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-1 h-1 bg-gold/40 rounded-full absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{
                y: [0, -15, 0],
                x: [0, Math.random() * 10 - 5, 0],
                opacity: [0.4, 0.8, 0.4]
              }}
              transition={{
                duration: 6 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-12 lg:py-24">
        <motion.div 
          className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3
              }
            }
          }}
        >
          {/* Left Column - Luxury Quote */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 }
            }}
            className="text-center lg:text-left order-2 lg:order-1"
          >
            <motion.div 
              className="backdrop-blur-xl bg-white/5 border border-white/15 rounded-3xl p-12 lg:p-16 shadow-2xl shadow-black/30 hover:shadow-gold/20 transition-all duration-700"
              whileHover={{ scale: 1.01 }}
            >
              <motion.div 
                className="w-24 h-24 bg-gradient-to-r from-gold to-yellow-500 rounded-3xl flex items-center justify-center mx-auto lg:mx-0 mb-8 shadow-2xl"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              >
                <svg className="w-12 h-12 text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.293 7.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </motion.div>
              
              <motion.h1 
                className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight uppercase mb-8
                          bg-gradient-to-r from-gold via-yellow-400 to-gold bg-clip-text text-transparent
                          leading-tight"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                The future of assets
                <br />
                <span className="text-5xl md:text-6xl lg:text-7xl">belongs to the elite</span>
              </motion.h1>
              
              <motion.p 
                className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed max-w-lg mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Join 8,742+ global investors accessing the world's most exclusive luxury assets.
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Right Column - Registration Form */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: { opacity: 1, x: 0 }
            }}
            className="order-1 lg:order-2"
          >
            <motion.div 
              className="backdrop-blur-3xl bg-white/5 border border-white/20 rounded-4xl shadow-2xl shadow-black/40 
                       hover:shadow-4xl hover:shadow-gold/20 transition-all duration-700 p-10 lg:p-12 max-w-lg mx-auto"
              whileHover={{ scale: 1.005 }}
            >
              
              {/* Auth Error */}
              <AnimatePresence mode="wait">
                {authError && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    className="mb-8 p-5 bg-rose-500/20 border border-rose-500/40 rounded-3xl backdrop-blur-sm text-rose-300 text-sm font-mono"
                  >
                    {authError}
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.h2 
                className="text-3xl md:text-4xl font-black tracking-tight uppercase mb-2 text-center
                          bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Join the Elite
              </motion.h2>
              <motion.p 
                className="text-lg text-slate-400 font-light text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Create your private account
              </motion.p>

              {/* Registration Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Full Name */}
                <div className="relative">
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`w-full px-6 py-5 bg-white/5 border border-white/20 rounded-3xl backdrop-blur-xl 
                              text-white placeholder-slate-400 text-lg font-light transition-all duration-400 
                              focus:border-gold/70 focus:outline-none focus:ring-4 focus:ring-gold/20 pr-6
                              peer ${errors.fullName ? 'border-rose-500/50 focus:border-rose-500/70' : ''}`}
                    placeholder=" "
                  />
                  <label className="absolute left-6 top-5 text-slate-400 text-lg font-light transition-all duration-400 
                                  peer-placeholder-shown:top-5 peer-placeholder-shown:text-lg peer-focus:-top-2 
                                  peer-focus:text-sm peer-focus:text-gold peer-valid:-top-2 peer-valid:text-sm peer-valid:text-gold
                                  peer-focus:scale-75 peer-valid:scale-75">
                    Full Legal Name
                  </label>
                  {errors.fullName && (
                    <p className="absolute -bottom-7 left-0 text-rose-400 text-xs font-mono mt-1 px-1">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-6 py-5 bg-white/5 border border-white/20 rounded-3xl backdrop-blur-xl 
                              text-white placeholder-slate-400 text-lg font-light transition-all duration-400 
                              focus:border-gold/70 focus:outline-none focus:ring-4 focus:ring-gold/20 pr-6
                              peer ${errors.email ? 'border-rose-500/50 focus:border-rose-500/70' : ''}`}
                    placeholder=" "
                  />
                  <label className="absolute left-6 top-5 text-slate-400 text-lg font-light transition-all duration-400 
                                  peer-placeholder-shown:top-5 peer-placeholder-shown:text-lg peer-focus:-top-2 
                                  peer-focus:text-sm peer-focus:text-gold peer-valid:-top-2 peer-valid:text-sm peer-valid:text-gold
                                  peer-focus:scale-75 peer-valid:scale-75">
                    Elite Email Address
                  </label>
                  {errors.email && (
                    <p className="absolute -bottom-7 left-0 text-rose-400 text-xs font-mono mt-1 px-1">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div className="relative">
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full px-6 py-5 bg-white/5 border border-white/20 rounded-3xl backdrop-blur-xl 
                              text-white placeholder-slate-400 text-lg font-light transition-all duration-400 
                              focus:border-gold/70 focus:outline-none focus:ring-4 focus:ring-gold/20 pr-12
                              peer ${errors.password ? 'border-rose-500/50 focus:border-rose-500/70' : ''}`}
                    placeholder=" "
                  />
                  <label className="absolute left-6 top-5 text-slate-400 text-lg font-light transition-all duration-400 
                                  peer-placeholder-shown:top-5 peer-placeholder-shown:text-lg peer-focus:-top-2 
                                  peer-focus:text-sm peer-focus:text-gold peer-valid:-top-2 peer-valid:text-sm peer-valid:text-gold
                                  peer-focus:scale-75 peer-valid:scale-75">
                    Enterprise Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 hover:text-gold transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  {errors.password && (
                    <p className="absolute -bottom-7 left-0 text-rose-400 text-xs font-mono mt-1 px-1">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Investment Category */}
                <div className="relative">
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-6 py-5 bg-white/5 border border-white/20 rounded-3xl backdrop-blur-xl 
                              text-white text-lg font-light transition-all duration-400 
                              focus:border-gold/70 focus:outline-none focus:ring-4 focus:ring-gold/20 appearance-none cursor-pointer
                              bg-no-repeat bg-[right_1.5rem_center]"
                    style={{ backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23d4af37' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e\")" }}
                  >
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                  <label className="absolute left-6 top-5 text-slate-400 text-lg font-light pointer-events-none">
                    Investment Focus
                  </label>
                </div>

                {/* Terms Checkbox */}
                <motion.div 
                  className="flex items-start space-x-4 p-4 bg-white/3 rounded-2xl backdrop-blur-sm border border-white/10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <label className="flex items-center space-x-4 cursor-pointer flex-1 group">
                    <input
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="w-6 h-6 text-gold/90 bg-white/5 border-2 border-white/30 rounded-lg 
                               focus:ring-4 focus:ring-gold/30 focus:outline-none transition-all duration-300
                               peer checked:bg-gold/90 checked:border-gold hover:checked:bg-gold hover:border-gold/70"
                    />
                    <div className="text-sm text-slate-400 font-mono leading-relaxed peer-focus:text-slate-300">
                      I accept the <Link href="#" className="text-gold hover:text-yellow-400 underline decoration-gold/50 font-bold">Elite Terms</Link> and{' '}
                      <Link href="#" className="text-gold hover:text-yellow-400 underline decoration-gold/50 font-bold">Privacy Policy</Link>
                      {errors.terms && (
                        <motion.p 
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="text-rose-400 mt-2 block"
                        >
                          {errors.terms}
                        </motion.p>
                      )}
                    </div>
                  </label>
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={loading || !termsAccepted}
                  className="w-full py-6 px-8 bg-gradient-to-r from-gold to-yellow-500/90 
                           hover:from-yellow-400 hover:to-gold text-black font-black text-xl uppercase 
                           rounded-3xl shadow-2xl hover:shadow-gold/50 transform hover:scale-[1.02] 
                           active:scale-[0.98] transition-all duration-400 disabled:opacity-50 disabled:cursor-not-allowed
                           disabled:transform-none relative overflow-hidden group disabled:from-slate-700 disabled:to-slate-600"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {loading ? (
                    <GoldenSpinner size="sm" />
                  ) : (
                    <>
                      <span>Create Elite Account</span>
                      <motion.div 
                        className="absolute inset-0 bg-white/30 -skew-x-12 -translate-x-full group-hover:translate-x-full 
                                 transition-transform duration-[1200ms] origin-left"
                      />
                    </>
                  )}
                </motion.button>
              </form>

              {/* Login Link */}
              <motion.p 
                className="text-center mt-12 pt-8 border-t border-white/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <span className="text-slate-500 text-sm font-mono tracking-wider mr-2">Already Elite?</span>
                <Link 
                  to="/login"
                  className="text-gold hover:text-yellow-400 font-black text-sm uppercase tracking-wider 
                           transition-all duration-300 hover:underline decoration-gold/50 transform hover:translate-y-[-1px]"
                >
                  Sign In Now
                </Link>
              </motion.p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;