

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, Check, Sparkles } from 'lucide-react';
import axios from 'axios';

// ============================================================================
// API SERVICE
// ============================================================================

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// ============================================================================
// MOTION VARIANTS
// ============================================================================

const containerVariants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const contentVariants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: 0.2,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const successVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    rotate: -10,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.5,
      ease: [0.34, 1.56, 0.64, 1],
    },
  },
};

const iconVariants = {
  hidden: {
    scale: 0,
    rotate: -180,
  },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.6,
      delay: 0.3,
      ease: [0.34, 1.56, 0.64, 1],
    },
  },
};

// ============================================================================
// NEWSLETTER SECTION COMPONENT
// ============================================================================

const NewsletterSection = React.memo(() => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    // Reset states
    setError('');
    
    // Validate email
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    // Set loading state
    setIsLoading(true);
    
    try {
      // Simulate API call - replace with actual endpoint
      await api.post('/newsletter/subscribe', {
        email: email.trim(),
      });
      
      // Show success state
      setIsSuccess(true);
      setEmail('');
      
      // Reset success state after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
      
    } catch (err) {
      setError(
        err.response?.data?.message || 
        'Something went wrong. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  }, [email]);

  const handleEmailChange = useCallback((e) => {
    setEmail(e.target.value);
    setError('');
  }, []);

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8"
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-indigo-900/30 to-gray-900/40" />
      
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -top-32 -right-32 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
          className="absolute -bottom-32 -left-32 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative max-w-4xl mx-auto">
        <motion.div
          variants={contentVariants}
          className="bg-gray-900/60 backdrop-blur-xl rounded-3xl border border-gray-800/50 p-8 sm:p-12 shadow-2xl"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              variants={iconVariants}
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl mb-6 shadow-lg shadow-purple-500/30"
            >
              <Sparkles className="w-8 h-8 text-white" />
            </motion.div>
            
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Stay in the Loop
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Get exclusive access to featured auctions, early-bird notifications, and insider tips delivered straight to your inbox.
            </p>
          </div>

          {/* Success State */}
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                key="success"
                variants={successVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col items-center justify-center py-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 200,
                    damping: 15,
                    delay: 0.2,
                  }}
                  className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6"
                >
                  <Check className="w-10 h-10 text-green-400" />
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  You're on the list!
                </h3>
                <p className="text-gray-400">
                  Check your inbox for a confirmation email.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="w-5 h-5 text-gray-500" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Enter your email"
                    disabled={isLoading}
                    className={`w-full pl-12 pr-4 py-4 bg-gray-800/50 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
                      error 
                        ? 'border-red-500/50 focus:ring-red-500/50 focus:border-red-500' 
                        : 'border-gray-700/50 focus:ring-purple-500/50 focus:border-purple-500'
                    }`}
                  />
                </div>

                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm flex items-center gap-1"
                  >
                    {error}
                  </motion.p>
                )}

                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: isLoading ? 1 : 1.02 }}
                  whileTap={{ scale: isLoading ? 1 : 0.98 }}
                  className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      >
                        <Send className="w-5 h-5" />
                      </motion.div>
                      <span>Subscribing...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Subscribe Now</span>
                    </>
                  )}
                </motion.button>

                <p className="text-center text-gray-500 text-sm">
                  By subscribing, you agree to our{' '}
                  <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">
                    Privacy Policy
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">
                    Terms of Service
                  </a>
                  .
                </p>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Feature Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-3 mt-8 pt-8 border-t border-gray-800/50"
          >
            {[
              'Exclusive Deals',
              'Early Access',
              'Weekly Curations',
              'No Spam',
            ].map((feature, index) => (
              <motion.span
                key={feature}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-full text-sm text-gray-300"
              >
                {feature}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
});

NewsletterSection.displayName = 'NewsletterSection';

export default NewsletterSection;