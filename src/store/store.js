import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducer/auth.reducer"; // Import your auth reducer
import clientReducer from "./reducer/clinet.reducer";
import departmentReducer from "./reducer/department.reducer";
import earningReducer from "./reducer/earning.reducer";
import leadReducer from "./reducer/lead.reducer";
import memberReducer from "./reducer/member.reducer";
import payrollReducer from "./reducer/payroll.reducer";
import projectsReducer from "./reducer/projects.reducer";
import taskReducer from "./reducer/task.reducer";
import teamsReducer from "./reducer/teams.reducer";

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
    earning: earningReducer,
  },
});

export default store;
