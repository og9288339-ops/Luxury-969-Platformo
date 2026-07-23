import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// ============================================================================
// PERFORMANCE MONITORING
// ============================================================================
if (process.env.NODE_ENV === 'production') {
  // Report web vitals to analytics
  const reportWebVitals = (onPerfEntry) => {
    if (onPerfEntry && onPerfEntry instanceof Function) {
      import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(onPerfEntry);
        getFID(onPerfEntry);
        getFCP(onPerfEntry);
        getLCP(onPerfEntry);
        getTTFB(onPerfEntry);
      });
    }
  };

  reportWebVitals((metric) => {
    // Send to your analytics service
    console.log('Web Vital:', metric);
  });
}

// ============================================================================
// SERVICE WORKER REGISTRATION
// ============================================================================
const registerServiceWorker = () => {
  if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
};

registerServiceWorker();

// ============================================================================
// ERROR HANDLING
// ============================================================================
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});

// ============================================================================
// FEATURE DETECTION
// ============================================================================
const checkBrowserSupport = () => {
  const requiredFeatures = [
    'Promise',
    'fetch',
    'IntersectionObserver',
    'requestAnimationFrame',
  ];

  const missingFeatures = requiredFeatures.filter(
    (feature) => !(feature in window)
  );

  if (missingFeatures.length > 0) {
    console.warn('Missing browser features:', missingFeatures);
  }
};

checkBrowserSupport();

// ============================================================================
// PERFORMANCE OPTIMIZATION
// ============================================================================
// Enable React DevTools in development
if (process.env.NODE_ENV === 'development') {
  import('@welldone-software/why-did-you-render')
    .then((whyDidYouRender) => {
      whyDidYouRender.default(React, {
        trackAllPureComponents: true,
      });
    })
    .catch(() => {
      // Module not available, continue without it
    });
}

// ============================================================================
// ROOT RENDERING
// ============================================================================
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found. Ensure index.html contains a div with id="root"');
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// ============================================================================
// HOT MODULE REPLACEMENT
// ============================================================================
if (import.meta.hot) {
  import.meta.hot.accept();
}

// ============================================================================
// APP INITIALIZATION COMPLETE
// ============================================================================
console.log('🚀 Application initialized successfully');

