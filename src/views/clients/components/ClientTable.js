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
import { deleteClients, getClients } from "store/thunk/client.thunk";
import ClientModal from "./ClientModal";

const ClientTable = ({ filteredData }) => {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clientProp, setClientProp] = useState({});
  const [clientId, setClientId] = useState("");
  const [expandedRows, setExpandedRows] = useState({});
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const cancelRef = useRef();

  const toggleAccordion = (rowId) => {
    setExpandedRows((prevRows) => ({
      ...prevRows,
      [rowId]: !prevRows[rowId],
    }));
  };

  const handleBack = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await dispatch(getClients())
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        toast.error("Error fetching clients");
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickDelete = (id) => {
    setDeleteId(id);
    setIsDeleteConfirmationOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      setIsLoading(true);
      await dispatch(deleteClients(deleteId));
      await dispatch(getClients());
      toast.success("Client Deleted Successfully");
      setIsDeleteConfirmationOpen(false);
      setIsLoading(false);
    } catch (error) {
      toast.error("Error Deleting Client");
      setIsLoading(false);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteConfirmationOpen(false);
  };

  const handleClickUpdate = (id, value) => {
    setClientId(id);
    setClientProp(value);
    setIsModalOpen(true);
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

      <ClientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onBack={handleBack}
        clientProp={clientProp}
        clientId={clientId}
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
              Are you sure you want to delete this Client?
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
              <Th>Email</Th>
              <Th>Contact Number</Th>
              <Th>Platform</Th>
              <Th>Region Located</Th>
              <Th>IsActive</Th>
              <Th>isOnBoarded</Th>
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
                      <Td>{row?.email}</Td>
                      <Td>{row?.contactNumber}</Td>
                      <Td>{row?.platform}</Td>
                      <Td>{row?.regionLocated}</Td>
                      <Td>{row?.isActive ? "True" : "False"}</Td>
                      <Td>{row?.isOnBoarded ? "True" : "False"}</Td>
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
                              name: row.name,
                              email: row.email,
                              emailSecondary: row.emailSecondary,
                              contactNumber: row.contactNumber,
                              platform: row.platform,
                              dateContacted: row.dateContacted,
                              regionLocated: row.regionLocated,
                              contactPlatformLink1: row.contactPlatformLink1,
                              contactPlatformLink2: row.contactPlatformLink2,
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
                                    <Th>EmailSecondary</Th>
                                    <Th>Date Contacted</Th>
                                    <Th>ContactPlatformLink1</Th>
                                    <Th>ContactPlatformLink2</Th>
                                    <Th>CreatedBy</Th>
                                  </Tr>
                                </Thead>
                                <Tbody>
                                  <Tr>
                                    <Td>{row?.emailSecondary}</Td>
                                    <Td>
                                      {new Date(
                                        row?.dateContacted
                                      ).toLocaleDateString()}
                                    </Td>
                                    <Td>{row?.contactPlatformLink1}</Td>
                                    <Td>{row?.contactPlatformLink2}</Td>
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
export default ClientTable;
