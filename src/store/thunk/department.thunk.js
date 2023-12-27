import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const addDepartments = createAsyncThunk("/admin/department", async (value) => {
  try {
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
        },
      }
    );
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    // Handle errors here
    console.error("Error adding employee:", error);
    throw error; // Propagate the error for the Redux Toolkit to handle
  }
});

export default addDepartments;
