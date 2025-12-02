import React, {
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "@/context/ThemeContext";
import HeroCarousel from "@/components/home/HeroCarousel";
import ProductCard from "@/components/ProductCard";

// --- DATA ---
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

const PRODUCTS = [
  {
    id: 1,
    title: "Nike Air Max Pulse",
    price: "150.00",
    category: "Men's Running",
    badge: "New",
    image1:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop",
    image2:
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Air Jordan 1 Mid",
    price: "125.00",
    category: "Lifestyle",
    badge: null,
    image1:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop",
    image2:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Dunk Low Retro",
    price: "115.00",
    category: "Basketball",
    badge: "Sale",
    image1:
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=800&auto=format&fit=crop",
    image2:
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Yeezy Boost 350",
    price: "220.00",
    category: "Exclusive",
    badge: "Hot",
    image1:
      "https://images.unsplash.com/photo-1584735175315-9d5816093171?q=80&w=800&auto=format&fit=crop",
    image2:
      "https://images.unsplash.com/photo-1584735174965-48c48d7edfde?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "New Balance 550",
    price: "110.00",
    category: "Vintage",
    badge: null,
    image1:
      "https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=800&auto=format&fit=crop",
    image2:
      "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Adidas Forum Low",
    price: "100.00",
    category: "Street",
    badge: "New",
    image1:
      "https://images.unsplash.com/photo-1587563871167-1ee9c731aef4?q=80&w=800&auto=format&fit=crop",
    image2:
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=800&auto=format&fit=crop",
  },
];

// --- ANIMATION VARIANTS ---
const sectionVariants = {
  initial: (direction) => ({
    y: direction > 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.95,
  }),
  animate: {
    y: "0%",
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
  exit: (direction) => ({
    y: direction > 0 ? "-100%" : "100%",
    opacity: 0,
    scale: 1.05,
    transition: { duration: 0.6, ease: "easeInOut" },
  }),
};

export default function Home() {
  const { theme } = useContext(ThemeContext);
  const [currentSection, setCurrentSection] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  // --- HORIZONTAL SCROLL LOGIC ---
  const productTrackRef = useRef(null);
  const horizontalX = useMotionValue(0);
  const springX = useSpring(horizontalX, { stiffness: 150, damping: 25 });

  const sectionRef = useRef(0);
  const animatingRef = useRef(false);
  const xRef = useRef(0);

  // 1. New Ref to accumulate scroll effort at the end of the page
  const exitAccumulator = useRef(0);

  const TOTAL_SECTIONS = 3;
  // 2. Extra horizontal buffer (pixels) before switching sections
  const HORIZONTAL_BUFFER = 400;
  // 3. Extra vertical buffer (pixels) before navigating to /shop
  const EXIT_THRESHOLD = 250;

  const updateHorizontal = (val) => {
    xRef.current = val;
    horizontalX.set(val);
  };

  const triggerSectionChange = useCallback(
    (nextSec, dir) => {
      animatingRef.current = true;
      setIsAnimating(true);
      setDirection(dir);
      setCurrentSection(nextSec);
      sectionRef.current = nextSec;
      exitAccumulator.current = 0; // Reset accumulator on change

      if (nextSec === 1) {
        setTimeout(() => {
          const track = productTrackRef.current;
          const windowWidth = window.innerWidth;
          if (track) {
            // Note: We don't subtract buffer here, we start at 0 or maxScroll
            const maxScroll = -(track.scrollWidth - windowWidth + 80);
            const startPos = dir === 1 ? 0 : maxScroll;
            updateHorizontal(startPos);
          }
        }, 100);
      }
    },
    [horizontalX]
  );

  const handleScroll = useCallback(
    (event) => {
      if (animatingRef.current) return;

      const delta = event.deltaY;
      if (Math.abs(delta) < 5) return; // Increased noise threshold

      // --- CASE 1: HERO (0) or FEATURED (2) ---
      if (sectionRef.current === 0 || sectionRef.current === 2) {
        if (delta > 0) {
          if (sectionRef.current < TOTAL_SECTIONS - 1) {
            triggerSectionChange(sectionRef.current + 1, 1);
          } else {
            // --- LOGIC: NAVIGATE TO SHOP (With Buffer) ---
            // Instead of immediate nav, we add to accumulator
            exitAccumulator.current += delta;

            // Log for debugging if needed: console.log(exitAccumulator.current);

            if (exitAccumulator.current > EXIT_THRESHOLD) {
              animatingRef.current = true;
              navigate("/shop");
            }
          }
        } else if (delta < 0) {
          // Reset exit accumulator if user scrolls up
          exitAccumulator.current = 0;

          if (sectionRef.current > 0) {
            triggerSectionChange(sectionRef.current - 1, -1);
          }
        }
        return;
      }

      // --- CASE 2: TRENDING PRODUCTS (1) ---
      if (sectionRef.current === 1) {
        const track = productTrackRef.current;
        if (!track) return;

        const trackWidth = track.scrollWidth;
        const windowWidth = window.innerWidth;
        // Logic max scroll (end of list)
        const contentMaxScroll = -(trackWidth - windowWidth + 80);
        // Actual trigger point (end of list + BUFFER)
        const triggerPoint = contentMaxScroll - HORIZONTAL_BUFFER;

        let newX = xRef.current - delta * 0.7;

        // 1. SCROLL UP PAST START
        if (newX > 0) {
          if (xRef.current >= 0 && delta < 0) {
            triggerSectionChange(0, -1);
          } else {
            newX = 0;
            updateHorizontal(newX);
          }
        }
        // 2. SCROLL DOWN PAST END (Buffer Zone)
        else if (newX < contentMaxScroll) {
          // We allow scrolling into the negative buffer
          if (newX < triggerPoint) {
            // If we hit the deep buffer, trigger change
            // We reset X to contentMaxScroll so animation looks clean entering next section
            updateHorizontal(contentMaxScroll);
            triggerSectionChange(2, 1);
          } else {
            // Just update X (This allows the "Empty Scroll" visual)
            updateHorizontal(newX);
          }
        }
        // 3. NORMAL SCROLL
        else {
          updateHorizontal(newX);
        }
      }
    },
    [triggerSectionChange, navigate]
  );

  useEffect(() => {
    if (isAnimating) {
      const timeout = setTimeout(() => {
        setIsAnimating(false);
        animatingRef.current = false;
        // Ensure accumulator is reset after animations finish
        exitAccumulator.current = 0;
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [currentSection, isAnimating]);

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
      <AnimatePresence mode="wait" initial={false} custom={direction}>
        {/* --- SECTION 0: HERO CAROUSEL --- */}
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

        {/* --- SECTION 1: TRENDING PRODUCTS --- */}
        {currentSection === 1 && (
          <motion.section
            key="trending"
            custom={direction}
            variants={sectionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute inset-0 w-full h-full flex flex-col justify-center bg-black z-20"
          >
            <div className="w-full px-10 mb-8 mt-5">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl md:text-5xl font-bold uppercase tracking-tighter"
              >
                Trending Now
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ delay: 0.5 }}
                className="text-xl font-mono mt-2"
              >
                &larr; Scroll Down to Explore &rarr;
              </motion.p>
            </div>

            {/* Horizontal Track */}
            <div className="w-full h-[60vh] flex items-center overflow-visible">
              <motion.div
                ref={productTrackRef}
                style={{ x: springX }}
                className="flex gap-8 pl-10 pr-20"
              >
                {PRODUCTS.map((product) => (
                  <div
                    key={product.id}
                    className="w-[300px] md:w-[300px] flex-shrink-0"
                  >
                    <ProductCard {...product} />
                  </div>
                ))}
                {/* Visual Cue at the end - Adjusted spacing for buffer */}
                <div
                  className="flex-shrink-0 flex items-center justify-center opacity-50 font-mono text-xl"
                  style={{ width: "300px", paddingLeft: "50px" }}
                >
                  KEEP SCROLLING &rarr;
                </div>
              </motion.div>
            </div>
          </motion.section>
        )}

        {/* --- SECTION 2: FEATURED COLLECTION --- */}
        {currentSection === 2 && (
          <motion.section
            key="featured"
            custom={direction}
            variants={sectionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute inset-0 w-full h-full flex flex-col items-center justify-center px-4 md:px-10 z-10"
          >
            <div className="w-full mt-[90px] max-w-6xl h-[70vh] rounded-3xl border-2 border-dashed border-gray-700/50 flex items-center justify-center bg-white/5 backdrop-blur-sm relative overflow-hidden group">
              <div className="absolute inset-0">
                <img
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1920&auto=format&fit=crop"
                  className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-1000"
                  alt="Collection"
                />
                <div className="absolute inset-0 bg-black/50" />
              </div>

              <div className="text-center relative z-10">
                <h2 className="text-5xl md:text-8xl font-black uppercase mb-4 drop-shadow-2xl">
                  Featured
                  <br />
                  Collection
                </h2>
                <p className="text-2xl text-white/80 font-mono mb-8">
                  [ The Urban Explorer Series ]
                </p>
                <button
                  onClick={() => navigate("/shop")}
                  className="px-10 py-4 bg-white text-black font-bold text-lg rounded-full hover:scale-105 transition-transform"
                >
                  Discover Now
                </button>
              </div>
            </div>

            {/* 👇 scroll hint */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 1,
                repeat: Infinity,
                repeatType: "mirror",
              }}
              className="mt-6 text-sm text-white/60 tracking-widest font-light uppercase"
            >
              ↓ Scroll down to shop more ↓
            </motion.p>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
