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
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clientValidationSchema } from "schema";
import {
  addClients,
  getClients,
  updateClients,
} from "store/thunk/client.thunk";

const ClientModal = ({ isOpen, onClose, onBack, clientProp, clientId }) => {
  const { clients } = useSelector((state) => state.client.data);

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

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setClientData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  const verifyEmail = (values) => {
    const emailExists = clients?.filter(
      (client) => client.email === values.email
    );
    if (emailExists[0]?.email) {
      return false;
    } else {
      return true;
    }
  };
  const SecondaryEmail = (values) => {
    const emailSecondaryExists = clients?.filter(
      (client) => client.emailSecondary === values.emailSecondary
    );
    if (emailSecondaryExists[0]?.emailSecondary) {
      return false;
    } else {
      return true;
    }
  };
  const handleSubmit = async (value) => {
    if (!verifyEmail(value)) {
      toast.error("Email already exists");
      return;
    }
    if (!SecondaryEmail(value)) {
      toast.error("Email Secondary already exists");
      return;
    }
    try {
      if (clientId) {
        await dispatch(updateClients({ value, clientId }));
        toast.success("Client Edit successfully!");
      } else {
        await dispatch(addClients(value));
        toast.success("Client Add successfully!");
      }
      dispatch(getClients());

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
