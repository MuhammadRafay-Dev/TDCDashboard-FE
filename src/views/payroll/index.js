import { Box, Button } from "@chakra-ui/react";
import { SearchBar } from "components/navbar/searchBar/SearchBar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDepartments } from "store/thunk/department.thunk";
import { getMembers } from "store/thunk/member.thunk";
import PayRollModal from "./components/PayRollModal";
import PayRollTable from "./components/PayRollTable";
export default function Task() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  
  const [members, setMembers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const dispatch = useDispatch();
  const { payrolls } = useSelector((state) => state.payroll.data);
  const [filteredData, setFilteredData] = useState("");

  const handleClick = () => {
    setIsModalOpen(true);
    dispatch(getMembers()).then((res) => {
      setMembers(res.payload);
    });
    dispatch(getDepartments()).then((res) => {
      setDepartments(res.payload);
    });
  };
  //Search
  useEffect(() => {
    setFilteredData(payrolls);
  }, [payrolls]);

  const handleBack = () => {
    setIsModalOpen(false);
  };

  //Search
  const filterSearch = (search) => {
    const filterSearch = search.toLowerCase();
    const data = payrolls?.filter((data) => {
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
          Add PayRoll
        </Button>
      </Box>
      <PayRollModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onBack={handleBack}
        members={members}
        departments={departments}
      />
      <Box>
        <PayRollTable filteredData={filteredData} />
      </Box>
    </Box>
  );
}
