// authReducer.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GET_MEMBERS } from "API/Urls";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const notifyLogout = () => {
  toast.error("You Have been Logout");
};

export const getMembers = createAsyncThunk("data/getMembers", async () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  try {
    const response = await axios.get(GET_MEMBERS, {
      headers: {
        Authorization: `Bearer ${userData.accesstoken}`,
      },
    });
    toast.success(response.data.message);
    console.log(response.data, "dataaaaa");
    return response?.data;
  } catch (err) {
    //   if (err.message === "Request failed with status code 401") {
    //     notifyLogout();
    //     window.location.reload();
    //     localStorage.clear();
    //   }
    return err;
  }
});

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

export default memberSlice.reducer;
