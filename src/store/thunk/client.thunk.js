import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import {GET_CLIENTS} from "API/Urls";


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
  export { getClients};