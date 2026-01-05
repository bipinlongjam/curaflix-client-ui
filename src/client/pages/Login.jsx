import React, { useState } from "react";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";
import axios from "../../utils/axiosConfig";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    phone: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit login
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/user/login", {
        phone: formData.phone,
        password: formData.password,
      });

      // Save JWT
      localStorage.setItem("curaflix_token", res.data.token);

      // Store user in Redux and localStorage
      dispatch(setUser({ user: res.data.user, token: res.data.token }));
      localStorage.setItem("curaflix_user", JSON.stringify(res.data.user));

      Swal.fire({
        title: "Login Successful!",
        text: "Welcome back!",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/");
    } catch (err) {
      Swal.fire({
        title: "Login Failed",
        text: err.response?.data?.message || "Something went wrong",
        icon: "error",
      });
    }
  };

  return (
    <div className="pt-24 flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-96">
        <h2
          className="text-3xl font-bold text-center mb-6"
          style={{ color: "oklch(0.34 0.07 261.22)" }}
        >
          Login
        </h2>

        <form onSubmit={handleSubmit}>
          {/* PHONE INPUT */}
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded mb-4 
            focus:outline-none focus:ring-2 focus:ring-[oklch(0.34_0.07_261.22)]"
          />

          {/* PASSWORD INPUT + EYE ICON */}
          <div className="relative mb-6">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded
              focus:outline-none focus:ring-2 focus:ring-[oklch(0.34_0.07_261.22)]"
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 cursor-pointer text-gray-600"
            >
              {showPassword ? <FiEye size={22} /> : <FiEyeOff size={22} />}
            </span>
          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            className="text-white px-6 py-3 rounded-lg w-full 
            transition-all duration-300 hover:opacity-90"
            style={{ backgroundColor: "oklch(0.34 0.07 261.22)" }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
