import React from "react";
import { Box } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import PasswordReset from "./components/PasswordReset";

export default function Teams() {
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <h1>Forget Password</h1>

      <ChakraProvider>
        <PasswordReset />
      </ChakraProvider>
    </Box>
  );
}
