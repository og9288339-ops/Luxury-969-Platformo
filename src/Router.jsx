import React, { Suspense, lazy } from 'react';
import { createHashRouter, Navigate } from 'react-router-dom';

// ============================================================================
// LEGENDARY ROUTER - Premium routing for GitHub Pages deployment
// ============================================================================

// ============================================================================
// LAZY LOADED COMPONENTS - Code splitting for optimal performance
// ============================================================================

const Layout = lazy(() => import('./components/layout/Layout.jsx'));
const Home = lazy(() => import('./pages/Home.jsx'));
const AuctionsPage = lazy(() => import('./pages/AuctionsPage.jsx'));
const InsightsPage = lazy(() => import('./pages/InsightsPage.jsx'));
const MarketplacePage = lazy(() => import('./pages/MarketplacePage.jsx'));
const ProductGallery = lazy(() => import('./components/ProductGallery.jsx'));

// ============================================================================
// LEGENDARY ROUTE CONFIGURATION - Centralized route definitions
// ============================================================================

const legendaryRoutes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'auctions',
        element: <AuctionsPage />,
      },
      {
        path: 'insights',
        element: <InsightsPage />,
      },
      {
        path: 'marketplace',
        element: <MarketplacePage />,
      },
      {
        path: 'gallery',
        element: <ProductGallery />,
      },
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
];

// ============================================================================
// LEGENDARY ROUTER CREATION - Production-ready router with GitHub Pages support
// ============================================================================

const legendaryRouter = createHashRouter(legendaryRoutes);

export default legendaryRouter;

