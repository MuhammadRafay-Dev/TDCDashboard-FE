import { createSlice } from "@reduxjs/toolkit";
import {
  getTask,
  addTask,
  deleteTask,
  updateTask,
} from "store/thunk/task.thunk";

const initialState = {
  data: {
    tasks: null,
  },
  error: null,
  isLoading: false,
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get Task
    builder
      .addCase(getTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTask.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.data.tasks = payload;
      })
      .addCase(getTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });

    //   //Add Task
    builder.addCase(addTask.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addTask.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      // state.data.task = payload;
    });
    builder.addCase(addTask.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    // Delete Task:
    builder
      .addCase(deleteTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTask.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        // state.data.task = payload;
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });

    // Update Task:
    builder
      .addCase(updateTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTask.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        // state.data.task = payload;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default taskSlice.reducer;
