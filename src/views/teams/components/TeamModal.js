import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const TeamModal = ({
  open,
  close,
  onSave,
  editData,
  edit,
  memberData,
  departmentData,
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

  const handleInputChange = (field, value) => {
    let updatedValue;

    if (field === "members") {
      // Check if the value is an array, if not, set it as an array
      updatedValue = Array.isArray(value)
        ? value.map((option) => option.value)
        : [value];
    } else {
      updatedValue = value;
    }

    setTeamData((prevData) => ({
      ...prevData,
      [field]: updatedValue,
    }));
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
      edit(teamData);
    } else {
      onSave(teamData);
      setTeamData(initialData);
    }

    close();
  };

  useEffect(() => {
    if (editData) {
      setTeamData(editData);
    } else {
      setTeamData(initialData);
    }
  }, [editData]);

  // console.log("State ", memberData);
  // console.log("Edit Data", editData);
  // console.log("Departments", departmentData);
  // console.log("Teams", teamData);

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
                placeholder="Email"
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
              <FormLabel>Members</FormLabel>
              <Select
                placeholder="Members"
                value={teamData.members}
                onChange={(e) => {
                  handleInputChange("members", e.target.value);
                }}
              >
                {memberData?.map((option) => (
                  <option key={option._id} value={option._id}>
                    {option.name}
                  </option>
                ))}
              </Select>
            </FormControl>

            {/* </Flex> */}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => handleSubmit()}>
              Save
            </Button>
            <Button onClick={close}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TeamModal;
