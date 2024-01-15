import { Icon } from "@chakra-ui/react";
import { BsMicrosoftTeams } from "react-icons/bs";
import { FaBuilding } from "react-icons/fa";
import {
  FaHandHoldingDollar,
  FaHandshakeSimple,
  FaPeopleGroup,
} from "react-icons/fa6";
import { MdBarChart, MdHome, MdLeaderboard, MdTask } from "react-icons/md";
import { RiProjectorFill } from "react-icons/ri";
// Admin Imports
import Welcome from "views/admin/default";
import MemberData from "views/admin/member_data";
import ProjectData from "views/admin/project_data";
import Clients from "views/clients";
import Departments from "views/departments";
import Leads from "views/leads";
import Members from "views/members";
import Projects from "views/projects";
import Teams from "views/teams";

// Auth Imports
import PayRollTable from "views/payroll";
import TaskTable from "views/task";
import EarningTable from "views/earning";

const routes = [
  {
    name: "Welcome",
    layout: "/admin",
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    path: "/default",
    component: Welcome,
  },

  {
    name: "Member Data",
    layout: "/admin",
    path: "/member-data",
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    component: MemberData,
  },
  {
    name: "Project Data",
    layout: "/admin",
    path: "/project-data",
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    component: ProjectData,
  },

  {
    name: "Members",
    layout: "/admin",
    path: "/members",
    icon: (
      <Icon as={FaPeopleGroup} width="20px" height="20px" color="inherit" />
    ),
    component: Members,
  },

  {
    name: "Departments",
    layout: "/admin",
    path: "/departments",
    icon: <Icon as={FaBuilding} width="20px" height="20px" color="inherit" />,
    component: Departments,
  },

  {
    name: "Teams",
    layout: "/admin",
    path: "/teams",
    icon: (
      <Icon as={BsMicrosoftTeams} width="20px" height="20px" color="inherit" />
    ),
    component: Teams,
  },

  {
    name: "Projects",
    layout: "/admin",
    path: "/projects",
    icon: (
      <Icon as={RiProjectorFill} width="20px" height="20px" color="inherit" />
    ),
    component: Projects,
  },

  {
    name: "Leads",
    layout: "/admin",
    path: "/leads",
    icon: (
      <Icon as={MdLeaderboard} width="20px" height="20px" color="inherit" />
    ),
    component: Leads,
  },

  {
    name: "Clients",
    layout: "/admin",
    path: "/clients",
    icon: (
      <Icon as={FaHandshakeSimple} width="20px" height="20px" color="inherit" />
    ),
    component: Clients,
  },
  {
    name: "Task",
    layout: "/admin",
    path: "/task",
    icon: <Icon as={MdTask} width="20px" height="20px" color="inherit" />,
    component: TaskTable,
  },
  {
    name: "PayRoll",
    layout: "/admin",
    path: "/payroll/getAll",
    icon: (
      <Icon
        as={FaHandHoldingDollar}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    component: PayRollTable,
  },
  {
    name: "Earning",
    layout: "/admin",
    path: "/earnings/getAll",
    icon: (
      <Icon
        as={FaHandHoldingDollar}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    component: EarningTable,
  },

  // {
  //   name: "NFT Marketplace",
  //   layout: "/admin",
  //   path: "/nft-marketplace",
  //   icon: (
  //     <Icon
  //       as={MdOutlineShoppingCart}
  //       width='20px'
  //       height='20px'
  //       color='inherit'
  //     />
  //   ),
  //   component: NFTMarketplace,
  //   secondary: true,
  // },

  // {
  //   name: "Profile",
  //   layout: "/admin",
  //   path: "/profile",
  //   icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
  //   component: Profile,
  // },

  // {
  //   name: "Sign In",
  //   layout: "/auth",
  //   path: "/sign-in",
  //   icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
  //   component: SignInCentered,
  // },

  // {
  //   name: "Password Reset",
  //   layout: "/auth",
  //   path: "/forget-password/verify",
  //   icon: <Icon as={MdOutlineLockReset} width="20px" height="20px" color="inherit" />,
  //   component: PasswordReset,
  // },

  // {
  //   name: "RTL Admin",
  //   layout: "/rtl",
  //   path: "/rtl-default",
  //   icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
  //   component: RTL,
  // },
];

export default routes;
