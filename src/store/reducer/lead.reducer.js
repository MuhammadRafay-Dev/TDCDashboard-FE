import { createSlice } from "@reduxjs/toolkit";
import { addLeads } from "store/thunk/lead.thunk";
import { getLeads } from "store/thunk/lead.thunk";

const initialState = {
  data: {
    leads: null,
  },
  error: null,
  isLoading: false,
};

const leadSlice = createSlice({
  name: "lead",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get Leads
    builder
      .addCase(getLeads.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLeads.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.data.leads = payload;
      })
      .addCase(getLeads.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
    //   //Add departments
      builder.addCase(addLeads.pending, (state) => {
        state.isLoading = true;
      });
      builder.addCase(addLeads.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        // state.data.departments = payload;
      });
      builder.addCase(addLeads.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });

    // Delete Departments:
    //   builder
    //     .addCase(deleteDepartments.pending, (state) => {
    //       state.isLoading = true;
    //     })
    //     .addCase(deleteDepartments.fulfilled, (state, { payload }) => {
    //       state.isLoading = false;
    //       // state.data.departments = payload;
    //     })
    //     .addCase(deleteDepartments.rejected, (state, action) => {
    //       state.isLoading = false;
    //       state.error = action.error.message;
    //     });

    // Update Departments:
    //   builder
    //   .addCase(updateDepartments.pending, (state) => {
    //     state.isLoading = true;
    //   })
    //   .addCase(updateDepartments.fulfilled, (state, { payload }) => {
    //     state.isLoading = false;
    //     // state.data.departments = payload;
    //   })
    //   .addCase(updateDepartments.rejected, (state, action) => {
    //     state.isLoading = false;
    //     state.error = action.error.message;
    //   });
  },
});

export default leadSlice.reducer;