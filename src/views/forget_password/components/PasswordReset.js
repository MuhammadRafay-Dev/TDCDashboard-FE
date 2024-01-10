// PasswordResetPage.js
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Spinner,
} from "@chakra-ui/react";
import { ResetForgotPasswordUrl, ResetPassword, VerifyUrl } from "API/Urls";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";

const PasswordReset = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [passwords, setPasswords] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });

  const handleInputChange = (field, values) => {
    setPasswords((prevData) => ({
      ...prevData,
      [field]: values,
    }));
  };
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const token = queryParams.get("token");
  // console.log(token, "Token test")

  const handleSubmit = () => {

    // Check if token is present in the URL
    if (token) {
      // console.log("JJK", token);
      // Reset password using token
      axios
        .post(ResetForgotPasswordUrl, passwords, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          toast.success(res.data.message);
          history.push("/sign-in"); // Redirect to login after successful password reset
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      const userData = JSON.parse(localStorage.getItem("userData"));

      // Check if userData or accesstoken is missing
      if (!userData || !userData.accesstoken) {
        console.error("Invalid or missing access token in localStorage");
        // Handle the error appropriately (e.g., redirect the user or display an error message)
        return;
      }
      // Reset password using the regular flow
      axios
        .post(ResetPassword, passwords, {
          headers: {
            Authorization: `Bearer ${userData.accesstoken || ""}`, // Use an empty string if accesstoken is missing
          },
        })
        .then((res) => {
          toast.success(res.data.message);
          history.push("/sign-in");
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    if (token) {
      axios
        .post(VerifyUrl + token)
        .then((res) => {
          // console.log(res, "hello");
          // setLoading(false);
        })
        .catch((err) => {
          console.log("err", err);
          toast.error(err.response.data.message);
          history.push("/sign-in");
        });
    }
  }, [token]);

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
            {token ? ( // Assuming 'token' is a variable that indicates whether it's a forgot password scenario
              <>
                {/* Fields for Forget password */}
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
              </>
            ) : (
              <>
                {/* Fields for Rest Passowrd */}

                <FormControl mb={4}>
                  <FormLabel>Old Password</FormLabel>
                  <Input
                    type="password"
                    placeholder="Enter old password"
                    value={passwords.old_password}
                    onChange={(e) =>
                      handleInputChange("old_password", e.target.value)
                    }
                  />
                </FormControl>
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
              </>
            )}

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
