import { createAsyncThunk } from "@reduxjs/toolkit";
import { Add_TeamsUrl } from "API/Urls";
import { TeamsUrl } from "API/Urls";
import axios from "axios";
import { toast } from "react-toastify";

const notifyLogout = () => {
  toast.error("You Have been Logout");
};

export const getTeams = createAsyncThunk("data/getTeams", async () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  try {
    const response = await axios.get(TeamsUrl, {
      headers: {
        // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NThkODY5MDU3ZWExOTYyMjBjNzQ4MzYiLCJyb2xlIjoiU1VQRVJBRE1JTiIsImlhdCI6MTcwMzk1ODQ3MCwiZXhwIjoxNzA0MDAxNjcwfQ.jTk7MuJKORFn6ZgTggAinFG_-cdyHrKlGwBxwuIZmMk`,
        Authorization: `Bearer ${userData.accesstoken}`,
      },
    });
    toast.success(response.data.message);
    return response?.data;
  } catch (err) {
    console.log("TOken Error", err);
    if (err.message === "Request failed with status code 401") {
      notifyLogout();
      // window.location.reload();
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
