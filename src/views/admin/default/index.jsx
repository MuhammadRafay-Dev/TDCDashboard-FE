// Chakra imports
import { Box, SimpleGrid } from "@chakra-ui/react";
import React from "react";

export default function Settings() {
  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="80vh"
        textAlign="center"
        padding="2rem"
      >
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            marginBottom: "1rem",
          }}
        >
          ROI | Rapid Organizational Intelligence
        </h1>

        <h1 style={{ fontSize: "1.5rem", fontWeight: "italic" }}>
          Unlocking <span style={{ fontWeight: "bold" }}>Organizational</span>{" "}
          Brilliance at the <span style={{ fontWeight: "bold" }}>Speed</span> of
          Thought
        </h1>
      </Box>
    </Box>
  );
}
