import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch} from "react-redux";
import { toast } from "react-toastify";
import {
  deleteDepartments,
  getDepartments,
} from "store/thunk/department.thunk";
import { getMembers } from "store/thunk/member.thunk";
import EmployeeFormModal from "./EmployeeFormModal";

const DepartmentTable = ({ filteredData }) => {
  // const { departments } = useSelector((state) => state.department.data);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const [members, setMembers] = useState([]);
  const [formProp, setFormProp] = useState({});
  const [departmentId, setDepartmentId] = useState("");

  const handleBack = () => {
    // Handle going back logic
    setIsModalOpen(false); // Close the modal when going back
  };

  useEffect(() => {
    dispatch(getDepartments());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickDelete = async (id) => {
    try {
      // Dispatch the deleteDepartments action
      await dispatch(deleteDepartments(id));

      // After the delete operation is completed, dispatch getDepartments to update the state
      await dispatch(getDepartments());

      // Display success toast
      toast.success("Department Deleted Successfully");
    } catch (error) {
      console.error("Error Deleting Department", error);

      // Display error toast
      toast.error("Error Deleting Department");
    }
  };

  const handleClickUpdate = (id, value) => {
    setDepartmentId(id);
    setFormProp(value);
    setIsModalOpen(true);
    dispatch(getMembers()).then((res) => {
      setMembers(res.payload);
    });
  };
  return (
    <div>
      <EmployeeFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onBack={handleBack}
        members={members}
        formProp={formProp}
        departmentId={departmentId}
      />
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
                // console.log(row.departmentHead)
                return (
                  <Tr key={row._id}>
                    <Td>{row.name}</Td>
                    <Td>{row?.departmentHead?.name}</Td>
                    <Td>{row?.departmentHead?.email}</Td>
                    <Td>
                      <EditIcon
                        color={"blue"}
                        boxSize={5}
                        borderRadius={5}
                        border={"2px solid blue"}
                        marginLeft={"5px"}
                        padding={"2px"}
                        cursor={"pointer"}
                        onClick={() =>
                          handleClickUpdate(row._id, {
                            name: row.name,
                            departmentHead: row.departmentHead._id,
                          })
                        }
                      />
                      <DeleteIcon
                        color={"blue"}
                        boxSize={5}
                        borderRadius={5}
                        border={"2px solid blue"}
                        marginLeft={"5px"}
                        padding={"2px"}
                        cursor={"pointer"}
                        onClick={() => handleClickDelete(row._id)}
                      />
                    </Td>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default DepartmentTable;
