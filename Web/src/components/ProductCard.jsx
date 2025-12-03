import React, { useContext } from "react";
import { ShoppingBag, Heart, Eye } from "lucide-react";
import { ThemeContext } from "@/context/ThemeContext";

const ProductCard = ({ title, price, category, image1, image2, badge }) => {
  const { theme } = useContext(ThemeContext);

  // Helper to get badge colors based on text (e.g., "New", "Sale")
  const getBadgeStyle = (badgeText) => {
    if (!badgeText) return {};
    const key = badgeText.toLowerCase();
    // Default to 'default' if the specific key (e.g. 'sale') isn't found
    const style = theme.badges[key] || theme.badges.default;
    return { backgroundColor: style.bg, color: style.text };
  };

  const badgeStyle = getBadgeStyle(badge);

  return (
    <div className="group relative w-full max-w-sm mx-auto select-none">
      {/* --- IMAGE CONTAINER --- */}
      <div
        className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl transition-colors duration-300"
        style={{
          backgroundColor: theme.card.imgBg,
          border: `1px solid ${theme.card.border}`,
        }}
      >
        {/* Badge (Dynamic Colors) */}
        {badge && (
          <div
            className="absolute top-3 left-3 z-20 text-xs font-bold px-3 py-1 uppercase tracking-widest rounded-sm shadow-sm"
            style={badgeStyle}
          >
            {badge}
          </div>
        )}

        {/* Action Icons (Top Right) */}
        <div className="absolute top-3 right-3 z-20 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            className="p-2 backdrop-blur-md rounded-full transition-colors"
            style={{
              backgroundColor: theme.card.iconBtnBg,
              color: theme.card.iconBtnColor,
            }}
          >
            <Heart size={18} />
          </button>
          <button
            className="p-2 backdrop-blur-md rounded-full transition-colors"
            style={{
              backgroundColor: theme.card.iconBtnBg,
              color: theme.card.iconBtnColor,
            }}
          >
            <Eye size={18} />
          </button>
        </div>

        {/* Images (Swap Logic) */}
        {/* Added draggable={false} to prevent ghost image dragging */}
        <div className="w-full h-full cursor-pointer">
          {/* Primary Image */}
          <img
            src={image1}
            alt={title}
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:opacity-0 group-hover:scale-110  opacity-90"
          />
          {/* Secondary Image */}
          <img
            src={image2}
            alt={title}
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-700 opacity-0 group-hover:opacity-90 group-hover:scale-110 "
          />
        </div>

        {/* 'Add to Cart' Slide Up Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.19,1,0.22,1]">
          <button
            className="w-full font-bold py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg hover:opacity-90 transition-opacity"
            style={{
              backgroundColor: theme.card.btnBg,
              color: theme.card.btnText,
            }}
          >
            <ShoppingBag size={18} />
            Add to Cart
          </button>
        </div>
      </div>

      {/* --- PRODUCT INFO --- */}
      <div className="mt-4 flex justify-between items-start">
        <div>
          <p
            className="text-xs uppercase tracking-wider mb-1"
            style={{ color: theme.card.textSecondary }}
          >
            {category}
          </p>
          <h3
            className="text-lg font-medium transition-colors cursor-pointer"
            style={{ color: theme.card.textPrimary }}
          >
            {title}
          </h3>
        </div>
        <p
          className="text-lg font-semibold"
          style={{ color: theme.card.textPrimary }}
        >
          ${price}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
