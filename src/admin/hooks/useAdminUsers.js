import { useState, useEffect } from "react";
import axios from "./../../utils/axiosConfig";

const useAdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all website users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/admin/manage-users");
      setUsers(res.data.users || []);
    } catch (err) {
      console.error("ADMIN FETCH USERS ERROR:", err);
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  // Delete user
  const deleteUser = async (id) => {
    try {
      await axios.delete(`/api/admin/manage-users/${id}`);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      console.error("ADMIN DELETE USER ERROR:", err);
      setError("Failed to delete user");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, loading, error, deleteUser, fetchUsers };
};

export default useAdminUsers;
