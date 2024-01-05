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
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { clientValidationSchema } from "schema";
import {
  addClients,
  getClients,
  updateClients,
} from "store/thunk/client.thunk";

const ClientModal = ({ isOpen, onClose, onBack, clientProp, clientId }) => {
  const dispatch = useDispatch();
  // const initialData = {
  //   name: "",
  //   email: "",
  //   emailSecondary: "",
  //   contactNumber: "",
  //   platform: "",
  //   dateContacted: "",
  //   regionLocated: "",
  //   contactPlatformLink1: "",
  //   contactPlatformLink2: "",
  // };
  // const [clientData, setClientData] = useState(initialData);

  const isUpdateMode = !!clientId;
  // useEffect(() => {
  //   // Update the state when formProp changes
  //   setClientData({ ...clientProp });
  // }, [clientProp]);

  // console.log(
  //   "leadProp", leadProp,leadData
  // );

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setClientData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  const handleSubmit = async (value) => {
    try {
      if (clientId) {
        // Update existing Client
        await dispatch(updateClients({ value, clientId }));
        toast.success("Client Edit successfully!");
      } else {
        // Add new Client
        await dispatch(addClients(value));
        toast.success("Client Add successfully!");
      }

      // setClientData(initialData);

      // Refresh Clients after the update
      dispatch(getClients());

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
        <ModalHeader>{isUpdateMode ? "Edit Client" : "Add Client"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={{
              name: clientProp?.name || "",
              email: clientProp?.email || "",
              emailSecondary: clientProp?.emailSecondary || "",
              contactNumber: clientProp?.contactNumber || "",
              platform: clientProp?.platform || "",
              dateContacted: clientProp?.dateContacted
              ? new Date(clientProp.dateContacted).toLocaleDateString("en-CA")
              : "",
              regionLocated: clientProp?.regionLocated || "",
              contactPlatformLink1: clientProp?.contactPlatformLink1 || "",
              contactPlatformLink2: clientProp?.contactPlatformLink2 || "",
            }}
            validationSchema={clientValidationSchema}
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
                  <FormLabel>Email</FormLabel>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email"
                    style={inputStyle}
                  />
                  <ErrorMessage name="email" component="p" style={errorStyle} />
                </FormControl>

                <FormControl>
                  <FormLabel>Email Secondary</FormLabel>
                  <Field
                    type="email"
                    name="emailSecondary"
                    placeholder="Email Secondary"
                    style={inputStyle}
                  />
                  <ErrorMessage
                    name="emailSecondary"
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
                  <FormLabel>Platform</FormLabel>
                  <Field
                    type="text"
                    name="platform"
                    placeholder="Platform"
                    style={inputStyle}
                  />
                  <ErrorMessage
                    name="platform"
                    component="p"
                    style={errorStyle}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Date Contacted</FormLabel>
                  <Field
                    type="date"
                    name="dateContacted"
                    placeholder="Date Contacted"
                    style={inputStyle}
                  />
                  <ErrorMessage
                    name="dateContacted"
                    component="p"
                    style={errorStyle}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Region Located</FormLabel>
                  <Field
                    type="text"
                    name="regionLocated"
                    placeholder="Region Located"
                    style={inputStyle}
                  />
                  <ErrorMessage
                    name="regionLocated"
                    component="p"
                    style={errorStyle}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Contact Platform Link1</FormLabel>
                  <Field
                    type="text"
                    name="contactPlatformLink1"
                    placeholder="Contact Platform Link1"
                    style={inputStyle}
                  />
                  <ErrorMessage
                    name="contactPlatformLink1"
                    component="p"
                    style={errorStyle}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Contact Platform Link2</FormLabel>
                  <Field
                    type="text"
                    name="contactPlatformLink2"
                    placeholder="Contact Platform Link2"
                    style={inputStyle}
                  />
                  <ErrorMessage
                    name="contactPlatformLink2"
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

export default ClientModal;
