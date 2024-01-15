import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    ADD_EARNING,
    DELETE_EARNING,
  GET_EARNING,
  UPDATE_EARNING,
} from "API/Urls";
import axios from "axios";
import { toast } from "react-toastify";

const notifyLogout = () => {
  toast.error("You Have been Logout");
};

//Get Earning
const getEarning = createAsyncThunk("earning/getEarning", async () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  try {
    const response = await axios.get(GET_EARNING, {
      headers: {
        Authorization: `Bearer ${userData.accesstoken}`,
      },
    });
    return response?.data?.data;
  } catch (err) {
    if (err.message === "Request failed with status code 401") {
      notifyLogout();
      window.location.reload();
      localStorage.clear();
    }
    return err;
  }
});

//Add Earning
const addEarning = createAsyncThunk("earning/addEarning", async (earningId) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  try {
    const response = await axios.post(ADD_EARNING, earningId, {
      headers: { Authorization: `Bearer ${userData.accesstoken}` },
    });
    return response?.data?.data;
  } catch (err) {
    return err;
  }
});

// Delete Earning:
const deleteEarning = createAsyncThunk("earning/deleteEarning", async (id) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  try {
    const response = await axios.delete(DELETE_EARNING + `/${id}`, {
      headers: {
        Authorization: `Bearer ${userData.accesstoken}`,
      },
    });
    return response?.data.data;
  } catch (err) {
    return err;
  }
});

// Update Earning:
const updateEarning = createAsyncThunk(
  "earning/updateEarning",
  async ({ value, earningId }) => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    try {
      const response = await axios.patch(
        UPDATE_EARNING + `/${earningId}`,
        value,
        {
          headers: {
            Authorization: `Bearer ${userData.accesstoken}`,
          },
        }
      );
      return response?.data.data;
    } catch (err) {
      return err;
    }
  }
);

export { addEarning, deleteEarning, getEarning, updateEarning };
