import React, { useEffect, useState } from "react";
import { Box, Button, ChakraProvider } from "@chakra-ui/react";
import { SearchBar } from "components/navbar/searchBar/SearchBar";
import { useSelector } from "react-redux";
import ClientModal from "./components/ClientModal";
import ClientTable from "./components/ClientTable";

export default function Clients() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { clients } = useSelector((state) => state.client.data);
  const [filteredData, setFilteredData] = useState("");
  //Search
  useEffect(() => {
    setFilteredData(clients);
  }, [clients]);

  //Search
  const filterSearch = (search) => {
    const filterSearch = search.toLowerCase();
    const data = clients?.filter((data) => {
      return filterSearch === ""
        ? data
        : data?.name.toLowerCase().includes(filterSearch) ||
            data?.email.toLowerCase().includes(filterSearch) ||
            data?.emailSecondary.toLowerCase().includes(filterSearch) ||
            data?.platform.toLowerCase().includes(filterSearch) ||
            data?.emailSecondary.toLowerCase().includes(filterSearch) ||
            data?.regionLocated.toLowerCase().includes(filterSearch);
    });
    setFilteredData(data);
  };

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
            <SearchBar Filter={filterSearch} />
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
        <ClientTable filteredData={filteredData} />
      </Box>
    </Box>
  );
}
