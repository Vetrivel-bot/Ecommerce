import React, {
  useState,
  useContext,
  useMemo,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  DollarSign,
} from "lucide-react";
import { ThemeContext } from "../context/ThemeContext";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";

// --- 1. CONFIGURATION & MOCK DATA ---

const HERO_SLIDES = [
  {
    id: 1,
    title: "Step Into the Future",
    subtitle: "The all-new Air Max Pulse. Engineered for the streets.",
    desktopSrc:
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=1600&auto=format&fit=crop",
    tabletSrc:
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=1000&auto=format&fit=crop",
    mobileSrc:
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=600&auto=format&fit=crop",
    altText: "Air Max Pulse",
  },
  {
    id: 2,
    title: "Urban Utility",
    subtitle: "Rugged durability meets modern aesthetics.",
    desktopSrc:
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1600&auto=format&fit=crop",
    tabletSrc:
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1000&auto=format&fit=crop",
    mobileSrc:
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=600&auto=format&fit=crop",
    altText: "Urban Collection",
  },
  {
    id: 3,
    title: "Court Classics",
    subtitle: "Timeless designs that changed the game forever.",
    desktopSrc:
      "https://images.unsplash.com/photo-1556906781-9a412961d289?q=80&w=1600&auto=format&fit=crop",
    tabletSrc:
      "https://images.unsplash.com/photo-1556906781-9a412961d289?q=80&w=1000&auto=format&fit=crop",
    mobileSrc:
      "https://images.unsplash.com/photo-1556906781-9a412961d289?q=80&w=600&auto=format&fit=crop",
    altText: "Court Classics",
  },
];

const PRODUCTS_DATA = [
  {
    id: 1,
    title: "Nike Air Max Pulse",
    price: 150.0,
    category: "Running",
    badge: "New",
    image1:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop",
    image2:
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Air Jordan 1 Mid",
    price: 125.0,
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
    price: 115.0,
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
    price: 220.0,
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
    price: 110.0,
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
    price: 100.0,
    category: "Street",
    badge: "New",
    image1:
      "https://images.unsplash.com/photo-1587563871167-1ee9c731aef4?q=80&w=800&auto=format&fit=crop",
    image2:
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 7,
    title: "Puma RS-X",
    price: 110.0,
    category: "Running",
    badge: "Sale",
    image1:
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=800&auto=format&fit=crop",
    image2:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 8,
    title: "Vans Old Skool",
    price: 65.0,
    category: "Street",
    badge: null,
    image1:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=800&auto=format&fit=crop",
    image2:
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=800&auto=format&fit=crop",
  },
];

const CATEGORIES = [
  "All",
  "Running",
  "Lifestyle",
  "Basketball",
  "Street",
  "Vintage",
  "Exclusive",
  "Outdoor",
  "Training",
  "Limited",
];

// --- 2. INTERNAL COMPONENTS (HERO CAROUSEL) ---

const carouselVariants = {
  enter: (direction) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 1.1,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 1.1,
  }),
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

const HeroCarousel = ({ slides, autoPlayInterval = 5000 }) => {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isPaused, setIsPaused] = useState(false);

  // Wrap around logic using modulus
  const imageIndex = Math.abs(page % slides.length);

  const paginate = useCallback(
    (newDirection) => {
      setPage([page + newDirection, newDirection]);
    },
    [page]
  );

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      paginate(1);
    }, autoPlayInterval);
    return () => clearInterval(timer);
  }, [page, isPaused, autoPlayInterval, paginate]);

  return (
    <div
      className="relative -mt-23 w-full h-full overflow-hidden bg-black"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={carouselVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
            scale: { duration: 0.5 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          className="absolute inset-0 cursor-grab active:cursor-grabbing"
        >
          {/* Responsive Picture */}
          <picture>
            <source
              media="(min-width: 1024px)"
              srcSet={slides[imageIndex].desktopSrc}
            />
            <source
              media="(min-width: 768px)"
              srcSet={slides[imageIndex].tabletSrc}
            />
            <img
              src={slides[imageIndex].mobileSrc}
              alt={slides[imageIndex].altText || "Hero Image"}
              className="w-full h-full object-cover object-center pointer-events-none"
            />
          </picture>

          {/* Dynamic Slide Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-10 pointer-events-none p-4">
            {slides[imageIndex].title && (
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-5xl md:text-7xl font-black uppercase tracking-tighter drop-shadow-2xl"
              >
                {slides[imageIndex].title}
              </motion.h2>
            )}
            {slides[imageIndex].subtitle && (
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 0.9 }}
                transition={{ delay: 0.1 }}
                className="text-lg md:text-2xl font-light mt-2 drop-shadow-md"
              >
                {slides[imageIndex].subtitle}
              </motion.p>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div className="absolute inset-0 flex items-center justify-between p-4 z-20 pointer-events-none">
        <button
          className="pointer-events-auto p-3 rounded-full bg-black/20 hover:bg-white/20 backdrop-blur-md text-white transition-all"
          onClick={() => paginate(-1)}
        >
          <ChevronLeft size={32} />
        </button>
        <button
          className="pointer-events-auto p-3 rounded-full bg-black/20 hover:bg-white/20 backdrop-blur-md text-white transition-all"
          onClick={() => paginate(1)}
        >
          <ChevronRight size={32} />
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              const direction = index > imageIndex ? 1 : -1;
              setPage([page + (index - imageIndex), direction]);
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === imageIndex ? "w-8 bg-white" : "w-2 bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// --- 3. MAIN SHOP COMPONENT ---

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100 },
  },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
};

const Shop = () => {
  const { theme } = useContext(ThemeContext);

  // Filter & Sort State
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const [sortOption, setSortOption] = useState("Newest");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });

  // Refs for Product Section and Horizontal Scroll Container
  const productSectionRef = useRef(null);
  const scrollContainerRef = useRef(null);

  // --- DRAG TO SCROLL LOGIC ---
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // scroll-fast speed multiplier
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  // Helper to scroll smoothly to the products
  const scrollToProducts = useCallback(() => {
    if (productSectionRef.current) {
      const yOffset = -100;
      const element = productSectionRef.current;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, []);

  // First Scroll Hijack Logic
  useEffect(() => {
    const handleWheel = (e) => {
      if (window.scrollY < 10 && e.deltaY > 0) {
        e.preventDefault();
        scrollToProducts();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [scrollToProducts]);

  // Handle Dual Range Slider
  const handlePriceChange = (e, type) => {
    const value = Math.min(Math.max(Number(e.target.value), 0), 1000);

    if (type === "min") {
      if (value <= priceRange.max) {
        setPriceRange((prev) => ({ ...prev, min: value }));
      }
    } else {
      if (value >= priceRange.min) {
        setPriceRange((prev) => ({ ...prev, max: value }));
      }
    }
  };

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS_DATA];

    // 1. Category
    if (activeCategory !== "All") {
      result = result.filter((p) => p.category === activeCategory);
    }

    // 2. Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // 3. Price
    result = result.filter(
      (p) => p.price >= priceRange.min && p.price <= priceRange.max
    );

    // 4. Sort
    if (sortOption === "Price: Low to High") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === "Price: High to Low") {
      result.sort((a, b) => b.price - a.price);
    } else {
      result.sort((a, b) => b.id - a.id);
    }
    return result;
  }, [activeCategory, searchQuery, sortOption, priceRange]);

  return (
    <div
      className="min-h-screen w-full transition-colors duration-500"
      style={{ backgroundColor: theme.bg, color: theme.text }}
    >
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        /* Dual Range Slider Styles */
        .range-slider {
          position: relative;
          height: 6px;
          border-radius: 10px;
          background: ${theme.navbar.border};
        }
        
        .range-progress {
          position: absolute;
          height: 100%;
          border-radius: 10px;
          background: ${theme.text};
        }
        
        .range-input {
          position: absolute;
          top: -7px;
          height: 20px;
          width: 100%;
          background: none;
          pointer-events: none;
          -webkit-appearance: none;
          appearance: none;
        }
        
        .range-input::-webkit-slider-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: ${theme.text};
          border: 2px solid ${theme.bg};
          pointer-events: auto;
          -webkit-appearance: none;
          box-shadow: 0 0 6px rgba(0,0,0,0.2);
          cursor: pointer;
        }
        
        .range-input::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border: none;
          border-radius: 50%;
          background: ${theme.text};
          pointer-events: auto;
          -moz-appearance: none;
          box-shadow: 0 0 6px rgba(0,0,0,0.2);
          cursor: pointer;
        }
      `}</style>

      {/* 1. CAROUSEL SECTION */}
      <div className="w-full h-[60vh] md:h-[70vh]">
        <HeroCarousel slides={HERO_SLIDES} />
      </div>

      {/* 2. FILTER BAR */}
      <div
        ref={productSectionRef}
        // Removed 'sticky' class as requested
        className="w-full px-6 md:px-12 py-6 border-y transition-colors duration-300"
        style={{
          backgroundColor: theme.navbar.bg.replace("0.85", "0.7"),
          borderColor: theme.navbar.border,
        }}
      >
        <div className="max-w-[1600px] mx-auto flex flex-col xl:flex-row gap-6 items-center justify-between">
          {/* LEFT: Categories (Flexible Width to avoid overlap) */}
          <div className="flex-1 min-w-0 w-full xl:w-auto relative">
            <div
              ref={scrollContainerRef}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              className="no-scrollbar flex items-center gap-3 overflow-x-auto w-full pb-2 md:pb-0 cursor-grab active:cursor-grabbing select-none px-6"
              style={{
                maskImage:
                  "linear-gradient(to right, transparent, black 20px, black calc(100% - 20px), transparent)",
                WebkitMaskImage:
                  "linear-gradient(to right, transparent, black 20px, black calc(100% - 20px), transparent)",
              }}
            >
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    if (!isDragging) setActiveCategory(cat);
                  }}
                  className={`px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-wide transition-all duration-300 whitespace-nowrap ${
                    activeCategory === cat
                      ? "scale-105 shadow-lg"
                      : "hover:opacity-60"
                  }`}
                  style={{
                    backgroundColor:
                      activeCategory === cat
                        ? theme.text
                        : theme.navbar.activePill,
                    color: activeCategory === cat ? theme.bg : theme.text,
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: Search, Price, Sort (Fixed group) */}
          <div className="flex-none w-full xl:w-auto flex flex-wrap lg:flex-nowrap items-center gap-4 justify-between xl:justify-end">
            {/* Search */}
            <div className="relative group w-full sm:w-auto flex-1 md:w-72">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50"
              />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl outline-none border transition-all duration-300"
                style={{
                  backgroundColor: theme.navbar.searchBg,
                  color: theme.text,
                  borderColor: "transparent",
                }}
              />
            </div>

            <div className="flex gap-3 w-full sm:w-auto">
              {/* Price Filter */}
              <div className="relative w-1/2 sm:w-auto">
                <button
                  onClick={() => {
                    setIsPriceOpen(!isPriceOpen);
                    setIsSortOpen(false);
                  }}
                  className="w-full flex items-center justify-between gap-2 px-5 py-2.5 rounded-xl font-medium text-sm border transition-all hover:opacity-80 whitespace-nowrap"
                  style={{
                    backgroundColor: theme.navbar.searchBg,
                    borderColor: theme.navbar.border,
                  }}
                >
                  <div className="flex items-center gap-2">
                    <DollarSign size={16} />
                    <span>Price</span>
                  </div>
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-300 ${
                      isPriceOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isPriceOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 top-full mt-2 w-72 rounded-2xl shadow-2xl overflow-hidden border p-5 z-50"
                      style={{
                        backgroundColor: theme.navbar.modalBg,
                        borderColor: theme.navbar.border,
                      }}
                    >
                      <div className="flex flex-col gap-6">
                        <div
                          className="flex justify-between items-center border-b pb-3"
                          style={{ borderColor: theme.navbar.border }}
                        >
                          <span className="font-bold text-sm">Price Range</span>
                          <button
                            onClick={() => setPriceRange({ min: 0, max: 1000 })}
                            className="text-xs font-semibold opacity-50 hover:opacity-100 transition-opacity"
                          >
                            Reset
                          </button>
                        </div>

                        <div className="py-2 px-1">
                          <div className="range-slider">
                            <div
                              className="range-progress"
                              style={{
                                left: `${(priceRange.min / 1000) * 100}%`,
                                right: `${
                                  100 - (priceRange.max / 1000) * 100
                                }%`,
                              }}
                            ></div>
                            <input
                              type="range"
                              className="range-input"
                              min="0"
                              max="1000"
                              value={priceRange.min}
                              onChange={(e) => handlePriceChange(e, "min")}
                            />
                            <input
                              type="range"
                              className="range-input"
                              min="0"
                              max="1000"
                              value={priceRange.max}
                              onChange={(e) => handlePriceChange(e, "max")}
                            />
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div
                            className="flex-1 p-2 rounded-lg border text-center"
                            style={{ borderColor: theme.navbar.border }}
                          >
                            <span className="text-[10px] uppercase opacity-50 block mb-1">
                              Min Price
                            </span>
                            <span className="font-mono text-sm">
                              ${priceRange.min}
                            </span>
                          </div>
                          <span className="opacity-30">-</span>
                          <div
                            className="flex-1 p-2 rounded-lg border text-center"
                            style={{ borderColor: theme.navbar.border }}
                          >
                            <span className="text-[10px] uppercase opacity-50 block mb-1">
                              Max Price
                            </span>
                            <span className="font-mono text-sm">
                              ${priceRange.max}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Sort */}
              <div className="relative w-1/2 sm:w-auto">
                <button
                  onClick={() => {
                    setIsSortOpen(!isSortOpen);
                    setIsPriceOpen(false);
                  }}
                  className="w-full flex items-center justify-between gap-2 px-5 py-2.5 rounded-xl font-medium text-sm border transition-all hover:opacity-80 whitespace-nowrap"
                  style={{
                    backgroundColor: theme.navbar.searchBg,
                    borderColor: theme.navbar.border,
                  }}
                >
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal size={16} />
                    <span className="hidden sm:inline">Sort</span>
                    <span className="sm:hidden">Sort</span>
                  </div>
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-300 ${
                      isSortOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isSortOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 top-full mt-2 w-56 rounded-2xl shadow-2xl overflow-hidden border p-2 z-50"
                      style={{
                        backgroundColor: theme.navbar.modalBg,
                        borderColor: theme.navbar.border,
                      }}
                    >
                      {[
                        "Newest",
                        "Price: Low to High",
                        "Price: High to Low",
                      ].map((opt) => (
                        <button
                          key={opt}
                          onClick={() => {
                            setSortOption(opt);
                            setIsSortOpen(false);
                          }}
                          className="w-full text-left px-4 py-3 text-sm font-medium rounded-xl transition-colors"
                          style={{
                            backgroundColor:
                              sortOption === opt
                                ? theme.navbar.activePill
                                : "transparent",
                            color: theme.text,
                          }}
                        >
                          {opt}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. PRODUCT GRID */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-12">
        <AnimatePresence mode="popLayout">
          {filteredProducts.length > 0 ? (
            <motion.div
              layout
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12"
            >
              {filteredProducts.map((product) => (
                <motion.div
                  layout
                  key={product.id}
                  variants={itemVariants}
                  exit="exit"
                  className="w-full"
                >
                  <Link to={`/shop/${product.id}`}>
                    <ProductCard
                      title={product.title}
                      price={product.price}
                      category={product.category}
                      image1={product.image1}
                      image2={product.image2}
                      badge={product.badge}
                    />{" "}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-24 text-center"
            >
              <div
                className="p-6 rounded-full mb-4 opacity-50"
                style={{ backgroundColor: theme.navbar.activePill }}
              >
                <Search size={48} />
              </div>
              <h3 className="text-2xl font-bold mb-2">No products found</h3>
              <p className="opacity-60">
                Try adjusting your filters or search query.
              </p>
              <button
                onClick={() => {
                  setActiveCategory("All");
                  setSearchQuery("");
                  setPriceRange({ min: 0, max: 1000 });
                }}
                className="mt-6 px-6 py-2 rounded-full font-bold border transition-all hover:scale-105"
                style={{ borderColor: theme.navbar.border }}
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Shop;
