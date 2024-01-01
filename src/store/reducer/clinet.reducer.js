import { createSlice } from "@reduxjs/toolkit";
import { getClients } from "store/thunk/client.thunk";



  const initialState = {
    data: {
      leads: null,
    },
    error: null,
    isLoading: false,
  };

  const clientSlice = createSlice({
    name: "client",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      // Get Leads
      builder
        .addCase(getClients.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getClients.fulfilled, (state, { payload }) => {
          state.isLoading = false;
          state.data.leads = payload;
        })
        .addCase(getClients.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.error.message;
        });
    },
  });
  
  export default clientSlice.reducer;