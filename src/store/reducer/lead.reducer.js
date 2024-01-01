import { createSlice } from "@reduxjs/toolkit";
import {
  getLeads,
  addLeads,
  deleteLeads,
  updateLeads,
} from "store/thunk/lead.thunk";

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
    //   //Add Leads
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

    // Delete Leads:
    builder
      .addCase(deleteLeads.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteLeads.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        // state.data.departments = payload;
      })
      .addCase(deleteLeads.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });

    // Update Leads:
    builder
      .addCase(updateLeads.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateLeads.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        // state.data.departments = payload;
      })
      .addCase(updateLeads.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default leadSlice.reducer;
