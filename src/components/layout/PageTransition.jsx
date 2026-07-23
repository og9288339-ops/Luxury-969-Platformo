import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

/**
 * PageTransition Component
 * 
 * A production-ready page transition wrapper that provides cinematic,
 * luxury-grade animations for route changes in a high-end auction platform.
 * 
 * Key Features:
 * - Uses AnimatePresence with mode="wait" for clean exit-before-enter transitions
 * - Location-based keying prevents animation bugs on route changes
 * - Cinematic easing curve for premium, non-jarring feel
 * - Optimized performance with minimal re-renders
 * 
 * @param {React.ReactNode} children - The page content to wrap with transitions
 * @returns {JSX.Element} Animated page wrapper
 */
const PageTransition = ({ children }) => {
  const location = useLocation();

  // Cinematic transition variants
  // These settings create a subtle, premium feel that's smooth and professional
  const pageVariants = {
    // Initial state: page is slightly below and invisible
    initial: {
      opacity: 0,
      y: 20, // Subtle 20px slide from bottom
      scale: 0.98, // Micro scale down for depth effect
    },
    // Animate to: fully visible, natural position
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
    // Exit state: page fades out and slides up slightly
    exit: {
      opacity: 0,
      y: -20, // Slide up 20px on exit
      scale: 0.98,
    },
  };

  // Transition timing configuration
  // Custom easing curve [0.4, 0, 0.2, 1] creates an "expensive" feel:
  // - Starts moderately fast (0.4)
  // - No initial delay (0)
  // - Slows down towards end (0.2, 1)
  // This cubic-bezier curve mimics high-end motion design
  const transitionConfig = {
    duration: 0.6, // 600ms total duration - slow enough to notice, fast enough to not feel sluggish
    ease: [0.4, 0, 0.2, 1], // Custom cubic-bezier for premium easing
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      {/* 
        Key strategy: Using location.key ensures unique animation trigger on every route change
        Alternative: location.pathname can be used if you want same-page transitions to animate
        location.key is preferred as it changes even for same path with different state
      */}
      <motion.div
        key={location.key}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={transitionConfig}
        className="w-full min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
