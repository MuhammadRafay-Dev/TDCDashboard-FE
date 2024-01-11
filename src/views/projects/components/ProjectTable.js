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
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
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
import React, { useEffect, useRef, useState } from "react";
import { getProjects } from "store/thunk/project.thunk";
import { addProject } from "store/thunk/project.thunk";
import { deleteProject } from "store/thunk/project.thunk";
import { editProject } from "store/thunk/project.thunk";
import ProjectModal from "./ProjectModal";
import { SearchBar } from "components/navbar/searchBar/SearchBar";
import Loader from "components/loader/Loader";

const ProjectTable = () => {
  const dispatch = useDispatch();
  const cancelRef = useRef();
  //States
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const [projectEditData, setProjectEditData] = useState(null);
  const projectData = useSelector((state) => state.projects?.data);
  const [projects, setProjects] = useState(projectData);
  const [indexOfRow, setIndexOfRow] = useState(null);
  const [expandedRows, setExpandedRows] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [rowLoadingStates, setRowLoadingStates] = useState(
    projects?.map(() => false) || []
  );

  const toggleAccordion = (rowId) => {
    setExpandedRows((prevRows) => ({
      ...prevRows,
      [rowId]: !prevRows[rowId],
    }));
  };

  const handleOpenConfirmationModal = (index) => {
    setIndexOfRow(index);
    setIsDeleteConfirmationOpen(true);
  };

  const handleCancelDelete = () => {
    setIsDeleteConfirmationOpen(false);
  };

  //API Calls
  const triggerSave = () => {
    setProjectEditData(null);
    onOpen();
  };

  const handleSaveProject = (projectData) => {
    try {
      dispatch(addProject({ projectData })).then((res) => {
        dispatch(getProjects()).then((res) => {
          setProjects(res.payload);
          toast.success("Project Added Succesfully");
        });
      });
    } catch (error) {
      console.error("Error adding project", error);
      toast.error("Error adding project");
    }
  };

  const handleDelete = (id, index) => {
    setRowLoadingStates((prevStates) => {
      const newState = [...prevStates];
      newState[index] = true;
      return newState;
    });
    try {
      dispatch(deleteProject(id)).then((res) => {
        dispatch(getProjects()).then((res) => {
          setProjects(res.payload);
          toast.success("Project Deleted Succesfully");
          setRowLoadingStates((prevStates) => {
            const newState = [...prevStates];
            newState[index] = false;
            return newState;
          });
        });
      });
    } catch (error) {
      console.log("Error Deleting Project");
      toast.error("Error Deleting Project");
      setRowLoadingStates((prevStates) => {
        const newState = [...prevStates];
        newState[index] = false;
        return newState;
      });
    }
  };

  const triggerEdit = (rowData, index) => {
    setProjectEditData(rowData);
    setIndexOfRow(index);
    onOpen();
  };

  const handleEditProject = (projectData, index) => {
    setRowLoadingStates((prevStates) => {
      const newState = [...prevStates];
      newState[index] = true;
      return newState;
    });
    try {
      dispatch(editProject(projectData)).then((res) => {
        dispatch(getProjects()).then((res) => {
          setProjects(res.payload);
          toast.success("Project Edited Succesfully");
          setRowLoadingStates((prevStates) => {
            const newState = [...prevStates];
            newState[index] = false;
            return newState;
          });
        });
      });
    } catch (error) {
      console.log("Error Editing Project");
      toast.error("Error Editing Project");
      setRowLoadingStates((prevStates) => {
        const newState = [...prevStates];
        newState[index] = false;
        return newState;
      });
    }
  };

  useEffect(() => {
    setIsLoading(true);
    dispatch(getProjects())
      .then((res) => {
        setProjects(res.payload);
        setIsLoading(false);
      })
      .catch((err) => {
        toast.error("Error in getting Projects");
      });
  }, []);

  //Search
  const filterSearch = (search) => {
    const filterSearch = search.toLowerCase();
    const data = projectData?.filter((data) => {
      return filterSearch === ""
        ? data
        : data?.name.toLowerCase().includes(filterSearch) ||
            data?.team_lead?.name.toLowerCase().includes(filterSearch) ||
            data?.sales_coordinator?.name
              .toLowerCase()
              .includes(filterSearch) ||
            data?.teams_assigned
              .map((team) => team?.name)
              .join(", ")
              .toLowerCase()
              .includes(filterSearch) ||
            data?.members_assigned
              .map((member) => member?.name)
              .join(", ")
              .toLowerCase()
              .includes(filterSearch) ||
            data.contract_type.toLowerCase().includes(filterSearch) ||
            data.status.toLowerCase().includes(filterSearch);
    });
    setProjects(data);
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
  const ethColor = useColorModeValue("blue", "white");

  return (
    <div>
      <ProjectModal
        open={isOpen}
        close={onClose}
        onSave={handleSaveProject}
        editData={projectEditData}
        edit={handleEditProject}
        index={indexOfRow}
      />
      <AlertDialog
        isOpen={isDeleteConfirmationOpen}
        leastDestructiveRef={cancelRef}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Project
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this project?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={handleCancelDelete}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  handleDelete(projects[indexOfRow]._id, indexOfRow);
                  handleCancelDelete();
                }}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
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
          Add Project
        </Button>
      </Box>
      {isLoading && <Loader />}
      {!isLoading && (
        <TableContainer>
          <Table variant="striped">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Team Lead</Th>
                <Th>Teams Assigned</Th>
                <Th>Members Assigned</Th>
                <Th>Client</Th>
                <Th>Status</Th>
                <Th>Start Date</Th>
                <Th>End Date</Th>
              </Tr>
            </Thead>
            <Tbody>
              {projects?.map((row, index) => (
                <React.Fragment key={index}>
                  <Tr>
                    <Td>{row?.name}</Td>
                    <Td>{row?.team_lead?.name ?? "N/A"}</Td>
                    <Td>
                      {row.teams_assigned && row.teams_assigned.length > 0
                        ? row.teams_assigned
                            ?.map((team) => team?.name)
                            .join(", ")
                        : "N/A"}
                    </Td>
                    <Td>
                      {row.members_assigned && row.members_assigned.length > 0
                        ? row.members_assigned
                            ?.map((member) => member?.name)
                            .join(", ")
                        : "N/A"}
                    </Td>
                    <Td>{row?.client?.name ?? "N/A"}</Td>
                    <Td>{row?.status}</Td>
                    <Td>{new Date(row.start_date).toLocaleDateString()}</Td>
                    <Td>{new Date(row.end_date).toLocaleDateString()}</Td>
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
                              as={
                                expandedRows[row._id] ? ViewOffIcon : ViewIcon
                              }
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
                            onClick={() => handleOpenConfirmationModal(index)}
                            isDisabled={rowLoadingStates[index]}
                          >
                            <Icon
                              as={DeleteIcon}
                              color={ethColor}
                              boxSize={5}
                            />
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
                              style={{
                                fontWeight: "bolder",
                                marginRight: "5px",
                              }}
                            >
                              Additional Info
                            </h1>
                            <Icon as={InfoIcon} color={ethColor} boxSize={5} />
                          </Flex>
                          <TableContainer>
                            <Table
                              variant="striped"
                              size="md"
                              colorScheme="gray"
                            >
                              <Thead>
                                <Tr>
                                  <Th>Sales Coordinator</Th>
                                  <Th>Tech Stack</Th>
                                  <Th>Platform</Th>
                                  <Th>Contract Type</Th>
                                  <Th>Duration</Th>
                                  <Th>Duration Unit</Th>
                                  <Th>Cost</Th>
                                  <Th>Hourly Cost</Th>
                                </Tr>
                              </Thead>
                              <Tbody>
                                <Tr>
                                  <Td>
                                    {row?.sales_coordinator?.name ?? "N/A"}
                                  </Td>
                                  <Td>{row?.tech_stack ?? "N/A"}</Td>
                                  <Td>{row?.platform ?? "N/A"}</Td>
                                  <Td>{row?.contract_type ?? "N/A"}</Td>
                                  <Td>{row?.duration ?? "N/A"}</Td>
                                  <Td>{row?.duration_unit ?? "N/A"}</Td>
                                  <Td>{row?.cost ?? "N/A"}</Td>
                                  <Td>{row?.hourly_cost ?? "N/A"}</Td>
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
      )}
    </div>
  );
};

export default ProjectTable;
