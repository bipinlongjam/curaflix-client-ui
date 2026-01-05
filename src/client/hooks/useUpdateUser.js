import { useState } from "react";
import axios from "../../utils/axiosConfig";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";

const useUpdateUser = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const updateUser = async (
    userId,
    updatedData,
    selectedPhotoFile,
    currentUser
  ) => {
    try {
      setLoading(true);

      const formData = new FormData();

      Object.entries(updatedData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      if (selectedPhotoFile) {
        formData.append("photo", selectedPhotoFile);
      }

      const res = await axios.put(`/api/user/update/${userId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("curaflix_token")}`,
        },
      });
      // Prepare updated Redux data
      const finalUser = {
        ...currentUser,
        ...updatedData,
        photo: res.data.updatedPhoto || currentUser.photo,
      };

      dispatch(setUser(finalUser));

      setLoading(false);
      return { success: true, data: res.data };
    } catch (error) {
      console.error("USER UPDATE ERROR:", error);
      setLoading(false);
      return { success: false, error };
    }
  };

  return { updateUser, loading };
};

export default useUpdateUser;
