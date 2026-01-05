import { createSlice } from "@reduxjs/toolkit";

const savedAdmin = localStorage.getItem("curaflix_admin")
  ? JSON.parse(localStorage.getItem("curaflix_admin"))
  : null;

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    admin: savedAdmin, // Load from localStorage
  },
  reducers: {
    setAdmin: (state, action) => {
      state.admin = action.payload;
      localStorage.setItem("curaflix_admin", JSON.stringify(action.payload));
    },
    logoutAdmin: (state) => {
      state.admin = null;
      localStorage.removeItem("curaflix_admin");
    },
  },
});

export const { setAdmin, logoutAdmin } = adminSlice.actions;
export default adminSlice.reducer;
