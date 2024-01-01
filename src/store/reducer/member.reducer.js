// authReducer.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MembersUrl } from "API/Urls";
import { Add_MemberUrl } from "API/Urls";
import axios from "axios";
import { toast } from "react-toastify";
import { getMembers } from "store/thunk/member.thunk";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const memberSlice = createSlice({
  name: "members",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMembers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMembers.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(getMembers.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
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

export default memberSlice.reducer;
