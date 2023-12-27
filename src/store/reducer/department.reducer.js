// authReducer.js
import { createSlice } from "@reduxjs/toolkit";
import addDepartments from "store/thunk/department.thunk";

const initialState = {
  data: {
    name: null,
    departmentHead: null,
    isSuccess:null
  },
};

const departmentSlice = createSlice({
  name: "department",
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
    //Add Employee
    builder.addCase(addDepartments.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(addDepartments.fulfilled, (state, action) => {
      state.loading = false;
      state.data = [];
      state.isSuccess = action.payload;
    });
    builder.addCase(addDepartments.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
    });
  },
});

export default departmentSlice.reducer;
