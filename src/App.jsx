
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClientLayout from "./client/layout/ClientLayout";
import AdminRoutes from "./routes/AdminRoutes";

import Home from "./client/pages/Home";
import About from "./client/pages/About";
import Contact from "./client/pages/Contact";
import Login from "./client/pages/Login";
import Register from "./client/pages/Register";
import Profile from "./client/pages/Profile";

function App() {
  return (
    <Router>
       <ToastContainer position="top-right" autoClose={2000} theme="light" />
      <Routes>
        {/* ================== CLIENT ROUTES ================== */}
        <Route element={<ClientLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* ================== ADMIN ROUTES ================== */}
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;
