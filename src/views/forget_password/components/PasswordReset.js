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
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";
import axios from "axios";
import { ResetForgotPasswordUrl } from "API/Urls";
import { VerifyUrl } from "API/Urls";

const PasswordReset = () => {
  const [loading, setLoading] = useState(true);
  const initialData = {
    new_password: "",
    confirm_password: "",
  };
  const [passwords, setPasswords] = useState(initialData);
  const history = useHistory();

  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const token = queryParams.get("token");

  const handleInputChange = (field, values) => {
    setPasswords((prevData) => ({
      ...prevData,
      [field]: values,
    }));
  };

  const handleSubmit = () => {
    if (!passwords.new_password) {
      toast.error("please Enter New Password");
      return;
    }
    if (passwords.new_password.length < 5) {
      toast.error("Min Password length is 5");
      return;
    }
    if (!passwords.confirm_password) {
      toast.error("please Enter Confirm Password");
      return;
    }
    if (passwords.new_password !== passwords.confirm_password) {
      toast.error("Confirm Password is not same as New Password");
      return;
    }

    axios
      .post(ResetForgotPasswordUrl, passwords, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  let count = 1;
  useEffect(() => {
    if (count === 1) {
      axios
        .post(VerifyUrl + token)
        .then((res) => {
          setLoading(false);
        })
        .catch((err) => {
          console.log("err", err);
          toast.error(err.response.data.message);
          history.push("/auth");
        });
      count++;
    }
  }, []);

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
      <Box
        border={"2px blue"}
        width={"500px"}
        padding={"50px"}
        borderRadius={"250px"}
        boxShadow="dark-lg"
        p="6"
        rounded="md"
        bg="white"
      >
        <Heading color="blue" mb={4}>
          Password Reset
        </Heading>

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
                value={passwords.new_password}
                onChange={(e) =>
                  handleInputChange("new_password", e.target.value)
                }
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Confirm New Password</FormLabel>
              <Input
                type="password"
                placeholder="Confirm new password"
                value={passwords.confirm_password}
                onChange={(e) =>
                  handleInputChange("confirm_password", e.target.value)
                }
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
