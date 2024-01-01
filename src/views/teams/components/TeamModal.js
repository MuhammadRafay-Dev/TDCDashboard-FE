import {
  Box,
  Button,
  Checkbox,
  Collapse,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { toast } from "react-toastify";

const TeamModal = ({
  open,
  close,
  onSave,
  editData,
  edit,
  memberData,
  departmentData,
  projectData,
}) => {
  const initialData = {
    name: "",
    technology: "",
    department: "",
    team_head: "",
    members: [],
    projects: [],
  };
  const [teamData, setTeamData] = useState(initialData);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isExpanded2, setIsExpanded2] = useState(false);

  const handleInputChange = (field, values) => {
    setTeamData((prevData) => ({
      ...prevData,
      [field]: values,
    }));
  };

  const handleModalClose = () => {
    setIsExpanded(false);
    setIsExpanded2(false);
    close();
  };

  const handleSubmit = () => {
    if (!teamData.name) {
      toast.error("Name is required!");
      return;
    }
    if (!teamData.technology) {
      toast.error("Technology is required!");
      return;
    }
    if (!teamData.department) {
      toast.error("Department is required!");
      return;
    }
    if (!teamData.team_head) {
      toast.error("Team Head is required!");
      return;
    }

    if (editData) {
      if (!teamData.members) {
        const { members, ...newMemData } = teamData;
        edit(newMemData);
      } else {
        edit(teamData);
      }
    } else {
      onSave(teamData);
      setTeamData(initialData);
    }

    setIsExpanded(false);
    setIsExpanded2(false);

    close();
  };

  useEffect(() => {
    if (editData) {
      setTeamData(editData);
      setTeamData((prevData) => ({
        ...prevData,
        department: editData?.department?._id || "",
        team_head: editData?.team_head?._id || "",
        members: editData?.members?.map((member) => member._id) || "",
      }));
    } else {
      setTeamData(initialData);
    }
  }, [editData]);

  return (
    <>
      <Modal isOpen={open} onClose={close}>
        <ModalOverlay />
        <ModalContent overflowY="auto" maxHeight={500}>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {/* <Flex direction="row" justify="space-between" flexWrap="wrap"> */}
            <FormControl mt={4}>
              <FormLabel>Name</FormLabel>
              <Input
                placeholder="Name"
                value={teamData.name}
                onChange={(e) => {
                  handleInputChange("name", e.target.value);
                }}
                required
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Technology</FormLabel>
              <Input
                placeholder="Technology"
                value={teamData.technology}
                onChange={(e) => {
                  handleInputChange("technology", e.target.value);
                }}
                required
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Department</FormLabel>
              <Select
                placeholder="Department"
                value={teamData.department}
                onChange={(e) => {
                  handleInputChange("department", e.target.value);
                }}
              >
                {departmentData?.map((option) => (
                  <option key={option._id} value={option._id}>
                    {option.name}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Team Head</FormLabel>
              <Select
                placeholder="Team Head"
                value={teamData.team_head}
                onChange={(e) => {
                  handleInputChange("team_head", e.target.value);
                }}
              >
                {memberData?.map((option) => (
                  <option key={option._id} value={option._id}>
                    {option.name}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl mt={4}>
              <Box display="flex">
                <FormLabel mt={2}>Members</FormLabel>
                <IconButton
                  icon={isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                  onClick={() => setIsExpanded(!isExpanded)}
                  aria-label={isExpanded ? "Collapse" : "Expand"}
                  mb={2}
                />
              </Box>
              <Collapse in={isExpanded}>
                <Wrap spacing={4}>
                  {memberData?.map((option) => (
                    <WrapItem key={option._id}>
                      <Checkbox
                        value={option._id}
                        onChange={(e) => {
                          const selectedValues = e.target.checked
                            ? [...teamData.members, option._id]
                            : teamData.members.filter(
                                (id) => id !== option._id
                              );
                          handleInputChange("members", selectedValues);
                        }}
                        isChecked={teamData.members.includes(option._id)}
                      >
                        {option.name}
                      </Checkbox>
                    </WrapItem>
                  ))}
                </Wrap>
              </Collapse>
            </FormControl>

            <FormControl mt={4}>
              <Box display="flex">
                <FormLabel mt={2}>Projects</FormLabel>
                <IconButton
                  icon={isExpanded2 ? <FaChevronUp /> : <FaChevronDown />}
                  onClick={() => setIsExpanded2(!isExpanded2)}
                  aria-label={isExpanded2 ? "Collapse" : "Expand"}
                  mb={2}
                />
              </Box>
              <Collapse in={isExpanded2}>
                <Wrap spacing={4}>
                  {projectData?.map((option) => (
                    <WrapItem key={option._id}>
                      <Checkbox
                        value={option._id}
                        onChange={(e) => {
                          const selectedValues = e.target.checked
                            ? [...teamData.projects, option._id]
                            : teamData.projects.filter(
                                (id) => id !== option._id
                              );
                          handleInputChange("projects", selectedValues);
                        }}
                        isChecked={teamData.projects.includes(option._id)}
                      >
                        {option.name}
                      </Checkbox>
                    </WrapItem>
                  ))}
                </Wrap>
              </Collapse>
            </FormControl>

            {/* </Flex> */}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => handleSubmit()}>
              Save
            </Button>
            <Button onClick={() => handleModalClose()}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TeamModal;
