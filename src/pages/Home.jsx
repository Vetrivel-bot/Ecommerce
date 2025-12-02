import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Home() {
  const { scrollYProgress } = useScroll();

  // Parallax Text Animations
  // Section 1 (Shoe) fades out and moves up
  const yShoe = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const opShoe = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  // Section 2 (Sock) moves in from bottom and fades in/out
  const ySock = useTransform(scrollYProgress, [0.3, 0.6], [100, 0]);
  const opSock = useTransform(scrollYProgress, [0.2, 0.4, 0.6], [0, 1, 0]);

  return (
    <div className="relative w-full bg-[#111]">
      {/* --- SCROLL CONTENT LAYER --- */}
      {/* Since the 3D model is gone, this is just a standard scrollable container.
         We keep the sections full height (h-screen) to maintain the scroll distance
         needed for the animations to play.
      */}
      <div className="relative z-10">
        {/* SECTION 1: THE SHOE */}
        <section className="h-screen flex items-center justify-start px-20">
          <motion.div style={{ y: yShoe, opacity: opShoe }}>
            <h1 className="text-8xl font-black text-white italic uppercase tracking-tighter">
              Court <span className="text-[#CCFF00]">Speed</span>
            </h1>
            <p className="text-gray-400 mt-4 max-w-md backdrop-blur-md bg-black/30 p-4 rounded-xl border border-white/10">
              Responsive cushioning for the baseline grinder.
            </p>
            <button className="mt-8 px-8 py-3 bg-[#CCFF00] text-black font-bold rounded-full hover:scale-105 transition">
              View Shoe $120
            </button>
          </motion.div>
        </section>

        {/* SECTION 2: THE SOCK */}
        <section className="h-screen flex items-center justify-end px-20">
          <motion.div
            style={{ y: ySock, opacity: opSock }}
            className="text-right"
          >
            <h1 className="text-8xl font-black text-white italic uppercase tracking-tighter">
              Zero <span className="text-pink-500">Slip</span>
            </h1>
            <p className="text-gray-400 mt-4 max-w-md ml-auto backdrop-blur-md bg-black/30 p-4 rounded-xl border border-white/10">
              Compression fit socks that lock you in.
            </p>
            <button className="mt-8 px-8 py-3 bg-pink-500 text-white font-bold rounded-full hover:scale-105 transition">
              View Socks $18
            </button>
          </motion.div>
        </section>

        {/* SECTION 3: THE SHIRT */}
        <section className="h-screen flex items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 italic uppercase">
              Aero
              <br />
              Dynamic
            </h1>
            <button className="mt-8 px-12 py-4 bg-white text-black text-xl font-bold rounded-full hover:scale-105 transition shadow-[0_0_30px_rgba(255,255,255,0.4)]">
              Shop The Kit
            </button>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
