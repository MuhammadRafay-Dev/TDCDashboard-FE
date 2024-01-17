import {
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  Box,
  useColorModeValue,
  Td,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import { getTeams } from "store/thunk/team.thunk";
import { SearchBar } from "components/navbar/searchBar/SearchBar";
import Loader from "components/loader/Loader";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

const DepartmentTeamTable = () => {
  const dispatch = useDispatch();
  //States
  const teamData = useSelector((state) => state.teams?.data);
  console.log(teamData,"Hellooo========")
  const [teams, setTeams] = useState(teamData);
  const [isLoading, setIsLoading] = useState(true);
  // const [rowLoadingStates, setRowLoadingStates] = useState(
  //   teams?.map(() => false) || []
  // );

  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const id = queryParams.get("id");

  //Search
  const filterSearch = (search) => {
    const filterSearch = search.toLowerCase();
    const data = teamData?.filter((data) => {
      return filterSearch === ""
        ? data
        : data?.name.toLowerCase().includes(filterSearch) ||
            data?.technology.toLowerCase().includes(filterSearch) ||
            data?.department?.name.toLowerCase().includes(filterSearch) ||
            data?.team_head?.name.toLowerCase().includes(filterSearch) ||
            data?.members
              .map((member) => member?.name)
              .join(", ")
              .toLowerCase()
              .includes(filterSearch) ||
            data?.projects
              .map((project) => project?.name)
              .join(", ")
              .toLowerCase()
              .includes(filterSearch);
    });
    setTeams(data);
  };

  useEffect(() => {
    setIsLoading(true);
    dispatch(getTeams())
      .then((res) => {
        const filteredTeams = res.payload?.filter(
          (teams) => teams?.department?._id === id
        );
        // setTeams(res.payload);
        setTeams(filteredTeams);
        setIsLoading(false);
      })
      .catch((err) => {
        toast.error("Error in getting Teams");
      });
  }, [id]);

  let menuBg = useColorModeValue("white", "navy.800");

  return (
    <div>
      <Box display="flex" justifyContent="space-between">
        <Box
          w={{ sm: "100%", md: "auto" }}
          bg={menuBg}
          p="8px"
          borderRadius="30px"
        >
          <SearchBar Filter={filterSearch} />
        </Box>
      </Box>
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          {/* <SimpleGrid>
            <Box>
              <Text fontSize="xl" fontWeight="bold">
                {teamData?.name}
                <span style={{ fontSize: "md", color: "grey" }}>
                  {" "}
                  ({teams?.department?._id })
                </span>
              </Text>
            </Box>
          </SimpleGrid> */}
          <TableContainer>
            <Table variant="striped">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Technology</Th>
                  <Th>Department</Th>
                  <Th>Team Head</Th>
                  <Th>Members</Th>
                  <Th>Projects</Th>
                </Tr>
              </Thead>
              <Tbody>
                {teams?.map((row, index) => (
                  <React.Fragment key={index}>
                    <Tr>
                      <Td>{row?.name}</Td>
                      <Td>{row?.technology}</Td>
                      <Td>{row.department ? row.department.name : "N/A"}</Td>
                      <Td>{row.team_head ? row.team_head.name : "N/A"}</Td>
                      <Td>
                        {row.members && row.members.length > 0
                          ? row.members?.map((member) => member.name).join(", ")
                          : "N/A"}
                      </Td>
                      <Td>
                        {row.projects && row.projects.length > 0
                          ? row.projects
                              ?.map((project) => project.name)
                              .join(", ")
                          : "N/A"}
                      </Td>
                    </Tr>
                  </React.Fragment>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </>
      )}
    </div>
  );
};

export default DepartmentTeamTable;
