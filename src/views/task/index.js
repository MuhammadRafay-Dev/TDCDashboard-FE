import { Box, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClients } from "store/thunk/client.thunk";
import { getMembers } from "store/thunk/member.thunk";
import { getLeads } from "store/thunk/lead.thunk";
import { SearchBar } from "components/navbar/searchBar/SearchBar";
import TaskTable from "./components/TaskTable";
import TaskModal from "./components/TaskModal";
export default function Task() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [members, setMembers] = useState([]);
  const [clients, setClients] = useState([]);
  const [leads, setLeads] = useState([]);
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.task.data);
  const [filteredData, setFilteredData] = useState("");

  const handleClick = () => {
    setIsModalOpen(true);
    dispatch(getMembers()).then((res) => {
      setMembers(res.payload);
    });

    dispatch(getClients()).then((res) => {
      setClients(res.payload);
    });
    dispatch(getLeads()).then((res) => {
      setLeads(res.payload);
    });
  };
  //Search
  useEffect(() => {
    setFilteredData(tasks);
  }, [tasks]);

  const handleBack = () => {
    setIsModalOpen(false); 
  };
  
  //Search
  const filterSearch = (search) => {
    const filterSearch = search.toLowerCase();
    const data = tasks?.filter((data) => {
      return filterSearch === ""
        ? data
        : data?.name.toLowerCase().includes(filterSearch) ||
            data?.createdBy?.name.toLowerCase().includes(filterSearch) ||
            data?.client?.name.toLowerCase().includes(filterSearch);
    });
    setFilteredData(data);
  };

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Box display="flex" justifyContent="space-between">
        <Box padding={"8px"} backgroundColor={"white"} borderRadius={"30px"}>
          <SearchBar
           Filter={filterSearch}
          />
        </Box>
        <Button colorScheme="blue" onClick={handleClick}>
          Add Task
        </Button>
      </Box>
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onBack={handleBack}
        members={members}
        clients={clients}
        leads={leads}
      />
      <Box>
        <TaskTable filteredData={filteredData} />
      </Box>
    </Box>
  );
}
