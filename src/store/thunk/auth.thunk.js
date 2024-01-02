import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const login = createAsyncThunk("auth/login", async ({ email, password }) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/members/login`,
      { email, password }
    );
    // console.log(response.data, "dataaaaa");
    return response.data;
  } catch (error) {
    console.error(error, "error");
  }
});

export default login;
