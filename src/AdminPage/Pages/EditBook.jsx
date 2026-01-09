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
    year: "",
    price: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);

  // Fetch book
  useEffect(() => {
    axios
      .get(`${VITE_BASE_URL}/BookStoreAPI/books/${id}`)
      .then((res) => {
        setForm({
          title: res.data.title,
          author: res.data.author,
          year: res.data.year,
          price: res.data.price || "",
          image: null,
        });

        if (res.data.image) {
          setPreview(`${VITE_BASE_URL}/uploads/images/${res.data.image}`);
        }
      })
      .catch((err) => console.log("Error loading book:", err));
  }, [id]);

  // Handle input change
  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Image change
  const onImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  // Submit update
  const submit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("author", form.author);
      formData.append("year", form.year);
      formData.append("price", form.price);

      if (form.image) {
        formData.append("image", form.image);
      }

      await axios.put(
        `${VITE_BASE_URL}/BookStoreAPI/books/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

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
        {/* TITLE */}
        <input
          name="title"
          value={form.title}
          onChange={onChange}
          placeholder="Title"
          className="w-full p-3 bg-[#111] text-white border border-[#3D3D3D] rounded mb-4"
        />

        {/* AUTHOR */}
        <input
          name="author"
          value={form.author}
          onChange={onChange}
          placeholder="Author"
          className="w-full p-3 bg-[#111] text-white border border-[#3D3D3D] rounded mb-4"
        />

        {/* YEAR */}
        <input
          name="year"
          type="number"
          value={form.year}
          onChange={onChange}
          placeholder="Year"
          className="w-full p-3 bg-[#111] text-white border border-[#3D3D3D] rounded mb-4"
        />

        {/* PRICE */}
        <input
          name="price"
          type="number"
          value={form.price}
          onChange={onChange}
          placeholder="Price"
          className="w-full p-3 bg-[#111] text-white border border-[#3D3D3D] rounded mb-4"
        />

        {/* IMAGE PREVIEW */}
        {preview && (
          <div className="mb-4">
            <p className="text-sm text-gray-400 mb-2">Current Image</p>
            <img
              src={preview}
              alt="Preview"
              className="w-32 h-44 object-cover rounded border"
            />
          </div>
        )}

        {/* IMAGE INPUT */}
        <input
          type="file"
          accept="image/*"
          onChange={onImageChange}
          className="w-full p-2 text-white mb-4"
        />

        <button className="w-full py-3 bg-[#3D3D3D] text-white rounded hover:bg-[#555] transition">
          Save Changes
        </button>
      </form>
    </div>
  );
}
