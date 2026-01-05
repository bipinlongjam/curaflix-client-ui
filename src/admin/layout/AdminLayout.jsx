
import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import AdminSidebar from "../components/AdminSidebar";
import AdminTopbar from "../components/AdminTopbar";

const AdminLayout = () => {
  return (
    <Box sx={{ display: "flex" }}>

      {/* Top Navigation */}
      <AdminTopbar />

      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: "64px",   // Only top space for topbar
        }}
      >
        <Outlet />
      </Box>

    </Box>
  );
};

export default AdminLayout;
