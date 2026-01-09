import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Trash2,
  Minus,
  Plus,
  ArrowRight,
  ShoppingBag,
  ArrowLeft,
} from "lucide-react";

export default function Cart() {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // Update quantity
  const updateQty = (_id, newQty) => {
    if (newQty < 1) return;

    const updatedCart = cart.map((item) =>
      item._id === _id ? { ...item, qty: newQty } : item
    );

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Remove item
  const removeItem = (_id) => {
    const updatedCart = cart.filter((item) => item._id !== _id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Price calculations
  const subtotal = cart.reduce((sum, item) => {
    const price = Number(item.price) || 0;
    const qty = Number(item.qty) || 1;
    return sum + price * qty;
  }, 0);

  const shipping = subtotal > 1000 ? 0 : 50;
  const total = subtotal + shipping;

  const formatPrice = (value) =>
    "₹" + Number(value).toLocaleString("en-IN");

  // EMPTY CART
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#FFF8E7] flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-[#D4AF37]/10 p-6 rounded-full mb-6">
          <ShoppingBag size={64} className="text-[#D4AF37]" />
        </div>
        <h2 className="text-3xl font-bold mb-2">Your Cart is Empty</h2>
        <p className="text-gray-600 mb-8 max-w-md">
          Looks like you haven’t added any books yet.
        </p>
        <Link
          to="/books"
          className="inline-flex items-center gap-2 px-8 py-3
                     bg-[#D4AF37] text-black font-bold rounded-lg
                     hover:bg-[#F1C40F]"
        >
          <ArrowLeft size={18} /> Browse Books
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF8E7] py-12 px-6 mt-20">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">
          Your Cart ({cart.length} items)
        </h1>

        {/* CART ITEMS */}
        {cart.map((item) => (
          <div
            key={item._id}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center
                       bg-black p-6 mb-4 rounded-xl
                       border border-[#D4AF37]/20
                       hover:border-[#D4AF37]/40 transition-all"
          >
            {/* BOOK INFO */}
            <div>
              <h3 className="text-xl font-semibold text-[#D4AF37]">
                {item.title}
              </h3>
              <p className="text-sm text-gray-400">
                {item.author}
              </p>
            </div>

            {/* ACTIONS */}
            <div className="flex items-center gap-4 mt-4 sm:mt-0">
              {/* QTY */}
              <button
                onClick={() => updateQty(item._id, item.qty - 1)}
                className="w-8 h-8 rounded-full bg-[#1A1A1A]
                           flex items-center justify-center
                           text-gray-300 hover:text-white hover:bg-[#2A2A2A]"
              >
                <Minus size={14} />
              </button>

              <span className="min-w-[24px] text-center font-semibold text-white">
                {item.qty}
              </span>

              <button
                onClick={() => updateQty(item._id, item.qty + 1)}
                className="w-8 h-8 rounded-full bg-[#1A1A1A]
                           flex items-center justify-center
                           text-gray-300 hover:text-white hover:bg-[#2A2A2A]"
              >
                <Plus size={14} />
              </button>

              {/* PRICE */}
              <p className="font-bold text-lg text-[#F1C40F] min-w-[90px] text-right">
                {formatPrice(item.price * item.qty)}
              </p>

              {/* REMOVE */}
              <button
                onClick={() => removeItem(item._id)}
                className="text-gray-500 hover:text-red-500 transition-colors"
                title="Remove item"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}

        {/* ORDER SUMMARY */}
        <div className="mt-12 max-w-md ml-auto bg-white rounded-2xl p-6 shadow-lg sticky top-28">
          <h2 className="text-lg font-bold mb-4 text-gray-800">
            Order Summary
          </h2>

          <div className="flex justify-between mb-3 text-gray-700">
            <span>Books Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>

          <div className="flex justify-between mb-3 text-gray-700">
            <span>Shipping</span>
            <span>
              {shipping === 0 ? (
                <span className="text-green-600 font-medium">FREE</span>
              ) : (
                formatPrice(shipping)
              )}
            </span>
          </div>

          <hr className="my-4" />

          <div className="flex justify-between text-xl font-bold mb-6">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>

          {/* CHECKOUT */}
          <Link
            to="/checkout"
            className="w-full flex items-center justify-center gap-2
                       bg-[#D4AF37] text-black font-bold py-3 rounded-lg
                       hover:bg-[#F1C40F]
                       shadow-[0_0_20px_rgba(212,175,55,0.35)]
                       transition-colors"
          >
            Proceed to Checkout <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
