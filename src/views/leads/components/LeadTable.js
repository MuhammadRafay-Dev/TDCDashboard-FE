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
import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { deleteLeads, getLeads } from "store/thunk/lead.thunk";
import { getMembers } from "store/thunk/member.thunk";
import { getClients } from "store/thunk/client.thunk";
import { formatDateString } from "../../../utils/index";
import LeadModal from "./LeadModal";
import Loader from "components/loader/Loader";

const LeadTable = ({ filteredData }) => {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [members, setMembers] = useState([]);
  const [clients, setClients] = useState([]);
  const [leadProp, setLeadProp] = useState({});
  const [leadId, setLeadId] = useState("");
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
        await dispatch(getLeads());
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
      await dispatch(deleteLeads(deleteId));
      await dispatch(getLeads());

      // Display success toast
      toast.success("Lead Deleted Successfully");

      // Close confirmation modal
      setIsDeleteConfirmationOpen(false);
      setIsLoading(false);
    } catch (error) {
      // Display error toast
      toast.error("Error Deleting Lead");
      setIsLoading(false);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteConfirmationOpen(false);
  };

  const handleClickUpdate = (id, value) => {
    setLeadId(id);
    setLeadProp(value);
    setIsModalOpen(true);
    dispatch(getMembers()).then((res) => {
      setMembers(res.payload);
    });
    dispatch(getClients()).then((res) => {
      setClients(res.payload);
    });
  };

  // Colors
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
      {isLoading && (
       <Loader/>
      )}
      <LeadModal
        isOpen={isModalOpen}
        members={members}
        clients={clients}
        onClose={() => setIsModalOpen(false)}
        onBack={handleBack}
        leadProp={leadProp}
        leadId={leadId}
      />

      <AlertDialog
        isOpen={isDeleteConfirmationOpen}
        leastDestructiveRef={cancelRef}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Lead
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this lead?
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
                <Th>Name</Th>
                <Th>Date</Th>
                <Th>SalesTeamMember</Th>
                <Th>Client</Th>
                <Th>Appointment</Th>
                <Th>Lead Status</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredData &&
                filteredData?.map((row, index) => {
                  return (
                    <React.Fragment key={row._id}>
                      <Tr>
                        <Td>{row?.name}</Td>
                        <Td>{formatDateString(row?.date)}</Td>
                        <Td>{row?.salesTeamMember?.name ?? "N/A"}</Td>
                        <Td>{row?.client?.name ?? "N/A"}</Td>

                        <Td>{formatDateString(row?.appointment)}</Td>
                        <Td>{row?.leadStatus}</Td>
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
                                name: row?.name,
                                date: row?.date,
                                salesTeamMember: row?.salesTeamMember?._id,
                                client: row?.client?._id,
                                linkJobApplied: row?.linkJobApplied,
                                jobDescription: row?.jobDescription,
                                sentDescription: row?.sentDescription,
                                appointment: row?.appointment,
                                call: row?.call,
                                leadStatus: row?.leadStatus,
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
                                      <Th>LinkJobApplied</Th>
                                      <Th>JobDescription</Th>
                                      <Th>SentDescription</Th>
                                      <Th>Call</Th>
                                      <Th>CreatedBy</Th>
                                    </Tr>
                                  </Thead>
                                  <Tbody>
                                    <Tr>
                                      <Td>
                                        {row?.linkJobApplied}
                                        {row.error &&
                                          row.error.linkJobApplied && (
                                            <span style={{ color: "red" }}>
                                              {row.error.linkJobApplied}
                                            </span>
                                          )}
                                      </Td>
                                      <Td>{row?.jobDescription}</Td>
                                      <Td>{row?.sentDescription}</Td>
                                      <Td>{formatDateString(row?.call)}</Td>
                                      <Td>{row?.createdBy.name}</Td>
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
export default LeadTable;
