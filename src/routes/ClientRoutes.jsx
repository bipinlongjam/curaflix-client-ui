import React from "react";
import { Route, Routes } from "react-router-dom";
import ClientLayout from "./../client/layout/ClientLayout";

import Home from "./../client/pages/Home";
import About from "./../client/pages/About";
import Contact from "./../client/pages/Contact";
import Login from "./../client/pages/Login";
import Register from "./../client/pages/Register";
import Profile from "./../client/pages/Profile";

const ClientRoutes = () => {
  return (
    <Route element={<ClientLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
    </Route>
  );
};

export default ClientRoutes;
