import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import './index.css';

// ============================================================================
// APPLICATION ROOT ENTRY POINT
// ============================================================================
// This file serves as the production-ready entry point for the React application.
// It initializes the React 18+ root rendering with:
// - Error Boundary: Self-healing error handling to prevent blank screens
// - Strict Mode: Development-only double-invocation for detecting side effects
// - Concurrent Rendering: React 18+ automatic concurrent features enabled
// - CSS Injection: Global styles imported before component rendering
//
// Deployment Configuration:
// - BrowserRouter basename is configured in App.jsx as '/Luxury-969-Platformo/'
// - This non-negotiable path ensures proper routing in production environment
// ============================================================================

// Get the root DOM element where React will mount
const rootElement = document.getElementById('root');

// Validate root element exists before rendering (defensive programming)
if (!rootElement) {
  throw new Error(
    'Root element not found. Ensure index.html contains a div with id="root"'
  );
}

// Create React 18+ root with concurrent rendering capabilities
const root = ReactDOM.createRoot(rootElement);

// Render the application with production-ready error handling
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);

// ============================================================================
// HOT MODULE REPLACEMENT (Development Only)
// ============================================================================
// Enable HMR for fast development without full page reloads
if (import.meta.hot) {
  import.meta.hot.accept();
}