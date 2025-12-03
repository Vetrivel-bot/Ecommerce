import React, { useState, useContext, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  ShoppingBag,
  Heart,
  ChevronDown,
  Truck,
  ShieldCheck,
  Minus,
  Plus,
  Check,
  ArrowLeft,
  Camera,
  User,
  ThumbsUp,
  Play,
  X,
  Video,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { ThemeContext } from "../context/ThemeContext";
// Ensure this path points to where you saved your ProductCard component
import ProductCard from "./ProductCard";

// --- UPDATED MOCK DATABASE ---
const PRODUCTS_DB = [
  {
    id: 1,
    title: "Nike Air Max Pulse",
    price: 150.0,
    rating: 4.8,
    reviewsCount: 128,
    category: "Men's Shoes",
    description:
      "The Air Max Pulse pulls inspiration from the London music scene, bringing an underground touch to the iconic Air Max line.",
    colors: [
      {
        name: "Phantom",
        value: "#F3F4F6",
        border: "#E5E7EB",
        images: [
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?q=80&w=1000&auto=format&fit=crop",
        ],
      },
      {
        name: "Black",
        value: "#1F2937",
        border: "#374151",
        images: [
          "https://images.unsplash.com/photo-1605348532760-6753d2c43329?q=80&w=1000&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=1000&auto=format&fit=crop",
        ],
      },
      {
        name: "Volt",
        value: "#D4F458",
        border: "#BEF264",
        images: [
          "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1000&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?q=80&w=1000&auto=format&fit=crop",
        ],
      },
    ],
    sizes: [6, 7, 8, 9, 10, 11, 12],
    features: [
      "Textile-wrapped midsole",
      "Vacuum-sealed accents",
      "Point-loaded cushioning",
      "Rubber waffle outsole",
    ],
    // Related Products (Updated with image1/image2 for ProductCard)
    relatedProducts: [
      {
        id: 2,
        title: "Air Force 1 '07",
        price: 115.0,
        category: "Men's Shoes",
        image1:
          "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80",
        image2:
          "https://images.unsplash.com/photo-1588117260148-447884962b95?auto=format&fit=crop&w=600&q=80",
        badge: "Best Seller",
      },
      {
        id: 3,
        title: "Dunk Low Retro",
        price: 110.0,
        category: "Men's Shoes",
        image1:
          "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=600&q=80",
        image2:
          "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?auto=format&fit=crop&w=600&q=80",
        badge: "New",
      },
      {
        id: 4,
        title: "Jordan 1 Mid",
        price: 125.0,
        category: "Basketball",
        image1:
          "https://images.unsplash.com/photo-1605408499391-6368c628ef42?auto=format&fit=crop&w=600&q=80",
        image2:
          "https://images.unsplash.com/photo-1565191257321-72993b484542?auto=format&fit=crop&w=600&q=80",
        badge: null,
      },
      {
        id: 5,
        title: "Blazer Mid '77",
        price: 105.0,
        category: "Vintage",
        image1:
          "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=600&q=80",
        image2:
          "https://images.unsplash.com/photo-1597248881519-db089d3744a5?auto=format&fit=crop&w=600&q=80",
        badge: "Sale",
      },
      {
        id: 6,
        title: "Zoom Vomero 5",
        price: 160.0,
        category: "Running",
        image1:
          "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?auto=format&fit=crop&w=600&q=80",
        image2:
          "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=600&q=80",
        badge: null,
      },
    ],
    reviews: [
      {
        id: 101,
        user: "Alex Johnson",
        rating: 5,
        date: "2 weeks ago",
        text: "Absolutely love these! The color pop on the Volt is insane.",
        helpful: 12,
        media: [
          {
            type: "image",
            src: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=600&q=80",
          },
          {
            type: "video",
            src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
            poster:
              "https://images.unsplash.com/photo-1490750967868-bcdf92dd8363?auto=format&fit=crop&w=600&q=80",
          },
        ],
      },
      {
        id: 102,
        user: "Sarah Smith",
        rating: 4,
        date: "1 month ago",
        text: "Very comfortable, but they run a little small. Size up!",
        helpful: 5,
        media: [],
      },
    ],
  },
];

const ProductDisplay = () => {
  const { theme } = useContext(ThemeContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const product =
    PRODUCTS_DB.find((p) => p.id === Number(id)) || PRODUCTS_DB[0];

  // --- MAIN STATE ---
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [currentImages, setCurrentImages] = useState(product.colors[0].images);
  const [selectedSize, setSelectedSize] = useState(product.sizes[2]);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [expandedSection, setExpandedSection] = useState("description");

  // --- REVIEW STATE ---
  const [reviews, setReviews] = useState(product.reviews);
  const [userHasPurchased, setUserHasPurchased] = useState(true);
  const [newReviewText, setNewReviewText] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);

  // --- MEDIA OVERLAY STATE ---
  const [overlayMedia, setOverlayMedia] = useState(null);

  // --- RELATED CAROUSEL STATE ---
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Update images when color changes
  useEffect(() => {
    setCurrentImages(selectedColor.images);
    setActiveImage(0);
  }, [selectedColor]);

  // Handlers
  const handleQuantity = (type) => {
    if (type === "dec" && quantity > 1) setQuantity((q) => q - 1);
    if (type === "inc" && quantity < 10) setQuantity((q) => q + 1);
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // --- REVIEW SUBMISSION ---
  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!newReviewText.trim()) return;
    const newReview = {
      id: Date.now(),
      user: "You",
      rating: newReviewRating,
      date: "Just now",
      text: newReviewText,
      helpful: 0,
      media: [],
    };
    setReviews([newReview, ...reviews]);
    setNewReviewText("");
    setNewReviewRating(5);
  };

  // --- CAROUSEL DRAG LOGIC ---
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };
  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll-fastness
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  // --- OVERLAY LOGIC ---
  const openOverlay = (item) => setOverlayMedia(item);
  const closeOverlay = () => setOverlayMedia(null);

  if (!product) return <div>Product not found</div>;

  return (
    <div
      className="min-h-screen w-full transition-colors duration-500 pt-10 pb-24 relative"
      style={{ backgroundColor: theme.bg, color: theme.text }}
    >
      {/* --- FULL SCREEN OVERLAY --- */}
      <AnimatePresence>
        {overlayMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
            onClick={closeOverlay}
          >
            <button
              onClick={closeOverlay}
              className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 p-2 rounded-full backdrop-blur-md transition-colors"
            >
              <X size={32} />
            </button>

            <div
              className="w-full h-full flex items-center justify-center max-w-7xl"
              onClick={(e) => e.stopPropagation()}
            >
              {overlayMedia.type === "video" ? (
                <video
                  src={overlayMedia.src}
                  controls
                  autoPlay
                  className="max-h-full max-w-full rounded-lg shadow-2xl"
                />
              ) : (
                <img
                  src={overlayMedia.src}
                  alt="Full screen view"
                  className="max-h-full max-w-full object-contain rounded-lg shadow-2xl"
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 hover:opacity-70 transition-opacity"
        >
          <ArrowLeft size={20} />
          <span className="font-bold uppercase text-xs tracking-widest">
            Back to Shop
          </span>
        </button>

        {/* --- MAIN GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-24">
          {/* LEFT: IMAGES */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div
              className="relative aspect-square w-full overflow-hidden rounded-3xl group"
              style={{ backgroundColor: theme.card.imgBg }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImages[activeImage]}
                  src={currentImages[activeImage]}
                  alt={product.title}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
            </div>
            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
              {currentImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`relative aspect-square rounded-xl overflow-hidden transition-all duration-300 border-2 ${
                    activeImage === idx
                      ? "border-current opacity-100"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: DETAILS */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-32 flex flex-col gap-8">
              {/* Info */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold uppercase tracking-widest opacity-60">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1 text-sm font-medium">
                    <Star size={16} className="fill-current text-yellow-500" />
                    <span>{product.rating}</span>
                  </div>
                </div>
                <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight leading-none">
                  {product.title}
                </h1>
                <div className="text-2xl font-medium">
                  ${product.price.toFixed(2)}
                </div>
              </div>

              <div className="h-px w-full bg-current opacity-10" />

              {/* Color Selector */}
              <div>
                <label className="text-sm font-bold uppercase tracking-wider mb-3 block opacity-80">
                  Select Color:{" "}
                  <span className="opacity-100">{selectedColor.name}</span>
                </label>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-transform ${
                        selectedColor.name === color.name
                          ? "scale-110 ring-2 ring-offset-2 ring-current"
                          : "hover:scale-105"
                      }`}
                      style={{
                        backgroundColor: color.value,
                        border: `1px solid ${color.border}`,
                        "--tw-ring-offset-color": theme.bg,
                      }}
                    >
                      {selectedColor.name === color.name && (
                        <Check
                          size={16}
                          className={
                            color.name === "Phantom"
                              ? "text-black"
                              : "text-white"
                          }
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div>
                <label className="text-sm font-bold uppercase tracking-wider opacity-80 mb-3 block">
                  Select Size
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 rounded-lg text-sm font-bold transition-all border ${
                        selectedSize === size
                          ? "bg-current text-white dark:text-black"
                          : "border-current/20 hover:border-current"
                      }`}
                      style={{
                        backgroundColor:
                          selectedSize === size ? theme.text : "transparent",
                        color: selectedSize === size ? theme.bg : theme.text,
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cart Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <div
                  className="flex items-center justify-between border rounded-full px-4 py-3 sm:w-32"
                  style={{ borderColor: theme.navbar.border }}
                >
                  <button
                    onClick={() => handleQuantity("dec")}
                    className="p-1 hover:opacity-50"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="font-bold">{quantity}</span>
                  <button
                    onClick={() => handleQuantity("inc")}
                    className="p-1 hover:opacity-50"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <button
                  className="flex-1 flex items-center justify-center gap-3 bg-current text-white dark:text-black py-4 rounded-full font-bold uppercase tracking-wider hover:opacity-90 shadow-xl"
                  style={{ backgroundColor: theme.text, color: theme.bg }}
                >
                  <ShoppingBag size={20} /> Add to Cart
                </button>
                <button
                  className="p-4 border rounded-full"
                  style={{ borderColor: theme.navbar.border }}
                >
                  <Heart size={20} />
                </button>
              </div>

              {/* Accordion Info */}
              <div className="pt-8 space-y-2">
                {[
                  {
                    id: "description",
                    title: "Description",
                    content: product.description,
                    icon: null,
                  },
                  {
                    id: "shipping",
                    title: "Free Delivery",
                    content: "Free standard delivery over $100.",
                    icon: Truck,
                  },
                  {
                    id: "features",
                    title: "Features",
                    content: (
                      <ul className="list-disc pl-4">
                        {product.features.map((f) => (
                          <li key={f}>{f}</li>
                        ))}
                      </ul>
                    ),
                    icon: ShieldCheck,
                  },
                ].map((item) => (
                  <div
                    key={item.id}
                    className="border-b"
                    style={{ borderColor: theme.navbar.border }}
                  >
                    <button
                      onClick={() => toggleSection(item.id)}
                      className="w-full flex items-center justify-between py-4 font-bold text-sm uppercase tracking-wider"
                    >
                      <div className="flex items-center gap-3">
                        {item.icon && <item.icon size={18} />}
                        {item.title}
                      </div>
                      <ChevronDown
                        size={16}
                        className={`transition-transform ${
                          expandedSection === item.id ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {expandedSection === item.id && (
                      <div className="pb-6 text-sm opacity-70">
                        {item.content}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* --- RELATED PRODUCTS CAROUSEL (Horizontal Swipe/Drag) --- */}
        <div className="mb-24">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black uppercase tracking-tight">
              You May Also Like
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => (scrollRef.current.scrollLeft -= 300)}
                className="p-2 border rounded-full hover:bg-current hover:text-white dark:hover:text-black transition-colors"
                style={{ borderColor: theme.navbar.border }}
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => (scrollRef.current.scrollLeft += 300)}
                className="p-2 border rounded-full hover:bg-current hover:text-white dark:hover:text-black transition-colors"
                style={{ borderColor: theme.navbar.border }}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-8 snap-x cursor-grab active:cursor-grabbing hide-scrollbar"
            style={{ scrollBehavior: isDragging ? "auto" : "smooth" }}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            {product.relatedProducts.map((item) => (
              // Using min-w to ensure cards have width in the horizontal scroll
              <div key={item.id} className="min-w-[300px] snap-start">
                <Link to={`/shop/${item.id}`}>
                  <ProductCard
                    title={item.title}
                    price={item.price}
                    category={item.category}
                    image1={item.image1}
                    image2={item.image2}
                    badge={item.badge}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* --- REVIEWS SECTION --- */}
        <div
          className="border-t pt-16"
          style={{ borderColor: theme.navbar.border }}
        >
          <h2 className="text-3xl font-black uppercase tracking-tight mb-10">
            Customer Reviews ({reviews.length})
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Review Form */}
            <div>
              <h3 className="text-lg font-bold mb-6">Write a Review</h3>
              {userHasPurchased ? (
                <form
                  onSubmit={handleSubmitReview}
                  className="p-6 rounded-2xl border bg-opacity-5"
                  style={{
                    borderColor: theme.navbar.border,
                    backgroundColor: theme.card.bg,
                  }}
                >
                  <div className="flex gap-2 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReviewRating(star)}
                        className="hover:scale-110 transition-transform"
                      >
                        <Star
                          size={24}
                          className={
                            star <= newReviewRating
                              ? "fill-yellow-500 text-yellow-500"
                              : "text-gray-300"
                          }
                        />
                      </button>
                    ))}
                  </div>
                  <textarea
                    value={newReviewText}
                    onChange={(e) => setNewReviewText(e.target.value)}
                    placeholder="How was the product? fit, comfort, style..."
                    className="w-full h-32 p-4 rounded-xl bg-transparent border focus:outline-none focus:ring-1 focus:ring-current resize-none mb-4"
                    style={{ borderColor: theme.navbar.border }}
                    required
                  />
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      className="flex items-center gap-2 text-sm font-bold opacity-60 hover:opacity-100"
                    >
                      <Camera size={18} /> <Video size={18} /> Add Media
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 rounded-full font-bold uppercase text-xs tracking-wider bg-current text-white dark:text-black hover:opacity-80"
                      style={{ backgroundColor: theme.text, color: theme.bg }}
                    >
                      Post Review
                    </button>
                  </div>
                </form>
              ) : (
                <div
                  className="p-6 rounded-2xl border border-dashed flex flex-col items-center justify-center text-center gap-4 opacity-60"
                  style={{ borderColor: theme.navbar.border }}
                >
                  <ShoppingBag size={32} />
                  <div>
                    <p className="font-bold">Verified Purchase Required</p>
                    <p className="text-sm">
                      You must purchase this item to leave a review.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Review List */}
            <div className="space-y-8">
              {reviews.map((review) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="pb-8 border-b last:border-0"
                  style={{ borderColor: theme.navbar.border }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                        <User size={20} className="opacity-50" />
                      </div>
                      <div>
                        <p className="font-bold text-sm">{review.user}</p>
                        <div className="flex text-yellow-500">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={12}
                              className={
                                i < review.rating
                                  ? "fill-current"
                                  : "text-gray-300"
                              }
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs opacity-40 font-medium">
                      {review.date}
                    </span>
                  </div>

                  <p className="opacity-80 leading-relaxed text-sm mb-4">
                    {review.text}
                  </p>

                  {/* Customer Media (Images & Videos) */}
                  {review.media && review.media.length > 0 && (
                    <div className="flex gap-2 mb-4 overflow-x-auto">
                      {review.media.map((item, idx) => (
                        <div
                          key={idx}
                          onClick={() => openOverlay(item)}
                          className="relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden cursor-pointer group border"
                          style={{ borderColor: theme.navbar.border }}
                        >
                          {item.type === "video" ? (
                            <>
                              <img
                                src={
                                  item.poster ||
                                  "https://via.placeholder.com/150"
                                }
                                alt="Video thumbnail"
                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                              />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="bg-black/50 p-1.5 rounded-full text-white">
                                  <Play size={12} fill="currentColor" />
                                </div>
                              </div>
                            </>
                          ) : (
                            <img
                              src={item.src}
                              alt="Review attachment"
                              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1.5 text-xs font-bold opacity-40 hover:opacity-100 transition-opacity">
                      <ThumbsUp size={14} /> Helpful ({review.helpful})
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;
