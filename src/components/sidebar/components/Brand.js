import React from "react";

// Chakra imports
import { Box, Flex, useColorModeValue } from "@chakra-ui/react";

// Custom components
import { HorizonLogo } from "components/icons/Icons";
import { HSeparator } from "components/separator/Separator";

export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue("navy.700", "white");

  return (
    <Flex align="center" direction="column">
      {/* <HorizonLogo h="26px" w="175px" my="32px" color={logoColor} /> */}
      <Box mt="5px" mb="50px" h="26px" w="175px">
        <h1
          color={logoColor}
          style={{ fontWeight: "bolder", fontSize: "18px" }}
        >
          Rapid Organizational Intelligence
        </h1>
      </Box>
      <HSeparator mb="20px" />
    </Flex>
  );
}

export default SidebarBrand;
