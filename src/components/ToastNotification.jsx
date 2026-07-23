import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Info, 
  X, 
  Sparkles,
  Crown,
  Zap,
  Flame
} from 'lucide-react';

// ============================================================================
// TOAST CONTEXT - Global state management for notifications
// ============================================================================

const ToastContext = createContext({});

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// ============================================================================
// TOAST CONFIGURATION - Type-specific styling and icons
// ============================================================================

const toastConfig = {
  success: {
    icon: <CheckCircle className="w-6 h-6" />,
    gradient: 'from-green-500 to-emerald-600',
    borderColor: 'border-green-500/30',
    glowColor: 'shadow-green-500/30',
    bgGradient: 'from-green-500/10 to-emerald-500/10',
  },
  error: {
    icon: <XCircle className="w-6 h-6" />,
    gradient: 'from-red-500 to-rose-600',
    borderColor: 'border-red-500/30',
    glowColor: 'shadow-red-500/30',
    bgGradient: 'from-red-500/10 to-rose-500/10',
  },
  warning: {
    icon: <AlertCircle className="w-6 h-6" />,
    gradient: 'from-amber-500 to-orange-600',
    borderColor: 'border-amber-500/30',
    glowColor: 'shadow-amber-500/30',
    bgGradient: 'from-amber-500/10 to-orange-500/10',
  },
  info: {
    icon: <Info className="w-6 h-6" />,
    gradient: 'from-blue-500 to-indigo-600',
    borderColor: 'border-blue-500/30',
    glowColor: 'shadow-blue-500/30',
    bgGradient: 'from-blue-500/10 to-indigo-500/10',
  },
  luxury: {
    icon: <Crown className="w-6 h-6" />,
    gradient: 'from-amber-400 to-amber-600',
    borderColor: 'border-amber-500/30',
    glowColor: 'shadow-amber-500/30',
    bgGradient: 'from-amber-500/10 to-amber-600/10',
  },
  magic: {
    icon: <Sparkles className="w-6 h-6" />,
    gradient: 'from-purple-500 to-violet-600',
    borderColor: 'border-purple-500/30',
    glowColor: 'shadow-purple-500/30',
    bgGradient: 'from-purple-500/10 to-violet-500/10',
  },
};

// ============================================================================
// INDIVIDUAL TOAST COMPONENT - Premium animated notification
// ============================================================================

const Toast = ({ toast, onRemove }) => {
  const config = toastConfig[toast.type] || toastConfig.info;
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (toast.autoDismiss) {
      const duration = toast.duration || 5000;
      const interval = 50;
      const step = 100 / (duration / interval);
      
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev <= 0) {
            clearInterval(timer);
            onRemove(toast.id);
            return 0;
          }
          return prev - step;
        });
      }, interval);

      return () => clearInterval(timer);
    }
  }, [toast.autoDismiss, toast.duration, toast.id, onRemove]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 100, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.8 }}
      transition={{ 
        type: 'spring',
        stiffness: 300,
        damping: 30,
      }}
      className="relative"
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        className={`bg-gradient-to-br ${config.bgGradient} backdrop-blur-2xl rounded-2xl border ${config.borderColor} shadow-2xl ${config.glowColor} overflow-hidden min-w-[320px] max-w-md`}
      >
        {/* Magical Shine Effect */}
        <motion.div
          animate={{
            x: ['-100%', '200%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
            ease: 'linear',
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
        />

        {/* Progress Bar */}
        {toast.autoDismiss && (
          <motion.div
            initial={{ width: '100%' }}
            animate={{ width: `${progress}%` }}
            className={`h-1 bg-gradient-to-r ${config.gradient}`}
          />
        )}

        <div className="p-6">
          <div className="flex items-start gap-4">
            {/* Icon */}
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className={`flex-shrink-0 w-12 h-12 bg-gradient-to-br ${config.gradient} rounded-xl flex items-center justify-center text-white shadow-lg`}
            >
              {config.icon}
            </motion.div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              {toast.title && (
                <motion.h4
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-white font-bold text-lg mb-1"
                >
                  {toast.title}
                </motion.h4>
              )}
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-gray-300 text-sm leading-relaxed"
              >
                {toast.message}
              </motion.p>
            </div>

            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onRemove(toast.id)}
              className="flex-shrink-0 p-2 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Action Button */}
          {toast.action && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={toast.action.onClick}
              className={`mt-4 w-full py-3 bg-gradient-to-r ${config.gradient} text-white font-semibold rounded-xl flex items-center justify-center gap-2 shadow-lg`}
            >
              {toast.action.icon}
              <span>{toast.action.label}</span>
            </motion.button>
          )}
        </div>

        {/* Magical Particles */}
        {toast.type === 'magic' || toast.type === 'luxury' && (
          <>
            <motion.div
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute top-2 right-2 w-2 h-2 bg-amber-400 rounded-full"
            />
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0, 0.3],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.5,
              }}
              className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-purple-400 rounded-full"
            />
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

// ============================================================================
// TOAST PROVIDER - Global toast management
// ============================================================================

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const [position, setPosition] = useState('top-right');

  const addToast = useCallback((toast) => {
    const id = Date.now();
    const newToast = {
      id,
      type: 'info',
      autoDismiss: true,
      duration: 5000,
      ...toast,
    };
    
    setToasts((prev) => [...prev, newToast]);
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const clearToasts = useCallback(() => {
    setToasts([]);
  }, []);

  // Convenience methods
  const success = useCallback((message, options = {}) => {
    return addToast({ type: 'success', message, ...options });
  }, [addToast]);

  const error = useCallback((message, options = {}) => {
    return addToast({ type: 'error', message, ...options });
  }, [addToast]);

  const warning = useCallback((message, options = {}) => {
    return addToast({ type: 'warning', message, ...options });
  }, [addToast]);

  const info = useCallback((message, options = {}) => {
    return addToast({ type: 'info', message, ...options });
  }, [addToast]);

  const luxury = useCallback((message, options = {}) => {
    return addToast({ type: 'luxury', message, ...options });
  }, [addToast]);

  const magic = useCallback((message, options = {}) => {
    return addToast({ type: 'magic', message, ...options });
  }, [addToast]);

  const value = {
    toasts,
    addToast,
    removeToast,
    clearToasts,
    success,
    error,
    warning,
    info,
    luxury,
    magic,
    setPosition,
  };

  // Position classes
  const positionClasses = {
    'top-right': 'fixed top-4 right-4 z-50 flex flex-col gap-4',
    'top-left': 'fixed top-4 left-4 z-50 flex flex-col gap-4',
    'bottom-right': 'fixed bottom-4 right-4 z-50 flex flex-col gap-4',
    'bottom-left': 'fixed bottom-4 left-4 z-50 flex flex-col gap-4',
    'top-center': 'fixed top-4 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-4',
    'bottom-center': 'fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-4',
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      
      {/* Toast Container */}
      <AnimatePresence mode="popLayout">
        {toasts.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={positionClasses[position]}
          >
            {toasts.map((toast) => (
              <Toast key={toast.id} toast={toast} onRemove={removeToast} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </ToastContext.Provider>
  );
};

export default ToastProvider;

// ============================================================================
// PRESET TOAST TEMPLATES - Quick use magical notifications
// ============================================================================

export const toastPresets = {
  bidPlaced: (amount) => ({
    type: 'success',
    title: 'Bid Placed Successfully!',
    message: `Your bid of ${amount} has been placed on this item.`,
    icon: <Zap className="w-5 h-5" />,
  }),
  itemAdded: (itemName) => ({
    type: 'luxury',
    title: 'Asset Added to Portfolio',
    message: `${itemName} has been added to your luxury portfolio.`,
    icon: <Crown className="w-5 h-5" />,
  }),
  auctionWon: (itemName) => ({
    type: 'magic',
    title: '🎉 Congratulations!',
    message: `You won the auction for ${itemName}!`,
    icon: <Flame className="w-5 h-5" />,
    action: {
      label: 'View Portfolio',
      icon: <Crown className="w-4 h-4" />,
      onClick: () => { /* Navigate to portfolio */ },
    },
  }),
  paymentSuccess: (amount) => ({
    type: 'success',
    title: 'Payment Successful',
    message: `Your payment of ${amount} has been processed successfully.`,
  }),
  error: (message) => ({
    type: 'error',
    title: 'Something went wrong',
    message: message || 'Please try again later.',
  }),
};
