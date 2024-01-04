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
import { getLeads, addLeads, updateLeads } from "store/thunk/lead.thunk";

const LeadModal = ({
  isOpen,
  onClose,
  onBack,
  members,
  clients,
  leadProp,
  leadId,
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

  const isUpdateMode = !!leadId;
  useEffect(() => {
    // Update the state when formProp changes
    setLeadData({ ...leadProp });
  }, [leadProp]);

  // console.log(
  //   "leadProp", leadProp,leadData
  // );
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeadData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   await dispatch(addLeads({ leadData }));
  //   //  console.log(addLeads)
  //   dispatch(getLeads());

  //   // Close the modal after submitting
  //   onClose();
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (leadId) {
        // Update existing lead
        await dispatch(updateLeads({ leadData, leadId }));
      } else {
        // Add new lead
        await dispatch(addLeads(leadData));
        // console.log(leadData, "if check")
      }

      setLeadData({
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
      // Display success toast
      toast.success("Lead Update successfully!");

      // Refresh leads after the update
      dispatch(getLeads());

      // Close the modal after submitting
      onClose();
    } catch (error) {
      // Display error toast
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{isUpdateMode ? "Edit Lead" : "Add Lead"}</ModalHeader>
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
                    return (
                      <option key={row?._id} value={row?._id}>
                        {row?.name}
                      </option>
                    );
                  })}
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Client</FormLabel>
              <Select
                name="client"
                value={leadData.client}
                onChange={handleChange}
              >
                {clients &&
                  clients.map((row, index) => {
                    return (
                      <option key={row?._id} value={row?._id}>
                        {row?.name}
                      </option>
                    );
                  })}
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
                type="date"
                name="appointment"
                value={leadData.appointment}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Call</FormLabel>
              <Input
                type="date"
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
