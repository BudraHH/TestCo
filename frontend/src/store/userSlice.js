import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // Ensure the user is uninitialized before sign-in
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      const { email, role, accessToken } = action.payload; // Expect both `email`, `role`, and `token` in payload
      state.user = { email, role, accessToken }; // Update user state with provided email, role, and token
      localStorage.setItem("user", JSON.stringify(state.user)); // Persist updated user details to localStorage
      console.log("User details set in Redux: ", state.user); // Log the updated user state (optional)
    },
    clearUserDetails: (state) => {
      state.user = null; // Clear user details in state
      localStorage.removeItem("user"); // Remove from localStorage
    },
  },
});

export const { setUserDetails, clearUserDetails } = userSlice.actions;
export default userSlice.reducer;
