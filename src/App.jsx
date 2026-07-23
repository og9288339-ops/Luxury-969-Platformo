import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from './components/layout/Layout.jsx';
import { PortfolioProvider } from './contexts/PortfolioContext';

// ============================================================================
// LAZY LOADED PAGES - Code splitting for optimal performance
// ============================================================================

const Home = lazy(() => import('./pages/Home.jsx'));
const MarketplacePage = lazy(() => import('./pages/MarketplacePage.jsx'));
const ProductDetails = lazy(() => import('./components/ProductDetails.jsx'));
const Checkout = lazy(() => import('./pages/Checkout.jsx'));

// ============================================================================
// PREMIUM LOADING COMPONENT - Elegant loading state with smooth transitions
// ============================================================================

const PageLoader = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.4 }}
    className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950"
  >
    <div className="flex flex-col items-center gap-6">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative"
      >
        <div className="w-20 h-20 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 w-20 h-20 border-4 border-transparent border-r-purple-400/40 rounded-full"
        />
      </motion.div>
      <motion.p 
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="text-gray-400 text-sm tracking-widest uppercase font-medium"
      >
        Loading Experience
      </motion.p>
    </div>
  </motion.div>
);


// ============================================================================
// ROUTE CONFIGURATION - Clean, modular route definitions
// ============================================================================

const routeConfig = [
  { path: '/', component: Home },
  { path: '/marketplace', component: MarketplacePage },
  { path: '/product/:id', component: ProductDetails },
  { path: '/checkout', component: Checkout },
];

// ============================================================================
// APP COMPONENT - Premium router with smooth transitions and loading states
// ============================================================================

const App = () => {
  return (
    <PortfolioProvider>
      <BrowserRouter basename="/Luxury-969-Platformo/">
        <Layout>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {routeConfig.map(({ path, component: Component }) => (
                <Route 
                  key={path}
                  path={path} 
                  element={<Component />} 
                />
              ))}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </Layout>
      </BrowserRouter>
    </PortfolioProvider>
  );
};

export default App;
