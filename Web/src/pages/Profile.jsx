import React, { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeContext } from "@/context/ThemeContext";
import { Link } from "react-router-dom"; // Import Link for navigation
import {
  Package,
  Heart,
  MapPin,
  User,
  LogOut,
  ChevronRight,
  Camera,
  CheckCircle2,
  Edit3,
  Plus,
} from "lucide-react";

// --- MOCK DATA ---
const USER = {
  name: "Alex Doe",
  email: "alex.doe@gmail.com",
  phone: "+1 (555) 019-2834",
  memberSince: "2023",
  authProvider: "google", // google, email, apple
  avatar:
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
};

const ORDERS = [
  {
    id: "ORD-7782",
    date: "Oct 24, 2024",
    total: "$150.00",
    status: "Delivered",
    items: [
      {
        id: 1,
        name: "Nike Air Max",
        image:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=200&q=80",
      },
    ],
  },
  {
    id: "ORD-9921",
    date: "Nov 02, 2024",
    total: "$85.50",
    status: "Processing",
    items: [
      {
        id: 2,
        name: "Essentials Tee",
        image:
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=200&q=80",
      },
    ],
  },
];

const WISHLIST = [
  {
    id: 1,
    name: "Urban Utility Jacket",
    price: "$220.00",
    stock: "In Stock",
    image:
      "https://images.unsplash.com/photo-1551488852-d814c937d191?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    name: "Dunk Low Retro",
    price: "$110.00",
    stock: "Low Stock",
    image:
      "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=400&q=80",
  },
];

const ADDRESSES = [
  {
    id: 1,
    label: "Home",
    name: "Alex Doe",
    mobile: "+1 (555) 019-2834",
    street: "124 Urban District, Apt 4B",
    city: "New York",
    state: "NY",
    zip: "10012",
    default: true,
  },
  {
    id: 2,
    label: "Office",
    name: "Alex Doe",
    mobile: "+1 (555) 987-6543",
    street: "45 Tech Plaza, Suite 200",
    city: "San Francisco",
    state: "CA",
    zip: "94016",
    default: false,
  },
];

// Simple Google Icon Component
const GoogleIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

export default function Profile() {
  const { theme } = useContext(ThemeContext);
  const [activeTab, setActiveTab] = useState("personal");
  const [isEditing, setIsEditing] = useState(false);

  const tabs = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "orders", label: "My Orders", icon: Package },
    { id: "addresses", label: "Addresses", icon: MapPin },
    { id: "wishlist", label: "Wishlist", icon: Heart },
  ];

  return (
    <div
      className="min-h-screen w-full pt-12 pb-24 px-6 md:px-12 transition-colors duration-500"
      style={{ backgroundColor: theme.bg, color: theme.text }}
    >
      <div className="max-w-[1400px] mx-auto">
        {/* --- HEADER SECTION --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row items-center md:items-end gap-8 mb-16"
        >
          <div className="relative group cursor-pointer">
            <div
              className="w-32 h-32 rounded-full overflow-hidden border-4 transition-transform group-hover:scale-105"
              style={{ borderColor: theme.card?.bg || "rgba(255,255,255,0.1)" }}
            >
              <img
                src={USER.avatar}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
              <Camera size={20} />
            </div>
          </div>

          <div className="text-center md:text-left flex-1">
            <h1 className="text-4xl font-black uppercase tracking-tight">
              {USER.name}
            </h1>
            <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
              <p className="opacity-60 font-mono text-sm">{USER.email}</p>
              {USER.authProvider === "google" && (
                <div title="Linked via Google">
                  <GoogleIcon />
                </div>
              )}
            </div>
            <p className="text-xs opacity-40 mt-2 font-mono">
              ID: 883-291-00 • Member Since {USER.memberSince}
            </p>
          </div>

          <button
            className="flex items-center gap-2 px-6 py-3 rounded-full border hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/50 transition-all text-sm font-bold uppercase tracking-wider group"
            style={{
              borderColor: theme.navbar?.border || "rgba(150,150,150,0.2)",
            }}
          >
            <LogOut
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />{" "}
            Sign Out
          </button>
        </motion.div>

        {/* --- MAIN GRID LAYOUT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* --- SIDEBAR NAVIGATION --- */}
          <div className="lg:col-span-1">
            <nav className="flex lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 hide-scrollbar sticky top-32">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-5 py-4 rounded-xl transition-all whitespace-nowrap group ${
                    activeTab === tab.id
                      ? "bg-current text-white dark:text-black font-bold shadow-lg"
                      : "hover:bg-black/5 dark:hover:bg-white/5 opacity-60 hover:opacity-100"
                  }`}
                  style={{
                    backgroundColor:
                      activeTab === tab.id ? theme.text : "transparent",
                    color: activeTab === tab.id ? theme.bg : theme.text,
                  }}
                >
                  <tab.icon size={18} strokeWidth={2} />
                  <span className="tracking-wide text-sm">{tab.label}</span>
                  {activeTab === tab.id && (
                    <ChevronRight
                      size={16}
                      className="ml-auto hidden lg:block"
                    />
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* --- CONTENT AREA --- */}
          <div className="lg:col-span-3 min-h-[500px]">
            <AnimatePresence mode="wait">
              {/* 1. PERSONAL INFO TAB */}
              {activeTab === "personal" && (
                <motion.div
                  key="personal"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.3 }}
                  className="max-w-2xl"
                >
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold uppercase tracking-tight">
                      Personal Details
                    </h2>
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="text-xs font-bold uppercase tracking-widest underline opacity-60 hover:opacity-100"
                    >
                      {isEditing ? "Cancel" : "Edit Details"}
                    </button>
                  </div>

                  <form className="space-y-8">
                    {/* Name Group */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest opacity-50">
                          First Name
                        </label>
                        <input
                          type="text"
                          defaultValue="Alex"
                          disabled={!isEditing}
                          className="w-full bg-transparent border-b py-3 text-lg focus:outline-none focus:border-current transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                          style={{ borderColor: theme.navbar?.border }}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest opacity-50">
                          Last Name
                        </label>
                        <input
                          type="text"
                          defaultValue="Doe"
                          disabled={!isEditing}
                          className="w-full bg-transparent border-b py-3 text-lg focus:outline-none focus:border-current transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                          style={{ borderColor: theme.navbar?.border }}
                        />
                      </div>
                    </div>

                    {/* Contact Group */}
                    <div className="space-y-6">
                      <div className="relative space-y-2">
                        <div className="flex justify-between items-center">
                          <label className="text-[10px] font-bold uppercase tracking-widest opacity-50">
                            Email Address
                          </label>
                          {USER.authProvider === "google" && (
                            <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-green-500 bg-green-500/10 px-2 py-0.5 rounded">
                              <CheckCircle2 size={12} /> Verified
                            </span>
                          )}
                        </div>
                        <div className="relative">
                          <input
                            type="email"
                            defaultValue={USER.email}
                            disabled={true}
                            className="w-full bg-transparent border-b py-3 text-lg focus:outline-none focus:border-current transition-colors opacity-60 cursor-not-allowed pr-8"
                            style={{ borderColor: theme.navbar?.border }}
                          />
                          {USER.authProvider === "google" && (
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none opacity-80">
                              <GoogleIcon />
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <label className="text-[10px] font-bold uppercase tracking-widest opacity-50">
                            Mobile Number
                          </label>
                          <span className="px-2 py-0.5 rounded bg-current text-white dark:text-black text-[10px] font-bold uppercase">
                            Primary
                          </span>
                        </div>
                        <input
                          type="tel"
                          defaultValue={USER.phone}
                          disabled={!isEditing}
                          className="w-full bg-transparent border-b py-3 text-lg focus:outline-none focus:border-current transition-colors disabled:opacity-70"
                          style={{ borderColor: theme.navbar?.border }}
                        />
                      </div>
                    </div>

                    {isEditing && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="pt-6"
                      >
                        <button className="px-8 py-4 bg-current text-white dark:text-black rounded-full font-bold uppercase tracking-wider hover:opacity-90 w-full md:w-auto">
                          Save Changes
                        </button>
                      </motion.div>
                    )}
                  </form>
                </motion.div>
              )}

              {/* 2. ADDRESSES TAB */}
              {activeTab === "addresses" && (
                <motion.div
                  key="addresses"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold uppercase tracking-tight">
                      Saved Addresses
                    </h2>
                    <button
                      className="flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold uppercase tracking-wider hover:bg-current hover:text-white dark:hover:text-black transition-colors"
                      style={{ borderColor: theme.text }}
                    >
                      <Plus size={16} /> Add New
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {ADDRESSES.map((addr) => (
                      <div
                        key={addr.id}
                        className="group p-6 rounded-3xl border flex flex-col justify-between min-h-[220px] relative transition-all hover:border-current"
                        style={{ borderColor: theme.navbar?.border }}
                      >
                        {addr.default && (
                          <span className="absolute top-6 right-6 flex items-center gap-1 text-[10px] font-bold uppercase text-green-500 bg-green-500/10 px-2 py-1 rounded">
                            <CheckCircle2 size={12} /> Default
                          </span>
                        )}

                        <div>
                          <div className="flex items-center gap-2 mb-2 opacity-50">
                            <MapPin size={16} />
                            <span className="text-xs font-bold uppercase tracking-widest">
                              {addr.label}
                            </span>
                          </div>
                          <h3 className="font-bold text-lg mb-1">
                            {addr.name}
                          </h3>
                          <p className="text-lg font-medium leading-relaxed opacity-80">
                            {addr.mobile}
                          </p>
                          <p className="text-sm opacity-60 mt-3 leading-relaxed font-mono">
                            {addr.street}
                            <br />
                            {addr.city}, {addr.state} {addr.zip}
                          </p>
                        </div>

                        <div
                          className="flex gap-4 mt-6 pt-4 border-t border-dashed"
                          style={{ borderColor: theme.navbar?.border }}
                        >
                          <button className="flex items-center gap-1 text-xs font-bold uppercase hover:opacity-60 transition-opacity">
                            <Edit3 size={14} /> Edit
                          </button>
                          <button className="text-xs font-bold uppercase text-red-500 hover:opacity-60 transition-opacity">
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* 3. ORDERS TAB */}
              {activeTab === "orders" && (
                <motion.div
                  key="orders"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <h2 className="text-2xl font-bold uppercase mb-6">
                    Order History
                  </h2>
                  {ORDERS.map((order) => (
                    <div
                      key={order.id}
                      className="group flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-3xl border transition-all hover:shadow-lg hover:border-current"
                      style={{
                        backgroundColor:
                          theme.card?.bg || "rgba(255,255,255,0.02)",
                        borderColor: theme.navbar?.border,
                      }}
                    >
                      <div className="flex gap-4">
                        {/* Order Images */}
                        <div className="flex -space-x-4">
                          {order.items.map((item) => (
                            <Link
                              to={`/shop/${item.id}`}
                              key={item.id}
                              className="relative w-16 h-16 rounded-xl overflow-hidden border-2 border-white dark:border-black hover:z-10 hover:scale-110 transition-transform"
                            >
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </Link>
                          ))}
                        </div>

                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-3">
                            <h3 className="font-bold text-lg font-mono">
                              {order.id}
                            </h3>
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                                order.status === "Delivered"
                                  ? "bg-green-500/10 text-green-500"
                                  : order.status === "Processing"
                                  ? "bg-yellow-500/10 text-yellow-500"
                                  : "bg-blue-500/10 text-blue-500"
                              }`}
                            >
                              {order.status}
                            </span>
                          </div>
                          <p className="text-sm opacity-60">
                            {order.items.map((i) => i.name).join(", ")}
                          </p>
                          <p className="text-xs opacity-40 font-mono mt-1">
                            {order.date}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between w-full md:w-auto mt-4 md:mt-0 gap-8">
                        <p className="font-bold text-lg">{order.total}</p>
                        <button
                          className="p-2 rounded-full border hover:bg-current hover:text-white dark:hover:text-black transition-colors"
                          style={{ borderColor: theme.text }}
                        >
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* 4. WISHLIST TAB */}
              {activeTab === "wishlist" && (
                <motion.div
                  key="wishlist"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-bold uppercase mb-6">
                    Your Wishlist
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {WISHLIST.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 rounded-3xl border flex gap-4 transition-colors hover:border-current"
                        style={{
                          backgroundColor:
                            theme.card?.bg || "rgba(255,255,255,0.02)",
                          borderColor: theme.navbar?.border,
                        }}
                      >
                        <Link to={`/shop/${item.id}`} className="shrink-0">
                          <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gray-100 hover:opacity-90 transition-opacity">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </Link>
                        <div className="flex flex-col justify-between flex-1 py-1">
                          <div>
                            <Link to={`/shop/${item.id}`}>
                              <h3 className="font-bold leading-tight hover:underline">
                                {item.name}
                              </h3>
                            </Link>
                            <p className="text-xs font-bold uppercase tracking-wider opacity-60 mt-1">
                              {item.stock}
                            </p>
                          </div>
                          <div className="flex justify-between items-end">
                            <span className="font-bold">{item.price}</span>
                            <button className="text-xs font-bold uppercase underline opacity-60 hover:opacity-100">
                              Move to Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
