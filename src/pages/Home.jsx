import React from 'react';
import HeroSection from '../components/home/HeroSection.jsx';
import FeaturesSection from '../components/home/FeaturesSection.jsx';
import Stats from '../components/home/Stats.jsx';
import TestimonialsSection from '../components/home/TestimonialsSection.jsx';
import NewsletterSection from '../components/home/NewsletterSection.jsx';
import AllInsightsSection from '../components/home/AllInsightsSection.jsx';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-950">
      <HeroSection />
      <FeaturesSection />
      <Stats />
      <TestimonialsSection />
      <NewsletterSection />
    </div>
  );
};

export default Home;