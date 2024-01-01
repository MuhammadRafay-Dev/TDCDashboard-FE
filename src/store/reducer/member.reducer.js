// authReducer.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MembersUrl } from "API/Urls";
import { Add_MemberUrl } from "API/Urls";
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
    const response = await axios.get(MembersUrl, {
      headers: {
        Authorization: `Bearer ${userData.accesstoken}`,
      },
    });
    toast.success(response.data.message);
    return response?.data;
  } catch (err) {
    if (err.message === "Request failed with status code 401") {
      notifyLogout();
      // window.location.reload();
      localStorage.clear();
    }
    return err;
  }
});

export const addMember = createAsyncThunk(
  "data/addMembers",
  async ({ memberData }) => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    try {
      const response = await axios.post(Add_MemberUrl, memberData, {
        headers: {
          Authorization: `Bearer ${userData.accesstoken}`,
        },
      });
      return response?.data;
    } catch (err) {
      return err;
    }
  }
);

export const editMember = createAsyncThunk(
  "data/editMembers",
  async (memberData) => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    try {
      const response = await axios.patch(
        `${MembersUrl}/${memberData._id}`,
        memberData,
        {
          headers: {
            Authorization: `Bearer ${userData.accesstoken}`,
          },
        }
      );
      return response?.data;
    } catch (err) {
      return err;
    }
  }
);

export const deleteMember = createAsyncThunk(
  "data/deleteMember",
  async (id) => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    try {
      await axios.delete(`${MembersUrl}/${id}`, {
        headers: {
          Authorization: `Bearer ${userData.accesstoken}`,
        },
      });
    } catch (error) {
      throw error;
    }
  }
);

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
