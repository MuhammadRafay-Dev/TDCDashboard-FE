import { createSlice } from "@reduxjs/toolkit";
import {
    getEarning,
    addEarning,
    deleteEarning,
    updateEarning
} from "store/thunk/earning.thunk";

const initialState = {
  data: {
    earnings: null,
  },
  error: null,
  isLoading: false,
};

const earningSlice = createSlice({
  name: "earning",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get Earning
    builder
      .addCase(getEarning.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEarning.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.data.earnings = payload;
      })
      .addCase(getEarning.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });

    //Add Earning
    builder.addCase(addEarning.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addEarning.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      // state.data.earnings = payload;
    });
    builder.addCase(addEarning.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

      // Delete Earning:
      builder
      .addCase(deleteEarning.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteEarning.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        // state.data.earnings = payload;
      })
      .addCase(deleteEarning.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });

    // Update Earning:
    builder
      .addCase(updateEarning.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateEarning.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        // state.data.earnings = payload;
      })
      .addCase(updateEarning.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default earningSlice.reducer;
