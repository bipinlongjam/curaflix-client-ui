import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutAdmin } from "../../redux/adminSlice";
import { useNavigate } from "react-router-dom";

import { Box, IconButton, Avatar, Menu, MenuItem, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const AdminTopbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const admin = useSelector((state) => state.admin.admin);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  const handleLogout = () => {
    dispatch(logoutAdmin());
    handleCloseMenu();
    navigate("/admin/login");
  };

  return (
    <Box className="flex justify-between items-center w-full h-16 shadow px-4 bg-white fixed top-0 z-50">

      <Typography variant="h6" fontWeight="bold">
        Curaflix Admin Dashboard
      </Typography>

      {/* USER ICON + MENU */}
      <IconButton onClick={handleOpenMenu}>
        <Avatar>
          <AccountCircleIcon />
        </Avatar>
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleCloseMenu}>
        <MenuItem disabled>
          Logged in as: <b className="ml-1">{admin?.name}</b>
        </MenuItem>

        <MenuItem onClick={handleLogout}>
          <b>Logout</b>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default AdminTopbar;
