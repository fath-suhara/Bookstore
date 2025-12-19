import React from "react";

export default function Contact() {
  return (
    <div className="max-w-3xl mx-auto p-10 min-h-screen bg-[#FFF8E7]">

      {/* Title */}
      <h2 className="text-3xl font-bold mb-6 text-[#D4AF37]">
        Contact Us
      </h2>

      {/* Contact Card */}
      <div className="bg-[#0A0A0A] text-[#F9F6EF] p-8 rounded-xl shadow-xl border border-[#D4AF37]">
        <p className="mb-4 text-lg">
          Email: <span className="text-[#F1C40F]">support@readstack.com</span>
        </p>

        <p className="text-lg">
          Phone: <span className="text-[#F1C40F]">+91 90000 12345</span>
        </p>
      </div>

      {/* Button */}
      <div className="mt-10 text-center">
        <button className="px-8 py-3 bg-[#D4AF37] text-[#0A0A0A] font-bold rounded-lg shadow-md hover:bg-[#F1C40F] transition-all">
          Send Message
        </button>
      </div>

    </div>
  );
}
