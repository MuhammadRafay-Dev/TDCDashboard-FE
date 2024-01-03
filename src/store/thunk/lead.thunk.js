import { createAsyncThunk } from "@reduxjs/toolkit";
import { ADD_LEADS, GET_LEADS, DELETE_LEADS, UPDATE_LEADS } from "API/Urls";
import axios from "axios";
import { toast } from "react-toastify";

const notifyLogout = () => {
  toast.error("You Have been Logout");
};
//Get All Leads
const getLeads = createAsyncThunk("leads/getLeads", async () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  try {
    const response = await axios.get(GET_LEADS, {
      headers: {
        Authorization: `Bearer ${userData.accesstoken}`,
      },
    });
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

//Add Leads Api
const addLeads = createAsyncThunk("leads/addLeads", async (leadData) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  try {
    const response = await axios.post(ADD_LEADS, leadData, {
      headers: { Authorization: `Bearer ${userData.accesstoken}` },
    });
    return response?.data;
  } catch (err) {
    return err;
  }
});

// Delete Leads:
const deleteLeads = createAsyncThunk("leads/deleteLeads", async (id) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  try {
    const response = await axios.delete(DELETE_LEADS + `/${id}`, {
      headers: {
        Authorization: `Bearer ${userData.accesstoken}`,
      },
    });
    return response?.data;
  } catch (err) {
    return err;
  }
});

// Update Leads:
const updateLeads = createAsyncThunk(
  "leads/updateLeads",
  async ({ leadData, leadId }) => {
    // console.log("Id", id);
    const userData = JSON.parse(localStorage.getItem("userData"));
    try {
      const response = await axios.patch(
        UPDATE_LEADS + `/${leadId}`,
        leadData,
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

export { addLeads, deleteLeads, getLeads, updateLeads };
