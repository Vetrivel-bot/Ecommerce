import React, { useState } from "react";
import { ShoppingBag, User, LogIn } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const UserHeader = ({ theme }) => {
  // --- MOCK LOGIC (Replace with your Context/Redux) ---
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Toggle to false to see 'Login' state
  const [cartCount, setCartCount] = useState(2); // Set to 0 to hide badge
  const userProfileImage =
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80"; // Mock Avatar

  return (
    <div className="flex items-center gap-2 mr-2">
      {/* --- CART COMPONENT --- */}
      <Link to="/cart">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            backgroundColor: theme.navbar.searchBg,
            color: theme.navbar.iconColor,
          }}
          className="relative w-10 h-10 flex items-center justify-center rounded-full transition-colors hover:opacity-80"
        >
          <ShoppingBag size={20} />

          {/* Cart Badge Logic */}
          {cartCount > 0 && (
            <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-white dark:ring-black">
              {cartCount}
            </span>
          )}
        </motion.button>
      </Link>

      {/* --- PROFILE COMPONENT --- */}
      <Link to={isLoggedIn ? "/profile" : "/login"}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-10 h-10 flex items-center justify-center rounded-full overflow-hidden border transition-colors hover:opacity-80"
          style={{
            backgroundColor: theme.navbar.searchBg,
            borderColor: theme.navbar.border,
            color: theme.navbar.iconColor,
          }}
        >
          {isLoggedIn ? (
            // Authenticated State: User Image
            <img
              src={userProfileImage}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            // Guest State: User Vector / Login Icon
            <User size={20} />
          )}
        </motion.button>
      </Link>
    </div>
  );
};

export default UserHeader;
