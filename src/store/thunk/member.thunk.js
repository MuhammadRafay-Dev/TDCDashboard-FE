import { createAsyncThunk } from "@reduxjs/toolkit";
import { Add_MemberUrl } from "API/Urls";
import { MembersUrl } from "API/Urls";
import axios from "axios";
import { toast } from "react-toastify";

const notifyLogout = () => {
  toast.error("You Have been Logout");
};

export const getMembers = createAsyncThunk("data/getMembers", async () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  try {
    const response = await axios.get(MembersUrl, {
      headers: {
        Authorization: `Bearer ${userData?.accesstoken}`,
      },
    });
    toast.success(response.data.message);
    return response?.data;
  } catch (err) {
    if (err.message === "Request failed with status code 401") {
      notifyLogout();
      // window.location.reload();
      localStorage.clear();
    }
    return err;
  }
});

export const addMember = createAsyncThunk(
  "data/addMembers",
  async ({ memberData }) => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    try {
      const response = await axios.post(Add_MemberUrl, memberData, {
        headers: {
          Authorization: `Bearer ${userData?.accesstoken}`,
        },
      });
      return response?.data;
    } catch (err) {
      return err;
    }
  }
);

export const editMember = createAsyncThunk(
  "data/editMembers",
  async (memberData) => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    try {
      const response = await axios.patch(
        `${MembersUrl}/${memberData._id}`,
        memberData,
        {
          headers: {
            Authorization: `Bearer ${userData?.accesstoken}`,
          },
        }
      );
      return response?.data;
    } catch (err) {
      return err;
    }
  }
);

export const deleteMember = createAsyncThunk(
  "data/deleteMember",
  async (id) => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    try {
      await axios.delete(`${MembersUrl}/${id}`, {
        headers: {
          Authorization: `Bearer ${userData?.accesstoken}`,
        },
      });
    } catch (error) {
      throw error;
    }
  }
);
