import React from "react";
import { Box } from "@chakra-ui/react";
import ProjectTable from "./components/ProjectTable";

export default function Projects() {
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <ProjectTable />
    </Box>
  );
}
