import React, { useState } from "react";
import { Box, Button, ChakraProvider } from "@chakra-ui/react";
import { SearchBar } from "components/navbar/searchBar/SearchBar";
import ClientModal from "./components/ClientModal";
import ClientTable from "./components/ClientTable";

export default function Clients() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };
  const handleBack = () => {
    // Handle going back logic
    setIsModalOpen(false); // Close the modal when going back
  };
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <ChakraProvider>
        <Box display="flex" justifyContent="space-between">
          <Box padding={"8px"} backgroundColor={"white"} borderRadius={"30px"}>
            <SearchBar
              // Filter={filterSearch}
              placeholder={"search by name..."}
            />
          </Box>
          <Button colorScheme="blue" onClick={handleClick}>
            Add Clients
          </Button>
        </Box>
        <ClientModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onBack={handleBack}
        />
      </ChakraProvider>

      <Box>
        <ClientTable />
      </Box>
    </Box>
  );
}
