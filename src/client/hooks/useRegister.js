import { useState } from "react";
import axios from "../../utils/axiosConfig"

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const registerUser = async (formData) => {
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post("/api/user/register", {
        full_name: formData.full_name,
        phone: formData.phone,
        password: formData.password,
      });

      setMessage(res.data.message);
      return { success: true, message: res.data.message };
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Registration failed";
      setMessage(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return { registerUser, loading, message, setMessage };
};
