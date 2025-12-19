import React, { useEffect, useState } from "react";
import { BookOpen, ShoppingBag, Users, TrendingUp, ArrowUpRight } from "lucide-react";
import axios from "axios";

export default function AdminDashboard() {
  
  // Mock Data for the cards
  const VITE_BASE_URL=import.meta.env.VITE_BASE_URL;
  const [totalbook, setBooks] =useState(0);
  useEffect(()=>{
    axios.get(`${VITE_BASE_URL}/BookStoreAPI/books`)
    .then((res)=>{
      setBooks(res.data.length)

    })
   

  },[])


 return (
    <div className="space-y-8">
      
      <div>
        <h1 className="text-3xl font-bold text-slate-100">Dashboard Overview</h1>
        <p className="text-slate-400 mt-1">Welcome back, Admin!</p>
      </div>

      {/* TOTAL BOOKS CARD */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        <div className="p-6 rounded-xl bg-slate-800 border border-slate-700 shadow-xl">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-sm">Total Books</p>
              <h3 className="text-3xl font-bold text-slate-100 mt-2">
                {totalbook}
              </h3>
            </div>

            <div className="p-3 rounded-lg bg-blue-400/10 text-blue-400">
              <BookOpen size={24} />
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}