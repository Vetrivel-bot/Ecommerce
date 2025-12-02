import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  // 1. Initialize as null so nothing is highlighted by default on "/"
  const [activeTab, setActiveTab] = useState(null);

  // 2. Get current location
  const location = useLocation();
  const { scrollY } = useScroll();

  // 3. Sync Active Tab with URL Hash
  useEffect(() => {
    // If we are at root "/" with no hash, clear highlight
    if (!location.hash) {
      setActiveTab(null);
    } else {
      // If there is a hash (e.g. #work), find the matching item name to highlight it
      const currentHash = location.hash.replace("#", "").toLowerCase();
      const items = ["Work", "About", "Playground", "Resource"];
      const matchingItem = items.find(
        (item) => item.toLowerCase() === currentHash
      );

      if (matchingItem) {
        setActiveTab(matchingItem);
      }
    }
  }, [location]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (
      latest > previous &&
      latest > 150 &&
      !isMobileMenuOpen &&
      !isSearchOpen
    ) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  });

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isSearchOpen]);

  const navbarVariants = {
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    hidden: {
      y: "-120%",
      opacity: 0,
      transition: { duration: 0.6, ease: "easeInOut" },
    },
  };

  return (
    <>
      <motion.div
        variants={navbarVariants}
        animate={isHidden ? "hidden" : "visible"}
        initial="visible"
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-[1000px]"
      >
        <motion.nav
          layout
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="bg-[#1a1a1a] p-2 rounded-[30px] shadow-2xl border border-gray-800/50 overflow-hidden backdrop-blur-md"
        >
          <div className="flex items-center justify-between pr-2 pl-2">
            {/* --- Left: Logo --- */}
            <Link to="/">
              <motion.a
                layout="position"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                // Clicking logo goes to "/", which triggers useEffect to clear activeTab
                className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-bold hover:bg-gray-200 transition-colors shrink-0 z-20 cursor-pointer block"
              >
                ihyaet
              </motion.a>
            </Link>

            {/* --- Center: Desktop Links --- */}
            <motion.ul
              layout="position"
              className="hidden md:flex items-center gap-2 lg:gap-2 px-4"
            >
              {["Work", "About", "Playground", "Resource"].map((item) => (
                <li key={item} className="relative z-0">
                  {/* Highlight Pill (Only shows if activeTab is not null) */}
                  {activeTab === item && (
                    <motion.span
                      layoutId="active-pill"
                      className="absolute inset-0 bg-white/10 rounded-full -z-10"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}

                  <FlipLink
                    href={`#${item.toLowerCase()}`}
                    // We rely on the Link href changing the URL, and the useEffect updating the state.
                    // But we can also set it immediately for a snappier feel.
                    onClick={() => setActiveTab(item)}
                  >
                    {item}
                  </FlipLink>
                </li>
              ))}
            </motion.ul>

            {/* --- Right: Desktop Search Trigger --- */}
            <motion.div
              layout="position"
              className="hidden md:flex items-center"
            >
              <button
                onClick={() => setIsSearchOpen(true)}
                className="relative group flex items-center bg-white/10 hover:bg-white/20 text-gray-400 hover:text-white pl-3 pr-4 py-2.5 rounded-full transition-all w-[160px] hover:w-[180px]"
              >
                <SearchIcon className="h-4 w-4 mr-2" />
                <span className="text-sm">Search...</span>
                <span className="absolute right-3 text-xs bg-white/10 px-1.5 py-0.5 rounded text-gray-500 border border-white/5">
                  ⌘K
                </span>
              </button>
            </motion.div>

            {/* --- Mobile Right Section --- */}
            <div className="md:hidden flex items-center gap-3 z-20">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                <SearchIcon className="h-5 w-5" />
              </button>

              <button
                onClick={toggleMenu}
                className="bg-white text-black w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <motion.div
                  animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
                </motion.div>
              </button>
            </div>
          </div>

          {/* --- Mobile Menu --- */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden overflow-hidden"
              >
                <div className="p-4 flex flex-col gap-6">
                  <ul className="flex flex-col gap-2 text-center">
                    {["Work", "About", "Playground", "Resource"].map(
                      (item, i) => (
                        <motion.li
                          key={item}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.1 + i * 0.1 }}
                        >
                          <a
                            href={`#${item.toLowerCase()}`}
                            onClick={() => {
                              setActiveTab(item);
                              setIsMobileMenuOpen(false);
                            }}
                            className={`${
                              activeTab === item
                                ? "text-white"
                                : "text-gray-300"
                            } text-xl font-medium block py-2 hover:text-white transition-colors`}
                          >
                            {item}
                          </a>
                        </motion.li>
                      )
                    )}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </motion.div>

      {/* --- Search Overview --- */}
      <AnimatePresence>
        {isSearchOpen && (
          <SearchOverview onClose={() => setIsSearchOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

// --- SIMPLIFIED FlipLink Component ---
const FlipLink = ({ children, href, onClick }) => {
  return (
    <motion.a
      initial="initial"
      whileHover="hovered"
      href={href}
      onClick={onClick}
      className="relative block overflow-hidden whitespace-nowrap text-gray-300 text-sm font-medium px-4 py-2 hover:text-white transition-colors duration-200"
    >
      <motion.div
        variants={{
          initial: { y: 0, opacity: 1 },
          hovered: { y: "-100%", opacity: 0 },
        }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        variants={{
          initial: { y: "100%", opacity: 0 },
          hovered: { y: 0, opacity: 1 },
        }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </motion.a>
  );
};

// --- Search Overview Component ---
const SearchOverview = ({ onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    window.history.pushState({ searchOpen: true }, "", window.location.href);
    const handlePopState = () => onClose();
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [onClose]);

  const handleManualClose = () => window.history.back();

  const handleKeyDown = (e) => {
    if (e.key === "Escape") handleManualClose();
    if (e.key === "Backspace" && searchQuery === "") handleManualClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-start justify-center pt-24 px-4"
      onClick={handleManualClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="w-full max-w-2xl bg-[#1a1a1a] border border-gray-800 rounded-3xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b border-gray-800 p-4 flex items-center gap-4">
          <SearchIcon className="h-6 w-6 text-gray-400" />
          <input
            autoFocus
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search projects, resources, or commands..."
            className="flex-1 bg-transparent text-xl text-white outline-none placeholder:text-gray-600 h-12"
          />
          <button
            onClick={handleManualClose}
            className="p-2 bg-gray-800 hover:bg-red-500/20 hover:text-red-400 rounded-full text-gray-400 transition-colors"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="p-4 max-h-[60vh] overflow-y-auto">
          {searchQuery === "" ? (
            <>
              <p className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wider">
                Quick Links
              </p>
              <div className="space-y-1">
                {[
                  "Recent Projects",
                  "Documentation",
                  "Contact Me",
                  "Playground",
                ].map((item) => (
                  <button
                    key={item}
                    className="w-full text-left px-4 py-3 hover:bg-white/5 rounded-xl text-gray-300 hover:text-white flex items-center justify-between group transition-colors"
                  >
                    <span>{item}</span>
                    <span className="text-gray-600 group-hover:text-gray-400">
                      ↵
                    </span>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-10 text-gray-500">
              Searching for "{searchQuery}"...
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- Icons ---
const SearchIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

const MenuIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);

const CloseIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

export default Navbar;
