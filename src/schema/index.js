import * as Yup from "yup";

//Member Schema
export const memberValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(3, "Name should be at least 3 characters"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  contactNumber: Yup.string()
    .required("Contact number is required")
    .min(10, "Contact Number must be between 10-14 numbers")
    .max(14, "Contact Number must be between 10-14 numbers"),
  role: Yup.string().required("Role is required"),
  currentSalary: Yup.number().required("Salary must be Reuired"),
  department: Yup.string().required("Department is required"),
  teams: Yup.array(),
  emergencyContactName: Yup.string().required(
    "Emergency contact name is required"
  ),
  emergencyContactNumber: Yup.string()
    .required("Emergency contact number is required")
    .min(10, "Emergency contact Number must be between 10-14 numbers")
    .max(14, "Emergency contact Number must be between 10-14 numbers"),
  emergencyContactRelation: Yup.string().required(
    "Emergency contact relation is required"
  ),
});

//Department Schema
export const departmentValidationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .min(3, "Name should be at least 3 characters"),
  departmentHead: Yup.string().required("Department Head is required"),
});

// Team Schema
export const teamValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(3, "Name should be at least 3 characters"),
  technology: Yup.string().required("Technology is required"),
  department: Yup.string().required("Department is required"),
  team_head: Yup.string().required("Team Head is required"),
  members: Yup.array(),
  projects: Yup.array(),
});

//Project Schema
export const projectValidationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .min(3, "Name should be at least 3 characters"),
  tech_stack: Yup.string().required("Tech Stack is required"),
  team_lead: Yup.string(),
  sales_coordinator: Yup.string().required("Sales Coordinator is required"),
  teams_assigned: Yup.array().of(Yup.string()),
  members_assigned: Yup.array().of(Yup.string()),
  platform: Yup.string().required("Platform is required"),
  contract_type: Yup.string().required("Contract Type is required"),
  client: Yup.string().required("Client is required"),
  consultant: Yup.string().required("Consultant is required"),
  status: Yup.string().required("Status is required"),
  duration: Yup.number()
    .required("Duration is required")
    .positive("Duration must be a positive number"),
  duration_unit: Yup.string().required("Duration Unit is required"),
  start_date: Yup.date().nullable().required("Start Date is required"),
  end_date: Yup.date().nullable().required("End Date is required"),
  cost: Yup.string().required("Cost is required"),
});

//Lead Schema
export const leadValidationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .min(3, "Name should be at least 3 characters"),
  date: Yup.date().nullable().required("Date is required"),
  salesTeamMember: Yup.string(),
  client: Yup.string(),
  linkJobApplied: Yup.string()
    .url("Invalid URL")
    .required("Link Job Applied is required"),
  jobDescription: Yup.string().required("Job Description is required"),
  sentDescription: Yup.string().required("Sent Description is required"),
  appointment: Yup.date().nullable().required("Appointment date is required"),
  call: Yup.date().nullable().required("Call date is required"),
  leadStatus: Yup.string().required("Lead Status is required"),
});

//Client Schema
export const clientValidationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .min(3, "Name should be at least 3 characters"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  emailSecondary: Yup.string().email("Invalid secondary email"),
  contactNumber: Yup.string().required("Contact number is required"),
  platform: Yup.string().required("Platform is required"),
  dateContacted: Yup.date().required("Date contacted is required"),
  regionLocated: Yup.string().required("Region located is required"),
  contactPlatformLink1: Yup.string()
    .url("Invalid URL for Contact Platform Link 1")
    .required("Contact Platform Link 1 is required"),
  contactPlatformLink2: Yup.string()
    .url("Invalid URL for Contact Platform Link 2")
    .required("Contact Platform Link 2 is required"),
});

// Task Schema
export const taskValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  lead: Yup.string().required("Lead name is required"),
  client: Yup.string().required("Client name is required"),
  salesMember: Yup.string().required("Sales member is required"),
  taskDiscription: Yup.string().required("Task description is required"),
  taskSideNote: Yup.string().required("Task Side Note is required"),
  taskStartDate: Yup.date().required("Task start date is required"),
  taskEndDate: Yup.date().required("Task end date is required"),
  taskSupervisor: Yup.string().required("Task supervisor name is required"),
  taskTechResources: Yup.array().of(Yup.string()),
  taskLink1: Yup.string()
    .url("Invalid URL for Task Link1")
    .required("Task Link1 is required"),
  taskLink2: Yup.string()
    .url("Invalid URL for Task Link2")
    .required("Task Link2 is required"),
  taskLink3: Yup.string()
    .url("Invalid URL for Task Link3")
    .required("Task Link3 is required"),
});


// Pay Roll Schema

export const payrollValidationSchema = Yup.object().shape({
  member: Yup.string().required("Member is required"),
  department: Yup.string().required("Department is required"),
  accountTitle: Yup.string().required("Account Title is required"),
  cnic: Yup.string().length(13,"CNIC must be exactly 13 ").required("CNIC is required"),
  accountNo: Yup.string().required("Account Number is required"),
});
