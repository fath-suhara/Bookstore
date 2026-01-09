import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="bg-[#0A0A0A] shadow-md border-b border-[#D4AF37] fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">

        {/* Logo */}
        <Link 
        to="/"
        >
        <div className="text-2xl font-serif tracking-wide">
          <span className="text-[#F9F6EF]">Read</span>
          <span className="text-[#D4AF37]">Loom</span>
        </div>
        </Link>

        {/* Links */}
        <nav className="flex gap-8 text-[#F9F6EF] font-medium">
          <Link
            to="/"
            className="hover:text-[#D4AF37] transition-all"
          >
            Home
          </Link>

          <Link
            to="/categories"
            className="hover:text-[#D4AF37] transition-all"
          >
            Categories
          </Link>

          <Link 
           to="/books" 
           className="hover:text-[#D4AF37] transition-all"
           >
           Books
          </Link>

          <Link to="/cart" className="hover:text-[#D4AF37] transition-all">
          Cart
          </Link>

          <Link
          to="/contact"
          className="hover:text-[#D4AF37] transition-all"
          >
          Contact
          </Link>
        </nav>

      </div>
    </header>
  );
}
