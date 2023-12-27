import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const login = createAsyncThunk(
  "auth/login",
  async ({ email, password, navigate }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/members/login`,
        { email, password }
      );
      navigate.push("/admin");
      toast.success(response.data.message);
      console.log(response.data, "dataaaaa");
      return response.data;
    } catch (error) {
      console.error(error, "error");
    }
  }
);

export default login;
