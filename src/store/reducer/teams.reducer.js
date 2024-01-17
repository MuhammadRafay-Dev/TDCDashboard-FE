// authReducer.js
import { createSlice } from "@reduxjs/toolkit";
import { getTeams } from "store/thunk/team.thunk";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const teamSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTeams.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTeams.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(getTeams.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
    // .addCase(getMemberById.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // })
    // .addCase(getMemberById.fulfilled, (state, action) => {
    //   state.selectedMember = action.payload;
    //   state.loading = false;
    // })
    // .addCase(getMemberById.rejected, (state, action) => {
    //   state.error = action.error.message;
    //   state.loading = false;
    // })
    // .addCase(editMember.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // })
    // .addCase(editMember.fulfilled, (state, action) => {
    //   const editedMember = action.payload;
    //   const memberIndex = state.data.findIndex(
    //     (member) => member.id === editedMember.id
    //   );
    //   if (memberIndex !== -1) {
    //     state.data[memberIndex] = editedMember;
    //   }

    //   state.loading = false;
    // })

    // .addCase(editMember.rejected, (state, action) => {
    //   state.error = action.error.message;
    //   state.loading = false;
    // });
  },
});

export default teamSlice.reducer;
