import React from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Heart, Eye } from "lucide-react";

const ProductCard = ({ title, price, category, image1, image2, badge }) => {
  return (
    <div className="group relative w-full max-w-sm mx-auto">
      {/* --- IMAGE CONTAINER --- */}
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-gray-900 border border-white/10">
        {/* Badge (New/Sale) */}
        {badge && (
          <div className="absolute top-3 left-3 z-20 bg-white text-black text-xs font-bold px-2 py-1 uppercase tracking-widest rounded-sm">
            {badge}
          </div>
        )}

        {/* Action Icons (Top Right) */}
        <div className="absolute top-3 right-3 z-20 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="p-2 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-black transition-colors">
            <Heart size={18} />
          </button>
          <button className="p-2 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-black transition-colors">
            <Eye size={18} />
          </button>
        </div>

        {/* Images (Swap Logic) */}
        <div className="w-full h-full cursor-pointer">
          {/* Primary Image */}
          <img
            src={image1}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Secondary Image (Visible on Hover) */}
          <img
            src={image2}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-700 opacity-0 group-hover:opacity-100 group-hover:scale-110"
          />
        </div>

        {/* 'Add to Cart' Slide Up Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.19,1,0.22,1]">
          <button className="w-full bg-white text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors shadow-lg shadow-black/50">
            <ShoppingBag size={18} />
            Add to Cart
          </button>
        </div>
      </div>

      {/* --- PRODUCT INFO --- */}
      <div className="mt-4 flex justify-between items-start">
        <div>
          <p className="text-xs text-white/50 uppercase tracking-wider mb-1">
            {category}
          </p>
          <h3 className="text-lg font-medium text-white group-hover:text-white/80 transition-colors cursor-pointer">
            {title}
          </h3>
        </div>
        <p className="text-lg font-semibold text-white">${price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
