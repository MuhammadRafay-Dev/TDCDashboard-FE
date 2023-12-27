import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import { ChakraProvider, Button } from '@chakra-ui/react';
import DepartmentTable from "./components/DepartmentTable";
import EmployeeFormModal from "./components/EmployeeFormModal";
import { AddIcon } from '@chakra-ui/icons'

export default function Departments() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (formData) => {
    // Handle form submission logic
    console.log('Form Data Submitted:', formData);
  };

  const handleBack = () => {
    // Handle going back logic
    console.log('Going Back');
    setIsModalOpen(false); // Close the modal when going back
  };
  const departments = [
    { id: 1, name: 'SuperAdmin', headName: 'Human Resource', headEmail: 'hr@thedevcorporate.com' },
    { id: 2, name: 'Admin', headName: 'Buisness Development', headEmail: 'Kamran@gmail.com' },
    { id: 3, name: 'SuperAdmin', headName: 'Project manager', headEmail: 'Ali@gmail.com' },
    { id: 4, name: 'Admin', headName: 'DevOps', headEmail: 'Haider@gmail.com' },
    { id: 5, name: 'SuperAdmin', headName: 'Designers', headEmail: 'Abdullah@gmail.com' },
    // Add more department objects as needed
  ];
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <ChakraProvider>
      <Button border="2px solid blue" onClick={() => setIsModalOpen(true)}>Departments<AddIcon color={"blue"} boxSize={4} borderRadius={5} border={"2px solid blue"} marginLeft={"5px"} padding={"2px"} /></Button>
      <EmployeeFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        onBack={handleBack}
      />
    </ChakraProvider>
      <Box>
        <DepartmentTable departmentData={departments} />
      </Box>
    </Box>
  );
};
