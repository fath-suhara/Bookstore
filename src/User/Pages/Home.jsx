import React from "react";
import { Link } from "react-router-dom"; 
import { ArrowRight, Truck, ShieldCheck, BookOpen, Star } from "lucide-react";
import FeaturedBooks from "../Components/FeaturedBooks";

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
        <div className="relative z-10 px-8 md:px-16 max-w-7xl mx-auto w-full">
          <div className="max-w-2xl">
            
            {/* Small Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#D4AF37]/50 bg-black/40 backdrop-blur-md mb-6">
              <Star size={12} className="fill-[#D4AF37] text-[#D4AF37]" />
              <span className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase">
                #1 Bookstore of the Year
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-[#F9F6EF] mb-6 leading-[1.1]">
              Uncover Worlds <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F1C40F]">
                Unseen & Untold
              </span>
            </h1>
            
            <p className="text-gray-300 text-lg md:text-xl mb-10 leading-relaxed max-w-lg">
              From timeless classics to modern masterpieces. Curated collections for the dreamers, the thinkers, and the storytellers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/books">
                <button className="w-full sm:w-auto px-8 py-4 bg-[#D4AF37] text-[#0A0A0A] font-bold text-lg rounded-lg shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:bg-[#F1C40F] hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
                  Start Reading <ArrowRight size={20} />
                </button>
              </Link>
              
              <Link to="/about">
                <button className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/20 text-[#F9F6EF] font-bold text-lg rounded-lg hover:bg-white/10 hover:border-white transition-all">
                  Our Story
                </button>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* --- VALUE PROPOSITION (Trust Signals) --- */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Feature 1 */}
          <div className="p-8 bg-white border border-[#D4AF37]/30 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-center group">
            <div className="w-14 h-14 mx-auto bg-[#D4AF37]/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#D4AF37] transition-colors">
              <BookOpen className="text-[#D4AF37] group-hover:text-white transition-colors" size={28} />
            </div>
            <h3 className="text-xl font-bold mb-2">Curated Collection</h3>
            <p className="text-gray-600">Handpicked books from every genre to ensure quality reads.</p>
          </div>

          {/* Feature 2 */}
          <div className="p-8 bg-white border border-[#D4AF37]/30 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-center group">
            <div className="w-14 h-14 mx-auto bg-[#D4AF37]/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#D4AF37] transition-colors">
              <Truck className="text-[#D4AF37] group-hover:text-white transition-colors" size={28} />
            </div>
            <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
            <p className="text-gray-600">Get your books delivered to your doorstep in record time.</p>
          </div>

          {/* Feature 3 */}
          <div className="p-8 bg-white border border-[#D4AF37]/30 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-center group">
            <div className="w-14 h-14 mx-auto bg-[#D4AF37]/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#D4AF37] transition-colors">
              <ShieldCheck className="text-[#D4AF37] group-hover:text-white transition-colors" size={28} />
            </div>
            <h3 className="text-xl font-bold mb-2">Secure Payment</h3>
            <p className="text-gray-600">100% secure payment gateways for a worry-free experience.</p>
          </div>

        </div>
      </section>

      {/* --- FEATURED BOOKS SECTION --- */}
      <section className="py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8 border-b-2 border-[#D4AF37]/20 pb-4">
            <h2 className="text-3xl font-bold text-[#0A0A0A]">Featured Books</h2>
            <Link to="/books" className="text-[#D4AF37] font-semibold hover:text-[#b08d26] flex items-center gap-1 transition-colors">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          
          {/* Imported Component */}
          <FeaturedBooks />
        </div>
      </section>

    </div>
  );
}