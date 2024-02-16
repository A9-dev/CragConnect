import { loginUser, uploadUser, getUserData } from "../dbFunctions";
import { useState } from "react";
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
  Alert,
  AlertIcon,
  Button,
  Input,
  Stack,
  VStack,
  InputGroup,
  useColorModeValue,
  InputLeftAddon,
} from "@chakra-ui/react";
import { useContext } from "react";
import { AppContext } from "../App";

const Login = () => {
  const { setLoggedIn, userData, setUserData } = useContext(AppContext);

  const [usernameInput, setUsernameInput] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isRegister, setIsRegister] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [show, setShow] = useState(false);
  const [fullNameInput, setFullNameInput] = useState("");
  const handleShow = () => setShow(!show);
  const buttonColor = useColorModeValue("blue.600", "purple.600");
  const length = isChecked ? "162px" : "105px";

  const handleLogin = () => {
    if (!usernameInput || !password) {
      return;
    }
    // Send the username and password values to Express

    loginUser(usernameInput, password)
      .then(() => {
        setLoggedIn(true);
        setError("");
        onClose();

        getUserData(usernameInput).then((result) => {
          setUserData(result.data);
        });
      })
      .catch((error) => {
        console.error("Login failed:", error);
        setError(error);
      });
  };

  const handleRegister = () => {
    if (!userData.username || !password) {
      return;
    } else {
      uploadUser(userData.username, password, isChecked, fullNameInput)
        .then(() => {
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
        bg={buttonColor}
        color={"white"}
        onClick={() => {
          handleOpen();
          onOpen();
        }}
      >
        Log in
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
                  <Input
                    value={usernameInput}
                    onChange={(event) => setUsernameInput(event.target.value)}
                  />
                </InputGroup>
                <InputGroup>
                  <InputLeftAddon children="Password" width="105px" />
                  <Input
                    type={show ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        handleLogin();
                      }
                    }}
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
                    <InputLeftAddon children="Username" width={length} />
                    <Input
                      value={usernameInput}
                      onChange={(event) => setUsernameInput(event.target.value)}
                    />
                  </InputGroup>
                  <InputGroup>
                    <InputLeftAddon
                      children={isChecked ? "Organisation Name" : "Full Name"}
                      width={length}
                    />
                    <Input
                      value={fullNameInput}
                      onChange={(event) => setFullNameInput(event.target.value)}
                    />
                  </InputGroup>
                  <InputGroup>
                    <InputLeftAddon children="Password" width={length} />
                    <Input
                      type={show ? "text" : "password"}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          handleRegister();
                        }
                      }}
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleShow}>
                        {show ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <Checkbox
                    size="lg"
                    isChecked={isChecked}
                    onChange={handleCheckboxChange}
                  >
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
};

export default Login;
