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
import Select from "react-select";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { earningValidationSchema } from "schema";
import {
  addEarning,
  getEarning,
  updateEarning,
} from "store/thunk/earning.thunk";

const EarningModal = ({
  isOpen,
  onClose,
  onBack,
  members,
  departments,
  projects,
  earningProp,
  earningId,
}) => {
  const dispatch = useDispatch();
  const { earnings } = useSelector((state) => state.earning.data);
  const [earningIds, setEarningIds] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    if (earningProp?.projectsWorkedOn) {
      setSelected(earningProp?.projectsWorkedOn);
    }
    console.log(earningProp?.projectsWorkedOn,"Earning")
  }, [earningProp?.projectsWorkedOn]);

  const isUpdateMode = !!earningId;

  useEffect(() => {
    if (earnings) {
      setEarningIds(earnings.map((earning) => earning?.projectsWorkedOn));
    }
    if (earnings) {
      setEarningIds(earnings.map((payroll) => payroll?.members?._id));
    }
  }, [earnings]);

  const handleSubmit = async (value) => {
    try {
      if (earningId) {
        await dispatch(updateEarning({ value, earningId }));
        toast.success("Earning Edit successfully!");
      } else {
        await dispatch(addEarning(value));
        toast.success("Earning Add successfully!");
      }
      dispatch(getEarning());
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

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {isUpdateMode ? "Edit Eaning" : "Add Earning"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={{
              member: earningProp?.member || "",
              department: earningProp?.department || "",
              totalOvertimeHours: earningProp?.totalOvertimeHours || "",
              totalUnderTimeHours: earningProp?.totalUnderTimeHours || "",
              projectsWorkedOn: earningProp?.projectsWorkedOn || [],
              totalDeductions: earningProp?.totalDeductions || "",
            }}
            validationSchema={earningValidationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <VStack spacing={4} align="stretch">
                <FormControl>
                  <FormLabel>Member</FormLabel>
                  <Field
                    as="select"
                    name="member"
                    placeholder="Member"
                    style={inputStyle}
                    disabled={isUpdateMode}
                  >
                    <option value="" disabled>
                      Select Member
                    </option>
                    {members &&
                      members
                        .filter((item) => !earningIds.includes(item?._id))
                        .map((row) => {
                          return (
                            <option key={row?._id} value={row?._id}>
                              {row?.name}
                            </option>
                          );
                        })}
                  </Field>
                  <ErrorMessage
                    name="member"
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
                    {departments &&
                      departments?.map((row, index) => {
                        return (
                          <option key={row?._id} value={row?._id}>
                            {row?.name}
                          </option>
                        );
                      })}
                  </Field>
                  <ErrorMessage
                    name="department"
                    component="p"
                    style={errorStyle}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Total Overtime Hours</FormLabel>
                  <Field
                    type="number"
                    name="totalOvertimeHours"
                    placeholder="totalOvertimeHours"
                    style={inputStyle}
                  />
                  <ErrorMessage
                    name="totalOvertimeHours"
                    component="p"
                    style={errorStyle}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Total Under TimeHours</FormLabel>
                  <Field
                    type="number"
                    name="totalUnderTimeHours"
                    placeholder="Total Under TimeHours"
                    style={inputStyle}
                  />
                  <ErrorMessage
                    name="totalUnderTimeHours"
                    component="p"
                    style={errorStyle}
                  />
                </FormControl>
               
                  {/* <FormControl>
                    <FormLabel>Projects WorkedOn</FormLabel>
                    <Field
                      name="projectsWorkedOn"
                      component={({ form }) => {
                        const onChange = (selectedOptions) => {
                          form.setFieldValue(
                            "projectsWorkedOn",
                            selectedOptions.map((option) => option.value)
                          );
                          setSelected(selectedOptions);
                        };

                        return (
                          <Select
                            options={projects?.map((row) => ({
                              value: row._id,
                              label: row.name,
                            }))}
                            isMulti
                            onChange={onChange}
                            value={selected}
                            placeholder="Projects WorkedOn"
                            // isDisabled={isUpdateMode}
                          />
                        );
                      }}
                    />
                    <ErrorMessage
                      name="projectsWorkedOn"
                      component="p"
                      style={errorStyle}
                    />
                  </FormControl> */}
                    <FormControl>
                  <FormLabel>Projects Worked On</FormLabel>
                  <Field
                    name="projectsWorkedOn"
                    component={({ form }) => {
                      const onChange = (selectedOptions) => {
                        form.setFieldValue(
                          "projectsWorkedOn",
                          selectedOptions.map((option) => option.value)
                        );
                        setSelected(selectedOptions);
                      };

                      return (
                        <Select
                          options={projects?.map((row) => ({
                            value: row._id,
                            label: row.name,
                          }))}
                          isMulti
                          onChange={onChange}
                          value={selected}
                          placeholder="Projects Worked On"
                        />
                      );
                    }}
                  />
                  <ErrorMessage
                    name="projectsWorkedOn"
                    component="p"
                    style={errorStyle}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Total Deductions</FormLabel>
                  <Field
                    type="number"
                    name="totalDeductions"
                    placeholder="Total Deductions"
                    style={inputStyle}
                  />
                  <ErrorMessage
                    name="totalDeductions"
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

export default memo(EarningModal);
