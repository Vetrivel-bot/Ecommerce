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
  useTransform,
} from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
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

// --- CAROUSEL ITEM COMPONENT ---
const CarouselItem = ({ product, index, x }) => {
  const CARD_WIDTH = 300;
  const GAP = 32;
  const ITEM_STRIDE = CARD_WIDTH + GAP;
  const itemOffset = index * ITEM_STRIDE;
  const dynamicPos = useTransform(x, (latest) => latest + itemOffset);

  const scale = useTransform(
    dynamicPos,
    [-ITEM_STRIDE, 0, ITEM_STRIDE],
    [0.85, 1.1, 0.85]
  );
  const opacity = useTransform(
    dynamicPos,
    [-ITEM_STRIDE, 0, ITEM_STRIDE],
    [0.5, 1, 0.5]
  );
  const blurValue = useTransform(
    dynamicPos,
    [-ITEM_STRIDE, 0, ITEM_STRIDE],
    [3, 0, 3]
  );
  const blurFilter = useTransform(blurValue, (v) => `blur(${v}px)`);
  const zIndex = useTransform(dynamicPos, (val) => {
    return Math.abs(val) < ITEM_STRIDE / 2 ? 10 : 1;
  });

  return (
    <motion.div
      style={{
        width: CARD_WIDTH,
        scale,
        opacity,
        filter: blurFilter,
        zIndex,
      }}
      className="flex-shrink-0 relative transition-colors duration-300"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className="w-full h-full block"
      >
        <Link to={`/shop/${product.id}`} className="block w-full h-full">
          <ProductCard {...product} />
        </Link>
      </motion.div>
    </motion.div>
  );
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
  const springX = useSpring(horizontalX, { stiffness: 120, damping: 20 });

  // --- TEXT ANIMATION ---
  // When springX goes negative (scroll right->left), the text moves left and fades out.
  // [0, -400] on scroll maps to [0, -300] pixels on the text.
  const textX = useTransform(springX, [0, -400], [0, -300]);
  const textOpacity = useTransform(springX, [0, -200], [1, 0]);
  const textBlur = useTransform(springX, [0, -200], [0, 20]);
  const textBlurFilter = useTransform(textBlur, (v) => `blur(${v}px)`);

  const sectionRef = useRef(0);
  const animatingRef = useRef(false);
  const xRef = useRef(0);
  const exitAccumulator = useRef(0);

  const touchStartY = useRef(0);
  const touchStartX = useRef(0);
  const isMouseDragging = useRef(false);

  const TOTAL_SECTIONS = 3;
  const HORIZONTAL_BUFFER = 200;
  const EXIT_THRESHOLD = 150;

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
      exitAccumulator.current = 0;

      if (nextSec === 1) {
        setTimeout(() => {
          updateHorizontal(0);
        }, 100);
      }
    },
    [horizontalX]
  );

  const processScroll = useCallback(
    (delta, sensitivity = 0.8) => {
      if (animatingRef.current) return;

      if (sectionRef.current === 0 || sectionRef.current === 2) {
        if (delta > 0) {
          if (sectionRef.current < TOTAL_SECTIONS - 1) {
            triggerSectionChange(sectionRef.current + 1, 1);
          } else {
            exitAccumulator.current += delta;
            if (exitAccumulator.current > EXIT_THRESHOLD) {
              animatingRef.current = true;
              navigate("/shop");
            }
          }
        } else if (delta < 0) {
          exitAccumulator.current = 0;
          if (sectionRef.current > 0) {
            triggerSectionChange(sectionRef.current - 1, -1);
          }
        }
        return;
      }

      if (sectionRef.current === 1) {
        const track = productTrackRef.current;
        if (!track) return;

        const trackScrollWidth = track.scrollWidth;
        const contentMaxScroll = -(trackScrollWidth - window.innerWidth);
        const triggerPoint = contentMaxScroll - HORIZONTAL_BUFFER;

        let newX = xRef.current - delta * sensitivity;

        if (newX > 150) {
          if (delta < 0) {
            triggerSectionChange(0, -1);
          } else {
            updateHorizontal(150);
          }
        } else if (newX < contentMaxScroll - 150) {
          triggerSectionChange(2, 1);
        } else {
          updateHorizontal(newX);
        }
      }
    },
    [triggerSectionChange, navigate]
  );

  const handleMouseDown = useCallback((e) => {
    if (sectionRef.current === 1) {
      isMouseDragging.current = true;
      touchStartX.current = e.clientX;
      document.body.style.cursor = "grabbing";
    }
  }, []);

  const handleMouseMoveDrag = useCallback(
    (e) => {
      if (!isMouseDragging.current) return;
      e.preventDefault();
      const deltaX = touchStartX.current - e.clientX;
      if (Math.abs(deltaX) > 0) {
        processScroll(deltaX, 1.5);
        touchStartX.current = e.clientX;
      }
    },
    [processScroll]
  );

  const handleMouseUpDrag = useCallback(() => {
    isMouseDragging.current = false;
    document.body.style.cursor = "";
  }, []);

  const handleWheel = useCallback(
    (event) => {
      event.preventDefault();
      if (Math.abs(event.deltaY) < 2) return;
      processScroll(event.deltaY, 0.9);
    },
    [processScroll]
  );

  const handleTouchStart = useCallback((event) => {
    touchStartY.current = event.touches[0].clientY;
    touchStartX.current = event.touches[0].clientX;
  }, []);

  const handleTouchMove = useCallback(
    (event) => {
      event.preventDefault();
      const deltaY = touchStartY.current - event.touches[0].clientY;
      const deltaX = touchStartX.current - event.touches[0].clientX;

      if (sectionRef.current === 1) {
        const dominantDelta =
          Math.abs(deltaX) > Math.abs(deltaY) ? deltaX : deltaY;
        processScroll(dominantDelta, 2.0);
      } else {
        processScroll(deltaY, 2.0);
      }

      touchStartY.current = event.touches[0].clientY;
      touchStartX.current = event.touches[0].clientX;
    },
    [processScroll]
  );

  useEffect(() => {
    if (isAnimating) {
      const timeout = setTimeout(() => {
        setIsAnimating(false);
        animatingRef.current = false;
        exitAccumulator.current = 0;
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [currentSection, isAnimating]);

  useEffect(() => {
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [handleWheel, handleTouchStart, handleTouchMove]);

  return (
    <div
      className="relative w-full h-screen overflow-hidden -mt-[90px]"
      style={{
        backgroundColor: theme.bg || "#111",
        color: theme.text || "#fff",
      }}
    >
      <AnimatePresence mode="wait" initial={false} custom={direction}>
        {/* --- HERO --- */}
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

        {/* --- TRENDING (Horizontal) --- */}
        {currentSection === 1 && (
          <motion.section
            key="trending"
            custom={direction}
            variants={sectionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMoveDrag}
            onMouseUp={handleMouseUpDrag}
            onMouseLeave={handleMouseUpDrag}
            className="absolute inset-0 w-full h-full flex flex-col justify-center z-20 cursor-grab active:cursor-grabbing"
          >
            {/* LEFT TEXT CONTAINER - Animates with Scroll */}
            <div className="absolute left-0 top-0 bottom-0 w-[30%] hidden md:flex flex-col justify-center px-12 z-30 pointer-events-none">
              <motion.div
                style={{
                  x: textX,
                  opacity: textOpacity,
                  filter: textBlurFilter,
                }}
                className="border-l-4 border-white/20 pl-6"
              >
                <motion.h2
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="text-6xl font-black uppercase tracking-tighter leading-none"
                >
                  Trending
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
                    Now
                  </span>
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  transition={{ delay: 0.5 }}
                  className="text-lg font-mono mt-4 tracking-widest"
                >
                  WINTER COLLECTION
                </motion.p>
              </motion.div>
            </div>

            {/* Mobile Header */}
            <div className="md:hidden w-full px-10 mb-2 mt-5 text-center relative z-30 pointer-events-none">
              <h2 className="text-3xl font-bold uppercase tracking-tighter">
                Trending Now
              </h2>
            </div>

            {/* Carousel Track */}
            <div className="w-full h-[60vh] flex items-center overflow-visible mt-4 relative z-20">
              <motion.div
                ref={productTrackRef}
                style={{ x: springX }}
                className="flex gap-8 items-center"
                {...{
                  style: {
                    x: springX,
                    display: "flex",
                    gap: "2rem",
                    paddingLeft: "calc(50vw - 150px)",
                    paddingRight: "calc(50vw - 150px)",
                    alignItems: "center",
                  },
                }}
              >
                {PRODUCTS.map((product, index) => (
                  <CarouselItem
                    key={product.id}
                    product={product}
                    index={index}
                    x={springX}
                  />
                ))}

                <div
                  className="flex-shrink-0 flex items-center justify-center opacity-30 font-mono text-xl"
                  style={{ width: "200px" }}
                >
                  view all &rarr;
                </div>
              </motion.div>
            </div>
          </motion.section>
        )}

        {/* --- FEATURED --- */}
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
                <button
                  onClick={() => navigate("/shop")}
                  className="px-10 py-4 bg-white text-black font-bold text-lg rounded-full hover:scale-105 transition-transform"
                >
                  Discover Now
                </button>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
