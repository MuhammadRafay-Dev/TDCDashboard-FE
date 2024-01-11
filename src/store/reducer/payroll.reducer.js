import { createSlice } from "@reduxjs/toolkit";
import {
  getPayRoll,
  addPayRoll,
  deletePayRoll,
  updatePayRoll
} from "store/thunk/payroll.thunk";

const initialState = {
  data: {
    payrolls: null,
  },
  error: null,
  isLoading: false,
};

const payRollSlice = createSlice({
  name: "payroll",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get PayRoll
    builder
      .addCase(getPayRoll.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPayRoll.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.data.payrolls = payload;
      })
      .addCase(getPayRoll.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });

    //   //Add Task
    builder.addCase(addPayRoll.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addPayRoll.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      // state.data.payrolls = payload;
    });
    builder.addCase(addPayRoll.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

      // Delete PayRoll:
      builder
      .addCase(deletePayRoll.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePayRoll.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        // state.data.payrolls = payload;
      })
      .addCase(deletePayRoll.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });

    // Update PayRoll:
    builder
      .addCase(updatePayRoll.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePayRoll.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        // state.data.task = payload;
      })
      .addCase(updatePayRoll.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default payRollSlice.reducer;
