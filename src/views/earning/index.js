import { Box, Button } from "@chakra-ui/react";
import { SearchBar } from "components/navbar/searchBar/SearchBar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDepartments } from "store/thunk/department.thunk";
import { getMembers } from "store/thunk/member.thunk";
import EarningModal from "./components/EarningModal";
import EarningTable from "./components/EarningTable";
import { getProjects } from "store/thunk/project.thunk";
export default function Task() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [members, setMembers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [departments, setDepartments] = useState([]);
  const dispatch = useDispatch();
  const { earnings } = useSelector((state) => state.earning.data);
  const [filteredData, setFilteredData] = useState("");

  const handleClick = () => {
    setIsModalOpen(true);
    dispatch(getMembers()).then((res) => {
      setMembers(res.payload);
    });
    dispatch(getDepartments()).then((res) => {
      setDepartments(res.payload);
    });
    dispatch(getProjects()).then((res) => {
      setProjects(res.payload);
    });
  };
  //Search
  useEffect(() => {
    setFilteredData(earnings);
  }, [earnings]);

  const handleBack = () => {
    setIsModalOpen(false);
  };

  //Search
  const filterSearch = (search) => {
    const filterSearch = search.toLowerCase();
    const data = earnings?.filter((data) => {
      return filterSearch === ""
        ? data
        : data?.member?.name.toLowerCase().includes(filterSearch) ||
            data?.department?.name.toLowerCase().includes(filterSearch);
    });
    setFilteredData(data);
  };

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Box display="flex" justifyContent="space-between">
        <Box padding={"8px"} backgroundColor={"white"} borderRadius={"30px"}>
          <SearchBar Filter={filterSearch} />
        </Box>
        <Button colorScheme="blue" onClick={handleClick}>
          Add Earning
        </Button>
      </Box>
      <EarningModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onBack={handleBack}
        members={members}
        departments={departments}
        projects={projects}
      />
      <Box>
        <EarningTable filteredData={filteredData} />
      </Box>
    </Box>
  );
}
