import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducer/auth.reducer"; // Import your auth reducer

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
