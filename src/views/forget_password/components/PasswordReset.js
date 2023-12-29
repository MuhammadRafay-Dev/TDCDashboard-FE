// PasswordResetPage.js
import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Input,
  Button,
  Spinner,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

const PasswordReset = () => {
  const [loading, setLoading] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  useEffect(() => {
    // Simulate loading for 2 seconds
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  const handleSubmit = () => {
    // Perform password reset logic here
    console.log("New Password:", newPassword);
    console.log("Confirm New Password:", confirmNewPassword);
  };

  return (
    <Box
      p={4}
      display={"flex"}
      flexDirection={"column"}
      height={"100dvh"}
      justifyContent={"center"}
      alignItems={"center"}
      alignContent={"center"}
    >
      <Box border={"2px blue"} width={"500px"} padding={"50px"} borderRadius={"250px"} boxShadow='dark-lg' p='6' rounded='md' bg='white'>
        <Heading color="blue"  mb={4}>Password Reset</Heading>

        {loading ? (
          <Box textAlign="center" width={"200px"}>
            <Spinner size="xl" />
          </Box>
        ) : (
          <Box>
            <FormControl mb={4}>
              <FormLabel>New Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Confirm New Password</FormLabel>
              <Input
                type="password"
                placeholder="Confirm new password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
            </FormControl>

            <Button colorScheme="blue" onClick={handleSubmit}>
              Submit
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default PasswordReset;
