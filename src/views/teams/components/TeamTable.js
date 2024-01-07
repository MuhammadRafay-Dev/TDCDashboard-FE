import {
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  Box,
  Button,
  useDisclosure,
  useColorModeValue,
  Icon,
  Td,
  Spinner,
  Collapse,
  Flex,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteIcon,
  EditIcon,
  InfoIcon,
  ViewIcon,
  ViewOffIcon,
} from "@chakra-ui/icons";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import TeamModal from "./TeamModal";
import { getTeams } from "store/thunk/team.thunk";
import { addTeam } from "store/thunk/team.thunk";
import { deleteTeam } from "store/thunk/team.thunk";
import { editTeam } from "store/thunk/team.thunk";
import { SearchBar } from "components/navbar/searchBar/SearchBar";

const TeamTable = () => {
  const dispatch = useDispatch();
  //States
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [teamEditData, setTeamEditData] = useState(null);
  const teamData = useSelector((state) => state.teams?.data);
  const [teams, setTeams] = useState(teamData);
  const [indexOfRow, setIndexOfRow] = useState(null);
  const [expandedRows, setExpandedRows] = useState({});
  const [rowLoadingStates, setRowLoadingStates] = useState(
    teams?.map(() => false) || []
  );

  const toggleAccordion = (rowId) => {
    setExpandedRows((prevRows) => ({
      ...prevRows,
      [rowId]: !prevRows[rowId],
    }));
  };

  //API Calls
  const triggerSave = () => {
    setTeamEditData(null);
    onOpen();
  };

  const handleSaveTeam = (teamData) => {
    try {
      dispatch(addTeam({ teamData })).then((res) => {
        dispatch(getTeams()).then((res) => {
          setTeams(res.payload);
          toast.success("Team Added Succesfully");
        });
      });
    } catch (error) {
      console.error("Error adding team", error);
      toast.error("Error adding team");
    }
  };

  const handleDelete = (id, index) => {
    setRowLoadingStates((prevStates) => {
      const newState = [...prevStates];
      newState[index] = true;
      return newState;
    });
    try {
      dispatch(deleteTeam(id)).then((res) => {
        dispatch(getTeams()).then((res) => {
          setTeams(res.payload);
          toast.success("Team Deleted Succesfully");
          setRowLoadingStates((prevStates) => {
            const newState = [...prevStates];
            newState[index] = false;
            return newState;
          });
        });
      });
    } catch (error) {
      console.log("Error Deleting Team");
      toast.error("Error Deleting Team");
      setRowLoadingStates((prevStates) => {
        const newState = [...prevStates];
        newState[index] = false;
        return newState;
      });
    }
  };

  const triggerEdit = (rowData, index) => {
    setTeamEditData(rowData);
    setIndexOfRow(index);
    onOpen();
  };

  const handleEditTeam = (teamData, index) => {
    setRowLoadingStates((prevStates) => {
      const newState = [...prevStates];
      newState[index] = true;
      return newState;
    });
    try {
      dispatch(editTeam(teamData)).then((res) => {
        dispatch(getTeams()).then((res) => {
          setTeams(res.payload);
          toast.success("Team Edited Succesfully");
          setRowLoadingStates((prevStates) => {
            const newState = [...prevStates];
            newState[index] = false;
            return newState;
          });
        });
      });
    } catch (error) {
      console.log("Error Editing Team");
      toast.error("Error Editing Team");
      setRowLoadingStates((prevStates) => {
        const newState = [...prevStates];
        newState[index] = false;
        return newState;
      });
    }
  };

  //Search
  const filterSearch = (search) => {
    const data = teamData?.filter((data) => {
      return search.toLowerCase() === ""
        ? data
        : data?.name.toLowerCase().includes(search) ||
            data?.technology.toLowerCase().includes(search) ||
            data?.department?.name.toLowerCase().includes(search) ||
            data?.team_head?.name.toLowerCase().includes(search) ||
            data?.members
              .map((member) => member?.name)
              .join(", ")
              .toLowerCase()
              .includes(search) ||
            data?.projects
              .map((project) => project?.name)
              .join(", ")
              .toLowerCase()
              .includes(search);
    });
    setTeams(data);
  };

  useEffect(() => {
    dispatch(getTeams()).then((res) => {
      setTeams(res.payload);
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
  let menuBg = useColorModeValue("white", "navy.800");
  const ethColor = useColorModeValue("blue", "white");

  return (
    <div>
      <TeamModal
        open={isOpen}
        close={onClose}
        onSave={handleSaveTeam}
        editData={teamEditData}
        edit={handleEditTeam}
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
          Add Team
        </Button>
      </Box>
      <TableContainer>
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Technology</Th>
              <Th>Department</Th>
              <Th>Team Head</Th>
              <Th>Members</Th>
              <Th>Projects</Th>
            </Tr>
          </Thead>
          <Tbody>
            {teams?.map((row, index) => (
              <React.Fragment key={index}>
                <Tr>
                  <Td>{row?.name}</Td>
                  <Td>{row?.technology}</Td>
                  <Td>{row.department ? row.department.name : "N/A"}</Td>
                  <Td>{row.team_head ? row.team_head.name : "N/A"}</Td>
                  <Td>
                    {row.members && row.members.length > 0
                      ? row.members?.map((member) => member.name).join(", ")
                      : "N/A"}
                  </Td>
                  <Td>
                    {row.projects && row.projects.length > 0
                      ? row.projects?.map((project) => project.name).join(", ")
                      : "N/A"}
                  </Td>
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
                          onClick={() => toggleAccordion(row._id)}
                        >
                          <Icon
                            as={expandedRows[row._id] ? ViewOffIcon : ViewIcon}
                            color={ethColor}
                            boxSize={5}
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
                          onClick={() => triggerEdit(row, index)}
                          isDisabled={rowLoadingStates[index]}
                        >
                          <Icon as={EditIcon} color={ethColor} boxSize={5} />
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
                          <Icon as={DeleteIcon} color={ethColor} boxSize={5} />
                        </Button>
                      </>
                    )}
                  </Td>
                </Tr>
                <Tr>
                  <Td colSpan={12}>
                    <Collapse in={expandedRows[row._id]}>
                      <Box
                        p={4}
                        bg={menuBg}
                        style={{
                          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                          borderRadius: "md",
                        }}
                      >
                        <Flex alignItems="center">
                          <h1
                            style={{ fontWeight: "bolder", marginRight: "5px" }}
                          >
                            Additional Info
                          </h1>
                          <Icon as={InfoIcon} color={ethColor} boxSize={5} />
                        </Flex>
                        <TableContainer>
                          <Table variant="striped" size="md" colorScheme="gray">
                            <Thead>
                              <Tr>
                                <Th>Created By</Th>
                              </Tr>
                            </Thead>
                            <Tbody>
                              <Tr>
                                <Td>{row?.createdBy?.name ?? "N/A"}</Td>
                              </Tr>
                            </Tbody>
                          </Table>
                        </TableContainer>
                      </Box>
                    </Collapse>
                  </Td>
                </Tr>
              </React.Fragment>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TeamTable;
