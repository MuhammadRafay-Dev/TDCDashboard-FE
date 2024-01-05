import {
  Button,
  FormControl,
  FormLabel,
  HStack,
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
import { useDispatch } from "react-redux";
import {
  addDepartments,
  getDepartments,
  updateDepartments,
} from "../../../store/thunk/department.thunk";
import { toast } from "react-toastify";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { departmentValidationSchema } from "schema";

const EmployeeFormModal = ({
  isOpen,
  onClose,
  onBack,
  members,
  formProp,
  departmentId,
}) => {
  const dispatch = useDispatch();
  const isUpdateMode = !!departmentId;

  const handleSubmit = async (value) => {
    try {
      if (departmentId) {
        // Update existing Department
        await dispatch(updateDepartments({ value, departmentId }));
        toast.success("Department Edit successfully!");
      } else {
        // Add new Department
        await dispatch(addDepartments(value));
        toast.success("Department Add successfully!");
      }

      // Refresh Clients after the update
      dispatch(getDepartments());

      // Close the modal after submitting
      onClose();
    } catch (error) {
      // Display error toast
      toast.error("An error occurred. Please try again.");
    }
  };

  const inputStyle = {
    border: "1px solid #ccc",
    borderRadius: "5px",
    width: "100%",
    padding: "10px",
  };

  const errorStyle = {
    color: "red",
    marginTop: "5px",
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {isUpdateMode ? "Edit Department" : "Add Department"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={{
              name: formProp?.name || "",
              departmentHead: formProp?.departmentHead || "",
            }}
            validationSchema={departmentValidationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <VStack spacing={4} align="stretch">
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Field
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Name"
                    style={inputStyle}
                  />
                  <ErrorMessage name="name" component="p" style={errorStyle} />
                </FormControl>

                <FormControl>
                  <FormLabel>Department Head</FormLabel>
                  <Field
                    as={Select}
                    name="departmentHead"
                    placeholder="Select Department Head"
                    style={inputStyle}
                  >
                    {members &&
                      members?.map((row, index) => {
                        return (
                          <option key={row?._id} value={row?._id}>
                            {row?.name}
                          </option>
                        );
                      })}
                  </Field>
                  <ErrorMessage
                    name="departmentHead"
                    component="p"
                    style={errorStyle}
                  />
                </FormControl>
              </VStack>
              <ModalFooter>
                <HStack spacing={4}>
                  <Button colorScheme="blue" type="submit">
                    Submit
                  </Button>
                  <Button onClick={onBack}>Back</Button>
                </HStack>
              </ModalFooter>
            </Form>
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EmployeeFormModal;
