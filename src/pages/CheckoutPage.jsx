import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '../contexts/PortfolioContext';
import PaymentMethodSelector from '../components/PaymentMethodSelector';
import { 
  CreditCard, 
  Wallet, 
  Bitcoin, 
  ArrowRight, 
  CheckCircle, 
  Shield, 
  Crown,
  Sparkles,
  Lock,
  ChevronRight
} from 'lucide-react';

/**
 * Legendary Checkout Page - Premium Luxury Experience
 * 
 * A world-class checkout experience with:
 * - Multi-step flow with elegant transitions
 * - Portfolio integration with real-time totals
 * - Premium payment method selection
 * - Luxury security indicators
 * - Cinematic animations and glassmorphism
 */
const Checkout = () => {
  const { assets, portfolioValue, getGrandTotal, clearPortfolio } = usePortfolio();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const steps = [
    { id: 1, title: 'Review', icon: <Crown className="w-5 h-5" /> },
    { id: 2, title: 'Payment', icon: <CreditCard className="w-5 h-5" /> },
    { id: 3, title: 'Confirm', icon: <CheckCircle className="w-5 h-5" /> },
  ];

  const handlePaymentSelect = (method) => {
    setSelectedMethod(method);
    setCurrentStep(3);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      if (currentStep === 3) setSelectedMethod(null);
    }
  };

  const handleCompletePurchase = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
      clearPortfolio();
    }, 3000);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(value);
  };

  if (isComplete) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center p-6"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="max-w-md w-full"
        >
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-950/80 backdrop-blur-2xl rounded-3xl border border-gray-800/50 p-12 text-center shadow-2xl shadow-amber-500/20">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center"
            >
              <CheckCircle className="w-12 h-12 text-white" />
            </motion.div>
            <h2 className="text-3xl font-bold text-white mb-4">Purchase Complete!</h2>
            <p className="text-gray-400 mb-8">Your luxury assets have been successfully acquired.</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/'}
              className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold rounded-xl flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Return to Marketplace
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 p-6 md:p-12">
      {/* Premium Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.03, 0.06, 0.03],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.02, 0.05, 0.02],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Crown className="w-8 h-8 text-amber-400" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-amber-200 to-white bg-clip-text text-transparent">
              Premium Checkout
            </h1>
            <Crown className="w-8 h-8 text-amber-400" />
          </div>
          <p className="text-gray-400 text-lg">Complete your luxury acquisition</p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <motion.div
                  className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all ${
                    currentStep >= step.id
                      ? 'bg-gradient-to-br from-amber-500 to-amber-600 border-amber-500 text-white'
                      : 'bg-gray-900 border-gray-700 text-gray-500'
                  }`}
                  whileHover={{ scale: 1.1 }}
                >
                  {step.icon}
                </motion.div>
                <span className={`ml-3 font-medium ${
                  currentStep >= step.id ? 'text-white' : 'text-gray-500'
                }`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-4 ${
                    currentStep > step.id ? 'bg-amber-500' : 'bg-gray-700'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {/* Step 1: Review Order */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-gradient-to-br from-gray-900/60 to-gray-950/80 backdrop-blur-2xl rounded-3xl border border-gray-800/50 p-8 shadow-2xl"
                >
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <Crown className="w-6 h-6 text-amber-400" />
                    Order Summary
                  </h2>

                  {assets.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 mx-auto mb-4 bg-gray-800 rounded-full flex items-center justify-center">
                        <Wallet className="w-10 h-10 text-gray-600" />
                      </div>
                      <p className="text-gray-400 mb-6">Your portfolio is empty</p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.location.href = '/marketplace'}
                        className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl"
                      >
                        Browse Marketplace
                      </motion.button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {assets.map((asset, index) => (
                        <motion.div
                          key={asset.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-xl border border-gray-700/50 hover:border-amber-500/30 transition-all"
                        >
                          <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center">
                            <Sparkles className="w-8 h-8 text-amber-400" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-white font-semibold">{asset.name || asset.title}</h3>
                            <p className="text-gray-400 text-sm">{asset.category || 'Luxury Asset'}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-white font-bold">
                              {formatCurrency(asset.fairMarketPrice || asset.currentBid)}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {assets.length > 0 && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setCurrentStep(2)}
                      className="w-full mt-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-amber-500/30"
                    >
                      Continue to Payment
                      <ChevronRight className="w-5 h-5" />
                    </motion.button>
                  )}
                </motion.div>
              )}

              {/* Step 2: Payment Method */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-gradient-to-br from-gray-900/60 to-gray-950/80 backdrop-blur-2xl rounded-3xl border border-gray-800/50 p-8 shadow-2xl"
                >
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <CreditCard className="w-6 h-6 text-amber-400" />
                    Select Payment Method
                  </h2>

                  <PaymentMethodSelector
                    onSelect={handlePaymentSelect}
                    selectedMethod={selectedMethod}
                  />

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleBack}
                    className="w-full mt-6 py-4 bg-gray-800 text-white font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-gray-700 transition-all"
                  >
                    Back to Review
                  </motion.button>
                </motion.div>
              )}

              {/* Step 3: Confirm */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-gradient-to-br from-gray-900/60 to-gray-950/80 backdrop-blur-2xl rounded-3xl border border-gray-800/50 p-8 shadow-2xl"
                >
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-amber-400" />
                    Confirm Purchase
                  </h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl">
                      <span className="text-gray-400">Payment Method</span>
                      <span className="text-white font-semibold capitalize">{selectedMethod}</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl">
                      <span className="text-gray-400">Items</span>
                      <span className="text-white font-semibold">{assets.length}</span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCompletePurchase}
                    disabled={isProcessing}
                    className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-amber-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Lock className="w-5 h-5" />
                        Complete Purchase
                      </>
                    )}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleBack}
                    className="w-full mt-4 py-4 bg-gray-800 text-white font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-gray-700 transition-all"
                  >
                    Back
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-gray-900/60 to-gray-950/80 backdrop-blur-2xl rounded-3xl border border-gray-800/50 p-8 shadow-2xl sticky top-24"
            >
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-amber-400" />
                Order Summary
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="text-white font-semibold">
                    {formatCurrency(portfolioValue.totalValuation)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Luxury Tax (8.25%)</span>
                  <span className="text-white font-semibold">
                    {formatCurrency(portfolioValue.taxEstimate)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Platform Fee</span>
                  <span className="text-white font-semibold">
                    {formatCurrency(portfolioValue.feeEstimate)}
                  </span>
                </div>
                <div className="border-t border-gray-700 pt-4 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-bold text-lg">Total</span>
                    <span className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                      {getGrandTotal}
                    </span>
                  </div>
                </div>
              </div>

              {/* Security Badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/30"
              >
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-green-400 font-semibold text-sm">Secure Transaction</p>
                    <p className="text-gray-400 text-xs">256-bit SSL encryption</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
