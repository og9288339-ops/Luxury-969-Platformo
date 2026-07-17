

import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

// ============================================================================
// MOCK AUDIT LOGGER
// ============================================================================

const auditLogger = {
  logError: (error, errorInfo) => {
    // Mock logging - in production, this would send to your backend
    const errorData = {
      timestamp: new Date().toISOString(),
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      userAgent: navigator.userAgent,
      url: window.location.href,
    };

    console.error('Error logged to audit system:', errorData);

    // In production, you would send this to your backend:
    // fetch('/api/log-error', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(errorData),
    // });
  },
};

// ============================================================================
// ERROR BOUNDARY COMPONENT
// ============================================================================

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to our audit logger
    auditLogger.logError(error, errorInfo);

    this.setState({
      errorInfo,
    });
  }

  handleRetry = () => {
    // Reset the error state to attempt re-render
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  handleReload = () => {
    // Reload the entire page
    window.location.reload();
  };

  handleGoHome = () => {
    // Navigate to home
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            {/* Error Card */}
            <div className="bg-gray-900/40 backdrop-blur-xl rounded-2xl border border-gray-800/50 overflow-hidden">
              {/* Header */}
              <div className="relative p-8 text-center border-b border-gray-800/50">
                {/* Background Glow */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.15, 0.1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-red-500/20 rounded-full blur-3xl"
                />

                {/* Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6, type: 'spring' }}
                  className="relative inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl mb-4 shadow-lg shadow-red-500/30"
                >
                  <AlertTriangle className="w-8 h-8 text-white" />
                </motion.div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-2">
                  Something went wrong
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm">
                  We encountered an unexpected error in this section. Our team has been notified.
                </p>
              </div>

              {/* Error Details (Development Only) */}
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="p-6 border-b border-gray-800/50">
                  <details className="text-left">
                    <summary className="text-sm text-purple-400 cursor-pointer hover:text-purple-300 transition-colors mb-2">
                      View error details
                    </summary>
                    <div className="mt-2 p-4 bg-gray-950 rounded-lg overflow-auto max-h-32">
                      <p className="text-xs text-red-400 font-mono mb-2">
                        {this.state.error.toString()}
                      </p>
                      {this.state.errorInfo && (
                        <pre className="text-xs text-gray-500 font-mono whitespace-pre-wrap">
                          {this.state.errorInfo.componentStack}
                        </pre>
                      )}
                    </div>
                  </details>
                </div>
              )}

              {/* Actions */}
              <div className="p-6 flex flex-col sm:flex-row gap-3">
                {/* Retry Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={this.handleRetry}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all"
                >
                  <RefreshCw className="w-5 h-5" />
                  <span>Try Again</span>
                </motion.button>

                {/* Reload Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={this.handleReload}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-800/50 backdrop-blur-sm text-white font-semibold rounded-xl border border-gray-700/50 hover:bg-gray-800 transition-all"
                >
                  <RefreshCw className="w-5 h-5" />
                  <span>Reload Page</span>
                </motion.button>
              </div>

              {/* Go Home Link */}
              <div className="px-6 pb-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={this.handleGoHome}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 text-gray-400 hover:text-white transition-colors"
                >
                  <Home className="w-4 h-4" />
                  <span className="text-sm">Go to Homepage</span>
                </motion.button>
              </div>
            </div>

            {/* Support Info */}
            <p className="text-center text-gray-500 text-xs mt-4">
              Need help? Contact our{' '}
              <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">
                support team
              </a>
            </p>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

// ============================================================================
// HIGHER-ORDER COMPONENT WRAPPER
// ============================================================================

const withErrorBoundary = (Component, fallbackProps = {}) => {
  return (props) => (
    <ErrorBoundary {...fallbackProps}>
      <Component {...props} />
    </ErrorBoundary>
  );
};

// ============================================================================
// EXPORTS
// ============================================================================

export default ErrorBoundary;
export { withErrorBoundary };
