import React from "react";
import { Link } from "react-router-dom"; 
import { motion } from "framer-motion";

import { ArrowRight, Truck, ShieldCheck, BookOpen, Star } from "lucide-react";
import FeaturedBooks from "../Components/FeaturedBooks";
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};


export default function Home() {
  return (
    <div className="min-h-screen bg-[#FFF8E7] text-[#0A0A0A] font-sans">
      
      {/* --- NEW HERO SECTION (Editorial Style) --- */}
      <section className="relative w-full h-[700px] flex items-center overflow-hidden">
        
       {/* Background Image - Dark Library */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            // High-res dark library image
            backgroundImage: "url('images/download.jpeg')", 
            backgroundSize: "contain",
          //  backgroundRepeat: "no-repeat",

            backgroundPosition: "right",
          }}
        >
          {/* Heavy Overlay to make text pop */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
          
          {/* Bottom Fade */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#FFF8E7] to-transparent"></div>
        </div>

        {/* Hero Content - Left Aligned */}
      <motion.div
  initial={{ opacity: 0, x: -80 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.9, ease: "easeOut" }}
  className="relative z-10 px-8 md:px-16 max-w-7xl mx-auto w-full"
>
  <div className="max-w-2xl">

    {/* Heading */}
    <motion.h1
      initial={{ opacity: 0, x: -60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
      className="text-5xl md:text-7xl font-bold text-[#F9F6EF] mb-6 leading-[1.1]"
    >
      Uncover Worlds <br />
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F1C40F]">
        Unseen & Untold
      </span>
    </motion.h1>

    {/* Paragraph */}
    <motion.p
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4, duration: 0.7, ease: "easeOut" }}
      className="text-gray-300 text-lg md:text-xl mb-10 leading-relaxed max-w-lg"
    >
      From timeless classics to modern masterpieces. Curated collections for the dreamers, the thinkers, and the storytellers.
    </motion.p>

    {/* CTA */}
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
      className="flex flex-col sm:flex-row gap-4"
    >
      <Link to="/books">
       <motion.button
  animate={{ y: [0, -6, 0] }}
  transition={{
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  whileHover={{ scale: 1.08 }}
  whileTap={{ scale: 0.95 }}
  className="w-full sm:w-auto px-8 py-4 bg-[#D4AF37] text-[#0A0A0A] font-bold text-lg rounded-lg 
             shadow-[0_0_25px_rgba(212,175,55,0.45)] hover:bg-[#F1C40F]
             transition-all flex items-center justify-center gap-2"
>
  Browse Books <ArrowRight size={20} />
</motion.button>

      </Link>
    </motion.div>

  </div>
</motion.div>



      
      </section>

      {/* --- VALUE PROPOSITION (Trust Signals) --- */}
      {/* --- VALUE PROPOSITION SECTION --- */}
<section className="py-16 px-6 max-w-7xl mx-auto">
  <motion.div
    variants={containerVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    className="grid grid-cols-1 md:grid-cols-3 gap-8"
  >
    {/* Feature 1 */}
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -6 }}
      className="p-8 bg-white border border-[#D4AF37]/30 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-center group"
    >
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="w-14 h-14 mx-auto bg-[#D4AF37]/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#D4AF37] transition-colors"
      >
        <BookOpen className="text-[#D4AF37] group-hover:text-white transition-colors" size={28} />
      </motion.div>
      <h3 className="text-xl font-bold mb-2">Curated Collection</h3>
      <p className="text-gray-600">
        Handpicked books from every genre to ensure quality reads.
      </p>
    </motion.div>

    {/* Feature 2 */}
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -6 }}
      className="p-8 bg-white border border-[#D4AF37]/30 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-center group"
    >
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="w-14 h-14 mx-auto bg-[#D4AF37]/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#D4AF37] transition-colors"
      >
        <Truck className="text-[#D4AF37] group-hover:text-white transition-colors" size={28} />
      </motion.div>
      <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
      <p className="text-gray-600">
        Get your books delivered to your doorstep in record time.
      </p>
    </motion.div>

    {/* Feature 3 */}
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -6 }}
      className="p-8 bg-white border border-[#D4AF37]/30 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-center group"
    >
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="w-14 h-14 mx-auto bg-[#D4AF37]/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#D4AF37] transition-colors"
      >
        <ShieldCheck className="text-[#D4AF37] group-hover:text-white transition-colors" size={28} />
      </motion.div>
      <h3 className="text-xl font-bold mb-2">Secure Payment</h3>
      <p className="text-gray-600">
        100% secure payment gateways for a worry-free experience.
      </p>
    </motion.div>
  </motion.div>
</section>

{/* --- FEATURED BOOKS SECTION --- */}
<section className="py-10 px-6">
  <div className="max-w-7xl mx-auto">
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex items-center justify-between mb-8 border-b-2 border-[#D4AF37]/20 pb-4"
    >
      <h2 className="text-3xl font-bold text-[#0A0A0A]">Featured Books</h2>
      <Link
        to="/books"
        className="text-[#D4AF37] font-semibold hover:text-[#b08d26] flex items-center gap-1 transition-colors"
      >
        View All <ArrowRight size={16} />
      </Link>
    </motion.div>

    {/* Featured Books Component */}
    <FeaturedBooks />
  </div>
</section>


    </div>
  );
}