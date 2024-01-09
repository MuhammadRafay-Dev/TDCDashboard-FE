import {
  DeleteIcon,
  EditIcon,
  InfoIcon,
  ViewIcon,
  ViewOffIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Button,
  Collapse,
  Flex,
  Icon,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getClients } from "store/thunk/client.thunk";
import { getLeads } from "store/thunk/lead.thunk";
import { getMembers } from "store/thunk/member.thunk";
import { deleteTask, getTask } from "store/thunk/task.thunk";
import { formatDateString } from "../../../utils/index";
import TaskModal from "./TaskModal";

const TaskTable = ({ filteredData }) => {
  // console.log("filteredData", filteredData);
  // const { leads } = useSelector((state) => state.lead.data);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const [members, setMembers] = useState([]);
  const [clients, setClients] = useState([]);
  const [leads, setLeads] = useState([]);
  const [taskProp, setTaskProp] = useState({});
  const [taskId, setTaskId] = useState("");
  const [expandedRows, setExpandedRows] = useState({});
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const [deleteId, setDeleteId] = useState("");
  const cancelRef = useRef();

  const handleBack = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    dispatch(getTask());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleAccordion = (rowId) => {
    setExpandedRows((prevRows) => ({
      ...prevRows,
      [rowId]: !prevRows[rowId],
    }));
  };

  const handleClickDelete = (id) => {
    setDeleteId(id);
    setIsDeleteConfirmationOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await dispatch(deleteTask(deleteId));
      await dispatch(getTask());

      // Display success toast
      toast.success("Task Deleted Successfully");
    } catch (error) {
      // Display error toast
      toast.error("Error Deleting Task");
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteConfirmationOpen(false);
  };

  const handleClickUpdate = (id, value) => {
    setTaskId(id);
    setTaskProp(value);
    setIsModalOpen(true);
    dispatch(getMembers()).then((res) => {
      setMembers(res.payload);
    });
    dispatch(getClients()).then((res) => {
      setClients(res.payload);
    });
    dispatch(getLeads()).then((res) => {
      setLeads(res.payload);
    });
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
      <TaskModal
        isOpen={isModalOpen}
        members={members}
        clients={clients}
        leads={leads}
        onClose={() => setIsModalOpen(false)}
        onBack={handleBack}
        taskProp={taskProp}
        taskId={taskId}
      />

      <AlertDialog
        isOpen={isDeleteConfirmationOpen}
        leastDestructiveRef={cancelRef}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Task
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this task?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={handleCancelDelete}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleConfirmDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <TableContainer>
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Lead</Th>
              <Th>Client</Th>
              <Th>Sales Member</Th>
              <Th>Task Start Date</Th>
              <Th>Task End Date</Th>
              <Th>Task Supervisor</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredData &&
              filteredData?.map((row, index) => {
                return (
                  <React.Fragment key={row._id}>
                    <Tr>
                      <Td>{row?.name}</Td>
                      <Td>{row?.lead?.name ?? "N/A"}</Td>
                      <Td>{row?.client?.name ?? "N/A"}</Td>
                      <Td>{row?.salesMember?.role ?? "N/A"}</Td>
                      <Td>{formatDateString(row?.taskStartDate)}</Td>
                      <Td>{formatDateString(row?.taskEndDate)}</Td>
                      <Td>{row?.taskSupervisor?.name ?? "N/A"}</Td>
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
                          onClick={() =>
                            handleClickUpdate(row._id, {
                              name: row?.name,
                              lead: row?.lead?._id,
                              client: row?.client?._id,
                              salesMember: row?.salesMember?.role,
                              taskDiscription: row?.taskDiscription,
                              taskSideNote: row?.taskSideNote,
                              taskStartDate: row?.taskStartDate,
                              taskEndDate: row?.taskEndDate,
                              taskSupervisor: row?.taskSupervisor?._id,
                              taskTechResources: row?.taskTechResources?.map(
                                (resource) => ({
                                  label: resource?.name,
                                  value: resource?._id,
                                  // isFixed: true
                                })
                              ),
                              taskLink1: row?.taskLink1,
                              taskLink2: row?.taskLink2,
                              taskLink3: row?.taskLink3,
                            })
                          }
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
                          onClick={() => handleClickDelete(row._id)}
                        >
                          <Icon as={DeleteIcon} color={ethColor} boxSize={5} />
                        </Button>
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
                              <Icon
                                as={InfoIcon}
                                color={ethColor}
                                boxSize={5}
                              />
                            </Flex>
                            <TableContainer>
                              <Table
                                variant="striped"
                                size="md"
                                colorScheme="gray"
                              >
                                <Thead>
                                  <Tr>
                                    <Th>Task Discription</Th>
                                    <Th>Task Side Note</Th>
                                    <Th>Task Link1</Th>
                                    <Th>Task Link2</Th>
                                    <Th>Task Link3</Th>
                                    <Th>CreateBy</Th>
                                    <Th>isCompleted</Th>
                                    <Th>Task Tech Resources</Th>
                                  </Tr>
                                </Thead>
                                <Tbody>
                                  <Tr>
                                    <Td>{row?.taskDiscription}</Td>
                                    <Td>{row?.taskSideNote}</Td>
                                    <Td>{row?.taskLink1}</Td>
                                    <Td>{row?.taskLink2}</Td>
                                    <Td>{row?.taskLink3}</Td>
                                    <Td>{row?.createdBy.name}</Td>
                                    <Td>
                                      {row?.isCompleted ? "True" : "False"}
                                    </Td>
                                    <Td>
                                      {row?.taskTechResources?.length
                                        ? row.taskTechResources.map(
                                            (resource, index) => (
                                              <span key={index}>
                                                {resource.name}
                                                {index <
                                                  row.taskTechResources.length -
                                                    1 && ", "}
                                              </span>
                                            )
                                          )
                                        : "N/A"}
                                    </Td>
                                  </Tr>
                                </Tbody>
                              </Table>
                            </TableContainer>
                          </Box>
                        </Collapse>
                      </Td>
                    </Tr>
                  </React.Fragment>
                );
              })}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default TaskTable;
