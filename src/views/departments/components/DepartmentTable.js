import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Button,
  Icon,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  deleteDepartments,
  getDepartments,
} from "store/thunk/department.thunk";
import { getMembers } from "store/thunk/member.thunk";
import EmployeeFormModal from "./EmployeeFormModal";
import Loader from "components/loader/Loader";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const DepartmentTable = ({ filteredData }) => {
  const navigate = useHistory();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const [deleteId, setDeleteId] = useState("");
  const dispatch = useDispatch();
  const [members, setMembers] = useState([]);
  const [formProp, setFormProp] = useState({});
  const [departmentId, setDepartmentId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const cancelRef = useRef();

  
  const handleNavigate = () => {
    navigate.push(`/admin/deparment-data`);
  };

  const handleBack = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await dispatch(getDepartments());
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
      await dispatch(deleteDepartments(deleteId));
      await dispatch(getDepartments());

      // Display success toast
      toast.success("Department Deleted Successfully");
      setIsDeleteConfirmationOpen(false);
      setIsLoading(false);
    } catch (error) {
      toast.error("Error Deleting Department");
      setIsLoading(false);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteConfirmationOpen(false);
  };

  const handleClickUpdate = (id, value) => {
    setDepartmentId(id);
    setFormProp(value);
    setIsModalOpen(true);
    dispatch(getMembers()).then((res) => {
      setMembers(res.payload);
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
  const ethColor = useColorModeValue("blue", "white");

  return (
    <div>
      {/* Loader */}
      {isLoading && <Loader />}

      <EmployeeFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onBack={handleBack}
        members={members}
        formProp={formProp}
        departmentId={departmentId}
      />

      <AlertDialog
        isOpen={isDeleteConfirmationOpen}
        leastDestructiveRef={cancelRef}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Department
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this department?
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
                <Th>Department Name</Th>
                <Th>Department Head Name</Th>
                <Th>Department Head Email</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredData &&
                filteredData?.map((row, index) => {
                  return (
                    <Tr key={row._id}>
                      <Td
                      onClick={() => handleNavigate(row._id)}
                      style={{ cursor: "pointer" }}
                      >{row.name}</Td>
                      <Td>{row?.departmentHead?.name}</Td>
                      <Td>{row?.departmentHead?.email}</Td>
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
                          onClick={() =>
                            handleClickUpdate(row._id, {
                              name: row.name,
                              departmentHead: row.departmentHead._id,
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
                  );
                })}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default DepartmentTable;
