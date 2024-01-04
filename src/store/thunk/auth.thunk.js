import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { setUser } from "store/reducer/auth.reducer";

const login = createAsyncThunk(
  "auth/login",
  async ({ email, password, navigate }, { dispatch }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/members/login`,
        { email, password }
      );
      dispatch(setUser());
      navigate.push("/admin");
      localStorage.setItem("userData", JSON.stringify(response.data));
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      console.error(error, "error");
      toast.error(error?.response?.data?.message || "An error occurred");
    }
  }
);

export default login;
