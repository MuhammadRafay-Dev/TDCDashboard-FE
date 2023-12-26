import React from 'react'
import {
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  TableContainer,
} from "@chakra-ui/react";

const MembersTable = () => {
  return (
    <div>
      <TableContainer>
        <Table variant='striped' >
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Role</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Ali</Td>
              <Td>ali@gmail.com</Td>
              <Td >SuperAdmin</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MembersTable;
