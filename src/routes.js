import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
} from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaBuilding } from "react-icons/fa";
import { BsMicrosoftTeams } from "react-icons/bs";
import { GoProjectSymlink } from "react-icons/go";
import { MdLeaderboard } from "react-icons/md";
import { LiaHandshakeSolid } from "react-icons/lia";
import { BiTask } from "react-icons/bi";
import { MdOutlineLockReset } from "react-icons/md";

// Admin Imports
import MemberData from "views/admin/member_data";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import Welcome from "views/admin/default";
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
import TaskTable from "views/task";

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
    name: "Members",
    layout: "/admin",
    path: "/members",
    icon: <Icon as={FaPeopleGroup} width="20px" height="20px" color="inherit" />,
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
    icon: <Icon as={BsMicrosoftTeams} width="20px" height="20px" color="inherit" />,
    component: Teams,
  },

  {
    name: "Projects",
    layout: "/admin",
    path: "/projects",
    icon: <Icon as={GoProjectSymlink} width="20px" height="20px" color="inherit" />,
    component: Projects,
  },

  {
    name: "Leads",
    layout: "/admin",
    path: "/leads",
    icon: <Icon as={MdLeaderboard} width="20px" height="20px" color="inherit" />,
    component: Leads,
  },

  {
    name: "Clients",
    layout: "/admin",
    path: "/clients",
    icon: <Icon as={LiaHandshakeSolid} width="20px" height="20px" color="inherit" />,
    component: Clients,
  },
  {
    name: "Task",
    layout: "/admin",
    path: "/task",
    icon: <Icon as={BiTask} width="20px" height="20px" color="inherit" />,
    component: TaskTable,
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
    icon: <Icon as={MdOutlineLockReset} width="20px" height="20px" color="inherit" />,
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
