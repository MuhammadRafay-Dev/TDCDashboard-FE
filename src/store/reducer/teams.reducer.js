// authReducer.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Add_TeamsUrl } from "API/Urls";
import { TeamsUrl } from "API/Urls";
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

export const getTeams = createAsyncThunk("data/getTeams", async () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  try {
    const response = await axios.get(TeamsUrl, {
      headers: {
        Authorization: `Bearer ${userData.accesstoken}`,
      },
    });
    toast.success(response.data.message);
    return response?.data;
  } catch (err) {
    if (err.message === "Request failed with status code 401") {
      notifyLogout();
      window.location.reload();
      localStorage.clear();
    }
    return err;
  }
});

export const addTeam = createAsyncThunk(
  "data/addTeams",
  async ({ teamData }) => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    try {
      const response = await axios.post(Add_TeamsUrl, teamData, {
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

export const editTeam = createAsyncThunk("data/editTeams", async (teamData) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  try {
    const response = await axios.patch(
      `${TeamsUrl}/${teamData._id}`,
      teamData,
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
});

export const deleteTeam = createAsyncThunk("data/deleteTeam", async (id) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  try {
    await axios.delete(`${TeamsUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${userData.accesstoken}`,
      },
    });
  } catch (error) {
    throw error;
  }
});

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
