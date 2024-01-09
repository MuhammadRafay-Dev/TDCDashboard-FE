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
  VStack,
} from "@chakra-ui/react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import Select from "react-select";
import { toast } from "react-toastify";
import { taskValidationSchema } from "schema";
import { addTask, getTask, updateTask } from "store/thunk/task.thunk";

const TaskModal = ({
  isOpen,
  onClose,
  onBack,
  members,
  clients,
  leads,
  taskProp,
  taskId,
}) => {
  const dispatch = useDispatch();
  const isUpdateMode = !!taskId;

  const handleSubmit = async (value) => {
    try {
      if (taskId) {
        await dispatch(updateTask({ value, taskId }));
        toast.success("Lead Edit successfully!");
      } else {
        console.log("add", value);
        await dispatch(addTask(value));
        toast.success("Lead Add successfully!");
      }

      // Refresh Clients after the update
      dispatch(getTask());

      // Close the modal after submitting
      onClose();
    } catch (error) {
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
  // console.log("JJ",taskProp?.taskTechResources)

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{isUpdateMode ? "Edit Task" : "Add Task"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={{
              name: taskProp?.name || "",
              lead: taskProp?.lead || "",
              client: taskProp?.client || "",
              salesMember: taskProp?.salesMember || "",
              taskDiscription: taskProp?.taskDiscription || "",
              taskSideNote: taskProp?.taskSideNote || "",
              taskStartDate: taskProp?.taskStartDate
                ? new Date(taskProp.taskStartDate).toLocaleDateString("en-CA")
                : "",
              taskEndDate: taskProp?.taskEndDate
                ? new Date(taskProp.taskEndDate).toLocaleDateString("en-CA")
                : "",
              taskSupervisor: taskProp?.taskSupervisor || "",
              taskTechResources: taskProp?.taskTechResources || [],
              taskLink1: taskProp?.taskLink1 || "",
              taskLink2: taskProp?.taskLink2 || "",
              taskLink3: taskProp?.taskLink3 || "",
            }}
            validationSchema={taskValidationSchema}
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
                  <FormLabel>Lead</FormLabel>
                  <Field
                    as="select"
                    name="lead"
                    placeholder="lead"
                    style={inputStyle}
                  >
                    <option value="" disabled>
                      Select Lead
                    </option>
                    {leads &&
                      leads?.map((row, index) => {
                        return (
                          <option key={row?._id} value={row?._id}>
                            {row?.name}
                          </option>
                        );
                      })}
                  </Field>
                  <ErrorMessage name="lead" component="p" style={errorStyle} />
                </FormControl>

                <FormControl>
                  <FormLabel>Client</FormLabel>
                  <Field
                    as="select"
                    name="client"
                    placeholder="Client"
                    style={inputStyle}
                  >
                    <option value="" disabled>
                      Select Client
                    </option>
                    {clients &&
                      clients?.map((row, index) => {
                        // console.log(row, "Clients")
                        return (
                          <option key={row?._id} value={row?._id}>
                            {row?.name}
                          </option>
                        );
                      })}
                  </Field>
                  <ErrorMessage
                    name="client"
                    component="p"
                    style={errorStyle}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Sales Member</FormLabel>
                  <Field
                    as="select"
                    name="salesMember"
                    placeholder="Sales Member"
                    style={inputStyle}
                  >
                    <option value="" disabled>
                      Select Role Member
                    </option>
                    {members &&
                      members
                        .filter(
                          (row) =>
                            row.role === "BUSINESS_MANAGER" ||
                            row.role === "SALES_AGENTS"
                        )
                        .map((filteredMember) => (
                          <option
                            key={filteredMember?._id}
                            value={filteredMember?._id}
                          >
                            {filteredMember?.role}
                          </option>
                        ))}
                  </Field>
                  <ErrorMessage
                    name="salesMember"
                    component="p"
                    style={errorStyle}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Task Discription</FormLabel>
                  <Field
                    type="text"
                    name="taskDiscription"
                    placeholder="Task Discription"
                    style={inputStyle}
                  />
                  <ErrorMessage
                    name="taskDiscription"
                    component="p"
                    style={errorStyle}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Task Side Note</FormLabel>
                  <Field
                    type="text"
                    name="taskSideNote"
                    placeholder="Task Side Note"
                    style={inputStyle}
                  />
                  <ErrorMessage
                    name="taskSideNote"
                    component="p"
                    style={errorStyle}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Task Start Date</FormLabel>
                  <Field
                    type="date"
                    name="taskStartDate"
                    placeholder="Task Start Date"
                    style={inputStyle}
                  />
                  <ErrorMessage
                    name="taskStartDate"
                    component="p"
                    style={errorStyle}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Task End Date</FormLabel>
                  <Field
                    type="date"
                    name="taskEndDate"
                    placeholder="Task End Date"
                    style={inputStyle}
                  />
                  <ErrorMessage
                    name="taskEndDate"
                    component="p"
                    style={errorStyle}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Task Supervisor</FormLabel>
                  <Field
                    as="select"
                    name="taskSupervisor"
                    placeholder="Task Supervisor"
                    style={inputStyle}
                  >
                    <option value="" disabled>
                      Select Supervisor
                    </option>
                    {members &&
                      members?.map((row, index) => (
                        <option key={row?._id} value={row?._id}>
                          {row?.name}
                        </option>
                      ))}
                  </Field>
                  <ErrorMessage
                    name="taskSupervisor"
                    component="p"
                    style={errorStyle}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Task Tech Resources</FormLabel>
                  <Field
                    name="taskTechResources"
                    component={({ field, form }) => {
                      const onChange = (selectedOptions) => {
                        form.setFieldValue(
                          "taskTechResources",
                          selectedOptions.map((option) => option.value)
                        );
                      };
                      const selectedOptions = members
                        .filter((member) => field.value.includes(member._id))
                        .map((row) => ({
                          value: row._id,
                          label: row.name,
                        }));

                      return (
                        <Select
                          options={members.map((row) => ({
                            value: row._id,
                            label: row.name,
                          }))}
                          isMulti
                          onChange={onChange}
                          value={selectedOptions?._id}
                          placeholder="Task Tech Resources"
                        />
                      );
                    }}
                  />
                  <ErrorMessage
                    name="taskTechResources"
                    component="p"
                    style={errorStyle}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Task Link 1</FormLabel>
                  <Field
                    type="text"
                    name="taskLink1"
                    placeholder="Task Link 1"
                    style={inputStyle}
                  />
                  <ErrorMessage
                    name="taskLink1"
                    component="p"
                    style={errorStyle}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Task Link 2</FormLabel>
                  <Field
                    type="text"
                    name="taskLink2"
                    placeholder="Task Link 2"
                    style={inputStyle}
                  />
                  <ErrorMessage
                    name="taskLink2"
                    component="p"
                    style={errorStyle}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Task Link 3</FormLabel>
                  <Field
                    type="text"
                    name="taskLink3"
                    placeholder="Task Link 3"
                    style={inputStyle}
                  />
                  <ErrorMessage
                    name="taskLink3"
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

export default memo(TaskModal);
