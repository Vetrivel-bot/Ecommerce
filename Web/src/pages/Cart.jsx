import React, { useContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeContext } from "@/context/ThemeContext";
import {
  Trash2,
  Minus,
  Plus,
  ArrowRight,
  ShoppingBag,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";

// --- MOCK DATA ---
const INITIAL_CART = [
  {
    id: 1,
    name: "Nike Air Max Pulse",
    category: "Men's Shoes",
    price: 150.0,
    size: 10,
    color: "Phantom",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop",
    quantity: 1,
  },
  {
    id: 2,
    name: "Urban Utility Jacket",
    category: "Outerwear",
    price: 220.0,
    size: "L",
    color: "Matte Black",
    image:
      "https://images.unsplash.com/photo-1551488852-d814c937d191?q=80&w=600&auto=format&fit=crop",
    quantity: 1,
  },
];

export default function Cart() {
  const { theme } = useContext(ThemeContext);
  const [cartItems, setCartItems] = useState(INITIAL_CART);
  const [subtotal, setSubtotal] = useState(0);

  // Calculate Totals
  useEffect(() => {
    const total = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setSubtotal(total);
  }, [cartItems]);

  const shipping = subtotal > 200 ? 0 : 15;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  // Handlers
  const updateQuantity = (id, change) => {
    setCartItems((items) =>
      items.map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + change;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      })
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  return (
    <div
      className="min-h-screen w-full pt-12 pb-24 px-6 md:px-12 transition-colors duration-500"
      style={{ backgroundColor: theme.bg, color: theme.text }}
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-end justify-between mb-12 border-b pb-6"
          style={{
            borderColor: theme.navbar?.border || "rgba(150,150,150,0.2)",
          }}
        >
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight">
            Your Cart
            <span className="text-lg md:text-2xl font-medium text-gray-400 ml-4 align-middle">
              ({cartItems.length} Items)
            </span>
          </h1>
          <Link
            to="/shop"
            className="hidden md:flex items-center gap-2 hover:opacity-70 transition-opacity font-bold uppercase text-xs tracking-widest"
          >
            <ArrowLeft size={16} /> Continue Shopping
          </Link>
        </motion.div>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* --- LEFT: CART ITEMS LIST --- */}
            <div className="lg:col-span-2 space-y-6">
              <AnimatePresence mode="popLayout">
                {cartItems.map((item) => (
                  <motion.div
                    layout
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{
                      opacity: 0,
                      scale: 0.9,
                      height: 0,
                      marginBottom: 0,
                    }}
                    transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                    className="group relative flex gap-6 p-4 rounded-3xl border transition-colors overflow-hidden"
                    style={{
                      borderColor:
                        theme.navbar?.border || "rgba(150,150,150,0.2)",
                      backgroundColor:
                        theme.card?.bg || "rgba(255,255,255,0.02)",
                    }}
                  >
                    {/* Image (Clickable) */}
                    <Link to={`/shop/${item.id}`} className="shrink-0">
                      <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden bg-gray-100 hover:opacity-90 transition-opacity">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </Link>

                    {/* Details */}
                    <div className="flex flex-col justify-between flex-1 py-1">
                      <div>
                        <div className="flex justify-between items-start">
                          <div>
                            {/* Title (Clickable) */}
                            <Link to={`/shop/${item.id}`}>
                              <h3 className="text-xl font-bold uppercase leading-none mb-1 hover:underline cursor-pointer transition-all">
                                {item.name}
                              </h3>
                            </Link>
                            <p className="text-sm opacity-60">
                              {item.category}
                            </p>
                          </div>
                          <p className="font-bold text-lg">
                            ${item.price.toFixed(2)}
                          </p>
                        </div>

                        <div className="mt-4 flex gap-4 text-sm font-mono opacity-80">
                          <span className="bg-white/10 px-2 py-1 rounded">
                            Size: {item.size}
                          </span>
                          <span className="bg-white/10 px-2 py-1 rounded">
                            Color: {item.color}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        {/* Quantity Control */}
                        <div className="flex items-center gap-4 bg-white/5 rounded-full px-3 py-1.5 w-fit">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="hover:text-red-400 transition-colors disabled:opacity-30"
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-4 text-center font-bold text-sm">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="hover:text-green-400 transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider opacity-40 hover:opacity-100 hover:text-red-500 transition-all"
                        >
                          <Trash2 size={16} />{" "}
                          <span className="hidden md:inline">Remove</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* --- RIGHT: ORDER SUMMARY --- */}
            <div className="lg:col-span-1">
              <div className="sticky top-32">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="p-8 rounded-3xl border bg-opacity-50 backdrop-blur-md"
                  style={{
                    backgroundColor: theme.card?.bg || "rgba(255,255,255,0.03)",
                    borderColor:
                      theme.navbar?.border || "rgba(150,150,150,0.2)",
                  }}
                >
                  <h2 className="text-2xl font-black uppercase mb-8">
                    Order Summary
                  </h2>

                  <div className="space-y-4 mb-8 text-sm font-medium opacity-80">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping Estimate</span>
                      <span>
                        {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax Estimate</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="h-px w-full bg-current opacity-20 mb-6" />

                  <div className="flex justify-between items-center text-xl font-bold mb-8">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>

                  <button
                    className="w-full py-4 rounded-xl font-bold uppercase tracking-wider bg-current text-white dark:text-black flex items-center justify-center gap-2 hover:opacity-90 transition-opacity active:scale-[0.98]"
                    style={{ backgroundColor: theme.text, color: theme.bg }}
                  >
                    Checkout <ArrowRight size={20} />
                  </button>

                  <p className="mt-6 text-xs text-center opacity-50 leading-relaxed">
                    Secure Checkout. Free shipping on orders over $200. Returns
                    accepted within 30 days.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        ) : (
          // --- EMPTY STATE ---
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 border-t border-b opacity-60"
            style={{ borderColor: theme.navbar?.border }}
          >
            <ShoppingBag
              size={64}
              className="mb-6 opacity-50"
              strokeWidth={1}
            />
            <h2 className="text-3xl font-bold uppercase mb-2">
              Your Bag is Empty
            </h2>
            <p className="mb-8 font-mono text-sm">
              Looks like you haven't made a choice yet.
            </p>
            <Link to="/shop">
              <button
                className="px-8 py-3 border rounded-full font-bold uppercase tracking-wider hover:bg-current hover:text-white dark:hover:text-black transition-colors"
                style={{ borderColor: theme.text }}
              >
                Start Shopping
              </button>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
