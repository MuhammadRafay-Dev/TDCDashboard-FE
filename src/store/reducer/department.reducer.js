// authReducer.js
import { createSlice } from "@reduxjs/toolkit";
import {
  addDepartments,
  getDepartments,
  deleteDepartments,
  updateDepartments
} from "store/thunk/department.thunk";

const initialState = {
  data: {
    departments: null,
  },
  error: null,
  isLoading: false,
};

const departmentSlice = createSlice({
  name: "department",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //Add departments
    builder.addCase(addDepartments.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addDepartments.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      // state.data.departments = payload;
    });
    builder.addCase(addDepartments.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    // Get Departments
    builder
      .addCase(getDepartments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDepartments.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.data.departments = payload;
      })
      .addCase(getDepartments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });

    // Delete Departments:
    builder
      .addCase(deleteDepartments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteDepartments.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        // state.data.departments = payload;
      })
      .addCase(deleteDepartments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });

       // Update Departments:
    builder
    .addCase(updateDepartments.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(updateDepartments.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      // state.data.departments = payload;
    })
    .addCase(updateDepartments.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default departmentSlice.reducer;
