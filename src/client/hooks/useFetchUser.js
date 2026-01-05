import { useState, useEffect } from "react";
import axios from "../../utils/axiosConfig";

const useFetchUser = (userId) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUser = async () => {
    if (!userId) return;

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("curaflix_token");

      const res = await axios.get(`/api/user/user-details/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserData(res.data.user);
    } catch (err) {
      console.error("Fetch User Error:", err);
      setError(err.response?.data?.message || "Failed to fetch user details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userId]);

  return {
    userData,
    loading,
    error,
    refetch: fetchUser,
  };
};

export default useFetchUser;
