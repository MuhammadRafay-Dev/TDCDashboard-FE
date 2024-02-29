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
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";
import {
  addMember,
  deleteMember,
  editMember,
  getMembers,
} from "store/thunk/member.thunk";
import MemberModal from "./MemberModal";
import Loader from "components/loader/Loader";
import Pagination from "components/pagination";
const MembersTable = () => {
  //States
  const navigate = useHistory();
  const dispatch = useDispatch();
  const cancelRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
    const [expandedRows, setExpandedRows] = useState({});
  const role = useSelector((state) => state?.auth?.user?.role);
  console.log("ROle", role);
  const memberData = useSelector((state) => state.members?.data);
  const [members, setMembers] = useState(memberData);
  const [memberEditData, setMemberEditData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteId, setDeleteId] = useState("");
  // const [indexOfRow, setIndexOfRow] = useState(null);
  // const [rowLoadingStates, setRowLoadingStates] = useState(
  //   members?.map(() => false) || []
  // );
  const [curPage, setCurPage] = useState(0);
  const itemLimit = 10;

  //functions
  const toggleAccordion = (rowId) => {
    setExpandedRows((prevRows) => ({
      ...prevRows,
      [rowId]: !prevRows[rowId],
    }));
  };

  const handleNavigate = (id) => {
    navigate.push(`/admin/member-data?id=${id}`);
  };

  const handleClickDelete = (id) => {
    setDeleteId(id);
    setIsDeleteConfirmationOpen(true);
  };
  // const handleOpenConfirmationModal = (index) => {
  //   // setIndexOfRow(index);
  //   setIsDeleteConfirmationOpen(true);
  // };

  const handleCancelDelete = () => {
    setIsDeleteConfirmationOpen(false);
  };

  //API Calls
  const triggerSave = () => {
    setMemberEditData(null);
    onOpen();
  };

  const handleSaveMember = (memberData) => {
    dispatch(addMember({ memberData }))
      .then((res) => {
        dispatch(getMembers())
          .then((res) => {
            setMembers(res.payload);
            toast.success("Member Added Succesfully");
          })
      })
  };

  const handleConfirmDelete = () => {
    handleCancelDelete()
    dispatch(deleteMember(deleteId))
      .then((res) => {
        dispatch(getMembers())
          .then((res) => {
            setMembers(res.payload);
            toast.success("Member Deleted Succesfully");
          })
      })
  };

  const triggerEditMember = (rowData) => {
    setMemberEditData(rowData);
    // setIndexOfRow(index);
    onOpen();
  };

  const handleEditMember = (memberData) => {
    dispatch(editMember(memberData))
      .then((res) => {
        dispatch(getMembers())
          .then((res) => {
            setMembers(res.payload);
            toast.success("Member Edited Succesfully");
          })
      })
  };

  useEffect(() => {
    setIsLoading(true);
    dispatch(getMembers())
      .then((res) => {
        setMembers(res.payload);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("error in getting members", err);
        toast.error("Error in getting members");
      });
  }, []);

  //Search
  const filterSearch = (search) => {
    const filterSearch = search.toLowerCase();
    const data = memberData?.filter((data) => {
      return filterSearch === ""
        ? data
        : data?.name.toLowerCase().includes(filterSearch) ||
            data?.email.toLowerCase().includes(filterSearch) ||
            data?.role.toLowerCase().includes(filterSearch) ||
            data?.department?.name.toLowerCase().includes(filterSearch) ||
            data?.teams
              .map((team) => team?.name)
              .join(", ")
              .toLowerCase()
              .includes(filterSearch);
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
  const ethColor = useColorModeValue("blue", "white");

  return (
    <div>
      <MemberModal
        open={isOpen}
        close={onClose}
        members={members}
        onSave={handleSaveMember}
        editData={memberEditData}
        edit={handleEditMember}
      />
      <AlertDialog
        isOpen={isDeleteConfirmationOpen}
        leastDestructiveRef={cancelRef}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Member
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this member?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={handleCancelDelete}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  handleConfirmDelete()
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
          Add Member
        </Button>
      </Box>
      {isLoading && <Loader />}
      {!isLoading && (
        <TableContainer>
          <Table variant="striped">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Role</Th>
                <Th>Current Salary</Th>
                <Th>Department</Th>
                <Th>Teams</Th>
              </Tr>
            </Thead>
            <Tbody>
              {members?.map((row, index) => (
                <React.Fragment key={index}>
                  <Tr>
                    <Td
                      onClick={() => handleNavigate(row._id)}
                      style={{ cursor: "pointer" }}
                    >
                      {row?.name}
                    </Td>
                    <Td>{row?.email}</Td>
                    <Td>{row?.role}</Td>
                    <Td>
                      {row?.currentSalary ? `${row?.currentSalary} $ ` : "N/A"}
                    </Td>
                    <Td>{row?.department ? row?.department?.name : "N/A"}</Td>
                    <Td>
                      {row?.teams && row?.teams.length > 0
                        ? row?.teams?.map((team) => team?.name).join(", ")
                        : "N/A"}
                    </Td>
                    {}
                    <Td textAlign="center">
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
                            onClick={() => triggerEditMember(row)}
                            // isDisabled={rowLoadingStates[index]}
                          >
                            <Icon as={EditIcon} color={ethColor} boxSize={5} />
                          </Button>
                          {row?.role !== "SUPERADMIN" && (
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
                              // isDisabled={rowLoadingStates[index]}
                            >
                              <Icon
                                as={DeleteIcon}
                                color={ethColor}
                                onClick={() =>
                                  handleClickDelete(row._id)
                                }
                                boxSize={5}
                              />
                            </Button>
                          )}
                          {row?.role !== "SUPERADMIN" || (
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
                              isDisabled={true}
                            >
                              <Icon
                                as={DeleteIcon}
                                color={ethColor}
                                onClick={() =>
                                  handleClickDelete(row._id)
                                }
                                boxSize={5}
                              />
                            </Button>
                          )}
                        </>
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
                                  <Th>Contact Number</Th>
                                  <Th>Emergency Contact Name</Th>
                                  <Th>Emergency Contact Contact</Th>
                                  <Th>Emergency Contact Relation</Th>
                                </Tr>
                              </Thead>
                              <Tbody>
                                <Tr>
                                  <Td>
                                    {row?.contactNumber
                                      ? row?.contactNumber
                                      : "N/A"}
                                  </Td>
                                  <Td>{row?.emergencyContactName ?? "N/A"}</Td>
                                  <Td>
                                    {row?.emergencyContactNumber ?? "N/A"}
                                  </Td>
                                  <Td>
                                    {row?.emergencyContactRelation ?? "N/A"}
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
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
      <Pagination
        totalItems={members?.length}
        curPage={curPage}
        setCurPage={setCurPage}
        itemLimit={itemLimit}
      />
    </div>
  );
};

export default MembersTable;
