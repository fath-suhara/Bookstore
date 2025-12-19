import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

  const [form, setForm] = useState({
    title: "",
    author: "",
    year: ""
  });

  // Fetch book by ID
  useEffect(() => {
    axios
      .get(`${VITE_BASE_URL}/BookStoreAPI/books/${id}`)
      .then((res) => setForm(res.data))
      .catch((err) => console.log("Error loading book:", err));
  }, [id]);

  // Handle input changes
  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Update book
  const submit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`${VITE_BASE_URL}/BookStoreAPI/books/${id}`, form);
      navigate("/admin/books");
    } catch (error) {
      console.log("Error updating book:", error);
    }
  };

  return (
    <div className="text-[#E5E5E5]">
      <h1 className="text-3xl font-bold mb-6">Edit Book</h1>

      <form
        className="bg-[#1A1A1A]/80 p-6 rounded-lg border border-[#3D3D3D] shadow-lg max-w-xl"
        onSubmit={submit}
      >
        <input
          name="title"
          value={form.title}
          onChange={onChange}
          placeholder="Title"
          className="w-full p-3 bg-[#111] text-white border border-[#3D3D3D] rounded mb-4"
        />

        <input
          name="author"
          value={form.author}
          onChange={onChange}
          placeholder="Author"
          className="w-full p-3 bg-[#111] text-white border border-[#3D3D3D] rounded mb-4"
        />

        <input
          name="year"
          type="number"
          value={form.year}
          onChange={onChange}
          placeholder="Year"
          className="w-full p-3 bg-[#111] text-white border border-[#3D3D3D] rounded mb-4"
        />

        <button className="w-full py-3 bg-[#3D3D3D] text-white rounded hover:bg-[#555] transition">
          Save Changes
        </button>
      </form>
    </div>
  );
}
