import React from "react";
import { Box } from "@chakra-ui/react";
import TeamTable from "./components/TeamTable";

export default function Teams() {
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <TeamTable />
    </Box>
  );
}
