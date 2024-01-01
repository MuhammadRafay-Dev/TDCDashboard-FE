import { createAsyncThunk } from "@reduxjs/toolkit";
import { ADD_LEADS } from "API/Urls";
import { GET_LEADS } from "API/Urls";
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
const addLeads = createAsyncThunk("leads/addLeads", async () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  try {
    const response = await axios.post(ADD_LEADS, {
      headers: { Authorization: `Bearer ${userData.accesstoken}` },
    });
    return response?.data;
  } catch (err) {
    return err;
  }
});

export { getLeads, addLeads };
