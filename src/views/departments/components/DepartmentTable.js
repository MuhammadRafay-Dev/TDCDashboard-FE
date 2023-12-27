import React from "react";
import {
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  TableContainer,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

const DepartmentTable = ({ departmentData }) => {
  return (
    <div>
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
            {departmentData.map((department) => (
              <Tr key={department.id}>
                <Td>{department.name}</Td>
                <Td>{department.headName}</Td>
                <Td>{department.headEmail}</Td>
                <EditIcon
                  color={"blue"}
                  boxSize={5}
                  borderRadius={5}
                  border={"2px solid blue"}
                  marginLeft={"5px"}
                  padding={"2px"}
                />
                <DeleteIcon
                  color={"blue"}
                  boxSize={5}
                  borderRadius={5}
                  border={"2px solid blue"}
                  marginLeft={"5px"}
                  padding={"2px"}
                />
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DepartmentTable;
