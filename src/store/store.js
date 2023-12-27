import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducer/auth.reducer"; // Import your auth reducer
import departmentReducer from "./reducer/department.reducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    department: departmentReducer,
  },
});

export default store;
