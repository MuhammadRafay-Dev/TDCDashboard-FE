// authReducer.js
import { createSlice } from "@reduxjs/toolkit";
import fetchUserById from "store/thunk/auth.thunk";

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    // this is an action
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      // Add user to the state array
      //state.entities.push(action.payload);
      state.isAuthenticated = true
    });
    builder.addCase(fetchUserById.pending, (state, action) => {
      // show loading state
      // Add user to the state array
      //   state.entities.push(action.payload);
      state.loading = true;
    });
  },
});

// export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
