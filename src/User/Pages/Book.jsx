import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart, ArrowRight, BookOpen } from "lucide-react";
import { Toast } from "../../utils/SweetAlert";
import axios from "axios";


export default function Books() {
  // --- STATE FOR FILTERING ---
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");


const BASE_URL = import.meta.env.VITE_BASE_URL;

const [books, setBooks] = useState([]);

useEffect(() => {
  axios.get(`${BASE_URL}/BookStoreApi/books`)
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


  // --- ADD TO CART LOGIC ---
  const addToCart = (book) => {
    // 1. Get existing cart
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // 2. Check if item exists
const existingItem = cart.find((item) => item._id === book._id);

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
cart.push({
  _id: book._id,
  title: book.title,
  author: book.author,
  image: book.image,
  price: Number(book.price),
  qty: 1,
});


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

  // --- FILTERING LOGIC ---
const categories = ["All"];


const filteredBooks = books.filter((book) => {
  const matchesSearch =
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase());

  // if user is typing → search mode
  if (searchTerm.trim() !== "") {
    return matchesSearch;
  }

  // default: show all
  return selectedCategory === "All";
});






  return (
    <div className="min-h-screen bg-[#FFF8E7] text-[#0A0A0A] font-sans mt-20">
      
      {/* --- HERO HEADER --- */}
      <div className="bg-[#0A0A0A] py-16 px-6 text-center border-b-4 border-[#D4AF37] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#D4AF37]/10 to-transparent pointer-events-none"></div>
        <h1 className="text-4xl md:text-5xl font-bold text-[#D4AF37] mb-4 relative z-10">
          The Collection
        </h1>
        <p className="text-[#F9F6EF] max-w-2xl mx-auto text-lg font-light relative z-10">
          Explore our curated library of knowledge, adventure, and inspiration.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* --- CONTROLS SECTION --- */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          
          {/* Search Bar */}
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-4 top-3.5 text-[#D4AF37] group-focus-within:text-black transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search by title or author..." 
              value={searchTerm}
  onChange={(e) => {
    setSearchTerm(e.target.value);
    if (e.target.value !== "") {
      setSelectedCategory(""); // disable "All"
    }
  }}              className="w-full bg-white border-2 border-[#D4AF37]/30 text-black pl-12 pr-4 py-3 rounded-full focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all placeholder-gray-400 shadow-sm"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 pb-2 md:pb-0 w-full md:w-auto">
  <button
    onClick={() => {
      setSelectedCategory("All");
      setSearchTerm("");
    }}
    className={`px-4 py-2 rounded transition 
      ${
      selectedCategory === "All" && searchTerm === ""
        ? "bg-[#D4AF37] text-black"
        : "bg-[#1f1f1f] text-white hover:bg-[#2a2a2a]"
    }
    ${searchTerm !== "" ? "opacity-70" : ""}
  `}
  >
    All
  </button>
</div>

        </div>

        {/* --- BOOKS GRID --- */}
        {filteredBooks.length === 0 ? (
          <div className="text-center py-20 text-gray-500 flex flex-col items-center">
            <BookOpen size={48} className="text-[#D4AF37] opacity-50 mb-4" />
            <p className="text-xl font-medium">No books found.</p>
            <button 
              onClick={() => {setSearchTerm(""); setSelectedCategory("All");}}
              className="mt-4 text-[#D4AF37] underline hover:text-black transition-colors"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredBooks.map((book) => (
              <div
                key={book._id}
                className="group relative bg-[#121212] rounded-xl overflow-hidden border border-[#D4AF37]/20 hover:border-[#D4AF37] transition-all duration-300 hover:shadow-[0_10px_30px_rgba(212,175,55,0.15)] hover:-translate-y-2 flex flex-col"
              >
                
                {/* Book Cover Placeholder */}
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

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-[#F9F6EF] line-clamp-1 group-hover:text-[#D4AF37] transition-colors">
                      {book.title}
                    </h3>
<p className="text-xs text-gray-500">
  {book.author} • {book.year}
</p>
                  </div>

                  <div className="mt-auto flex items-center justify-between">
<span className="text-[#D4AF37] text-sm font-semibold">
  ₹{book.price}
</span>
                    
                    {/* ADD TO CART BUTTON */}
                    <button 
                      onClick={() => addToCart(book)} 
                      className="p-2 bg-[#D4AF37]/10 text-[#D4AF37] rounded-full hover:bg-[#D4AF37] hover:text-black transition-all active:scale-90"
                      title="Add to Cart"
                    >
                      <ShoppingCart size={18} />
                    </button>
                  </div>

                  <Link
                    to={`/books/${book._id}`}
                    className="mt-5 w-full py-2.5 flex items-center justify-center gap-2 border border-[#D4AF37] text-[#D4AF37] rounded-lg font-semibold text-sm hover:bg-[#D4AF37] hover:text-black transition-all group/btn"
                  >
                    View Details 
                    <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}