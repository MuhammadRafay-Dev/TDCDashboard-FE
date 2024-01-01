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
  Select,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getLeads, addLeads } from "store/thunk/lead.thunk";

const LeadModal = ({
  isOpen,
  onClose,
  onBack,
  members,
}) => {
  const dispatch = useDispatch();
  const [leadData, setLeadData] = useState({
    name: "",
    date: "",
    salesTeamMember: "",
    client: "",
    linkJobApplied: "",
    jobDescription: "",
    sentDescription: "",
    appointment: "",
    call: "",
    leadStatus: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeadData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     dispatch(addLeads(leadData));
     console.log(addLeads)
     dispatch(getLeads);
  
      // Close the modal after submitting
      onClose();
    
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Lead</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="stretch">
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                name="name"
                value={leadData.name}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Date</FormLabel>
              <Input
                type="date"
                name="date"
                value={leadData.date}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Sales Team Member</FormLabel>
              <Select
                name="salesTeamMember"
                value={leadData.salesTeamMember}
                onChange={handleChange}
              >
                {members &&
                  members.map((row, index) => {
                    console.log(row, "Memeber test")
                    return(
                    <option key={row?._id} value={row?._id}>
                      {row?.name}
                    </option>
                  )})}
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Client</FormLabel>
              <Select
                name="client"
                value={leadData.client}
                onChange={handleChange}
              >
                {/* Fetch and map clients from API */}
                {/* Example: */}
                <option value="client1">Client 1</option>
                <option value="client2">Client 2</option>
                {/* Add more options based on your API response */}
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Link Job Applied</FormLabel>
              <Input
                type="text"
                name="linkJobApplied"
                value={leadData.linkJobApplied}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Job Description</FormLabel>
              <Input
                type="text"
                name="jobDescription"
                value={leadData.jobDescription}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Sent Description</FormLabel>
              <Input
                type="text"
                name="sentDescription"
                value={leadData.sentDescription}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Appointment</FormLabel>
              <Input
                type="datetime-local"
                name="appointment"
                value={leadData.appointment}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Call</FormLabel>
              <Input
                type="datetime-local"
                name="call"
                value={leadData.call}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Lead Status</FormLabel>
              <Select
                name="leadStatus"
                value={leadData.leadStatus}
                onChange={handleChange}
              >
                <option value="HOT">HOT</option>
                <option value="WARM">WARM</option>
                <option value="COLD">COLD</option>
              </Select>
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

export default LeadModal;
