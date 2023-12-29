import {
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
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { toast } from "react-toastify";

const ProjectModal = ({
  open,
  close,
  onSave,
  editData,
  edit,
  memberData,
  departmentData,
  teamData,
}) => {
  const initialData = {
    name: "",
    stack: "",
    team_lead: "",
    sales_coordinator: "",
    teams_assigned: [],
    platform: "",
    contract_type: "",
    client: "",
    consultant: "",
    status: "",
    duration: 0,
    duration_unit: "",
    start_date: "2023-01-07",
    end_date: "2023-01-10",
    cost: "",
  };
  const [projectData, setProjectData] = useState(initialData);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isExpanded2, setIsExpanded2] = useState(false);

  const handleInputChange = (field, values) => {
    setProjectData((prevData) => ({
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
    if (!projectData.name) {
      toast.error("Name is required!");
      return;
    }
    if (!projectData.stack) {
      toast.error("Technology is required!");
      return;
    }
    if (!projectData.team_lead) {
      toast.error("Technology is required!");
      return;
    }
    if (!projectData.sales_coordinator) {
      toast.error("Sales Coordinator is required!");
      return;
    }
    // if (!projectData.teams_assigned) {
    //   toast.error("Department is required!");
    //   return;
    // }
    if (!projectData.platform) {
      toast.error("Platform is required!");
      return;
    }
    if (!projectData.contract_type) {
      toast.error("Contract Type is required!");
      return;
    }
    if (!projectData.client) {
      toast.error("CLient is required!");
      return;
    }
    if (!projectData.consultant) {
      toast.error("Consultant is required!");
      return;
    }
    if (!projectData.status) {
      toast.error("Status is required!");
      return;
    }
    if (!projectData.duration_unit) {
      toast.error("Duration Unit is required!");
      return;
    }
    if (!projectData.cost) {
      toast.error("Cost is required!");
      return;
    }

    if (editData) {
      if (!projectData.teams_assigned) {
        const { teams_assigned, ...newMemData } = teamData;
        edit(newMemData);
      } else {
        edit(projectData);
      }
    } else {
      onSave(projectData);
      setProjectData(initialData);
    }

    setIsExpanded(false);
    setIsExpanded2(false);

    close();
  };

  useEffect(() => {
    if (editData) {
      setProjectData(editData);
      setProjectData((prevData) => ({
        ...prevData,
        department: editData?.department?._id || "",
        team_head: editData?.team_head?._id || "",
        members: editData?.members?.map((member) => member._id) || "",
      }));
    } else {
      setProjectData(initialData);
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
                value={projectData.name}
                onChange={(e) => {
                  handleInputChange("name", e.target.value);
                }}
                required
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Stack</FormLabel>
              <Input
                placeholder="Stack"
                value={projectData.stack}
                onChange={(e) => {
                  handleInputChange("stack", e.target.value);
                }}
                required
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Team Lead</FormLabel>
              <Select
                placeholder="Team Lead"
                value={projectData.team_lead}
                onChange={(e) => {
                  handleInputChange("team_lead", e.target.value);
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
              <FormLabel>Sales Coordinator</FormLabel>
              <Select
                placeholder="Sales Coordinator"
                value={projectData.sales_coordinator}
                onChange={(e) => {
                  handleInputChange("sales_coordinator", e.target.value);
                }}
              >
                {memberData?.map((option) => (
                  <option key={option._id} value={option._id}>
                    {option.name}
                  </option>
                ))}
              </Select>
            </FormControl>

            {/* <FormControl mt={4}>
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
                  </FormControl>*/}

            <FormControl mt={4}>
              <FormLabel>Platform</FormLabel>
              <Input
                placeholder="PLatform"
                value={projectData.platform}
                onChange={(e) => {
                  handleInputChange("platform", e.target.value);
                }}
                required
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Contract Type</FormLabel>
              <Select
                placeholder="Contact Type"
                value={projectData.contract_type}
                onChange={(e) => {
                  handleInputChange("contract_type", e.target.value);
                }}
                required
              >
                <option value={"Hourly"}>Hourly</option>
                <option value={"Fixed"}>Fixed</option>
                <option value={"Job"}>Job</option>
                <option value={"Milestone"}>Milestone</option>
              </Select>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Client</FormLabel>
              <Select
                placeholder="Client"
                value={projectData.client}
                onChange={(e) => {
                  handleInputChange("client", e.target.value);
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
              <FormLabel>Consultant</FormLabel>
              <Input
                placeholder="Consultant"
                value={projectData.consultant}
                onChange={(e) => {
                  handleInputChange("consultant", e.target.value);
                }}
                required
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Status</FormLabel>
              <Select
                placeholder="Status"
                value={projectData.status}
                onChange={(e) => {
                  handleInputChange("status", e.target.value);
                }}
              >
                <option value={"on-going"}>On-Going</option>
                <option value={"completed"}>Completed</option>
              </Select>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Duration</FormLabel>
              <NumberInput
                defaultValue={0}
                min={10}
                max={20}
                value={projectData.duration}
                onChange={(e) => {
                  handleInputChange("duration", e.target.value);
                }}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Duration Unit</FormLabel>
              <Select
                placeholder="Duration Unit"
                value={projectData.duration_unit}
                onChange={(e) => {
                  handleInputChange("duration_unit", e.target.value);
                }}
              >
                <option value={"Months"}>Months</option>
                <option value={"Weeks"}>Weeks</option>
                <option value={"Days"}>Days</option>
              </Select>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Cost</FormLabel>
              <Input
                placeholder="Cost"
                value={projectData.cost}
                onChange={(e) => {
                  handleInputChange("cost", e.target.value);
                }}
                required
              />
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

export default ProjectModal;
