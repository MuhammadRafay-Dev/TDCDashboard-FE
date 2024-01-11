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
import { getTeams } from "store/thunk/team.thunk";
import { getDepartments } from "store/thunk/department.thunk";
import { memberValidationSchema } from "schema";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Select from "react-select";

const MemberModal = ({ open, close, onSave, editData, edit, index }) => {
  const initialData = {
    name: editData?.name || "",
    email: editData?.email || "",
    contactNumber: editData?.contactNumber || "",
    role: editData?.role || "",
    currentSalary: editData?.currentSalary || "",
    department: editData?.department?._id || "",
    teams: editData?.teams || [],
    emergencyContactName: editData?.emergencyContactName || "",
    emergencyContactNumber: editData?.emergencyContactNumber || "",
    emergencyContactRelation: editData?.emergencyContactRelation || "",
  };
  const [memberData, setMemberData] = useState(initialData);
  const teamData = useSelector((state) => state.teams?.data);
  const [teams, setTeams] = useState(teamData);
  const departmentData = useSelector(
    (state) => state.department?.data?.departments
  );
  const [departments, setDepartments] = useState(departmentData);
  const [selected, setSelected] = useState([]);

  const handleModalClose = () => {
    close();
  };

  const handleSubmit = (values) => {
    if (editData) {
      edit(values, index);
    } else {
      onSave(values);
      setMemberData(initialData);
    }

    close();
  };

  const dispatch = useDispatch();
  useEffect(() => {
    if (open) {
      dispatch(getTeams()).then((res) => {
        setTeams(res.payload);
      });
      dispatch(getDepartments()).then((res) => {
        setDepartments(res.payload);
      });
    }
  }, [open]);

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

  useEffect(() => {
    if (editData?.teams) {
      setSelected(
        editData?.teams?.map((team) => ({
          label: team.name,
          value: team._id,
        }))
      );
    } else {
      setSelected([]);
    }
  }, [editData?.teams]);

  const RoleOptions = [
    "",
    "ADMIN",
    "HR",
    "BUSINESS_MANAGER",
    "SALES_AGENT",
    "TECH",
    "HELPER",
  ];

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
          <ModalHeader>{editData ? "Edit Member" : "Add Member"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={memberData}
              validationSchema={memberValidationSchema}
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
                    <FormLabel>Email</FormLabel>
                    <Field
                      type="email"
                      name="email"
                      placeholder="Email"
                      style={inputStyle}
                    />
                    <ErrorMessage
                      name="email"
                      component="p"
                      style={errorStyle}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Contact Number</FormLabel>
                    <Field
                      type="text"
                      name="contactNumber"
                      placeholder="Contact Number"
                      style={inputStyle}
                    />
                    <ErrorMessage
                      name="contactNumber"
                      component="p"
                      style={errorStyle}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Role</FormLabel>
                    <Field
                      as="select"
                      name="role"
                      placeholder="Role"
                      style={inputStyle}
                    >
                      <option value="" disabled>
                        Select Role
                      </option>

                      {RoleOptions.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="role"
                      component="p"
                      style={errorStyle}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Current Salary</FormLabel>
                    <Field
                      type="number"
                      name="currentSalary"
                      placeholder="Current Salary"
                      style={inputStyle}
                    />
                    <ErrorMessage
                      name="currentSalary"
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
                    <FormLabel>Teams</FormLabel>
                    <Field
                      name="teams"
                      component={({ field, form }) => {
                        const onChange = (selectedOptions) => {
                          form.setFieldValue(
                            "teams",
                            selectedOptions.map((option) => option.value)
                          );
                          setSelected(selectedOptions);
                        };

                        return (
                          <Select
                            options={teams?.map((row) => ({
                              value: row._id,
                              label: row.name,
                            }))}
                            isMulti
                            onChange={onChange}
                            value={selected}
                            placeholder="Teams"
                          />
                        );
                      }}
                    />
                    <ErrorMessage
                      name="teams"
                      component="p"
                      style={errorStyle}
                    />
                  </FormControl>

                  {/* <FormControl>
                    <Field name="teams">
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
                      name="teams"
                      component="p"
                      style={errorStyle}
                    />
                  </FormControl> */}

                  <FormControl>
                    <FormLabel>Emergency Contact Name</FormLabel>
                    <Field
                      type="text"
                      name="emergencyContactName"
                      placeholder="Emergency Contact Name"
                      style={inputStyle}
                    />
                    <ErrorMessage
                      name="emergencyContactName"
                      component="p"
                      style={errorStyle}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Emergency Contact Number</FormLabel>
                    <Field
                      type="text"
                      name="emergencyContactNumber"
                      placeholder="Emergency Contact Number"
                      style={inputStyle}
                    />
                    <ErrorMessage
                      name="emergencyContactNumber"
                      component="p"
                      style={errorStyle}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Emergency Contact Relation</FormLabel>
                    <Field
                      type="text"
                      name="emergencyContactRelation"
                      placeholder="Emergency Contact Relation"
                      style={inputStyle}
                    />
                    <ErrorMessage
                      name="emergencyContactRelation"
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

export default MemberModal;
