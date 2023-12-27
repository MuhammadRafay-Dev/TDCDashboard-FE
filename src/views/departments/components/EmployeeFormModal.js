import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  VStack,
  HStack,
  Alert,
} from '@chakra-ui/react';
import { useSelector, useDispatch } from "react-redux";
import addDepartments from "../../../store/thunk/department.thunk";

const EmployeeFormModal = ({ isOpen, onClose, onBack }) => {
  const dispatch = useDispatch();
  const isSuccess = useSelector((state) => state.data);
  const [formData, setFormData] = useState({
    name: '',
    departmentHead: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addDepartments(formData));

    // Perform any validation before submitting

    // onSubmit(formData);
    // onClose(); // Close the modal after submitting
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Department</ModalHeader>
        <ModalCloseButton />

        {
          isSuccess && (
            <Alert status="success" variant="subtle">
              Successfully added department.
            </Alert>
          )
        }

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
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="employee">Employee</option>
                <option value="hr">HR</option>
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
