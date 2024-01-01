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
import { useDispatch, useSelector } from "react-redux";
import {
  deleteDepartments,
  getDepartments,
} from "store/thunk/department.thunk";
import EmployeeFormModal from "./EmployeeFormModal";
import { getMembers } from "store/thunk/member.thunk";

const DepartmentTable = ({ isOpen }) => {
  const { departments } = useSelector((state) => state.department.data);

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

  const handleClickDelete = (id) => {
    dispatch(deleteDepartments(id));
    dispatch(getDepartments());
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
            {departments &&
              departments?.map((row, index) => {
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
