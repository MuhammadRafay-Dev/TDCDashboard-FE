import React from "react";
import { Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";

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
        {/* <h1
          color={logoColor}
          style={{ fontWeight: "bolder", fontSize: "18px" }}
        >
          Rapid Organizational Intelligence
        </h1> */}

        <Box boxSize="sm">
          <Link to="/admin">
            <Image
              src="https://github.com/Tayyab-103/JavaScript-103/assets/109760448/2121afa4-8a0b-4b17-81b2-761e425fc7d2"
              alt="Logo"
              width={"150px"}
              height={"70px"}
              cursor={"pointer"}
            />
          </Link>
        </Box>
      </Box>
      <HSeparator mb="20px" />
    </Flex>
  );
}

export default SidebarBrand;
