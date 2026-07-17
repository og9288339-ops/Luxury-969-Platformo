

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight, Linkedin, Twitter } from 'lucide-react';

// ============================================================================
// MOCK DATA
// ============================================================================

const testimonials = [
  {
    id: 1,
    name: 'Sarah Chen',
    title: 'Art Collector & Investor',
    avatar: 'SC',
    avatarColor: 'from-purple-500 to-pink-500',
    rating: 5,
    text: 'The platform has completely transformed how I discover and acquire rare art pieces. The bidding process is seamless, and I\'ve found pieces I never would have encountered elsewhere. Absolutely game-changing for collectors.',
    social: {
      linkedin: '#',
      twitter: '#',
    },
    featured: true,
  },
  {
    id: 2,
    name: 'Marcus Williams',
    title: 'Vintage Car Enthusiast',
    avatar: 'MW',
    avatarColor: 'from-blue-500 to-cyan-500',
    rating: 5,
    text: 'As someone who\'s been collecting vintage cars for over 20 years, I can confidently say this is the best auction platform I\'ve used. The verification process gives me peace of mind, and the community is fantastic.',
    social: {
      linkedin: '#',
      twitter: '#',
    },
    featured: false,
  },
  {
    id: 3,
    name: 'Elena Rodriguez',
    title: 'Interior Designer',
    avatar: 'ER',
    avatarColor: 'from-green-500 to-emerald-500',
    rating: 5,
    text: 'I source unique pieces for my high-end clients through this platform. The quality of items and the professionalism of sellers is unmatched. It\'s become an essential tool for my business.',
    social: {
      linkedin: '#',
      twitter: '#',
    },
    featured: true,
  },
  {
    id: 4,
    name: 'David Kim',
    title: 'Tech Entrepreneur',
    avatar: 'DK',
    avatarColor: 'from-orange-500 to-red-500',
    rating: 4,
    text: 'The user experience is exceptional. From browsing to bidding to payment, every step is intuitive. I\'ve won several auctions and the entire process has been smooth each time.',
    social: {
      linkedin: '#',
      twitter: '#',
    },
    featured: false,
  },
  {
    id: 5,
    name: 'Aisha Patel',
    title: 'Jewelry Designer',
    avatar: 'AP',
    avatarColor: 'from-indigo-500 to-purple-500',
    rating: 5,
    text: 'I\'ve both bought and sold on this platform, and it excels at both. The seller tools are robust, and as a buyer, I love the detailed listings and transparent bidding history.',
    social: {
      linkedin: '#',
      twitter: '#',
    },
    featured: false,
  },
  {
    id: 6,
    name: 'James Morrison',
    title: 'Real Estate Developer',
    avatar: 'JM',
    avatarColor: 'from-teal-500 to-blue-500',
    rating: 5,
    text: 'Trust is everything in high-value transactions, and this platform has earned mine. The verification system, secure payments, and responsive support make it my go-to for premium acquisitions.',
    social: {
      linkedin: '#',
      twitter: '#',
    },
    featured: true,
  },
];

// ============================================================================
// MOTION VARIANTS
// ============================================================================

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// ============================================================================
// STAR RATING COMPONENT
// ============================================================================

const StarRating = ({ rating, size = 'w-4 h-4' }) => {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          className={`${size} ${
            index < rating
              ? 'fill-yellow-400 text-yellow-400'
              : 'text-gray-600'
          }`}
        />
      ))}
    </div>
  );
};

// ============================================================================
// TESTIMONIAL CARD COMPONENT
// ============================================================================

const TestimonialCard = ({ testimonial, index, isLarge }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={cardVariants}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`relative group ${
        isLarge ? 'md:col-span-2 md:row-span-2' : ''
      }`}
    >
      <motion.div
        animate={{
          scale: isHovered ? 1.02 : 1,
          y: isHovered ? -4 : 0,
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className={`relative h-full bg-gray-900/40 backdrop-blur-xl rounded-2xl border border-gray-800/50 overflow-hidden ${
          testimonial.featured ? 'ring-1 ring-purple-500/30' : ''
        }`}
      >
        {/* Featured Badge */}
        {testimonial.featured && (
          <div className="absolute top-4 right-4 z-10">
            <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-xs font-semibold rounded-full shadow-lg">
              Featured
            </span>
          </div>
        )}

        {/* Gradient Overlay */}
        <motion.div
          animate={{
            opacity: isHovered ? 0.15 : 0.05,
          }}
          transition={{ duration: 0.3 }}
          className={`absolute inset-0 bg-gradient-to-br ${testimonial.avatarColor} blur-3xl`}
        />

        {/* Content */}
        <div className="relative p-6 sm:p-8 h-full flex flex-col">
          {/* Quote Icon */}
          <motion.div
            animate={{
              rotate: isHovered ? 0 : -5,
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.3 }}
            className="mb-4"
          >
            <Quote className="w-8 h-8 text-purple-500/50" />
          </motion.div>

          {/* Rating */}
          <div className="mb-4">
            <StarRating rating={testimonial.rating} />
          </div>

          {/* Testimonial Text */}
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 flex-grow line-clamp-6">
            {testimonial.text}
          </p>

          {/* Author Info */}
          <div className="flex items-start justify-between pt-4 border-t border-gray-800/50">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{
                  scale: isHovered ? 1.1 : 1,
                }}
                transition={{ duration: 0.3 }}
                className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.avatarColor} flex items-center justify-center text-white font-bold text-lg shadow-lg`}
              >
                {testimonial.avatar}
              </motion.div>
              <div>
                <motion.h4
                  animate={{
                    color: isHovered ? '#a78bfa' : '#ffffff',
                  }}
                  transition={{ duration: 0.3 }}
                  className="font-semibold text-white"
                >
                  {testimonial.name}
                </motion.h4>
                <p className="text-gray-500 text-sm">{testimonial.title}</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-2">
              <motion.a
                href={testimonial.social.linkedin}
                animate={{
                  opacity: isHovered ? 1 : 0.5,
                }}
                whileHover={{ scale: 1.2 }}
                className="p-2 text-gray-500 hover:text-blue-400 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </motion.a>
              <motion.a
                href={testimonial.social.twitter}
                animate={{
                  opacity: isHovered ? 1 : 0.5,
                }}
                whileHover={{ scale: 1.2 }}
                className="p-2 text-gray-500 hover:text-blue-400 transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </motion.a>
            </div>
          </div>
        </div>

        {/* Hover Glow Effect */}
        <motion.div
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-t from-purple-500/10 to-transparent pointer-events-none"
        />
      </motion.div>
    </motion.div>
  );
};

// ============================================================================
// MAIN TESTIMONIALS SECTION COMPONENT
// ============================================================================

const TestimonialsSection = () => {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950" />
      
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 2px 2px, #666 1px, transparent 0)
          `,
          backgroundSize: '40px 40px',
        }} />
      </div>

      {/* Animated Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.08, 0.12, 0.08],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.06, 0.1, 0.06],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 3,
        }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
      />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl mb-6 shadow-lg shadow-purple-500/30"
          >
            <Star className="w-8 h-8 text-white fill-current" />
          </motion.div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            What Our Community Says
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Join thousands of satisfied collectors, investors, and enthusiasts who trust our platform for their premium acquisitions.
          </p>
        </motion.div>

        {/* Bento Grid Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(300px,auto)]"
        >
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
              isLarge={testimonial.featured && index % 3 === 0}
            />
          ))}
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: '10K+', label: 'Happy Customers' },
            { value: '4.9', label: 'Average Rating' },
            { value: '50+', label: 'Countries' },
            { value: '99%', label: 'Satisfaction' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-gray-500 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-16 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all"
          >
            Share Your Experience
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default React.memo(TestimonialsSection);
