import { createAsyncThunk } from "@reduxjs/toolkit";
import { Add_ProjectUrl } from "API/Urls";
import { ProjectsUrl } from "API/Urls";
import axios from "axios";
import { toast } from "react-toastify";

const notifyLogout = () => {
  toast.error("You Have been Logout");
};

export const getProjects = createAsyncThunk("data/getProjects", async () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  try {
    const response = await axios.get(ProjectsUrl, {
      headers: {
        Authorization: `Bearer ${userData.accesstoken}`,
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

export const addProject = createAsyncThunk(
  "data/addProjects",
  async ({ projectData }) => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    try {
      const response = await axios.post(Add_ProjectUrl, projectData, {
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

export const editProject = createAsyncThunk(
  "data/editProjects",
  async (projectData) => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    try {
      const response = await axios.patch(
        `${ProjectsUrl}/${projectData._id}`,
        projectData,
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

export const deleteProject = createAsyncThunk(
  "data/deleteProjects",
  async (id) => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    try {
      await axios.delete(`${ProjectsUrl}/${id}`, {
        headers: {
          Authorization: `Bearer ${userData.accesstoken}`,
        },
      });
    } catch (error) {
      throw error;
    }
  }
);
