import { createSlice } from "@reduxjs/toolkit";
import {
  getClients,
  addClients,
  deleteClients,
  updateClients,
} from "store/thunk/client.thunk";

const initialState = {
  data: {
    clients: null,
  },
  error: null,
  isLoading: false,
};

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get Clients
    builder
      .addCase(getClients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getClients.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.data.clients = payload;
      })
      .addCase(getClients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });

    //   //Add Clients
    builder.addCase(addClients.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addClients.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      // state.data.clients = payload;
    });
    builder.addCase(addClients.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    // Delete Clients:
    builder
      .addCase(deleteClients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteClients.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        // state.data.clients = payload;
      })
      .addCase(deleteClients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });

    // Update Clients:
    builder
      .addCase(updateClients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateClients.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        // state.data.clients = payload;
      })
      .addCase(updateClients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default clientSlice.reducer;
