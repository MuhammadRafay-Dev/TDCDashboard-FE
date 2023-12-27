import React, { useEffect, useState } from "react";
import {
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  TableContainer,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { getMembers } from "store/reducer/member.reducer";

const MembersTable = () => {
  const dispatch = useDispatch();
  const [members, setMembers] = useState(null);
  console.log("members", members);

  useEffect(() => {
    dispatch(getMembers()).then((res) => {
      setMembers(res.payload);
    });
  }, []);

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
            {members?.map((row, index) => (
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
