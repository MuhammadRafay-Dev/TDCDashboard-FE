import {
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  Box,
  Flex,
  Button,
  useDisclosure,
  useColorModeValue,
  Icon,
  Td,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { getMembers } from "store/reducer/member.reducer";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { toast } from "react-toastify";
import { getTeams } from "store/reducer/teams.reducer";
import { useEffect, useState } from "react";
import { getDepartments } from "store/thunk/department.thunk";
import TeamModal from "./TeamModal";
import { addTeam } from "store/reducer/teams.reducer";
import { deleteTeam } from "store/reducer/teams.reducer";
import { editTeam } from "store/reducer/teams.reducer";
import { getProjects } from "store/reducer/projects.reducer";

const TeamTable = () => {
  //States
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const data = useSelector((state) => state.members?.data);
  const [members, setMembers] = useState(data);
  const [teamEditData, setTeamEditData] = useState(null);
  const teamData = useSelector((state) => state.teams?.data);
  const [teams, setTeams] = useState(teamData);
  console.log("teams", teams);
  const departmentData = useSelector(
    (state) => state.department?.data?.departments
  );
  const [departments, setDepartments] = useState(departmentData);
  const projectData = useSelector((state) => state.projects?.data);
  const [projects, setProjects] = useState(projectData);

  //API Calls
  const triggerSave = () => {
    setTeamEditData(null);
    onOpen();
  };

  const handleSaveTeam = (teamData) => {
    try {
      dispatch(addTeam({ teamData })).then((res) => {
        dispatch(getTeams()).then((res) => {
          setTeams(res.payload);
          toast.success("Team Added Succesfully");
        });
      });
    } catch (error) {
      console.error("Error adding team", error);
      toast.error("Error adding team");
    }
  };

  const handleDelete = (id) => {
    try {
      dispatch(deleteTeam(id)).then((res) => {
        dispatch(getTeams()).then((res) => {
          setTeams(res.payload);
          toast.success("Team Deleted Succesfully");
        });
      });
    } catch (error) {
      console.log("Error Deleting Member");
      toast.error("Error Deleting Member");
    }
  };

  const triggerEdit = (rowData) => {
    setTeamEditData(rowData);
    onOpen();
  };

  const handleEditTeam = (memberData) => {
    console.log("Edit Data function", memberData);
    try {
      dispatch(editTeam(memberData)).then((res) => {
        dispatch(getTeams()).then((res) => {
          setTeams(res.payload);
          toast.success("Team Edited Succesfully");
        });
      });
    } catch (error) {
      console.log("Error Editing Member");
      toast.error("Error Editing Member");
    }
  };

  useEffect(() => {
    dispatch(getMembers()).then((res) => {
      setMembers(res.payload);
    });
    dispatch(getTeams()).then((res) => {
      setTeams(res.payload);
    });
    dispatch(getDepartments()).then((res) => {
      setDepartments(res.payload);
    });
    dispatch(getProjects()).then((res) => {
      setProjects(res.payload);
    });
  }, []);

  //Colors
  const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const bgHover = useColorModeValue(
    { bg: "secondaryGray.400" },
    { bg: "whiteAlpha.50" }
  );
  const bgFocus = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.100" }
  );

  return (
    <div>
      <TeamModal
        open={isOpen}
        close={onClose}
        onSave={handleSaveTeam}
        editData={teamEditData}
        edit={handleEditTeam}
        memberData={members}
        departmentData={departments}
      />
      <Box display="flex" justifyContent="space-between">
        <h1>Teams</h1>
        <Button colorScheme="blue" onClick={() => triggerSave()}>
          Add Team
        </Button>
      </Box>
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
            {teams?.map((row) => (
              <Tr key={row._id}>
                <Td>{row.name}</Td>
                <Td>{row.technology}</Td>
                <Td>{row.department ? row.department.name : "N/A"}</Td>
                <Td>{row.team_head ? row.team_head.name : "N/A"}</Td>
                <Td>
                  {row.members && row.members.length > 0
                    ? row.members?.map((member) => member.name).join(", ")
                    : "N/A"}
                </Td>
                <Td>
                  {row.project
                    ? projects?.find(
                        (project) => project._id === row.project._id
                      )?.name
                    : "N/A"}
                </Td>
                {/* <Td>
                  {row.projects && row.projects.length > 0
                    ? row.projects?.map((project) => project.name).join(", ")
                    : "N/A"}
                </Td> */}
                <Td>
                  <Button
                    align="center"
                    justifyContent="center"
                    bg={bgButton}
                    _hover={bgHover}
                    _focus={bgFocus}
                    _active={bgFocus}
                    w="37px"
                    h="37px"
                    lineHeight="100%"
                    borderRadius="10px"
                    onClick={() => triggerEdit(row)}
                  >
                    <Icon
                      as={EditIcon}
                      color={"blue"}
                      boxSize={5}
                      borderRadius={5}
                      border={"2px solid blue"}
                      marginLeft={"5px"}
                      padding={"2px"}
                    />
                  </Button>

                  <Button
                    align="center"
                    justifyContent="center"
                    bg={bgButton}
                    _hover={bgHover}
                    _focus={bgFocus}
                    _active={bgFocus}
                    w="37px"
                    h="37px"
                    lineHeight="100%"
                    borderRadius="10px"
                    onClick={() => handleDelete(row._id)}
                  >
                    <Icon
                      as={DeleteIcon}
                      color={"blue"}
                      boxSize={5}
                      borderRadius={5}
                      border={"2px solid blue"}
                      marginLeft={"5px"}
                      padding={"2px"}
                    />
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TeamTable;
