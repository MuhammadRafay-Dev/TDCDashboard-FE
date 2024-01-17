// Chakra imports
import {
  Box,
  Flex,
  Text,
  Icon,
  useColorModeValue,
  Checkbox,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import Menu from "components/menu/MainMenu";
import IconBox from "components/icons/IconBox";

// Assets
import { MdCheckBox, MdDragIndicator } from "react-icons/md";
import React from "react";

export default function Conversion(props) {
  const { project, ...rest } = props;
  console.log("Project", project);
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "navy.700");
  const brandColor = useColorModeValue("brand.500", "brand.400");
  return (
    <Card p="20px" direction="column" w="100%" {...rest}>
      <Flex alignItems="start" w="100%" mb="30px">
        <Text color={textColor} fontSize="lg" fontWeight="700">
          Resource Assigned
        </Text>
      </Flex>
      <Box px="11px">
        <Flex mb="20px" direction="column">
          {project?.members_assigned?.map((member) => (
            <Text key={member?.id}>{member?.name}</Text>
          ))}
        </Flex>
      </Box>
    </Card>
  );
}
