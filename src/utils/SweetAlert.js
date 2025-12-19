import Swal from "sweetalert2";

// --- 1. THE TOAST (Top Right Notification) ---
export const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  
  // Theme Colors
  background: "#0A0A0A",
  color: "#F9F6EF",
  iconColor: "#D4AF37", // Makes the checkmark/icon Gold
  
  // Custom Tailwind Classes for Border & Glow
  customClass: {
    popup: "border border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.2)] rounded-xl"
  },
  
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});

// --- 2. THE MODAL (Center Alert for Delete/Confirm) ---
export const ConfirmAlert = Swal.mixin({
  background: "#0A0A0A",
  color: "#F9F6EF",
  iconColor: "#D4AF37",
  
  // Button Colors
  confirmButtonColor: "#D4AF37", // Gold
  cancelButtonColor: "#333333",  // Dark Grey
  
  // Button Text Styling
  customClass: {
    popup: "border border-[#D4AF37] rounded-xl shadow-2xl",
    confirmButton: "font-bold text-black px-6 py-2 rounded-lg hover:bg-[#F1C40F]",
    cancelButton: "text-white px-6 py-2 rounded-lg hover:bg-gray-700"
  }
});