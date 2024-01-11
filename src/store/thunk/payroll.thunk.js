import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import {
    GET_PAYROLL,
    ADD_PAYROLL,
} from "API/Urls";
import { DELETE_PAYROLL } from "API/Urls";
import { UPDATE_PAYROLL } from "API/Urls";

const notifyLogout = () => {
  toast.error("You Have been Logout");
};

//Get PayRoll
const getPayRoll = createAsyncThunk("payroll/getPayRoll", async () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  try {
    const response = await axios.get(GET_PAYROLL, {
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

//Add Payroll
const addPayRoll = createAsyncThunk(
  "payroll/addPayRoll",
  async (payrollId) => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    try {
      const response = await axios.post(ADD_PAYROLL, payrollId, {
        headers: { Authorization: `Bearer ${userData.accesstoken}` },
      });
      return response?.data?.data;
    } catch (err) {
      return err;
    }
  }
);

// Delete PayRoll:
const deletePayRoll = createAsyncThunk("payroll/deletePayRoll", async (id) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  try {
    const response = await axios.delete(DELETE_PAYROLL + `/${id}`, {
      headers: {
        Authorization: `Bearer ${userData.accesstoken}`,
      },
    });
    return response?.data.data;
  } catch (err) {
    return err;
  }
});

// Update PayRoll:
const updatePayRoll = createAsyncThunk(
  "payroll/updatePayRoll",
  async ({ value, payrollId }) => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    try {
      const response = await axios.patch(
        UPDATE_PAYROLL + `/${payrollId}`,
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


export { getPayRoll, addPayRoll,deletePayRoll,updatePayRoll };
