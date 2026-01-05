import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  IconButton,
  InputAdornment,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const AdminRegister = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // ================================
  // SEND OTP
  // ================================
  const handleSendOtp = async () => {
    setErrorMsg("");
    setSuccessMsg("");

    try {
      await axios.post("http://localhost:5000/api/admin/otp/send-otp", {
        email: form.email,
      });

      setOtpSent(true);
      setSuccessMsg("OTP sent to email!");
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Failed to send OTP");
    }
  };

  // ================================
  // VERIFY OTP
  // ================================
  const handleVerifyOtp = async () => {
    setErrorMsg("");
    setSuccessMsg("");

    try {
      await axios.post("http://localhost:5000/api/admin/otp/verify", {
        name: form.name,
        email: form.email,
        password: form.password,
        otp,
      });

      setOtpVerified(true);
      setSuccessMsg("OTP Verified! You can now register.");
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Invalid OTP");
    }
  };

  // ================================
  // FINAL REGISTER
  // ================================
  const handleRegister = async (e) => {
    e.preventDefault();

    if (!otpVerified) {
      return setErrorMsg("Please verify OTP before creating account.");
    }

    setSuccessMsg("Admin Registered Successfully!");
    setTimeout(() => (window.location.href = "/admin/login"), 1500);
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
          Create Admin
        </Typography>

        {errorMsg && (
          <Typography color="error" mb={2} textAlign="center">
            {errorMsg}
          </Typography>
        )}

        {successMsg && (
          <Typography color="green" mb={2} textAlign="center">
            {successMsg}
          </Typography>
        )}

        <form onSubmit={handleRegister}>
          <TextField
            fullWidth
            label="Full Name"
            margin="normal"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <TextField
            fullWidth
            label="Email"
            margin="normal"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          {/* PASSWORD WITH EYE ICON */}
          <TextField
            fullWidth
            label="Password"
            margin="normal"
            required
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* SEND OTP BUTTON */}
          <Button
            fullWidth
            variant="outlined"
            sx={{ mt: 2 }}
            onClick={handleSendOtp}
            disabled={otpSent}
          >
            {otpSent ? "OTP Sent" : "Send OTP"}
          </Button>

          {/* OTP INPUT */}
          {otpSent && (
            <>
              <TextField
                fullWidth
                label="Enter OTP"
                margin="normal"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />

              <Button
                fullWidth
                variant="contained"
                sx={{ bgcolor: "#90caf9" }}
                onClick={handleVerifyOtp}
              >
                Verify OTP
              </Button>
            </>
          )}

          {/* FINAL REGISTER */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              bgcolor: otpVerified ? "#4caf50" : "#c8c8c8",
              cursor: otpVerified ? "pointer" : "not-allowed",
            }}
            disabled={!otpVerified}
          >
            Register Admin
          </Button>

          <Button
            fullWidth
            variant="text"
            sx={{ mt: 1 }}
            onClick={() => (window.location.href = "/admin/login")}
          >
            Already have an account? Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default AdminRegister;
