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
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { payrollValidationSchema } from "schema";
import {
  addPayRoll,
  getPayRoll,
  updatePayRoll,
} from "store/thunk/payroll.thunk";

const PayRollModal = ({
  isOpen,
  onClose,
  onBack,
  members,
  departments,
  payrollProp,
  payrollId,
}) => {
  const dispatch = useDispatch();
  const { payrolls } = useSelector((state) => state.payroll.data);
  const [payrollIds, setPayrollIds] = useState([]);
  const isUpdateMode = !!payrollId;

  useEffect(() => {
    if (payrolls) {
      setPayrollIds(payrolls.map((payroll) => payroll?.members?._id));
    }
  }, [payrolls]);

  const handleSubmit = async (value) => {
    try {
      if (payrollId) {
        await dispatch(updatePayRoll({ value, payrollId }));
        toast.success("PayRoll Edit successfully!");
      } else {
        await dispatch(addPayRoll(value));
        toast.success("PayRoll Add successfully!");
      }
      dispatch(getPayRoll());
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
          {isUpdateMode ? "Edit PayRoll" : "Add PayRoll"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={{
              member: payrollProp?.member || "",
              department: payrollProp?.department || "",
              accountTitle: payrollProp?.accountTitle || "",
              cnic: payrollProp?.cnic || "",
              accountNo: payrollProp?.accountNo || "",
            }}
            validationSchema={payrollValidationSchema}
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
                          .filter((item) => !payrollIds.includes(item?._id))
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
                {/* {!isUpdateMode && (
                  <FormControl>
                    <FormLabel>Member</FormLabel>
                    <Field
                      as="select"
                      name="member"
                      placeholder="Member"
                      style={inputStyle}
                    >
                      <option value="" disabled>
                        Select Member
                      </option>
                      {members &&
                        members
                          .filter((item) => !payrollIds.includes(item?._id))
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
                )} */}
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
                  <FormLabel>Account Title</FormLabel>
                  <Field
                    type="text"
                    name="accountTitle"
                    placeholder="Account Title"
                    style={inputStyle}
                  />
                  <ErrorMessage
                    name="accountTitle"
                    component="p"
                    style={errorStyle}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>CNIC</FormLabel>
                  <Field
                    type="text"
                    name="cnic"
                    placeholder="CNIC"
                    style={inputStyle}
                  />
                  <ErrorMessage name="cnic" component="p" style={errorStyle} />
                </FormControl>

                <FormControl>
                  <FormLabel>Account No</FormLabel>
                  <Field
                    type="text"
                    name="accountNo"
                    placeholder="Account No"
                    style={inputStyle}
                  />
                  <ErrorMessage
                    name="accountNo"
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

export default memo(PayRollModal);
