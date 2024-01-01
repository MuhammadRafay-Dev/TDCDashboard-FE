import { createAsyncThunk } from "@reduxjs/toolkit";
import { DELETE_DEPARTMENTS, GET_DEPARTMENTS, UPDATE_DEPARTMENTS } from "API/Urls";
import axios from "axios";
import { toast } from "react-toastify";

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
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${userData.accesstoken}`,
          },
        }
      );

      // Display success toast on successful response
      toast.success(response.data.message);

      // Return more information including the data
      return { message: response.data.message, data: response.data };
    } catch (error) {
      // Handle errors and log more details
      console.error("Error adding department:", error);

      // Log more details if available
      if (error.response) {
        console.error("Response status:", error.response.status);
        console.error("Response data:", error.response.data);
      }

      // Display an error toast
      toast.error("Failed to add department");

      // Propagate the error for the Redux Toolkit to handle
      throw error;
    }
  }
);

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
      toast.success(response.data.message);
      // console.log(response.data, "data");
      return response?.data;
    } catch (err) {
      //   if (err.message === "Request failed with status code 401") {
      //     notifyLogout();
      //     window.location.reload();
      //     localStorage.clear();
      //   }
      return err;
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
      toast.success(response.data.message);
      // console.log(response.data, "data");
      return response?.data;
    } catch (err) {
      //   if (err.message === "Request failed with status code 401") {
      //     notifyLogout();
      //     window.location.reload();
      //     localStorage.clear();
      //   }
      return err;
    }
  }
);

// Update departments:
const updateDepartments = createAsyncThunk(
  "departments/updateDepartments",
  async ({formData, departmentId}) => {
    // console.log("Id", id);
    const userData = JSON.parse(localStorage.getItem("userData"));
    try {
      const response = await axios.patch(UPDATE_DEPARTMENTS + `/${departmentId}`,
      {
        headers: {
          Authorization: `Bearer ${userData.accesstoken}`,
        },
        body: formData, 
      });
      toast.success(response.data.message);
      // console.log(response.data, "data");
      return response?.data;
    } catch (err) {
      //   if (err.message === "Request failed with status code 401") {
      //     notifyLogout();
      //     window.location.reload();
      //     localStorage.clear();
      //   }
      return err;
    }
  }
);

export { addDepartments, deleteDepartments, getDepartments, updateDepartments };

