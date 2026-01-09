import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Pencil, Trash2, Search, BookOpen } from "lucide-react";
import axios from "axios";

export default function BookManagement() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const VITE_BASE_URL= import.meta.env.VITE_BASE_URL;


  // Load books
  useEffect(() => {
    
     axios.get(`${VITE_BASE_URL}/BookStoreAPI/books`)
     .then((response)=>{response.data, setBooks(response.data)}
    )
    
    
   .catch((error)=>{
    console.log("error in view books");

   })
    
   
  }, []);



  const deleteBook = (id) => {
     axios.delete(`${VITE_BASE_URL}/BookStoreAPI/books/${id}`)
     .then(()=>{
      console.log("deleted successfully");
      setBooks(prev => prev.filter(book => book._id !== id));

      
     })
  };

  // Filter logic
  const filteredBooks = books.filter(b => 
    b.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    b.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-100">Manage Books</h1>
          <p className="text-slate-400 text-sm mt-1">View and edit your entire catalog</p>
        </div>

        <Link
          to="/admin/books/add"
          className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium shadow-lg shadow-indigo-500/20 transition-all transform hover:-translate-y-0.5"
        >
          <Plus size={20} />
          Add New Book
        </Link>
      </div>

      {/* --- SEARCH BAR --- */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-3 text-slate-500" size={18} />
        <input 
          type="text"
          placeholder="Search by title or author..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 text-slate-200 pl-10 pr-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-slate-500"
        />
      </div>

      {/* --- TABLE CARD --- */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden shadow-xl">
        <table className="w-full text-left border-collapse">
          
          {/* Table Head */}
          <thead className="bg-slate-900/50 text-slate-400 uppercase text-xs font-semibold tracking-wider">
            <tr>
              <th className="p-4 border-b border-slate-700">Book Details</th>
              <th className="p-4 border-b border-slate-700">Price</th>
              <th className="p-4 border-b border-slate-700 text-center">Status</th>
              <th className="p-4 border-b border-slate-700 text-right">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-slate-700">
            {filteredBooks.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-10 text-center">
                  <div className="flex flex-col items-center justify-center text-slate-500">
                    <BookOpen size={48} strokeWidth={1} className="mb-2 opacity-50" />
                    <p>No books found matching your criteria.</p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredBooks.map((b) => (
                <tr key={b.id} className="hover:bg-slate-700/30 transition-colors group">
                  
                  {/* Title & Author */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {/* Placeholder Cover */}
<img
  src={`${VITE_BASE_URL}/uploads/images/${b.image}`}
  alt={b.title}
  className="w-10 h-14 object-cover rounded shadow-sm"
/>
                      <div>
                        <div className="font-semibold text-slate-100">{b.title}</div>
                        <div className="text-sm text-slate-400">{b.author}</div>
                      </div>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="p-4 text-emerald-400 font-medium">
                    ₹{b.price}
                  </td>

                  {/* Status (Mock) */}
                  <td className="p-4 text-center">
                    <span className="bg-emerald-500/10 text-emerald-400 text-xs px-2 py-1 rounded-full border border-emerald-500/20">
                      Active
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-3">
                      <button
                        onClick={() => navigate(`/admin/books/edit/${b._id}`)}
                        className="p-2 text-indigo-400 hover:text-white hover:bg-indigo-600 rounded-md transition-all"
                        title="Edit"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => deleteBook(b._id)}
                        className="p-2 text-rose-400 hover:text-white hover:bg-rose-600 rounded-md transition-all"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>

                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}