import React from "react";
import { Link } from "react-router-dom";
import logo from "./../assets/logo.png"

const Navbar = () => {
  return (
    <nav className="bg-blue-100 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center p-2">
        <div className="text-2xl font-bold ">
          <img src={logo} alt="CuraFlix Logo" className="h-[80px] inline-block mr-2" />
        </div>
        <ul className="flex space-x-6 text-gray-700 font-medium">
          <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
          <li><Link to="/about" className="hover:text-blue-600">About</Link></li>
          <li><Link to="/contact" className="hover:text-blue-600">Contact Us</Link></li>
          <li><Link to="/login" className="hover:text-blue-600">Login</Link></li>
          <li><Link to="/register" className="hover:text-blue-600">Register</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
