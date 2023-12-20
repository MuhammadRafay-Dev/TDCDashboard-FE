import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";


// First, create the thunk
// const fetchUserById = createAsyncThunk(
//   "users/fetchByIdStatus",
//   async ({ email, password }) => {
//     //  async ({email,password}, thunkAPI) => {
//     console.log(email, "\n", password);

//     //api call here
//     //const response = await userAPI.fetchById(userId)
//     return "zindabad";
//   }
// );

const fetchUserById = createAsyncThunk(
  "users/fetchByIdStatus",
  async ({ email, password }, thunkAPI) => {
    console.log(email, "\n", password);

    try {
      const response = await axios.post(
        "http://localhost:4000/register",
        {
          "email" : email,
          "password" : password,
        }
      );

      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      // Handle error,  dispatch a failure action
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);



// Later, dispatch the thunk as needed in the app
//dispatch(fetchUserById(123))
export default fetchUserById;
