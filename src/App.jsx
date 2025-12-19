import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./User/Pages/Home.jsx";
import Categories from "./User/Pages/Categories.jsx";
import Contact from "./User/Pages/Contact.jsx";
import Books from "./User/Pages/Book.jsx";
import BookDetails from "./User/Components/BookDetails.jsx";
import Cart from "./User/Pages/Cart.jsx";

import BookManagement from "./AdminPage/Pages/BookManagement.jsx";
import AdminDashboard from "./AdminPage/Pages/AdminDashboard.jsx";
import EditBook from "./AdminPage/Pages/EditBook.jsx";
import AddBook from "./AdminPage/Pages/AddBook.jsx";

import UserLayout from "./User/UserLayout.jsx";
import AdminLayout from "./AdminPage/AdminLayout.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* USER ROUTES */}
        <Route path="/" element={<UserLayout><Home /></UserLayout>} />

        <Route path="/categories" element={<UserLayout><Categories /></UserLayout>} />

        <Route path="/books" element={<UserLayout><Books /></UserLayout>} />

        <Route path="/books/:id" element={<UserLayout><BookDetails /></UserLayout>} />

        <Route path="/contact" element={<UserLayout><Contact /></UserLayout>} />

        <Route path="/cart" element={<UserLayout><Cart /></UserLayout>} />

        {/* ADMIN ROUTES */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="books" element={<BookManagement />} />
          <Route path="books/add" element={<AddBook />} />
          <Route path="books/edit/:id" element={<EditBook />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}
