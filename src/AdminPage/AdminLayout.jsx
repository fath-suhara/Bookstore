import { Outlet } from "react-router-dom";
import AdminSidebar from "./Components/AdminSidebar";

export default function AdminLayout() {
  return (
    /* 
       1. MAIN CONTAINER 
       - h-screen & overflow-hidden: Prevents the whole page from scrolling.
       - flex: Puts Sidebar and Content side-by-side.
       - bg-cover: Ensures image covers the screen.
    */
    <div className="flex h-screen w-full overflow-hidden bg-[url('../../public/images/admin-bg.jpg')] bg-cover bg-center bg-no-repeat">

      {/* 
         2. SIDEBAR
         - We render it directly. It handles its own width (w-64) and background.
         - No extra <div> wrapper needed here.
      */}
      <AdminSidebar />

      {/* 
         3. MAIN CONTENT AREA
         - flex-1: Takes up all remaining width.
         - overflow-y-auto: Allows ONLY this part to scroll (sidebar stays fixed).
         - bg-black/80: Dark overlay so text is readable on top of the image.
         - backdrop-blur-sm: Optional subtle blur for a premium look.
      */}
      <div className="flex-1 overflow-y-auto bg-black/85 backdrop-blur-sm p-10 text-slate-100">
        <Outlet />
      </div>

    </div>
  );
}