import { Box, Button, ChakraProvider } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DepartmentTable from "./components/DepartmentTable";
import EmployeeFormModal from "./components/EmployeeFormModal";
import { getMembers } from "store/thunk/member.thunk";
import { SearchBar } from "components/navbar/searchBar/SearchBar";

export default function Departments() {
  const { departments } = useSelector((state) => state.department.data);
  const [filteredData, setFilteredData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const [members, setMembers] = useState([]);

  const handleClick = () => {
    setIsModalOpen(true);
    dispatch(getMembers()).then((res) => {
      setMembers(res.payload);
    });
  };
  useEffect(() => {
    setFilteredData(departments);
  }, [departments]);

  //Search
  const filterSearch = (search) => {
    const filterSearch = search.toLowerCase();
    const data = departments?.filter((data) => {
      return filterSearch === ""
        ? data
        : data?.name.toLowerCase().includes(filterSearch) ||
            data?.departmentHead?.name.toLowerCase().includes(filterSearch) ||
            data?.departmentHead?.email.toLowerCase().includes(filterSearch);
    });
    setFilteredData(data);
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
        <DepartmentTable filteredData={filteredData} />
      </Box>
    </Box>
  );
}
