import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Book, PlusCircle, Settings, LogOut } from "lucide-react";

export default function AdminSidebar() {
  const location = useLocation();

  // Helper function to determine if a link is active
  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { path: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/admin/books", label: "Books", icon: Book },
    { path: "/admin/books/add", label: "Add Book", icon: PlusCircle },
  ];

  return (
    <aside className="w-64 h-screen bg-slate-800 border-r border-slate-700 flex flex-col transition-all duration-300">
      
      {/* --- LOGO --- */}
      <div className="p-6 border-b border-slate-700 flex items-center gap-3">
        <div className="p-2 bg-indigo-600 rounded-lg">
          <Book className="text-white w-5 h-5" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-100 tracking-wide">
            BookStore
          </h1>
          <p className="text-xs text-slate-500 font-medium">Admin Panel</p>
        </div>
      </div>

      {/* --- NAVIGATION --- */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
              isActive(item.path)
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                : "text-slate-400 hover:bg-slate-700 hover:text-slate-100"
            }`}
          >
            <item.icon size={20} />
            {item.label}
          </Link>
        ))}
      </nav>

      {/* --- BOTTOM SECTION (Settings/Logout) --- */}
      <div className="p-4 border-t border-slate-700 space-y-2">
        <Link
          to="/admin/settings"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-700 hover:text-slate-100 transition-all"
        >
          <Settings size={20} />
          Settings
        </Link>
        
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-rose-400 hover:bg-rose-500/10 transition-all">
          <LogOut size={20} />
          Logout
        </button>
      </div>

    </aside>
  );
}