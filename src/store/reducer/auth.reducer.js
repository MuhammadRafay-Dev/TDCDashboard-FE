// authReducer.js
import { createSlice } from "@reduxjs/toolkit";
import login from "store/thunk/auth.thunk";

const initialState = {
  user: {
    accesstoken: null,
    role: null,
    name: null,
  },
  isAuthenticated: false,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      // state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.user.accesstoken = action.payload?.accesstoken;
      state.user.name = action?.payload?.name;
      state.user.role = action?.payload?.role;
    });
  },
});

export default authSlice.reducer;

export const { setUser, clearUser } = authSlice.actions;
