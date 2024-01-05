import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import {
  GET_CLIENTS,
  ADD_CLIENTS,
  DELETE_CLIENTS,
  UPDATE_CLIENTS,
} from "API/Urls";

const notifyLogout = () => {
  toast.error("You Have been Logout");
};

//Get All Leads
const getClients = createAsyncThunk("clients/getClients", async () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  try {
    const response = await axios.get(GET_CLIENTS, {
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
const addClients = createAsyncThunk(
  "clients/addClients",
  async (clientData) => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    try {
      const response = await axios.post(ADD_CLIENTS, clientData, {
        headers: { Authorization: `Bearer ${userData.accesstoken}` },
      });
      return response?.data;
    } catch (err) {
      return err;
    }
  }
);

// Delete Leads:
const deleteClients = createAsyncThunk("clients/deleteClients", async (id) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  try {
    const response = await axios.delete(DELETE_CLIENTS + `/${id}`, {
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
const updateClients = createAsyncThunk(
  "clients/updateClients",
  async ({ value, clientId }) => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    try {
      const response = await axios.patch(
        UPDATE_CLIENTS + `/${clientId}`,
        value,
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
export { getClients, addClients, deleteClients, updateClients };
