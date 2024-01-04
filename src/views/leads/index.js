import { Box, Button, ChakraProvider } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClients } from "store/thunk/client.thunk";
import { getMembers } from "store/thunk/member.thunk";
import LeadModal from "./components/LeadModal";
import LeadTable from "./components/LeadTable";
import { SearchBar } from "components/navbar/searchBar/SearchBar";
export default function Leads() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [members, setMembers] = useState([]);
  const [clients, setClients] = useState([]);
  const dispatch = useDispatch();
  const { leads } = useSelector((state) => state.lead.data);
  const [filteredData, setFilteredData] = useState("");

  const handleClick = () => {
    setIsModalOpen(true);
    dispatch(getMembers()).then((res) => {
      setMembers(res.payload);
    });

    dispatch(getClients()).then((res) => {
      setClients(res.payload);
    });
  };
  //Search
  useEffect(() => {
    setFilteredData(leads);
  }, [leads]);

  const handleBack = () => {
    // Handle going back logic
    setIsModalOpen(false); // Close the modal when going back
  };
  //Search
  const filterSearch = (search) => {
    const data = leads?.filter((data) => {
      return search.toLowerCase() === ""
        ? data
        : data?.name.toLowerCase().includes(search) ||
            data?.salesTeamMember?.name.toLowerCase().includes(search) ||
            data?.client?.toLowerCase().includes(search);
    });
    setFilteredData(data);
  };

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <ChakraProvider>
        <Box display="flex" justifyContent="space-between">
          <Box padding={"8px"} backgroundColor={"white"} borderRadius={"30px"}>
            <SearchBar Filter={filterSearch} />
          </Box>
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
        <LeadTable filteredData={filteredData} />
      </Box>
    </Box>
  );
}
