import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import {
    GET_TASK,
    ADD_TASK,
    DELETE_TASK,
    UPDATE_TASK,
} from "API/Urls";

const notifyLogout = () => {
  toast.error("You Have been Logout");
};

//Get All Leads
const getTask = createAsyncThunk("task/getTask", async () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  try {
    const response = await axios.get(GET_TASK, {
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
const addTask = createAsyncThunk(
  "task/addTask",
  async (taskData) => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    try {
      const response = await axios.post(ADD_TASK, taskData, {
        headers: { Authorization: `Bearer ${userData.accesstoken}` },
      });
      return response?.data;
    } catch (err) {
      return err;
    }
  }
);

// Delete Leads:
const deleteTask = createAsyncThunk("task/deleteTask", async (id) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  try {
    const response = await axios.delete(DELETE_TASK + `/${id}`, {
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
const updateTask = createAsyncThunk(
  "task/updateTask",
  async ({ value, taskId }) => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    try {
      const response = await axios.patch(
        UPDATE_TASK + `/${taskId}`,
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
export { getTask, addTask, deleteTask, updateTask };
