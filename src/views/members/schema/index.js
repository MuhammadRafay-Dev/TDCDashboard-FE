import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(3, "Name should be at least 3 characters"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  technology: Yup.string().required("Technology is required"),
  department: Yup.string().required("Department is required"),
  team_head: Yup.string().required("Team Head is required"),
});
