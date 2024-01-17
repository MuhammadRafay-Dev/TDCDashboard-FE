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
import { memo } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { leadValidationSchema } from "schema";
import { addLeads, getLeads, updateLeads } from "store/thunk/lead.thunk";

const LeadModal = ({
  isOpen,
  onClose,
  onBack,
  members,
  clients,
  leadProp,
  leadId,
}) => {
  // console.log(leadProp, "testing members");
  // console.log(leadProp, "LeadProps");
  const dispatch = useDispatch();
  const isUpdateMode = !!leadId;

  const handleSubmit = async (value) => {
    try {
      if (leadId) {
        // Update existing Client
        await dispatch(updateLeads({ value, leadId }));
        toast.success("Lead Edit successfully!");
      } else {
        // Add new Lead
        await dispatch(addLeads(value));
        toast.success("Lead Add successfully!");
      }

      // Refresh Clients after the update
      dispatch(getLeads());

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
        <ModalHeader>{isUpdateMode ? "Edit Lead" : "Add Lead"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={{
              name: leadProp?.name || "",
              date: leadProp?.date
                ? new Date(leadProp.date).toLocaleDateString("en-CA")
                : "",
              salesTeamMember: leadProp?.salesTeamMember || "",
              client: leadProp?.client || "",
              linkJobApplied: leadProp?.linkJobApplied || "",
              jobDescription: leadProp?.jobDescription || "",
              sentDescription: leadProp?.sentDescription || "",
              appointment: leadProp?.appointment
                ? new Date(leadProp.appointment).toLocaleDateString("en-CA")
                : "",
              call: leadProp?.call
                ? new Date(leadProp.call).toLocaleDateString("en-CA")
                : "",
              leadStatus: leadProp?.leadStatus || "",
            }}
            validationSchema={leadValidationSchema}
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
                  <FormLabel>Date</FormLabel>
                  <Field
                    type="date"
                    name="date"
                    placeholder="Date"
                    style={inputStyle}
                  />
                  <ErrorMessage name="date" component="p" style={errorStyle} />
                </FormControl>

                <FormControl>
                  <FormLabel>Sales Team Member</FormLabel>
                  <Field
                    as="select"
                    name="salesTeamMember"
                    placeholder="Sales Team Member"
                    style={inputStyle}
                  >
                    <option value="" disabled>
                      Select Sales Team Member
                    </option>
                    {members &&
                      members?.map((row, index) => (
                        <option key={row?._id} value={row?._id}>
                          {row?.name}
                        </option>
                      ))}
                  </Field>
                  <ErrorMessage
                    name="salesTeamMember"
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
                  <FormLabel>Link Job Applied</FormLabel>
                  <Field
                    type="text"
                    name="linkJobApplied"
                    placeholder="Link Job Applied"
                    style={inputStyle}
                  />
                  <ErrorMessage
                    name="linkJobApplied"
                    component="p"
                    style={errorStyle}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Job Description</FormLabel>
                  <Field
                    type="text"
                    name="jobDescription"
                    placeholder="Job Description"
                    style={inputStyle}
                  />
                  <ErrorMessage
                    name="jobDescription"
                    component="p"
                    style={errorStyle}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Sent Description</FormLabel>
                  <Field
                    type="text"
                    name="sentDescription"
                    placeholder="Sent Description"
                    style={inputStyle}
                  />
                  <ErrorMessage
                    name="sentDescription"
                    component="p"
                    style={errorStyle}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Appointment</FormLabel>
                  <Field
                    type="date"
                    name="appointment"
                    placeholder="Appointment"
                    style={inputStyle}
                  />
                  <ErrorMessage
                    name="appointment"
                    component="p"
                    style={errorStyle}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Call</FormLabel>
                  <Field
                    type="date"
                    name="call"
                    placeholder="Call"
                    style={inputStyle}
                  />
                  <ErrorMessage name="call" component="p" style={errorStyle} />
                </FormControl>

                <FormControl>
                  <FormLabel>Lead Status</FormLabel>
                  <Field
                    as="select"
                    name="leadStatus"
                    placeholder="Lead Status"
                    style={inputStyle}
                  >
                    <option value="" disabled>
                      Select Client
                    </option>
                    <option value="HOT">HOT</option>
                    <option value="WARM">WARM</option>
                    <option value="COLD">COLD</option>
                  </Field>
                  <ErrorMessage
                    name="leadStatus"
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

export default memo(LeadModal);
