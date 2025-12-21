import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Eye } from 'lucide-react';
import { Toast } from '../../utils/SweetAlert';
import axios from 'axios';

function FeaturedBooks() {

  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [books, setBooks] = useState([]);

  // FETCH BOOKS FROM BACKEND
useEffect(() => {
  axios
    .get(`${BASE_URL}/BookStoreAPI/books`)
    .then((res) => {
      setBooks(Array.isArray(res.data) ? res.data : []);
    })
    .catch(() => {
      Toast.fire({
        icon: "error",
        title: "Failed to load books",
      });
    });
}, [BASE_URL]);


  // ADD TO CART
  const addToCart = (e, book) => {
    e.preventDefault();

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find((item) => item._id === book._id);

    if (existingItem) {
      Toast.fire({
        icon: "info",
        title: "This book is already in your cart",
      });
      return;
    }

    cart.push({ ...book, qty: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("storage"));

    Toast.fire({
      icon: "success",
      title: `${book.title} added to cart!`,
    });
  };

  return (
    <div className="py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
{books.length === 0 && (
      <p className="text-center text-gray-400 col-span-full">
        No books available
      </p>
    )}
        {books.map((book) => (
          <div
            key={book._id}  
            className="group relative bg-[#121212] rounded-xl overflow-hidden border border-[#D4AF37]/20 hover:border-[#D4AF37] transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] hover:-translate-y-2 flex flex-col"
          >
            
            {/* BOOK COVER */}
            <Link to={`/books/${book._id}`} className="block h-64 w-full bg-[#1F1F1F] relative flex items-center justify-center">
              <div className="w-32 h-44 bg-gradient-to-r from-[#D4AF37]/80 to-[#B89628] rounded-r-md shadow-xl flex items-center justify-center">
                <span className="text-black font-bold text-center px-2 text-xs opacity-70">
                  {book.title}
                </span>
              </div>

              <div className="absolute top-4 right-4 bg-[#D4AF37] text-black text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100">
                {book.category}
              </div>
            </Link>

            {/* CONTENT */}
            <div className="p-6 flex flex-col flex-1">
              <Link to={`/books/${book._id}`}>
                <h3 className="text-xl font-bold text-[#F9F6EF] line-clamp-1">
                  {book.title}
                </h3>
                <p className="text-sm text-gray-400 mt-1">by {book.author}</p>
              </Link>

              <div className="mt-auto flex items-center justify-between">
                <p className="text-2xl font-bold text-[#D4AF37]">
                  ₹{book.price}
                </p>

                <div className="flex gap-2">
                  {/* VIEW DETAILS */}
                  <Link
                    to={`/books/${book._id}`}
                    className="p-2 rounded-full border border-[#D4AF37]/50 text-[#D4AF37]"
                  >
                    <Eye size={20} />
                  </Link>

                  {/* ADD TO CART */}
                  <button
                    onClick={(e) => addToCart(e, book)}
                    className="p-2 rounded-full bg-[#D4AF37] text-black"
                  >
                    <ShoppingCart size={20} />
                  </button>
                </div>
              </div>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

export default FeaturedBooks;
