import { Box, Button, ChakraProvider } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import DepartmentTable from "./components/DepartmentTable";
import EmployeeFormModal from "./components/EmployeeFormModal";
import { getMembers } from "store/thunk/member.thunk";

export default function Departments() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const [members, setMembers] = useState([]);

  const handleClick = () => {
    setIsModalOpen(true);
    dispatch(getMembers()).then((res) => {
      setMembers(res.payload);
    });
  };

  const handleBack = () => {
    // Handle going back logic
    setIsModalOpen(false); // Close the modal when going back
  };
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <ChakraProvider>
        <Box display="flex" justifyContent="space-between">
          <h1>Departments</h1>
          <Button colorScheme="blue" onClick={handleClick}>
            Add Department
          </Button>
        </Box>
        <EmployeeFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onBack={handleBack}
          members={members}
        />
      </ChakraProvider>
      <Box>
        <DepartmentTable />
      </Box>
    </Box>
  );
}
