import {
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  Td
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getMembers } from "store/reducer/member.reducer";

const MembersTable = () => {
  const dispatch = useDispatch();
  const [members, setMembers] = useState([]);
  // console.log("members", members);

  useEffect(() => {
    dispatch(getMembers()).then((res) => {
      setMembers(res.payload);
    });
  }, []);

  // console.log("jKJ", members);

  return (
    <div>
      <TableContainer>
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Role</Th>
            </Tr>
          </Thead>
          <Tbody>
            {members && members?.map((row, index) => (
              <Tr>
                <Td>{row.name}</Td>
                <Td>{row.email}</Td>
                <Td>{row.role}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MembersTable;
