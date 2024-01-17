import {
  DeleteIcon,
  EditIcon,
  InfoIcon,
  ViewIcon,
  ViewOffIcon,
} from "@chakra-ui/icons";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
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
} from "@chakra-ui/react";
import Loader from "components/loader/Loader";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getDepartments } from "store/thunk/department.thunk";
import { getMembers } from "store/thunk/member.thunk";
import EarningModal from "./EarningModal";
import { getEarning } from "store/thunk/earning.thunk";
import { deleteEarning } from "store/thunk/earning.thunk";
import { getProjects } from "store/thunk/project.thunk";

const EarningTable = ({ filteredData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const [members, setMembers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [projects, setProjects] = useState([]);
  const [earningProp, setEarningProp] = useState({});
  const [earningId, setEarningId] = useState("");
  const [expandedRows, setExpandedRows] = useState({});
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const cancelRef = useRef();

  const handleBack = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await dispatch(getEarning());
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        toast.error("Error fetching clients");
      }
    };

    fetchData();
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
      setIsLoading(true);
      await dispatch(deleteEarning(deleteId));
      await dispatch(getEarning());
      toast.success("Task Deleted Successfully");
      setIsDeleteConfirmationOpen(false);
      setIsLoading(false);
    } catch (error) {
      // Display error toast
      toast.error("Error Deleting Task");
      setIsLoading(false);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteConfirmationOpen(false);
  };

  const handleClickUpdate = (id, value) => {
    setEarningId(id);
    setEarningProp(value);
    setIsModalOpen(true);
    dispatch(getMembers()).then((res) => {
      setMembers(res.payload);
    });
    dispatch(getDepartments()).then((res) => {
      setDepartments(res.payload);
    });
    dispatch(getProjects()).then((res) => {
      setProjects(res.payload);
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
      {/* Loader */}
      {isLoading && <Loader />}
      <EarningModal
        isOpen={isModalOpen}
        members={members}
        projects={projects}
        departments={departments}
        onClose={() => setIsModalOpen(false)}
        onBack={handleBack}
        earningProp={earningProp}
        earningId={earningId}
      />

      <AlertDialog
        isOpen={isDeleteConfirmationOpen}
        leastDestructiveRef={cancelRef}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Earning
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this Earning?
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
      {!isLoading && (
        <TableContainer>
          <Table variant="striped">
            <Thead>
              <Tr>
                <Th>Member Name</Th>
                <Th>Department Name</Th>
                <Th>Current Salary</Th>
                <Th>Projects Assigned</Th>
                <Th>Projects Worked On</Th>
                <Th>Contracted Hours</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredData &&
                filteredData?.map((row, index) => {
                  // console.log(row, "Hello========");
                  return (
                    <React.Fragment key={row._id}>
                      <Tr>
                        <Td>{row?.member?.name ?? "N/A"}</Td>
                        <Td>{row?.department?.name ?? "N/A"}</Td>
                        <Td>
                          {row?.currentSalary
                            ? `${row?.currentSalary}$`
                            : "N/A"}
                        </Td>
                        <Td>
                          {row?.projectsAssigned &&
                          row?.projectsAssigned.length > 0
                            ? row?.projectsAssigned
                                ?.map((project) => project?.name)
                                .join(", ")
                            : "N/A"}
                        </Td>
                        <Td>
                          {row?.projectsWorkedOn &&
                          row?.projectsWorkedOn.length > 0
                            ? row.projectsWorkedOn.map((project, index) => (
                                <span key={project._id}>
                                  {project.name}
                                  {index < row.projectsWorkedOn.length - 1
                                    ? ", "
                                    : ""}
                                </span>
                              ))
                            : "N/A"}
                        </Td>
                        <Td>{row?.contractedHours}</Td>
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
                            onClick={() =>
                              handleClickUpdate(row._id, {
                                member: row?.member?._id,
                                department: row?.department?._id,
                                totalOvertimeHours: row?.totalOvertimeHours,
                                totalUnderTimeHours: row?.totalUnderTimeHours,
                                projectsWorkedOn: row?.projectsWorkedOn?.map(
                                  (resource) => ({
                                    label: resource?.name,
                                    value: resource?._id,
                                  })
                                ),
                                totalDeductions: row?.totalDeductions,
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
                            <Icon
                              as={DeleteIcon}
                              color={ethColor}
                              boxSize={5}
                            />
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
                                      <Th>Total Overtime Hours</Th>
                                      <Th>Total Undertime Hours</Th>
                                      <Th>Total Worked Hours</Th>
                                      <Th>Total Earnings</Th>
                                      <Th>Total Deductions</Th>
                                      <Th>Net Salary</Th>
                                      <Th>Month</Th>
                                      <Th>Year</Th>
                                    </Tr>
                                  </Thead>
                                  <Tbody>
                                    <Tr>
                                      <Td>{row?.totalOvertimeHours}</Td>
                                      <Td>{row?.totalUnderTimeHours}</Td>
                                      <Td>{row?.totalWorkedHours}</Td>
                                      <Td>{row?.totalEarnings}</Td>
                                      <Td>{row?.totalDeductions}</Td>
                                      <Td>
                                        {row?.netSalary
                                          ? `${row?.netSalary}$`
                                          : "N/A"}
                                      </Td>
                                      <Td>{row?.month}</Td>
                                      <Td>{row?.year}</Td>
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
      )}
    </div>
  );
};
export default EarningTable;
