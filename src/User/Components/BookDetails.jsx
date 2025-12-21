import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ShoppingCart, ArrowLeft, Star, Truck, ShieldCheck, Minus, Plus, Heart } from "lucide-react";
import { Toast } from "../../utils/SweetAlert";
import axios from "axios";

export default function BookDetails() {
  const { id } = useParams();
  const [qty, setQty] = useState(1);

  // Dummy book data

const BASE_URL = import.meta.env.VITE_BASE_URL;

const [book, setBooks] = useState([]);

useEffect(() => {
  axios.get(`${BASE_URL}/BookStoreAPI/books/${id}`)
    .then((res) => {
      setBooks(res.data);  // data from backend
    })
    .catch((err) => {
      console.error(err);
      Toast.fire({
        icon: "error",
        title: "Failed to load books",
      });
    });
}, []);


  // const book = books.find((b) => b.id == id);

  // Handle Book Not Found
  if (!book) {
    return (
      <div className="min-h-screen bg-[#FFF8E7] flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold text-[#0A0A0A] mb-4">Book Not Found</h1>
        <Link to="/books" className="text-[#D4AF37] font-semibold hover:underline">
          Return to Collection
        </Link>
      </div>
    );
  }

  // --- CART FUNCTIONALITY ---
const addToCart = (book) => {
    // 1. Get existing cart
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // 2. Check if item exists
    const existingItem = cart.find((item) => item.id === book.id);

    // --- UPDATED LOGIC START ---
    if (existingItem) {
      // If found, show alert and STOP the function
      Toast.fire({
        icon: "info",
        title: "This book is already in your cart",
      });
      return; 
    }
    // --- UPDATED LOGIC END ---

    // 3. If NOT found, add new item
    cart.push({ ...book, qty: 1 });

    // 4. Save to storage
    localStorage.setItem("cart", JSON.stringify(cart));

    // 5. Trigger event so Navbar updates
    window.dispatchEvent(new Event("storage"));

    // 6. Success Feedback
    Toast.fire({
      icon: "success",
      title: `${book.title} added to cart!`,
    });
  };

  // Quantity Handlers
  const increaseQty = () => setQty(qty + 1);
  const decreaseQty = () => { if (qty > 1) setQty(qty - 1); };

  return (
    <div className="min-h-screen bg-[#FFF8E7] text-[#0A0A0A] py-10 px-6 font-sans">
      
      {/* Breadcrumb / Back Button */}
      <div className="max-w-6xl mx-auto mb-8">
        <Link to="/books" className="inline-flex items-center gap-2 text-[#0A0A0A] hover:text-[#D4AF37] transition-colors font-medium">
          <ArrowLeft size={20} /> Back to Books
        </Link>
      </div>

      {/* --- MAIN PRODUCT CARD --- */}
      <div className="max-w-6xl mx-auto bg-[#0A0A0A] rounded-2xl shadow-2xl overflow-hidden border border-[#D4AF37]/30">
        
        <div className="grid grid-cols-1 lg:grid-cols-2">
          
          {/* LEFT: Book Image Visualization */}
          <div className="bg-[#121212] p-12 flex items-center justify-center relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#D4AF37]/10 to-transparent"></div>
            
            {/* The "Book" (CSS Art) */}
            <div className="relative w-64 h-96 bg-[#1F1F1F] rounded-r-md shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform hover:scale-105 transition-transform duration-500 group">
              {/* Spine Gradient */}
              <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-[#D4AF37]/80 to-[#8C701B] rounded-l-sm z-10"></div>
              {/* Cover Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-black/40 rounded-r-md"></div>
              
              {/* Title on Cover */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <span className="text-[#D4AF37] text-xs tracking-[0.2em] uppercase mb-2">{book.category}</span>
                <h2 className="text-[#F9F6EF] text-2xl font-bold font-serif leading-tight mb-4">{book.title}</h2>
                <span className="text-gray-400 text-sm font-medium">by {book.author}</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Product Details */}
          <div className="p-10 lg:p-14 text-[#F9F6EF] flex flex-col justify-center">
            
            <div className="mb-6">
              <span className="bg-[#D4AF37]/20 text-[#D4AF37] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border border-[#D4AF37]/20">
                {book.category}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-[#D4AF37] mb-2 leading-tight">
              {book.title}
            </h1>
            
            <p className="text-xl text-gray-400 mb-4 font-light">
              by <span className="text-white font-medium">{book.author}</span>
            </p>

            {/* Fake Rating */}
            <div className="flex items-center gap-1 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} size={18} className="fill-[#F1C40F] text-[#F1C40F]" />
              ))}
              <span className="text-sm text-gray-500 ml-2">(128 Reviews)</span>
            </div>

            <div className="text-3xl font-bold text-[#F1C40F] mb-8 border-b border-gray-800 pb-8">
              ₹{book.price}
            </div>

            <p className="text-gray-300 leading-relaxed mb-8 text-lg">
              {book.description}
            </p>

            {/* Actions Area */}
            <div className="flex flex-col sm:flex-row gap-6 mb-10">
              
              {/* Quantity Selector */}
              <div className="flex items-center bg-[#1A1A1A] rounded-lg border border-[#333]">
                <button onClick={decreaseQty} className="px-4 py-3 text-gray-400 hover:text-white transition"><Minus size={18} /></button>
                <span className="w-12 text-center font-bold text-white">{qty}</span>
                <button onClick={increaseQty} className="px-4 py-3 text-gray-400 hover:text-white transition"><Plus size={18} /></button>
              </div>

              {/* Add to Cart Button */}
              <button 
                onClick={addToCart}
                className="flex-1 px-8 py-3 bg-[#D4AF37] text-[#0A0A0A] font-bold text-lg rounded-lg hover:bg-[#F1C40F] shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] transition-all flex items-center justify-center gap-2"
              >
                <ShoppingCart size={22} /> Add to Cart
              </button>

              {/* Wishlist Button */}
              <button className="px-4 py-3 bg-[#1A1A1A] border border-[#333] text-gray-400 rounded-lg hover:text-red-500 hover:border-red-500/50 transition-all">
                <Heart size={22} />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <Truck className="text-[#D4AF37]" size={20} />
                <span>Fast Delivery within 3 days</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <ShieldCheck className="text-[#D4AF37]" size={20} />
                <span>Secure Payment Gateway</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}