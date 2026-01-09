import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Eye } from 'lucide-react';
import { Toast } from '../../utils/SweetAlert';
import { motion } from 'framer-motion';
import axios from 'axios';

function FeaturedBooks() {

  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [books, setBooks] = useState([]);
  const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
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
<motion.div
  variants={containerVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
>
{books.length === 0 && (
      <p className="text-center text-gray-400 col-span-full">
        No books available
      </p>
    )}
        {books.map((book) => (
 <motion.div
  key={book._id}
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  whileHover={{ y: -6 }}
  transition={{ type: "spring", stiffness: 120, damping: 18 }}
  className="group relative bg-[#121212] rounded-xl overflow-hidden
             border border-[#D4AF37]/20 hover:border-[#D4AF37]
             transition-colors duration-300
             hover:shadow-[0_10px_30px_rgba(212,175,55,0.15)]
             flex flex-col"
>

            
            {/* BOOK COVER */}
                    <Link
  to={`/books/${book._id}`}>
          <div className="h-80 w-full bg-[#1F1F1F] relative overflow-hidden flex items-center justify-center group-hover:bg-[#252525] transition-colors">
<div className="aspect-[2/3] w-full overflow-hidden rounded-xl bg-neutral-900 flex items-center justify-center">
  {book.image ? (
   <img
    src={`${BASE_URL}/uploads/images/${book.image}`}
    alt={book.title}
    className="max-w-full max-h-70 object-cover transition-transform duration-300 group-hover:scale-105"
  />

  ) : (
    <span className="text-gray-400 text-sm">No Image</span>
  )}
</div>
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

              <div className="mt-auto flex justify-end">
             
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
          </motion.div>
        ))}

      </motion.div>
    </div>
  );
}

export default FeaturedBooks;
