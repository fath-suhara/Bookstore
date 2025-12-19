import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Trash2, Minus, Plus, ArrowRight, ShoppingBag, ArrowLeft, ShieldCheck } from "lucide-react";

export default function Cart() {
  const [cart, setCart] = useState([]);

  // Load cart
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // Update quantity
  const updateQty = (id, newQty) => {
    if (newQty < 1) return;
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, qty: newQty } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Remove item
  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = subtotal > 1000 ? 0 : 50; // Free shipping logic
  const total = subtotal + shipping;

  // --- EMPTY STATE ---
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#FFF8E7] flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-[#D4AF37]/10 p-6 rounded-full mb-6">
          <ShoppingBag size={64} className="text-[#D4AF37]" />
        </div>
        <h2 className="text-3xl font-bold text-[#0A0A0A] mb-2">Your Cart is Empty</h2>
        <p className="text-gray-600 mb-8 max-w-md">
          Looks like you haven't added any books to your collection yet.
        </p>
        <Link
          to="/books"
          className="px-8 py-3 bg-[#D4AF37] text-[#0A0A0A] font-bold rounded-lg shadow-lg hover:bg-[#F1C40F] transition-all flex items-center gap-2"
        >
          <ArrowLeft size={20} /> Browse Books
        </Link>
      </div>
    );
  }

  // --- CART FILLED STATE ---
  return (
    <div className="min-h-screen bg-[#FFF8E7] py-12 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <h1 className="text-3xl font-bold text-[#0A0A0A] mb-8 flex items-center gap-2">
          Your Cart <span className="text-lg font-normal text-gray-500">({cart.length} items)</span>
        </h1>

        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* LEFT: Cart Items List */}
          <div className="flex-1 space-y-6">
            {cart.map((item) => (
              <div
                key={item._id}
                className="group flex flex-col sm:flex-row bg-[#0A0A0A] p-5 rounded-xl border border-[#D4AF37]/30 shadow-lg transition-all hover:border-[#D4AF37]"
              >
                
                {/* Book Cover Placeholder */}
                <div className="w-full sm:w-24 h-36 bg-[#1F1F1F] rounded-md flex-shrink-0 relative overflow-hidden flex items-center justify-center mb-4 sm:mb-0">
                  <div className="w-12 h-20 bg-gradient-to-br from-[#D4AF37] to-[#8C701B] rounded shadow-sm"></div>
                </div>

                {/* Details */}
                <div className="flex-1 sm:ml-6 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold text-[#D4AF37] leading-tight">
                        {item.title}
                      </h3>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-500 hover:text-red-500 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">by {item.author}</p>
                    <p className="text-xs text-[#F1C40F] mt-2 bg-[#F1C40F]/10 inline-block px-2 py-0.5 rounded border border-[#F1C40F]/20">
                      {item.category}
                    </p>
                  </div>

                  {/* Price & Qty Controls */}
                  <div className="flex justify-between items-end mt-4">
                    <div className="flex items-center bg-[#1A1A1A] border border-gray-700 rounded-lg">
                      <button 
                        onClick={() => updateQty(item.id, item.qty - 1)}
                        className="p-2 text-gray-400 hover:text-white transition"
                        disabled={item.qty <= 1}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center text-[#F9F6EF] font-medium">{item.qty}</span>
                      <button 
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        className="p-2 text-gray-400 hover:text-white transition"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <p className="text-xl font-bold text-[#F9F6EF]">
                      ₹{item.price * item.qty}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: Order Summary */}
          <div className="lg:w-96">
            <div className="bg-[#0A0A0A] p-6 rounded-xl border border-[#D4AF37] shadow-xl sticky top-6">
              <h2 className="text-xl font-bold text-[#D4AF37] mb-6 pb-4 border-b border-gray-800">
                Order Summary
              </h2>

              <div className="space-y-3 text-gray-300">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? "text-[#D4AF37]" : ""}>
                    {shipping === 0 ? "Free" : `₹${shipping}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (Estimate)</span>
                  <span>₹0</span>
                </div>
              </div>

              <div className="my-6 pt-4 border-t border-[#D4AF37]/30 flex justify-between items-center text-[#F9F6EF]">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-2xl font-bold text-[#D4AF37]">₹{total}</span>
              </div>

              <button className="w-full py-4 bg-[#D4AF37] text-[#0A0A0A] font-bold rounded-lg shadow-[0_0_15px_rgba(212,175,55,0.4)] hover:bg-[#F1C40F] hover:shadow-[0_0_25px_rgba(212,175,55,0.6)] transition-all flex justify-center items-center gap-2 group">
                Proceed to Checkout
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500">
                <ShieldCheck size={14} className="text-[#D4AF37]" />
                Secure Checkout Powered by Stripe
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}