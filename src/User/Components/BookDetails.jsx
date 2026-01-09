import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ShoppingCart,
  ArrowLeft,
  Star,
  Truck,
  ShieldCheck,
  Minus,
  Plus,
} from "lucide-react";
import { Toast } from "../../utils/SweetAlert";
import axios from "axios";
import { motion } from "framer-motion";

export default function BookDetails() {
  const { id } = useParams();
  const [qty, setQty] = useState(1);
  const [book, setBook] = useState(null);

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  // FETCH BOOK
  useEffect(() => {
    axios
      .get(`${BASE_URL}/BookStoreAPI/books/${id}`)
      .then((res) => setBook(res.data))
      .catch(() => {
        Toast.fire({
          icon: "error",
          title: "Failed to load book",
        });
      });
  }, [id, BASE_URL]);

  // ADD TO CART
  const addToCart = (book) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = cart.find((item) => item._id === book._id);
    if (existingItem) {
      Toast.fire({
        icon: "info",
        title: "This book is already in your cart",
      });
      return;
    }

    cart.push({
      _id: book._id,
      title: book.title,
      author: book.author,
      price: Number(book.price),
      category: book.category,
      qty,
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("storage"));

    Toast.fire({
      icon: "success",
      title: `${book.title} added to cart!`,
    });
  };

  const increaseQty = () => setQty((q) => q + 1);
  const decreaseQty = () => qty > 1 && setQty((q) => q - 1);

  if (!book) {
    return (
      <div className="min-h-screen bg-[#FFF8E7] flex items-center justify-center">
        <p className="text-xl text-gray-600">Loading book...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF8E7] text-[#0A0A0A] py-10 px-6 mt-20">
      {/* BACK */}
      <div className="max-w-6xl mx-auto mb-8">
        <Link
          to="/books"
          className="inline-flex items-center gap-2 font-medium hover:text-[#D4AF37]"
        >
          <ArrowLeft size={20} /> Back to Books
        </Link>
      </div>

      {/* MAIN CARD (NO ANIMATION HERE) */}
      <div className="max-w-6xl mx-auto bg-[#0A0A0A] rounded-2xl shadow-2xl border border-[#D4AF37]/30 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
          {/* LEFT IMAGE */}
         {/* LEFT IMAGE */}
<div className="flex items-center justify-center p-8 h-full">
  <motion.div
    initial={{ opacity: 0, scale: 0.96 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    className="relative w-64 h-96 overflow-hidden rounded-lg shadow-2xl"
  >
    {book.image ? (
      <img
        src={`${BASE_URL}/uploads/images/${book.image}`}
        alt={book.title}
        className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-110"
      />
    ) : (
      <div className="w-full h-full flex items-center justify-center bg-[#1F1F1F] text-gray-400">
        No Image
      </div>
    )}
  </motion.div>
</div>



          {/* RIGHT DETAILS */}
          <div className="p-10 lg:p-14 text-[#F9F6EF] flex flex-col">
            <h1 className="text-3xl font-bold">{book.title}</h1>
            <p className="text-gray-400 mb-2">by {book.author}</p>

            <p className="text-2xl font-bold text-[#D4AF37] mb-4">
              ₹{book.price}
            </p>

            {/* RATING */}
            <div className="flex items-center gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  size={18}
                  className="fill-[#F1C40F] text-[#F1C40F]"
                />
              ))}
              <span className="text-sm text-gray-500 ml-2">(128 reviews)</span>
            </div>

            <span className="text-[#F1C40F] font-semibold mb-4">
              Published: {book.year}
            </span>

            <p className="text-gray-300 leading-relaxed mb-8">
              {book.description}
            </p>

            {/* ACTIONS */}
            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              {/* QTY */}
              <div className="flex items-center bg-[#1A1A1A] rounded-lg border border-[#333]">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={decreaseQty}
                  className="px-4 py-3 text-gray-400 hover:text-white"
                >
                  <Minus size={18} />
                </motion.button>

                <span className="w-12 text-center font-bold">{qty}</span>

                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={increaseQty}
                  className="px-4 py-3 text-gray-400 hover:text-white"
                >
                  <Plus size={18} />
                </motion.button>
              </div>

              {/* ADD TO CART (ONLY FLOATING ELEMENT) */}
             <motion.button
  onClick={() => addToCart(book)}
  animate={{ y: [0, -4, 0] }}
  transition={{
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
 className="h-12 px-5 bg-[#D4AF37] text-[#0A0A0A] font-semibold text-base
           rounded-md hover:bg-[#F1C40F]
           shadow-[0_0_14px_rgba(212,175,55,0.35)]
           hover:shadow-[0_0_22px_rgba(212,175,55,0.5)]
           transition-colors flex items-center justify-center gap-2
           will-change-transform transform-gpu">
  <span className="inline-flex items-center gap-2 leading-tight whitespace-nowrap">
  Add to Cart
  <ShoppingCart size={22} />
</span>

</motion.button>

            </div>

            {/* TRUST */}
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-3">
                <Truck className="text-[#D4AF37]" size={20} />
                Fast delivery within 3 days
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-[#D4AF37]" size={20} />
                Secure payment gateway
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
