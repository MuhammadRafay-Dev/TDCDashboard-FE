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
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "store/thunk/project.thunk";
import { getDepartments } from "store/thunk/department.thunk";
import { getMembers } from "store/thunk/member.thunk";
import { teamValidationSchema } from "schema";
import { ErrorMessage, Field, Form, Formik } from "formik";

const TeamModal = ({ open, close, onSave, editData, edit, index }) => {
  const initialData = {
    name: editData?.name || "",
    technology: editData?.technology || "",
    department: editData?.department._id || "",
    team_head: editData?.team_head._id || "",
    members: editData?.members || [],
    projects: editData?.projects || [],
  };
  const [teamData, setTeamData] = useState(initialData);
  const memberData = useSelector((state) => state.members?.data);
  const [members, setMembers] = useState(memberData);
  const departmentData = useSelector(
    (state) => state.department?.data?.departments
  );
  const [departments, setDepartments] = useState(departmentData);
  const projectData = useSelector((state) => state.projects?.data);
  const [projects, setProjects] = useState(projectData);
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

  const handleSubmit = (values) => {
    if (editData) {
      edit(values, index);
    } else {
      onSave(values);
      setTeamData(initialData);
    }

    setIsExpanded(false);
    setIsExpanded2(false);

    close();
  };

  const dispatch = useDispatch();
  useEffect(() => {
    if (open) {
      dispatch(getMembers()).then((res) => {
        setMembers(res.payload);
      });
      dispatch(getDepartments()).then((res) => {
        setDepartments(res.payload);
      });
      dispatch(getProjects()).then((res) => {
        setProjects(res.payload);
      });
    }
  }, [open]);

  useEffect(() => {
    if (editData) {
      setTeamData(editData);
      setTeamData((prevData) => ({
        ...prevData,
        department: editData?.department?._id || "",
        team_head: editData?.team_head?._id || "",
        members: editData?.members?.map((member) => member._id) || "",
        projects: editData?.projects?.map((project) => project._id) || "",
      }));
    } else {
      setTeamData(initialData);
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
          <ModalHeader>{editData ? "Edit Team" : "Add Team"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={teamData}
              validationSchema={teamValidationSchema}
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
                    <FormLabel>Technology</FormLabel>
                    <Field
                      type="text"
                      name="technology"
                      placeholder="Technology"
                      style={inputStyle}
                    />
                    <ErrorMessage
                      name="technology"
                      component="p"
                      style={errorStyle}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Department</FormLabel>
                    <Field
                      as="select"
                      name="department"
                      placeholder="Department"
                      style={inputStyle}
                    >
                      <option value="" disabled>
                        Select Department
                      </option>
                      {departments?.map((option) => (
                        <option key={option._id} value={option._id}>
                          {option.name}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="department"
                      component="p"
                      style={errorStyle}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Team Head</FormLabel>
                    <Field
                      as="select"
                      name="team_head"
                      placeholder="Team Head"
                      style={inputStyle}
                    >
                      <option value="" disabled>
                        Select Team Head
                      </option>
                      {members?.map((option) => (
                        <option key={option._id} value={option._id}>
                          {option.name}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="team_head"
                      component="p"
                      style={errorStyle}
                    />
                  </FormControl>

                  <FormControl>
                    <Field name="members">
                      {({ field }) => (
                        <>
                          <Box display="flex">
                            <FormLabel mt={2}>Members</FormLabel>
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
                              {members?.map((option) => (
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
                      name="members"
                      component="p"
                      style={errorStyle}
                    />
                  </FormControl>

                  <FormControl>
                    <Field name="projects">
                      {({ field }) => (
                        <>
                          <Box display="flex">
                            <FormLabel mt={2}>Projects</FormLabel>
                            <IconButton
                              icon={
                                isExpanded2 ? (
                                  <FaChevronUp />
                                ) : (
                                  <FaChevronDown />
                                )
                              }
                              onClick={() => setIsExpanded2(!isExpanded2)}
                              aria-label={isExpanded2 ? "Collapse" : "Expand"}
                              mb={2}
                            />
                          </Box>
                          <Collapse in={isExpanded2}>
                            <Wrap spacing={4}>
                              {projects?.map((option) => (
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
                      name="projects"
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

export default TeamModal;
