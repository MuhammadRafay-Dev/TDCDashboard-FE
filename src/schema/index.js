import * as Yup from "yup";

//Member Schema
export const memberValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(3, "Name should be at least 3 characters"),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  contactNumber: Yup.string().required('Contact number is required'),
  role: Yup.string().required('Role is required'),
  department: Yup.string().required('Department is required'),
  teams: Yup.array(),
  emergencyContactName: Yup.string().required('Emergency contact name is required'),
  emergencyContactNumber: Yup.string().required('Emergency contact number is required'),
  emergencyContactRelation: Yup.string().required('Emergency contact relation is required'),
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
  technology: Yup.string().required('Technology is required'),
  department: Yup.string().required('Department is required'),
  team_head: Yup.string().required('Team Head is required'),
  members: Yup.array(),
  projects: Yup.array(),
});

//Project Schema
export const projectValidationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  tech_stack: Yup.string().required('Tech Stack is required'),
  team_lead: Yup.string().required('Team Lead is required'),
  sales_coordinator: Yup.string().required('Sales Coordinator is required'),
  teams_assigned: Yup.array().of(Yup.string()),
  platform: Yup.string().required('Platform is required'),
  contract_type: Yup.string().required('Contract Type is required'),
  client: Yup.string().required('Client is required'),
  consultant: Yup.string().required('Consultant is required'),
  status: Yup.string().required('Status is required'),
  duration: Yup.number().required('Duration is required').positive('Duration must be a positive number'),
  duration_unit: Yup.string().required('Duration Unit is required'),
  start_date: Yup.date().nullable().required('Start Date is required'),
  end_date: Yup.date().nullable().required('End Date is required'),
  cost: Yup.string().required('Cost is required'),
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