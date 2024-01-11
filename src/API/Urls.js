export const BaseUrl = "https://tdc-dashboard-5ec92093d7de.herokuapp.com/";
export const MembersUrl = BaseUrl + "members";
export const Add_MemberUrl = MembersUrl + "/create";
export const TeamsUrl = BaseUrl + "teams";
export const Add_TeamsUrl = TeamsUrl + "/create";
export const ProjectsUrl = BaseUrl + "project";
export const Add_ProjectUrl = ProjectsUrl + "/create";
export const GET_MEMBERS = BaseUrl + "members";

//Departments:
export const GET_DEPARTMENTS = BaseUrl + "department";
export const DELETE_DEPARTMENTS = BaseUrl + "department";
export const UPDATE_DEPARTMENTS = BaseUrl + "department";

//Leads:
export const GET_LEADS = BaseUrl + "leads";
export const ADD_LEADS = GET_LEADS + "/create";
export const DELETE_LEADS = BaseUrl + "leads";
export const UPDATE_LEADS = BaseUrl + "leads";

//Clients
export const GET_CLIENTS = BaseUrl + "clients";
export const ADD_CLIENTS = GET_CLIENTS + "/create";
export const DELETE_CLIENTS = BaseUrl + "clients";
export const UPDATE_CLIENTS = BaseUrl + "clients";

//Task:
export const GET_TASK = BaseUrl + "task";
export const ADD_TASK = GET_TASK + "/create";
export const DELETE_TASK = BaseUrl + "task";
export const UPDATE_TASK = BaseUrl + "task";

//PayRoll
export const GET_PAYROLL = BaseUrl + "payroll/getAll"
export const ADD_PAYROLL = BaseUrl + "payroll/create"
export const DELETE_PAYROLL = BaseUrl + "payroll/deleteById"
export const UPDATE_PAYROLL = BaseUrl + "payroll/partiallyUpdateById"

export const ForgetPasswordUrl = BaseUrl + "forget-password";
export const VerifyUrl = ForgetPasswordUrl + "/verify?token=";
export const ResetForgotPasswordUrl = ForgetPasswordUrl + "/reset";

//Rest Password:
export const ResetPassword = MembersUrl + "/reset_password";
