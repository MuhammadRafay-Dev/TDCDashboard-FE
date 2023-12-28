import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addDepartments,
  getDepartments,
  updateDepartments,
} from "../../../store/thunk/department.thunk";

const EmployeeFormModal = ({
  isOpen,
  onClose,
  onBack,
  members,
  formProp,
  departmentId,
}) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    // Update the state when formProp changes
    setFormData({ ...formProp });
  }, [formProp]);

  // console.log(
  //   "fromProp", formProp,formData
  // );
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (departmentId) {
      dispatch(updateDepartments({formData, departmentId}));
    } else {
      dispatch(addDepartments(formData));
    }
    // dispatch(getDepartments());
    onClose(); // Close the modal after submitting
    dispatch(getDepartments());
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Department</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="stretch">
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Department Head</FormLabel>
              <Select
                name="departmentHead"
                value={formData.departmentHead}
                onChange={handleChange}
              >
                {members &&
                  members?.map((row, index) => {
                    return (
                      <option key={row?._id} value={row?._id}>
                        {row?.name}
                      </option>
                    );
                  })}
              </Select>
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <HStack spacing={4}>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Submit
            </Button>
            <Button onClick={onBack}>Back</Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EmployeeFormModal;
