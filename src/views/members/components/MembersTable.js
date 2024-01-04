import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Icon,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { SearchBar } from "components/navbar/searchBar/SearchBar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  addMember,
  deleteMember,
  editMember,
  getMembers,
} from "store/thunk/member.thunk";
import MemberModal from "./MemberModal";
const MembersTable = () => {
  //States
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const memberData = useSelector((state) => state.members?.data);
  const [members, setMembers] = useState(memberData);
  const [memberEditData, setMemberEditData] = useState(null);
  const [indexOfRow, setIndexOfRow] = useState(null);
  const [rowLoadingStates, setRowLoadingStates] = useState(
    members?.map(() => false) || []
  );

  //API Calls
  const triggerSave = () => {
    setMemberEditData(null);
    onOpen();
  };

  const handleSaveMember = (memberData) => {
    try {
      dispatch(addMember({ memberData })).then((res) => {
        dispatch(getMembers()).then((res) => {
          setMembers(res.payload);
          toast.success("Member Added Succesfully");
        });
      });
    } catch (error) {
      console.error("Error adding member", error);
    }
  };

  const handleDelete = (id, index) => {
    setRowLoadingStates((prevStates) => {
      const newState = [...prevStates];
      newState[index] = true;
      return newState;
    });
    try {
      dispatch(deleteMember(id)).then((res) => {
        dispatch(getMembers()).then((res) => {
          setMembers(res.payload);
          toast.success("Member Deleted Succesfully");
          setRowLoadingStates((prevStates) => {
            const newState = [...prevStates];
            newState[index] = false;
            return newState;
          });
        });
      });
    } catch (error) {
      console.log("Error Deleting Member");
      setRowLoadingStates((prevStates) => {
        const newState = [...prevStates];
        newState[index] = false;
        return newState;
      });
    }
  };

  const triggerEditMember = (rowData, index) => {
    setMemberEditData(rowData);
    setIndexOfRow(index);
    onOpen();
  };

  const handleEditMember = (memberData, index) => {
    setRowLoadingStates((prevStates) => {
      const newState = [...prevStates];
      newState[index] = true;
      return newState;
    });
    try {
      dispatch(editMember(memberData)).then((res) => {
        dispatch(getMembers()).then((res) => {
          setMembers(res.payload);
          toast.success("Member Edited Succesfully");
          setRowLoadingStates((prevStates) => {
            const newState = [...prevStates];
            newState[index] = false;
            return newState;
          });
        });
      });
    } catch (error) {
      console.error("Error in Editing Project", error);
      setRowLoadingStates((prevStates) => {
        const newState = [...prevStates];
        newState[index] = false;
        return newState;
      });
    }
  };

  useEffect(() => {
    dispatch(getMembers()).then((res) => {
      setMembers(res.payload);
    });
  }, []);

  //Search
  const filterSearch = (search) => {
    const data = memberData?.filter((data) => {
      return search.toLowerCase() === ""
        ? data
        : data?.name.toLowerCase().includes(search) ||
            data?.email.toLowerCase().includes(search) ||
            data?.role.toLowerCase().includes(search) ||
            data?.department?.name.toLowerCase().includes(search) ||
            data?.teams
              .map((team) => team?.name)
              .join(", ")
              .toLowerCase()
              .includes(search);
    });
    setMembers(data);
  };

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
  let menuBg = useColorModeValue("white", "navy.800");

  return (
    <div>
      <MemberModal
        open={isOpen}
        close={onClose}
        onSave={handleSaveMember}
        editData={memberEditData}
        edit={handleEditMember}
        index={indexOfRow}
      />
      <Box display="flex" justifyContent="space-between">
        <Box
          w={{ sm: "100%", md: "auto" }}
          bg={menuBg}
          p="8px"
          borderRadius="30px"
        >
          <SearchBar Filter={filterSearch} />
        </Box>
        <Button colorScheme="blue" onClick={() => triggerSave()}>
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
              <Th>Teams</Th>
              <Th>Contact Number</Th>
            </Tr>
          </Thead>
          <Tbody>
            {members?.map((row, index) => (
              <Tr key={index}>
                <Td>{row.name}</Td>
                <Td>{row.email}</Td>
                <Td>{row.role}</Td>
                <Td>{row.department ? row.department.name : "N/A"}</Td>
                <Td>
                  {row.teams && row.teams.length > 0
                    ? row.teams?.map((team) => team.name).join(", ")
                    : "N/A"}
                </Td>
                <Td>{row.contactNumber ? row.contactNumber : "N/A"}</Td>
                <Td textAlign="center">
                  {rowLoadingStates[index] ? (
                    <Spinner size="sm" color="blue.500" />
                  ) : (
                    <>
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
                        onClick={() => triggerEditMember(row, index)}
                        isDisabled={rowLoadingStates[index]}
                      >
                        <Icon as={EditIcon} color={"blue"} boxSize={5} />
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
                        onClick={() => handleDelete(row._id, index)}
                        isDisabled={rowLoadingStates[index]}
                      >
                        <Icon as={DeleteIcon} color={"blue"} boxSize={5} />
                      </Button>
                    </>
                  )}
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
