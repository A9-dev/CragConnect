import { loginUser, uploadUser } from "./dbFunctions";
import { useState } from "react";
import { Button, Input, Stack, VStack, InputGroup, InputLeftAddon } from "@chakra-ui/react";
import { Alert, AlertIcon } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  InputRightElement,
  Checkbox,
  Divider,
} from "@chakra-ui/react";

function Login({ setLoggedIn, username, setUsername, setIsOrganisation }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isRegister, setIsRegister] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(!show);

  const handleLogin = () => {
    if (!username || !password) {
      console.log("Username and password are required.");
      return;
    }
    // Send the username and password values to Express

    loginUser(username, password)
      .then((result) => {
        console.log("Logged in successfully:", result);
        setLoggedIn(true);
        setError("");
        onClose();
        console.log(result.data.organisation);
        if (result.data.organisation) {
          setIsOrganisation(true);
        }
      })
      .catch((error) => {
        console.error("Login failed:", error);
        setError(error);
      });
  };

  const handleRegister = () => {
    if (!username || !password) {
      console.log("Username and password are required.");
      return;
    } else {
      uploadUser(username, password, isChecked)
        .then((result) => {
          console.log("User registered successfully:", result);
          setLoggedIn(true);
          setError("");
          onClose();
        })
        .catch((error) => {
          console.error("Registration failed:", error);
          setError(error);
        });
    }
  };

  const handleSwap = () => {
    setIsRegister(!isRegister);
  };

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleOpen = () => {
    setIsRegister(false);
  };

  return (
    <>
      <Button
        onClick={() => {
          handleOpen();
          onOpen();
        }}
      >
        Login
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        {!isRegister && (
          <ModalContent>
            <ModalHeader>Login</ModalHeader>
            <ModalCloseButton />
            <ModalBody mb={3}>
              <VStack spacing={2} alignItems="center" margin="auto">
                <InputGroup>
                  <InputLeftAddon children="Username" width="105px" />
                  <Input value={username} onChange={(event) => setUsername(event.target.value)} />
                </InputGroup>
                <InputGroup>
                  <InputLeftAddon children="Password" width="105px" />
                  <Input
                    type={show ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShow}>
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <Divider />
                <Stack direction="row" spacing={2}>
                  <Button onClick={handleLogin}>Login</Button>
                  <Button variant="outline" onClick={handleSwap}>
                    No account? Register
                  </Button>
                </Stack>
                {error && (
                  <Alert status="error">
                    <AlertIcon />
                    {error}
                  </Alert>
                )}
              </VStack>
            </ModalBody>
          </ModalContent>
        )}
        {isRegister && (
          <>
            <ModalContent>
              <ModalHeader>Register</ModalHeader>
              <ModalCloseButton />
              <ModalBody mb={3}>
                <VStack spacing={2} alignItems="center" margin="auto">
                  <InputGroup>
                    <InputLeftAddon children="Username" width="105px" />
                    <Input value={username} onChange={(event) => setUsername(event.target.value)} />
                  </InputGroup>
                  <InputGroup>
                    <InputLeftAddon children="Password" width="105px" />
                    <Input
                      type={show ? "text" : "password"}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleShow}>
                        {show ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <Checkbox size="lg" isChecked={isChecked} onChange={handleCheckboxChange}>
                    Organisation account?
                  </Checkbox>
                  <Divider />
                  <Stack direction="row" spacing={2}>
                    <Button onClick={handleRegister}>Register</Button>
                    <Button variant="outline" onClick={handleSwap}>
                      Already have an account? Login
                    </Button>
                  </Stack>
                  {error && (
                    <Alert status="error">
                      <AlertIcon />
                      {error}
                    </Alert>
                  )}
                </VStack>
              </ModalBody>
            </ModalContent>
          </>
        )}
      </Modal>
    </>
  );
}

export default Login;
