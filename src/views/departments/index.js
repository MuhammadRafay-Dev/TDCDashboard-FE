import { AddIcon } from '@chakra-ui/icons';
import { Box, Button, ChakraProvider } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getMembers } from "store/reducer/member.reducer";
import DepartmentTable from "./components/DepartmentTable";
import EmployeeFormModal from "./components/EmployeeFormModal";

export default function Departments() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const [members, setMembers] = useState([]);

  const handleClick =()=>{
    setIsModalOpen(true)
    dispatch(getMembers()).then((res) => {
      setMembers(res.payload);
    });
  }

  const handleBack = () => {
    // Handle going back logic
    setIsModalOpen(false); // Close the modal when going back
  };
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <ChakraProvider>
      <Button border="2px solid blue" onClick={handleClick}>Departments<AddIcon color={"blue"} boxSize={4} borderRadius={5} border={"2px solid blue"} marginLeft={"5px"} padding={"2px"} /></Button>
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
};
