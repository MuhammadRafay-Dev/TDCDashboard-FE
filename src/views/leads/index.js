import React from "react";
import { Box, Button, ChakraProvider } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import LeadModal from "./components/LeadModal";
import LeadTable from "./components/LeadTable";
import { getMembers } from "store/reducer/member.reducer";
import { getClients } from "store/thunk/client.thunk";

export default function Leads() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [members, setMembers] = useState([]);
  const [clients, setClients] = useState([]);
  const dispatch = useDispatch();

  const handleClick = () => {
    setIsModalOpen(true);
    dispatch(getMembers()).then((res) => {
      setMembers(res.payload);
    });

    dispatch(getClients()).then((res) => {
      setClients(res.payload);
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
          <h1>Leads</h1>
          <Button colorScheme="blue" onClick={handleClick}>
            Add Lead
          </Button>
        </Box>
        <LeadModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onBack={handleBack}
          members={members}
          clients={clients}
        />
      </ChakraProvider>
      <Box>
        <LeadTable />
      </Box>
    </Box>
  );
}
