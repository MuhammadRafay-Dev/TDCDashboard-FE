// EmailModal.js
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from '@chakra-ui/react';
import { useState } from 'react';

const EmailModal = ({ isOpen, onClose, onSubmit }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    // You can perform validation or any other logic here before submitting
    onSubmit(email);
    onClose(); // Close the modal after submission
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Forget Password</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Enter your Email</FormLabel>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button onClick={handleSubmit} colorScheme="blue">
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EmailModal;
