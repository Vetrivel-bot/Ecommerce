import React, { useContext, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeContext } from "@/context/ThemeContext";
import HeroCarousel from "@/components/home/HeroCarousel";

const SLIDES_DATA = [
  {
    desktopSrc:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1920&auto=format&fit=crop",
    tabletSrc:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000&auto=format&fit=crop",
    mobileSrc:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=600&auto=format&fit=crop",
    title: "New Arrival",
    subtitle: "Performance meets style.",
  },
  {
    desktopSrc:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920&auto=format&fit=crop",
    tabletSrc:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop",
    mobileSrc:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop",
    title: "Winter '24",
    subtitle: "Bold looks for cold days.",
  },
  {
    desktopSrc:
      "https://images.unsplash.com/photo-1529139574466-a302d2752424?q=80&w=1920&auto=format&fit=crop",
    tabletSrc:
      "https://images.unsplash.com/photo-1529139574466-a302d2752424?q=80&w=1000&auto=format&fit=crop",
    mobileSrc:
      "https://images.unsplash.com/photo-1529139574466-a302d2752424?q=80&w=600&auto=format&fit=crop",
    title: "Urban Flux",
    subtitle: "Redefining street wear.",
  },
];

// Animation variants for the sections
const sectionVariants = {
  initial: (direction) => ({
    y: direction > 0 ? "100%" : "-100%", // Enter from bottom if going down, top if going up
    opacity: 0,
    scale: 0.95,
  }),
  animate: {
    y: "0%",
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1], // Custom bezier for that "smooth glide" feel
      delay: 0.1, // The requested delay
    },
  },
  exit: (direction) => ({
    y: direction > 0 ? "-100%" : "100%", // Exit to top if going down
    opacity: 0,
    scale: 1.05,
    transition: {
      duration: 0.6,
      ease: "easeInOut",
    },
  }),
};

export default function Home() {
  const { theme } = useContext(ThemeContext);
  const [currentSection, setCurrentSection] = useState(0);
  const [direction, setDirection] = useState(0); // 1 for down, -1 for up
  const [isAnimating, setIsAnimating] = useState(false);

  const TOTAL_SECTIONS = 3;

  // Handle Scroll logic
  const handleScroll = useCallback(
    (event) => {
      // Prevent scrolling if animation is already running
      if (isAnimating) return;

      const delta = event.deltaY;

      // Threshold to prevent accidental tiny scrolls
      if (Math.abs(delta) < 50) return;

      if (delta > 0 && currentSection < TOTAL_SECTIONS - 1) {
        // Scroll Down
        setIsAnimating(true);
        setDirection(1);
        setCurrentSection((prev) => prev + 1);
      } else if (delta < 0 && currentSection > 0) {
        // Scroll Up
        setIsAnimating(true);
        setDirection(-1);
        setCurrentSection((prev) => prev - 1);
      }
    },
    [currentSection, isAnimating]
  );

  // Reset animation lock after transitions
  useEffect(() => {
    if (isAnimating) {
      const timeout = setTimeout(() => {
        setIsAnimating(false);
      }, 1000); // Wait for animation (0.8s) + delay (0.1s) roughly
      return () => clearTimeout(timeout);
    }
  }, [currentSection, isAnimating]);

  // Attach event listener
  useEffect(() => {
    window.addEventListener("wheel", handleScroll, { passive: false });
    return () => window.removeEventListener("wheel", handleScroll);
  }, [handleScroll]);

  return (
    <div
      className="relative w-full h-screen overflow-hidden -mt-[90px]"
      style={{
        backgroundColor: theme.bg || "#111",
        color: theme.text || "#fff",
      }}
    >
      {/* AnimatePresence handles the Unmount/Mount animations */}
      <AnimatePresence mode="wait" initial={false} custom={direction}>
        {/* --- SECTION 1: HERO CAROUSEL --- */}
        {currentSection === 0 && (
          <motion.section
            key="hero"
            custom={direction}
            variants={sectionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute inset-0 w-full h-full"
          >
            <HeroCarousel slides={SLIDES_DATA} />
          </motion.section>
        )}

        {/* --- SECTION 2: FEATURED HIGHLIGHT --- */}
        {currentSection === 1 && (
          <motion.section
            key="featured"
            custom={direction}
            variants={sectionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute inset-0 w-full h-full flex items-center justify-center px-4 md:px-10"
          >
            <div className="w-full max-w-6xl h-[60vh] rounded-3xl border-2 border-dashed border-gray-700/50 flex items-center justify-center bg-white/5 backdrop-blur-sm relative overflow-hidden group">
              <div className="text-center">
                <h2 className="text-4xl md:text-6xl font-bold uppercase mb-4">
                  Featured Collection
                </h2>
                <p className="text-xl opacity-60 font-mono">
                  [ Seasonal Highlight Video / Banner ]
                </p>
                <button className="mt-8 px-8 py-3 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform">
                  Shop Now
                </button>
              </div>
            </div>
          </motion.section>
        )}

        {/* --- SECTION 3: PRODUCTS --- */}
        {currentSection === 2 && (
          <motion.section
            key="products"
            custom={direction}
            variants={sectionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute inset-0 w-full h-full flex flex-col justify-center px-4 md:px-10"
          >
            <div className="w-full max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold mb-10 uppercase tracking-wide text-center">
                Trending Products
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="aspect-[3/4] rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors flex flex-col items-center justify-center gap-4 group cursor-pointer"
                  >
                    <div className="w-32 h-32 rounded-full bg-white/10 group-hover:scale-110 transition-transform duration-500 overflow-hidden relative">
                      <img
                        src={`https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=200&auto=format&fit=crop`}
                        alt="Shoe"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold">Nike Air Max {i}</p>
                      <p className="text-sm opacity-50">$120.00</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
