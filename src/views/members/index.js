import React from "react";
import { Box } from "@chakra-ui/react";

import MembersTable from "./components/MembersTable";

export default function Members() {
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <h1>Members</h1>
      <MembersTable/>
    </Box>
  );
};
