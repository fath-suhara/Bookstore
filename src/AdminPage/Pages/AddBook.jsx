import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Book, User, Calendar, Save, X } from "lucide-react";
import axios from "axios";

export default function AddBook() {
  const navigate = useNavigate();
  const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

  const [form, setForm] = useState({
    title: "",
    author: "",
    year: "",
  });

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${VITE_BASE_URL}/BookStoreAPI/books`, {
        title: form.title,
        author: form.author,
        year: Number(form.year)
      });

      navigate("/admin/books");
    } catch (error) {
      console.log("error in add book", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-100">Add New Book</h1>
        <p className="text-slate-400 mt-2">Fill the form to add a new book.</p>
      </div>

      {/* FORM */}
      <form
        className="bg-slate-800 p-8 rounded-xl border border-slate-700 shadow-xl"
        onSubmit={submit}
      >
        <div className="space-y-6">

          {/* TITLE */}
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">
              Book Title
            </label>
            <div className="relative">
              <Book className="absolute left-3 top-3 text-slate-500 h-5 w-5" />
              <input
                name="title"
                onChange={onChange}
                className="w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-lg pl-10 p-3"
                placeholder="e.g. The Great Gatsby"
                required
              />
            </div>
          </div>

          {/* AUTHOR */}
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">
              Author
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-slate-500 h-5 w-5" />
              <input
                name="author"
                onChange={onChange}
                className="w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-lg pl-10 p-3"
                placeholder="e.g. F. Scott Fitzgerald"
                required
              />
            </div>
          </div>

          {/* YEAR */}
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">
              Publication Year
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 text-slate-500 h-5 w-5" />
              <input
                name="year"
                type="number"
                onChange={onChange}
                className="w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-lg pl-10 p-3"
                placeholder="e.g. 2021"
                required
              />
            </div>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex items-center gap-4 mt-8 pt-6 border-t border-slate-700">
          <button
            type="button"
            onClick={() => navigate("/admin/books")}
            className="flex-1 px-5 py-3 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg flex items-center justify-center gap-2"
          >
            <X size={18} /> Cancel
          </button>

          <button
            type="submit"
            className="flex-1 px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg flex items-center justify-center gap-2"
          >
            <Save size={18} /> Save Book
          </button>
        </div>
      </form>
    </div>
  );
}
