import React from "react";

export default function Categories() {
  const list = ["Fiction", "Non-fiction", "Self Help", "Design", "Programming"];

  return (
    <div className="max-w-4xl mx-auto p-10 min-h-screen bg-[#FFF8E7]">

      {/* Title */}
      <h2 className="text-3xl font-bold mb-6 text-[#D4AF37]">
        Categories
      </h2>

      {/* Category Cards */}
      <ul className="grid grid-cols-2 sm:grid-cols-3 gap-6">
        {list.map((c) => (
          <li
            key={c}
            className="p-6 bg-[#0A0A0A] text-[#F9F6EF] rounded-xl shadow-lg border border-[#D4AF37] text-lg text-center hover:bg-[#1A1A1A] transition-all"
          >
            {c}
          </li>
        ))}
      </ul>
    </div>
  );
}
