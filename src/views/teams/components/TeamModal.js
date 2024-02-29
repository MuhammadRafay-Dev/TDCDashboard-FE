import {
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "store/thunk/project.thunk";
import { getDepartments } from "store/thunk/department.thunk";
import { getMembers } from "store/thunk/member.thunk";
import { teamValidationSchema } from "schema";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Select from "react-select";

const TeamModal = ({ open, close, onSave, editData, edit }) => {
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
  const [selectedMember, setSelectedMember] = useState([]);
  const [selectedProject, setSelectedProject] = useState([]);

  const handleInputChange = (field, values) => {
    setTeamData((prevData) => ({
      ...prevData,
      [field]: values,
    }));
  };

  const handleModalClose = () => {
    close();
  };

  const handleSubmit = (values) => {
    if (editData) {
      edit(values);
    } else {
      onSave(values);
      setTeamData(initialData);
    }

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

  useEffect(() => {
    if (editData?.members) {
      setSelectedMember(
        editData?.members?.map((member) => ({
          label: member.name,
          value: member._id,
        }))
      );
    } else {
      setSelectedMember([]);
    }
  }, [editData?.members]);

  useEffect(() => {
    if (editData?.projects) {
      setSelectedProject(
        editData?.projects?.map((project) => ({
          label: project.name,
          value: project._id,
        }))
      );
    } else {
      setSelectedProject([]);
    }
  }, [editData?.projects]);

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
                    <FormLabel>Members</FormLabel>
                    <Field
                      name="members"
                      component={({ field, form }) => {
                        const onChange = (selectedOptions) => {
                          form.setFieldValue(
                            "members",
                            selectedOptions.map((option) => option.value)
                          );
                          setSelectedMember(selectedOptions);
                        };

                        return (
                          <Select
                            options={members?.map((row) => ({
                              value: row._id,
                              label: row.name,
                            }))}
                            isMulti
                            onChange={onChange}
                            value={selectedMember}
                            placeholder="Members"
                          />
                        );
                      }}
                    />
                    <ErrorMessage
                      name="members"
                      component="p"
                      style={errorStyle}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Projects</FormLabel>
                    <Field
                      name="projects"
                      component={({ field, form }) => {
                        const onChange = (selectedOptions) => {
                          form.setFieldValue(
                            "projects",
                            selectedOptions.map((option) => option.value)
                          );
                          setSelectedProject(selectedOptions);
                        };

                        return (
                          <Select
                            options={projects?.map((row) => ({
                              value: row._id,
                              label: row.name,
                            }))}
                            isMulti
                            onChange={onChange}
                            value={selectedProject}
                            placeholder="projects"
                          />
                        );
                      }}
                    />
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
