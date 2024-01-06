import {
  Box,
  Button,
  Checkbox,
  Collapse,
  FormControl,
  FormLabel,
  IconButton,
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
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getTeams } from "store/thunk/team.thunk";
import { getClients } from "store/thunk/client.thunk";
import { getMembers } from "store/thunk/member.thunk";
import { projectValidationSchema } from "schema";
import { ErrorMessage, Field, Form, Formik } from "formik";

const ProjectModal = ({ open, close, onSave, editData, edit, index }) => {
  const initialData = {
    name: editData?.name || "",
    tech_stack: editData?.tech_stack || "",
    team_lead: editData?.team_lead?._id || "",
    sales_coordinator: editData?.sales_coordinator?._id || "",
    teams_assigned: editData?.teams_assigned || [],
    platform: editData?.platform || "",
    contract_type: editData?.contract_type || "",
    client: editData?.client?._id || "",
    consultant: editData?.consultant || "",
    status: editData?.status || "",
    duration: editData?.duration || 0,
    duration_unit: editData?.duration || "",
    start_date: editData?.start_date || "",
    end_date: editData?.end_date || "",
    cost: editData?.cost || "",
  };
  const [projectData, setProjectData] = useState(initialData);
  const memberData = useSelector((state) => state.members?.data);
  const [members, setMembers] = useState(memberData);
  const teamData = useSelector((state) => state.teams?.data);
  const [teams, setTeams] = useState(teamData);
  const clientData = useSelector((state) => state.client?.data?.leads);
  const [clients, setClients] = useState(clientData);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleModalClose = () => {
    setIsExpanded(false);
    close();
  };

  const handleSubmit = (values) => {
    if (editData) {
      edit(values, index);
    } else {
      onSave(values);
      setProjectData(initialData);
    }

    setIsExpanded(false);

    close();
  };

  const dispatch = useDispatch();
  useEffect(() => {
    if (open) {
      dispatch(getTeams()).then((res) => {
        setTeams(res.payload);
      });
      dispatch(getMembers()).then((res) => {
        setMembers(res.payload);
      });
      dispatch(getClients()).then((res) => {
        setClients(res.payload);
      });
    }
  }, [open]);

  useEffect(() => {
    if (editData) {
      setProjectData(editData);
      setProjectData((prevData) => ({
        ...prevData,
        team_lead: editData?.team_lead?._id || "",
        sales_coordinator: editData?.sales_coordinator?._id || "",
        client: editData?.client?._id || "",
        teams_assigned: editData?.teams_assigned?.map((team) => team._id) || "",
        start_date: new Date(editData?.start_date).toISOString().split("T")[0],
        end_date: new Date(editData?.end_date).toISOString().split("T")[0],
      }));
    } else {
      setProjectData(initialData);
    }
  }, [editData]);

  //Form Styles
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
    <>
      <Modal isOpen={open} onClose={close}>
        <ModalOverlay />
        <ModalContent overflowY="auto" maxHeight={500}>
          <ModalHeader>{editData ? "Edit Project" : "Add Project"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={projectData}
              validationSchema={projectValidationSchema}
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
                    <ErrorMessage
                      name="name"
                      component="p"
                      style={errorStyle}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Tech Stack</FormLabel>
                    <Field
                      type="text"
                      name="tech_stack"
                      placeholder="Tech Stack"
                      style={inputStyle}
                    />
                    <ErrorMessage
                      name="tech_stack"
                      component="p"
                      style={errorStyle}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Team Lead</FormLabel>
                    <Field
                      as="select"
                      name="team_lead"
                      placeholder="Team Lead"
                      style={inputStyle}
                    >
                      <option value="" disabled>
                        Select Team Lead
                      </option>
                      {members?.map((option) => (
                        <option key={option._id} value={option._id}>
                          {option.name}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="team_lead"
                      component="p"
                      style={errorStyle}
                    />
                  </FormControl>

                  <FormControl>
                    <Field name="teams_assigned">
                      {({ field }) => (
                        <>
                          <Box display="flex">
                            <FormLabel mt={2}>Team</FormLabel>
                            <IconButton
                              icon={
                                isExpanded ? <FaChevronUp /> : <FaChevronDown />
                              }
                              onClick={() => setIsExpanded(!isExpanded)}
                              aria-label={isExpanded ? "Collapse" : "Expand"}
                              mb={2}
                            />
                          </Box>
                          <Collapse in={isExpanded}>
                            <Wrap spacing={4}>
                              {teams?.map((option) => (
                                <WrapItem key={option._id}>
                                  <Checkbox
                                    value={option._id}
                                    onChange={(e) => {
                                      const selectedValues = e.target.checked
                                        ? [...field.value, option._id]
                                        : field.value.filter(
                                            (id) => id !== option._id
                                          );
                                      field.onChange({
                                        target: {
                                          name: field.name,
                                          value: selectedValues,
                                        },
                                      });
                                    }}
                                    isChecked={field.value.includes(option._id)}
                                  >
                                    {option.name}
                                  </Checkbox>
                                </WrapItem>
                              ))}
                            </Wrap>
                          </Collapse>
                        </>
                      )}
                    </Field>
                    <ErrorMessage
                      name="teams_assigned"
                      component="p"
                      style={errorStyle}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Sales Coordinator</FormLabel>
                    <Field
                      as="select"
                      name="sales_coordinator"
                      placeholder="Sales Coordinator"
                      style={inputStyle}
                    >
                      <option value="" disabled>
                        Select Sales Coordinator
                      </option>
                      {members?.map((option) => (
                        <option key={option._id} value={option._id}>
                          {option.name}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="sales_coordinator"
                      component="p"
                      style={errorStyle}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Platform</FormLabel>
                    <Field
                      type="text"
                      name="platform"
                      placeholder="Platform "
                      style={inputStyle}
                    />
                    <ErrorMessage
                      name="platform"
                      component="p"
                      style={errorStyle}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Contract Type</FormLabel>
                    <Field
                      as="select"
                      name="contract_type"
                      placeholder="Contract Type"
                      style={inputStyle}
                    >
                      <option value="" disabled>
                        Select Role
                      </option>
                      <option value={"Hourly"}>Hourly</option>
                      <option value={"Fixed"}>Fixed</option>
                      <option value={"Job"}>Job</option>
                      <option value={"Milestone"}>Milestone</option>
                    </Field>
                    <ErrorMessage
                      name="contract_type"
                      component="p"
                      style={errorStyle}
                    />
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
                      {clients?.map((option) => (
                        <option key={option._id} value={option._id}>
                          {option.name}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="client"
                      component="p"
                      style={errorStyle}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Consultant</FormLabel>
                    <Field
                      type="text"
                      name="consultant"
                      placeholder="Consultant"
                      style={inputStyle}
                    />
                    <ErrorMessage
                      name="consultant"
                      component="p"
                      style={errorStyle}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Stauts</FormLabel>
                    <Field
                      as="select"
                      name="status"
                      placeholder="Status"
                      style={inputStyle}
                    >
                      <option value="" disabled>
                        Select Status
                      </option>
                      <option value={"on-going"}>On-Going</option>
                      <option value={"completed"}>Completed</option>
                    </Field>
                    <ErrorMessage
                      name="status"
                      component="p"
                      style={errorStyle}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Duration</FormLabel>
                    <Field name="duration">
                      {({ field }) => (
                        <NumberInput
                          min={0}
                          value={field.value}
                          onChange={(value) => {
                            field.onChange({
                              target: { name: field.name, value },
                            });
                          }}
                        >
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      )}
                    </Field>
                    <ErrorMessage
                      name="duration"
                      component="p"
                      style={errorStyle}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Duration Unit</FormLabel>
                    <Field
                      as="select"
                      name="duration_unit"
                      placeholder="Duration Unit"
                      style={inputStyle}
                    >
                      <option value="" disabled>
                        Select Duration Unit
                      </option>
                      <option value={"Months"}>Months</option>
                      <option value={"Weeks"}>Weeks</option>
                      <option value={"Days"}>Days</option>
                    </Field>
                    <ErrorMessage
                      name="duration_unit"
                      component="p"
                      style={errorStyle}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Start Date</FormLabel>
                    <Field
                      type="date"
                      name="start_date"
                      placeholder="Start Date"
                      style={inputStyle}
                    />
                    <ErrorMessage
                      name="start_date"
                      component="p"
                      style={errorStyle}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>End Date</FormLabel>
                    <Field
                      type="date"
                      name="end_date"
                      placeholder="End Date"
                      style={inputStyle}
                    />
                    <ErrorMessage
                      name="end_date"
                      component="p"
                      style={errorStyle}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Cost</FormLabel>
                    <Field
                      type="text"
                      name="cost"
                      placeholder="Cost"
                      style={inputStyle}
                    />
                    <ErrorMessage
                      name="cost"
                      component="p"
                      style={errorStyle}
                    />
                  </FormControl>
                </VStack>
                <ModalFooter>
                  <Button colorScheme="blue" mr={3} type="submit">
                    Save
                  </Button>
                  <Button onClick={() => handleModalClose()}>Cancel</Button>
                </ModalFooter>
              </Form>
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProjectModal;
