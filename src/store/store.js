import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducer/auth.reducer"; // Import your auth reducer
import departmentReducer from "./reducer/department.reducer";
import memberReducer from "./reducer/member.reducer";
import teamsReducer from "./reducer/teams.reducer";
import projectsReducer from "./reducer/projects.reducer";
import leadReducer from "./reducer/lead.reducer";
import clientReducer from "./reducer/clinet.reducer";
import taskReducer from "./reducer/task.reducer";
import payrollReducer from "./reducer/payroll.reducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    department: departmentReducer,
    members: memberReducer,
    teams: teamsReducer,
    projects: projectsReducer,
    lead: leadReducer,
    client: clientReducer,
    task: taskReducer,
    payroll: payrollReducer,
  },
});

export default store;
