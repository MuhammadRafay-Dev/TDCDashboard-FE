export const BaseUrl = "https://tdc-dashboard-5ec92093d7de.herokuapp.com/";
export const MembersUrl = BaseUrl + "members";
export const Add_MemberUrl = MembersUrl + "/create";
export const TeamsUrl = BaseUrl + "teams";
export const Add_TeamsUrl = TeamsUrl + "/create";
export const ProjectsUrl = BaseUrl + "project";
export const Add_ProjectUrl = ProjectsUrl + "/create";
export const GET_MEMBERS = BaseUrl + "members";
export const GET_DEPARTMENTS = BaseUrl + "department";
export const DELETE_DEPARTMENTS = BaseUrl + "department";
export const UPDATE_DEPARTMENTS = BaseUrl + "department";
export const ForgetPasswordUrl = BaseUrl + "forget-password";
export const VerifyUrl = ForgetPasswordUrl + "/verify?token=";
export const ResetForgotPasswordUrl = ForgetPasswordUrl + "/reset";