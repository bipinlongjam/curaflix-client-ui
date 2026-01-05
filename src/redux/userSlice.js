
import { createSlice } from "@reduxjs/toolkit";

// Safe JSON parser to prevent crashes
const safeJSONParse = (value) => {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
};

const savedUser = safeJSONParse(localStorage.getItem("curaflix_user"));

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: savedUser, 
  },
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;

      if (!user) return; 

      state.user = user;

      // Save user safely
      localStorage.setItem("curaflix_user", JSON.stringify(user));

      // Save token if exists
      if (token) {
        localStorage.setItem("curaflix_token", token);
      }
    },

    logoutUser: (state) => {
      state.user = null;

      localStorage.removeItem("curaflix_user");
      localStorage.removeItem("curaflix_token");
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
