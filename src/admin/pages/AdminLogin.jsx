import React, { useState } from "react";
import axios from "axios";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";

const AdminLogin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const res = await axios.post("http://localhost:5000/api/admin/login", form);

      localStorage.setItem("curaflix_admin", JSON.stringify(res.data));

      window.location.href = "/admin";
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#e9f0ff",
      }}
    >
      <Paper elevation={4} sx={{ p: 4, width: 380, borderRadius: 3 }}>
        <Typography variant="h5" mb={2} textAlign="center">
          Admin Login
        </Typography>

        {errorMsg && (
          <Typography color="error" mb={2} textAlign="center">
            {errorMsg}
          </Typography>
        )}

        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <TextField
            fullWidth
            type="password"
            label="Password"
            margin="normal"
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, bgcolor: "#bfd9f3ff" }}
          >
            Login
          </Button>

          <Button
            fullWidth
            variant="text"
            sx={{ mt: 1 }}
            onClick={() => (window.location.href = "/admin/register")}
          >
            Create Admin Account
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default AdminLogin;
