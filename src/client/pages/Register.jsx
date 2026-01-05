import React, { useState } from "react";
import { useRegister } from "../hooks/useRegister";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Register = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const { registerUser, loading, message, setMessage } = useRegister();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [passwordError, setPasswordError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  /** 🔐 Password Validation **/
  const validatePassword = (password) => {
    if (password.length < 8) return "Password must be at least 8 characters";
    if (!/[A-Z]/.test(password)) return "Password must contain an uppercase letter";
    if (!/[!@#$%^&*(),.?\":{}|<>]/.test(password))
      return "Password must contain a special character";

    return ""; // Valid
  };

  /** 📱 Phone Validation (optional but recommended) **/
  const validatePhone = (phone) => {
    if (!/^[0-9]{10}$/.test(phone))
      return "Phone number must be 10 digits";

    return "";
  };

  /** Handle Input Change **/
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    // Clear Backend Message When Typing
    setMessage("");

    if (name === "password") {
      setPasswordError(validatePassword(value));
    }

    if (name === "phone") {
      setPhoneError(validatePhone(value));
    }
  };

  /** Handle Submit **/
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate Phone
    const phoneErr = validatePhone(formData.phone);
    if (phoneErr) {
      setPhoneError(phoneErr);
      return;
    }

    // Validate Password Format
    const passwordErr = validatePassword(formData.password);
    if (passwordErr) {
      setPasswordError(passwordErr);
      return;
    }

    // Confirm Password Check
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    const result = await registerUser(formData);

    if (result?.success) {
      setFormData({
        full_name: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });
      setPasswordError("");
      setPhoneError("");
    }
  };

  return (
    <div className="pt-24 flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-96">
        <h2
          className="text-3xl font-bold text-center mb-6"
          style={{ color: "oklch(0.34 0.07 261.22)" }}
        >
          Register
        </h2>

        {/* Backend Message */}
        {message && (
          <p className="text-center mb-4 text-green-500 font-medium">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <input
            type="text"
            name="full_name"
            placeholder="Full Name"
            value={formData.full_name}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded mb-4"
          />

          {/* Phone */}
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded mb-1"
          />

          {/* Phone Error */}
          {phoneError && (
            <p className="text-red-500 text-sm mb-4">{phoneError}</p>
          )}

          {/* Password */}
          <div className="relative mb-1">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded"
            />

            {/* Eye Icon */}
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 cursor-pointer text-gray-600"
            >
              {showPassword ? <FiEye size={22} /> : <FiEyeOff size={22} />}
            </span>
          </div>

          {/* Password Error */}
          {passwordError && (
            <p className="text-red-500 text-sm mb-4">{passwordError}</p>
          )}

          {/* Confirm Password */}
          <div className="relative mb-6">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded"
            />

            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-3 cursor-pointer text-gray-600"
            >
              {showConfirmPassword ? <FiEye size={22} /> : <FiEyeOff size={22} />}
            </span>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="text-white px-6 py-3 rounded-lg w-full transition-all hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: "oklch(0.34 0.07 261.22)" }}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
