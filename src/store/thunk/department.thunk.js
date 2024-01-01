import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  DELETE_DEPARTMENTS,
  GET_DEPARTMENTS,
  UPDATE_DEPARTMENTS,
} from "API/Urls";
import axios from "axios";
import { toast } from "react-toastify";

const notifyLogout = () => {
  toast.error("You Have been Logout");
};

//Get All Departments:
const getDepartments = createAsyncThunk(
  "departments/getDepartments",
  async () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    try {
      const response = await axios.get(GET_DEPARTMENTS, {
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
  }
);

// Async thunk for adding departments
const addDepartments = createAsyncThunk(
  "departments/addDepartments",
  async (value) => {
    // Retrieve user data from localStorage
    const userData = JSON.parse(localStorage.getItem("userData"));
    // console.log(userData)
    try {
      // Make a POST request to the API
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/department/create`,
        {
          name: value.name,
          departmentHead: value.departmentHead,
        },
        {
          headers: {
            Authorization: `Bearer ${userData.accesstoken}`,
          },
        }
      );
      return { message: response.data.message, data: response.data };
    } catch (error) {
      throw error;
    }
  }
);

const deleteDepartments = createAsyncThunk(
  "departments/deleteDepartments",
  async (id) => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    try {
      const response = await axios.delete(DELETE_DEPARTMENTS + `/${id}`, {
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

// Update departments:
const updateDepartments = createAsyncThunk(
  "departments/updateDepartments",
  async ({ formData, departmentId }) => {
    // console.log("Id", id);
    const userData = JSON.parse(localStorage.getItem("userData"));
    try {
      const response = await axios.patch(
        UPDATE_DEPARTMENTS + `/${departmentId}`,
        formData,
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

export { addDepartments, deleteDepartments, getDepartments, updateDepartments };
