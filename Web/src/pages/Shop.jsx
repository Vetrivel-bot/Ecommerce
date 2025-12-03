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
} from "lucide-react";
import { ThemeContext } from "../context/ThemeContext";
import ProductCard from "../components/ProductCard";

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
];

const CATEGORIES = [
  "All",
  "Running",
  "Lifestyle",
  "Basketball",
  "Street",
  "Vintage",
  "Exclusive",
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
    // Fixed: added -mt-23 dont change it
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

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/70 pointer-events-none" />

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
  const [sortOption, setSortOption] = useState("Newest");

  // REF for the Product Section (Search Bar)
  const productSectionRef = useRef(null);

  // Helper to scroll smoothly to the products
  const scrollToProducts = useCallback(() => {
    if (productSectionRef.current) {
      const yOffset = -100; // Increased offset to match new sticky top
      const element = productSectionRef.current;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, []);

  // First Scroll Hijack Logic
  useEffect(() => {
    const handleWheel = (e) => {
      // Logic: If user is at the very top (scrollY < 10) AND scrolls down (deltaY > 0)
      if (window.scrollY < 10 && e.deltaY > 0) {
        e.preventDefault();
        scrollToProducts();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [scrollToProducts]);

  // Logic
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS_DATA];
    if (activeCategory !== "All") {
      result = result.filter((p) => p.category === activeCategory);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }
    if (sortOption === "Price: Low to High") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === "Price: High to Low") {
      result.sort((a, b) => b.price - a.price);
    } else {
      result.sort((a, b) => b.id - a.id);
    }
    return result;
  }, [activeCategory, searchQuery, sortOption]);

  return (
    <div
      className="min-h-screen w-full transition-colors duration-500"
      style={{ backgroundColor: theme.bg, color: theme.text }}
    >
      {/* 1. CAROUSEL SECTION */}
      <div className="w-full h-[60vh] md:h-[70vh]">
        <HeroCarousel slides={HERO_SLIDES} />
      </div>

      {/* 2. FILTER BAR */}
      <div
        ref={productSectionRef}
        // Fixed: removed 'sticky'
        className=" top-[100px] z-40 w-full px-6 md:px-12 py-4 backdrop-blur-xl border-y transition-colors duration-300"
        style={{
          backgroundColor: theme.navbar.bg.replace("0.85", "0.7"),
          borderColor: theme.navbar.border,
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wide transition-all duration-300 whitespace-nowrap ${
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

          {/* Search & Sort */}
          <div className="flex items-center gap-10 w-full md:w-auto">
            {/* Search */}
            <div className="relative group w-full md:w-64">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50"
              />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl outline-none border transition-all duration-300 focus:w-full md:focus:w-73 "
                style={{
                  backgroundColor: theme.navbar.searchBg,
                  color: theme.text,
                  borderColor: "transparent",
                }}
              />
            </div>

            {/* Sort */}
            <div className="relative">
              <button
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm border transition-all hover:opacity-80"
                style={{
                  backgroundColor: theme.navbar.searchBg,
                  borderColor: theme.navbar.border,
                }}
              >
                <SlidersHorizontal size={16} />
                <span className="hidden sm:inline">{sortOption}</span>
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
                    className="absolute right-0 top-full mt-2 w-48 rounded-2xl shadow-2xl overflow-hidden border p-1 z-50"
                    style={{
                      backgroundColor: theme.navbar.modalBg,
                      borderColor: theme.navbar.border,
                    }}
                  >
                    {["Newest", "Price: Low to High", "Price: High to Low"].map(
                      (opt) => (
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
                      )
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
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
                  <ProductCard
                    title={product.title}
                    price={product.price}
                    category={product.category}
                    image1={product.image1}
                    image2={product.image2}
                    badge={product.badge}
                  />
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
