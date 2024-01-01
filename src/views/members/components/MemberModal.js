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
  Select,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { toast } from "react-toastify";

const MemberModal = ({
  open,
  close,
  onSave,
  editData,
  edit,
  teamData,
  departmentData,
}) => {
  const initialData = {
    name: "",
    email: "",
    contactNumber: "",
    role: "",
    department: "",
    teams: [],
    emergencyContactName: "",
    emergencyContactNumber: "",
    emergencyContactRelation: "",
  };
  const [memberData, setMemberData] = useState(initialData);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleInputChange = (field, values) => {
    setMemberData((prevData) => ({
      ...prevData,
      [field]: values,
    }));
  };

  const handleModalClose = () => {
    setIsExpanded(false);
    close();
  };

  const handleSubmit = () => {
    if (!memberData.name) {
      toast.error("Name is required!");
      return;
    }
    if (!memberData.email) {
      toast.error("Email is required!");
      return;
    }
    if (!memberData.role) {
      toast.error("Role is required!");
      return;
    }
    if (!memberData.contactNumber) {
      toast.error("Contact Number is required!");
      return;
    }

    if (!memberData.department) {
      const { department, ...newMemberData } = memberData;
      setMemberData(newMemberData);
      if (editData) {
        if (!memberData.teams) {
          const { teams, ...newMemData } = memberData;
          edit(newMemData);
        } else {
          edit(newMemberData);
        }
      } else {
        onSave(newMemberData);
        setMemberData(initialData);
      }
    } else {
      if (editData) {
        if (!memberData.teams) {
          const { teams, ...newMemberData } = memberData;
          edit(newMemberData);
        } else {
          edit(memberData);
        }
      } else {
        onSave(memberData);
        setMemberData(initialData);
      }
    }

    setIsExpanded(false);
    close();
  };

  useEffect(() => {
    if (editData) {
      setMemberData(editData);
      setMemberData((prevData) => ({
        ...prevData,
        department: editData?.department?._id || "",
        teams: editData?.teams?.map((team) => team._id) || "",
      }));
    } else {
      setMemberData(initialData);
    }
  }, [editData]);

  const RoleOptions = [
    "",
    "ADMIN",
    "HR",
    "BUSINESS_MANAGER",
    "SALES_AGENT",
    "TECH",
    "HELPER",
  ];

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
                value={memberData.name}
                onChange={(e) => {
                  handleInputChange("name", e.target.value);
                }}
                required
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input
                placeholder="Email"
                value={memberData.email}
                onChange={(e) => {
                  handleInputChange("email", e.target.value);
                }}
                required
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Role</FormLabel>
              <Select
                placeholder=""
                value={memberData.role}
                onChange={(e) => {
                  handleInputChange("role", e.target.value);
                }}
                required
              >
                {RoleOptions.map((option) => (
                  <option value={option}>{option}</option>
                ))}
              </Select>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Contact Number</FormLabel>
              <Input
                placeholder="Contact Number"
                value={memberData.contactNumber}
                onChange={(e) => {
                  handleInputChange("contactNumber", e.target.value);
                }}
                required
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Department</FormLabel>
              <Select
                placeholder="Department"
                value={memberData.department}
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
              <FormLabel>Team</FormLabel>
              <IconButton
                icon={isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                onClick={() => setIsExpanded(!isExpanded)}
                aria-label={isExpanded ? "Collapse" : "Expand"}
                mb={2}
              />
              <Collapse in={isExpanded}>
                <Wrap spacing={4}>
                  {teamData?.map((option) => (
                    <WrapItem key={option._id}>
                      <Checkbox
                        value={option._id}
                        onChange={(e) => {
                          const selectedValues = e.target.checked
                            ? [...memberData.teams, option._id]
                            : memberData.teams.filter(
                                (id) => id !== option._id
                              );
                          handleInputChange("teams", selectedValues);
                        }}
                        isChecked={memberData.teams.includes(option._id)}
                      >
                        {option.name}
                      </Checkbox>
                    </WrapItem>
                  ))}
                </Wrap>
              </Collapse>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Emergency Contact Name</FormLabel>
              <Input
                placeholder="Name"
                value={memberData.emergencyContactName}
                onChange={(e) => {
                  handleInputChange("emergencyContactName", e.target.value);
                }}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Emergency Contact Number</FormLabel>
              <Input
                placeholder="Number"
                value={memberData.emergencyContactNumber}
                onChange={(e) => {
                  handleInputChange("emergencyContactNumber", e.target.value);
                }}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Emergency Contact Relation</FormLabel>
              <Input
                placeholder="Relation"
                value={memberData.emergencyContactRelation}
                onChange={(e) => {
                  handleInputChange("emergencyContactRelation", e.target.value);
                }}
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

export default MemberModal;
