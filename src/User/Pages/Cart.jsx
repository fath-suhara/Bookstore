import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Trash2,
  Minus,
  Plus,
  ArrowRight,
  ShoppingBag,
  ArrowLeft,
  ShieldCheck,
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

  // Calculations
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  const shipping = subtotal > 1000 ? 0 : 50;
  const total = subtotal + shipping;

  // EMPTY CART
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#FFF8E7] flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-[#D4AF37]/10 p-6 rounded-full mb-6">
          <ShoppingBag size={64} className="text-[#D4AF37]" />
        </div>
        <h2 className="text-3xl font-bold text-[#0A0A0A] mb-2">
          Your Cart is Empty
        </h2>
        <p className="text-gray-600 mb-8 max-w-md">
          Looks like you haven't added any books yet.
        </p>
        <Link
          to="/books"
          className="px-8 py-3 bg-[#D4AF37] text-[#0A0A0A] font-bold rounded-lg"
        >
          <ArrowLeft size={20} /> Browse Books
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF8E7] py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">
          Your Cart ({cart.length} items)
        </h1>

        {cart.map((item) => (
          <div
            key={item._id}
            className="flex justify-between bg-black p-5 mb-4 rounded"
          >
            <div>
              <h3 className="text-xl text-[#D4AF37]">{item.title}</h3>
              <p className="text-gray-400">{item.author}</p>
            </div>

            <div className="flex items-center gap-3">
              <button onClick={() => updateQty(item._id, item.qty - 1)}>
                <Minus />
              </button>
              <span>{item.qty}</span>
              <button onClick={() => updateQty(item._id, item.qty + 1)}>
                <Plus />
              </button>
              <p className="font-bold">₹{item.price * item.qty}</p>
              <button
  onClick={() => removeItem(item._id)}
  className="text-gray-500 hover:text-red-500 transition-colors"
  title="Remove item"
>
  <Trash2 size={20} />
</button>

            </div>
          </div>
        ))}

        <h2 className="text-2xl font-bold mt-6">Total: ₹{total}</h2>
      </div>
    </div>
  );
}
