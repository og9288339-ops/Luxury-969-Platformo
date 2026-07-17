

import React, { Suspense, lazy } from 'react';

// ============================================================================
// ERROR BOUNDARY COMPONENT
// ============================================================================

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Component Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-[400px] bg-gray-900/50 rounded-2xl border border-gray-800/50">
          <div className="text-center">
            <p className="text-gray-400 mb-4">Something went wrong loading this section.</p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// ============================================================================
// LOADING FALLBACK COMPONENT
// ============================================================================

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[400px] bg-gray-900/30 rounded-2xl border border-gray-800/50">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
      <p className="text-gray-500 text-sm">Loading...</p>
    </div>
  </div>
);

// ============================================================================
// LAZY LOADED COMPONENTS
// ============================================================================

const HeroSection = lazy(() => import('./HeroSection.jsx'));
const FeaturesSection = lazy(() => import('./FeaturesSection.jsx'));
const LiveAuctionGrid = lazy(() => import('./LiveAuctionGrid.jsx'));
const Stats = lazy(() => import('./Stats.jsx'));
const TestimonialsSection = lazy(() => import('./TestimonialsSection.jsx'));
const NewsletterSection = lazy(() => import('./NewsletterSection.jsx'));
const AllInsightsSection = lazy(() => import('./AllInsightsSection.jsx'));

// ============================================================================
// WRAPPER COMPONENT WITH ERROR BOUNDARY AND SUSPENSE
// ============================================================================

const withBoundary = (Component) => {
  return (props) => (
    <ErrorBoundary>
      <Suspense fallback={<LoadingFallback />}>
        <Component {...props} />
      </Suspense>
    </ErrorBoundary>
  );
};

// ============================================================================
// EXPORT WRAPPED COMPONENTS
// ============================================================================

export const HeroSectionWrapped = withBoundary(HeroSection);
export const FeaturesSectionWrapped = withBoundary(FeaturesSection);
export const LiveAuctionGridWrapped = withBoundary(LiveAuctionGrid);
export const StatsWrapped = withBoundary(Stats);
export const TestimonialsSectionWrapped = withBoundary(TestimonialsSection);
export const NewsletterSectionWrapped = withBoundary(NewsletterSection);
export const AllInsightsSectionWrapped = withBoundary(AllInsightsSection);

// ============================================================================
// NAMED EXPORTS FOR DIRECT IMPORT (WITHOUT LAZY LOADING)
// ============================================================================

// Uncomment these if you want to import components directly without lazy loading
// export { default as HeroSection } from './HeroSection.jsx';
// export { default as FeaturesSection } from './FeaturesSection.jsx';
// export { default as LiveAuctionGrid } from './LiveAuctionGrid.jsx';
// export { default as Stats } from './Stats.jsx';
// export { default as TestimonialsSection } from './TestimonialsSection.jsx';
// export { default as NewsletterSection } from './NewsletterSection.jsx';
// export { default as AllInsightsSection } from './AllInsightsSection.jsx';

// ============================================================================
// DEFAULT EXPORT (OPTIONAL)
// ============================================================================

// You can also export all components as an object if needed
export default {
  HeroSection: HeroSectionWrapped,
  FeaturesSection: FeaturesSectionWrapped,
  LiveAuctionGrid: LiveAuctionGridWrapped,
  Stats: StatsWrapped,
  TestimonialsSection: TestimonialsSectionWrapped,
  NewsletterSection: NewsletterSectionWrapped,
  AllInsightsSection: AllInsightsSectionWrapped,
};
