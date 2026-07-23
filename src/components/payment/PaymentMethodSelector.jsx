import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Icon placeholders - replace with actual icons (Lucide, Heroicons, etc.)
const IconPlaceholder = ({ name, className }) => (
  <div className={`flex items-center justify-center ${className}`}>
    <span className="text-xs opacity-50">{name}</span>
  </div>
);

const PaymentMethodSelector = ({ onSelect, selectedMethod }) => {
  const [hoveredMethod, setHoveredMethod] = useState(null);

  const paymentMethods = [
    {
      id: 'cash',
      name: 'كاش',
      englishName: 'Cash',
      icon: '💵',
      color: 'from-green-500 to-emerald-600',
      hoverColor: 'hover:from-green-600 hover:to-emerald-700',
      borderColor: 'border-green-500/30',
      glowColor: 'shadow-green-500/20',
    },
    {
      id: 'card',
      name: 'فيزا',
      englishName: 'Visa',
      icon: '💳',
      color: 'from-blue-500 to-indigo-600',
      hoverColor: 'hover:from-blue-600 hover:to-indigo-700',
      borderColor: 'border-blue-500/30',
      glowColor: 'shadow-blue-500/20',
    },
    {
      id: 'crypto',
      name: 'عملات رقمية',
      englishName: 'Crypto',
      icon: '₿',
      color: 'from-purple-500 to-violet-600',
      hoverColor: 'hover:from-purple-600 hover:to-violet-700',
      borderColor: 'border-purple-500/30',
      glowColor: 'shadow-purple-500/20',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: 'easeInOut',
      },
    },
    tap: {
      scale: 0.98,
      transition: {
        duration: 0.1,
      },
    },
  };

  return (
    <motion.div
      className="w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        {paymentMethods.map((method) => {
          const isSelected = selectedMethod === method.id;
          const isHovered = hoveredMethod === method.id;

          return (
            <motion.button
              key={method.id}
              onClick={() => onSelect(method.id)}
              onMouseEnter={() => setHoveredMethod(method.id)}
              onMouseLeave={() => setHoveredMethod(null)}
              variants={cardVariants}
              whileHover="hover"
              whileTap="tap"
              className={`
                relative group p-8 rounded-2xl border-2 transition-all duration-300
                bg-gray-900/50 backdrop-blur-sm
                ${isSelected ? method.borderColor + ' border-2' : 'border-gray-800'}
                ${isSelected ? method.glowColor + ' shadow-lg' : 'shadow-lg shadow-black/20'}
                ${isHovered && !isSelected ? 'border-gray-700' : ''}
              `}
            >
              {/* Selection Indicator */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-4 right-4 w-6 h-6 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 flex items-center justify-center"
                >
                  <svg
                    className="w-4 h-4 text-gray-900"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </motion.div>
              )}

              {/* Icon */}
              <motion.div
                className={`
                  w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center text-3xl
                  bg-gradient-to-br ${method.color}
                  ${isSelected ? '' : 'opacity-80 group-hover:opacity-100'}
                  transition-all duration-300
                `}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                {method.icon}
              </motion.div>

              {/* Method Name */}
              <div className="text-center space-y-2">
                <h3 className="text-xl font-bold text-white">
                  {method.name}
                </h3>
                <p className="text-sm text-gray-400 font-medium">
                  {method.englishName}
                </p>
              </div>

              {/* Decorative Gradient Border */}
              <div
                className={`
                  absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100
                  bg-gradient-to-br ${method.color} blur-xl transition-opacity duration-300
                  -z-10
                `}
              />

              {/* Selected Glow Effect */}
              {isSelected && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`
                    absolute inset-0 rounded-2xl bg-gradient-to-br ${method.color}
                    opacity-10 -z-10
                  `}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Selected Method Info */}
      {selectedMethod && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-gray-800/50 rounded-xl border border-gray-700"
        >
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <p className="text-gray-300 text-sm">
              Selected payment method:{' '}
              <span className="text-white font-semibold">
                {paymentMethods.find((m) => m.id === selectedMethod)?.name}
              </span>
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default PaymentMethodSelector;
