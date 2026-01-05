// src/layout/ClientLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./../components/Navbar";
import Footer from "./../components/Footer";
import { FaWhatsapp } from "react-icons/fa";

const ClientLayout = () => {
  return (
    <>
      <Navbar />

      <div className="pt-20">
        <Outlet />  
      </div>

      <Footer />

      <a
        href="https://wa.me/916375953416"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg z-50 transition-all duration-300"
      >
        <FaWhatsapp size={28} />
      </a>
    </>
  );
};

export default ClientLayout;
