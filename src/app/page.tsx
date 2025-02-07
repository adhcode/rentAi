'use client';

import { Search, Sparkles, MessageSquare, CalendarDays, Building2, Star, MapPin, X } from 'lucide-react';
import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, MotionProps, LazyMotion, domAnimation } from 'framer-motion';

export default function Home() {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [currentSuggestionIndex, setCurrentSuggestionIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'rental' | 'shortlet'>('rental');
  const [isFullscreenSearch, setIsFullscreenSearch] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const suggestions = useMemo(() => ({
    rental: [
      "A modern 3-bedroom apartment in Ikoyi for long-term lease...",
      "Family-friendly home near international schools in Lekki...",
      "Serviced apartment under ₦5M in Victoria Island...",
      "Pet-friendly 2-bedroom flat with 24/7 power..."
    ],
    shortlet: [
      "Luxury 2-bed apartment in VI for weekend getaway...",
      "Cozy studio in Lekki for 2 weeks stay...",
      "Premium shortlet with pool for events...",
      "Furnished apartment in Ikoyi for business trips..."
    ]
  }), []);

  const quickStats = {
    rental: [
      { title: "Available Homes", count: "1,200+", icon: Building2 },
      { title: "Neighborhoods", count: "15 Areas", icon: MapPin },
    ],
    shortlet: [
      { title: "Short-lets", count: "450+", icon: CalendarDays },
      { title: "Instant Book", count: "200 Units", icon: Star },
    ]
  };

  useEffect(() => {
    if (isFocused && !query) {
      const timer = setInterval(() => {
        setCurrentSuggestionIndex((prev) => (prev + 1) % suggestions[activeTab].length);
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [isFocused, query, activeTab, suggestions]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [query]);

  // Mobile keyboard handling
  useEffect(() => {
    const handleResize = () => {
      if (document.activeElement?.tagName === 'TEXTAREA') {
        window.scrollTo(0, 0);
        document.documentElement.style.height = '100%';
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Enhanced mobile animations
  const mobileSearchVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: {
      opacity: 0,
      y: 20,
      scale: 0.95,
      transition: { duration: 0.2 }
    }
  };

  const handleSearchFocus = () => {
    setIsFocused(true);
    if (window.innerWidth < 640) { // sm breakpoint
      setIsFullscreenSearch(true);
    }
  };

  const handleSearchBlur = () => {
    if (!isFullscreenSearch) {
      setIsFocused(false);
    }
  };

  return (
    <LazyMotion features={domAnimation}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-[#DFDDD8]"
      >
        {/* Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 180, 360],
            }}
            transition={{ duration: 60, repeat: Infinity }}
            className="absolute w-[1000px] h-[1000px] rounded-full bg-gradient-to-br from-[#90927E]/5 to-[#4E6053]/5 blur-3xl -top-1/4 -right-1/4"
          />
        </div>

        {/* Main Content */}
        <div className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6">
          <div className="w-full max-w-2xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-center mb-8 sm:mb-12"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center justify-center gap-2 mb-6 sm:mb-8"
              >
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#4E6053]" />
                <span className="text-xs sm:text-sm font-light text-[#4E6053]">AI-Powered Search</span>
              </motion.div>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-extralight tracking-tight text-[#373330] px-4">
                Find Your Perfect Stay
                <span className="font-normal text-[#4E6053] block sm:inline"> in Lagos</span>
              </h1>
            </motion.div>

            {/* Stay Type Selector */}
            <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 px-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab('rental')}
                className={`w-full sm:w-auto flex items-center justify-center gap-2 px-4 sm:px-6 py-3 rounded-xl transition-all ${activeTab === 'rental'
                  ? 'bg-[#373330] text-white'
                  : 'bg-white/50 text-[#373330] hover:bg-white/80'
                  }`}
              >
                <Building2 className="w-4 h-4" />
                <span>Long-term Rental</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab('shortlet')}
                className={`w-full sm:w-auto flex items-center justify-center gap-2 px-4 sm:px-6 py-3 rounded-xl transition-all ${activeTab === 'shortlet'
                  ? 'bg-[#373330] text-white'
                  : 'bg-white/50 text-[#373330] hover:bg-white/80'
                  }`}
              >
                <CalendarDays className="w-4 h-4" />
                <span>Short-let</span>
              </motion.button>
            </div>

            {/* Mobile Fullscreen Search */}
            <AnimatePresence>
              {isFullscreenSearch && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={mobileSearchVariants}
                  className="fixed inset-0 bg-[#DFDDD8] z-50 p-4"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-medium text-[#373330]">
                      {activeTab === 'rental' ? 'Find Long-term Rental' : 'Find Short-let'}
                    </h2>
                    <button
                      onClick={() => {
                        setIsFullscreenSearch(false);
                        setIsFocused(false);
                      }}
                      className="p-2 hover:bg-[#373330]/5 rounded-full transition-colors"
                    >
                      <X className="w-5 h-5 text-[#373330]" />
                    </button>
                  </div>

                  <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg">
                    <div className="p-4">
                      <textarea
                        ref={textareaRef}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={activeTab === 'rental'
                          ? "What are you looking for in a long-term rental?"
                          : "What kind of short-let are you looking for?"
                        }
                        className="w-full px-4 py-3 bg-transparent text-[#373330] placeholder-[#373330]/30 text-base focus:outline-none resize-none min-h-[100px]"
                        autoFocus
                      />

                      {/* Quick Filters */}
                      <div className="mt-4 flex flex-wrap gap-2">
                        {[
                          { label: 'Pet Friendly', icon: '🐾' },
                          { label: '24/7 Power', icon: '⚡' },
                          { label: 'Furnished', icon: '🛋' },
                          { label: 'Pool', icon: '🏊‍♂️' },
                        ].map(filter => (
                          <motion.button
                            key={filter.label}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full text-sm text-[#373330] shadow-sm"
                          >
                            <span>{filter.icon}</span>
                            {filter.label}
                          </motion.button>
                        ))}
                      </div>

                      {/* Enhanced Suggestions */}
                      <AnimatePresence mode="wait">
                        {!query && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="mt-6"
                          >
                            <div className="flex items-center gap-2 mb-3">
                              <MessageSquare className="w-4 h-4 text-[#4E6053]" />
                              <span className="text-sm text-[#373330]/50">Try asking for</span>
                            </div>
                            <div className="space-y-3">
                              {suggestions[activeTab].map((suggestion, index) => (
                                <motion.button
                                  key={index}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={() => setQuery(suggestion)}
                                  className="w-full text-left p-3 bg-white rounded-xl text-sm text-[#373330] hover:bg-[#373330]/5 transition-colors"
                                >
                                  {suggestion}
                                </motion.button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Search Button */}
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="fixed bottom-6 left-4 right-4 bg-[#373330] text-white py-4 rounded-xl flex items-center justify-center gap-2 text-sm font-medium shadow-lg"
                  >
                    <Search className="w-4 h-4" />
                    Search Properties
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Regular Search Container */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="relative z-20 mx-4"
              {...(!isFullscreenSearch && {
                onClick: () => window.innerWidth < 640 && setIsFullscreenSearch(true)
              })}
            >
              <motion.div
                animate={{ rotate: isFocused ? 0 : 1 }}
                className="absolute inset-0 bg-white/40 backdrop-blur-xl rounded-2xl"
              />
              <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg">
                <div className="p-4 sm:p-6">
                  <textarea
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={handleSearchFocus}
                    onBlur={handleSearchBlur}
                    placeholder={activeTab === 'rental'
                      ? "Describe your ideal home for long-term stay..."
                      : "Describe your perfect short-let apartment..."
                    }
                    className="w-full px-3 sm:px-5 py-3 sm:py-4 bg-transparent text-[#373330] placeholder-[#373330]/30 text-base sm:text-lg focus:outline-none resize-none"
                    rows={3}
                  />

                  {/* Animated Chat Suggestions */}
                  <AnimatePresence mode="wait">
                    {isFocused && !query && (
                      <div className="relative mt-2 border-t border-[#373330]/10 pt-3 sm:pt-4">
                        <div className="flex items-center gap-2 mb-2 sm:mb-3">
                          <MessageSquare className="w-4 h-4 text-[#4E6053]" />
                          <span className="text-xs sm:text-sm text-[#373330]/50">AI Suggestions</span>
                        </div>
                        <motion.div
                          key={currentSuggestionIndex}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.3 }}
                          className="min-h-[28px]"
                        >
                          <button
                            onClick={() => setQuery(suggestions[activeTab][currentSuggestionIndex])}
                            className="text-left text-sm sm:text-base text-[#373330] hover:text-[#4E6053] transition-colors"
                          >
                            {suggestions[activeTab][currentSuggestionIndex]}
                          </button>
                        </motion.div>
                      </div>
                    )}
                  </AnimatePresence>

                  <div className="mt-4 flex justify-end">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-[#373330] hover:bg-[#4E6053] text-white px-4 sm:px-6 py-2.5 rounded-xl transition-colors flex items-center gap-2 text-xs sm:text-sm"
                    >
                      <Search className="w-4 h-4" />
                      <span>Search</span>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 px-4"
              {...({} as MotionProps)}
            >
              {quickStats[activeTab].map((item) => (
                <motion.div
                  key={item.title}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-3 sm:p-4 bg-white/40 hover:bg-white/60 backdrop-blur-sm rounded-xl transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-4 h-4 text-[#4E6053]" />
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-[#373330]">{item.title}</p>
                      <p className="text-xs text-[#373330]/50">{item.count}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </LazyMotion>
  );
}
