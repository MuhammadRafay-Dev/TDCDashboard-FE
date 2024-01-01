import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/dataTables";
import RTL from "views/admin/rtl";
import Members from "views/members";
import Departments from "views/departments";
import Teams from "views/teams";
import Projects from "views/projects";
import Leads from "views/leads";
import Clients from "views/clients";

// Auth Imports
import SignInCentered from "views/auth/signIn";
import PasswordReset from "views/forget_password/components/PasswordReset";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: MainDashboard,
  },

  {
    name: "Members",
    layout: "/admin",
    path: "/members",
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: Members,
  },

  {
    name: "Departments",
    layout: "/admin",
    path: "/departments",
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: Departments,
  },

  {
    name: "Teams",
    layout: "/admin",
    path: "/teams",
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: Teams,
  },

  {
    name: "Projects",
    layout: "/admin",
    path: "/projects",
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: Projects,
  },

  {
    name: "Leads",
    layout: "/admin",
    path: "/leads",
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: Leads,
  },

  {
    name: "Clients",
    layout: "/admin",
    path: "/clients",
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: Clients,
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
  //   name: "Data Tables",
  //   layout: "/admin",
  //   icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
  //   path: "/data-tables",
  //   component: DataTables,
  // },

  // {
  //   name: "Profile",
  //   layout: "/admin",
  //   path: "/profile",
  //   icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
  //   component: Profile,
  // },

  {
    name: "Sign In",
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: SignInCentered,
  },

  {
    name: "Password Reset",
    layout: "/auth",
    path: "/forget-password/verify",
    component: PasswordReset,
  },

  // {
  //   name: "RTL Admin",
  //   layout: "/rtl",
  //   path: "/rtl-default",
  //   icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
  //   component: RTL,
  // },
];

export default routes;
