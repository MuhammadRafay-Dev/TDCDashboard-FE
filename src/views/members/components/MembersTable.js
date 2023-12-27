import React, { useEffect, useState } from "react";
import {
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  TableContainer,
  Box,
  Flex,
  Button,
  useDisclosure,
  IconButton,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { getMembers } from "store/reducer/member.reducer";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import MemberModal from "./MemberModal";
import { deleteMember } from "store/reducer/member.reducer";
import { toast } from "react-toastify";

const MembersTable = () => {
  //States
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const data = useSelector((state) => state.members?.data);
  const [members, setMembers] = useState(data);
  console.log("members", members);

  //API Calls
  const handleDelete = (id) => {
    console.log("ID", id);
    try {
      dispatch(deleteMember(id)).then((res) => {
        dispatch(getMembers()).then((res) => {
          setMembers(res.payload);
        });
        toast.success("Member Deleted Succesfully");
      });
    } catch (error) {
      console.log("Error Deleting Member");
    }
  };

  useEffect(() => {
    dispatch(getMembers()).then((res) => {
      setMembers(res.payload);
    });
  }, []);

  //Colors
  const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const bgHover = useColorModeValue(
    { bg: "secondaryGray.400" },
    { bg: "whiteAlpha.50" }
  );
  const bgFocus = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.100" }
  );

  return (
    <div>
      <MemberModal open={isOpen} close={onClose} />
      <Box display="flex" justifyContent="space-between">
        <h1>Members</h1>
        <Button colorScheme="blue" onClick={onOpen}>
          Add Member
        </Button>
      </Box>
      <TableContainer>
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Role</Th>
              <Th>Department</Th>
              <Th>Contact Number</Th>
            </Tr>
          </Thead>
          <Tbody>
            {members?.map((row, index) => (
              <Tr key={index}>
                <Td>{row.name}</Td>
                <Td>{row.email}</Td>
                <Td>{row.role}</Td>
                <Td>{row.department ? row.department : "N/A"}</Td>
                <Td>{row.contactNumber ? row.contactNumber : "N/A"}</Td>
                <Td>
                  <Button
                    align="center"
                    justifyContent="center"
                    bg={bgButton}
                    _hover={bgHover}
                    _focus={bgFocus}
                    _active={bgFocus}
                    w="37px"
                    h="37px"
                    lineHeight="100%"
                    borderRadius="10px"
                  >
                    <Icon
                      as={EditIcon}
                      color={"blue"}
                      boxSize={5}
                      borderRadius={5}
                      border={"2px solid blue"}
                      marginLeft={"5px"}
                      padding={"2px"}
                    />
                  </Button>

                  <Button
                    align="center"
                    justifyContent="center"
                    bg={bgButton}
                    _hover={bgHover}
                    _focus={bgFocus}
                    _active={bgFocus}
                    w="37px"
                    h="37px"
                    lineHeight="100%"
                    borderRadius="10px"
                    onClick={() => handleDelete(row._id)}
                  >
                    <Icon
                      as={DeleteIcon}
                      color={"blue"}
                      boxSize={5}
                      borderRadius={5}
                      border={"2px solid blue"}
                      marginLeft={"5px"}
                      padding={"2px"}
                    />
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MembersTable;
