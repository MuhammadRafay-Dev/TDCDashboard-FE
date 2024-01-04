import {
    Button,
    FormControl,
    FormLabel,
    HStack,
    Input,
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
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updateClients } from "store/thunk/client.thunk";
import { addClients, getClients } from "store/thunk/client.thunk";

const ClientModal = ({ isOpen, onClose, onBack,clientProp,
    clientId, }) => {
  const dispatch = useDispatch();
  const [clientData, setClientData] = useState({
    name: "",
    email: "",
    emailSecondary: "",
    contactNumber: "",
    platform: "",
    dateContacted: "",
    regionLocated: "",
    contactPlatformLink1: "",
    contactPlatformLink2: "",
  });

  useEffect(() => {
    // Update the state when formProp changes
    setClientData({ ...clientProp });
  }, [clientProp]);

  // console.log(
  //   "leadProp", leadProp,leadData
  // );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClientData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields before submitting
    if (!validateForm()) {
      return;
    }

   try {
  if (clientId) {
    // Update existing Client
    await dispatch(updateClients({ clientData, clientId }));
    toast.success("Client Edit successfully!");
  } else {
    // Add new Client
    await dispatch(addClients(clientData));
    toast.success("Client Add successfully!");
  }

  // Refresh Clients after the update
  dispatch(getClients());

  // Close the modal after submitting
  onClose();
} catch (error) {
  // Display error toast
  toast.error("An error occurred. Please try again.");
}

  };

  const validateForm = () => {
    // Validation logic for each field
    if (clientData.name.trim() === "") {
      toast.error("Name should not be empty.");
      return false;
    }

    if (clientData.name.length < 3) {
      toast.error("Name must be longer than or equal to 3 characters.");
      return false;
    }

    if (typeof clientData.name !== "string") {
      toast.error("Name must be a string.");
      return false;
    }

    if (clientData.email.trim() === "") {
      toast.error("Email should not be empty.");
      return false;
    }
    if (clientData.platform.trim() === "") {
      toast.error("Platform should not be empty.");
      return false;
    }
    if (clientData.contactPlatformLink1.trim() === "") {
      toast.error("ContactPlatformLink1 must be a URL address.");
      return false;
    }
    if (clientData.contactPlatformLink2.trim() === "") {
      toast.error("ContactPlatformLink2 must be a URL address.");
      return false;
    }

    // Add more validations for other fields if needed

    return true;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Client</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="stretch">
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                name="name"
                value={clientData.name}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                value={clientData.email}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Email Secondary</FormLabel>
              <Input
                type="emailSecondary"
                name="emailSecondary"
                value={clientData.emailSecondary}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Contact Number</FormLabel>
              <Input
                type="contactNumber"
                name="contactNumber"
                value={clientData.contactNumber}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Platform</FormLabel>
              <Input
                type="text"
                name="platform"
                value={clientData.platform}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Date Contacted</FormLabel>
              <Input
                type="date"
                name="dateContacted"
                value={clientData.dateContacted}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Region Located</FormLabel>
              <Input
                type="text"
                name="regionLocated"
                value={clientData.regionLocated}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Contact Platform Link1</FormLabel>
              <Input
                type="text"
                name="contactPlatformLink1"
                value={clientData.contactPlatformLink1}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Contact Platform Link2</FormLabel>
              <Input
                type="text"
                name="contactPlatformLink2"
                value={clientData.contactPlatformLink2}
                onChange={handleChange}
              />
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <HStack spacing={4}>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Submit
            </Button>
            <Button onClick={onBack}>Back</Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ClientModal;
