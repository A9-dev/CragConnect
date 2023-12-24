import { loginUser, uploadUser } from "./dbFunctions";
import { useState } from "react";
import {
  Button,
  Input,
  Stack,
  VStack,
  InputGroup,
  InputLeftAddon,
  Heading,
  Card,
  CardBody,
  CardHeader,
} from "@chakra-ui/react";
import { Alert, AlertIcon } from "@chakra-ui/react";

function Login({ setLoggedIn, username, setUsername }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
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
      uploadUser(username, password)
        .then((result) => {
          console.log("User registered successfully:", result);
          setLoggedIn(true);
          setError("");
        })
        .catch((error) => {
          console.error("Registration failed:", error);
          setError(error);
        });
    }
    // Send the username and password values to Express
  };

  return (
    <Card>
      <CardHeader>
        <Heading>Welcome</Heading>
      </CardHeader>
      <CardBody>
        <VStack spacing={2} alignItems="center" margin="auto" width="50%">
          <InputGroup>
            <InputLeftAddon children="Username" width="105px" />
            <Input value={username} onChange={(event) => setUsername(event.target.value)} />
          </InputGroup>
          <InputGroup>
            <InputLeftAddon children="Password" width="105px" />
            <Input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </InputGroup>
          <Stack direction="row" spacing={2}>
            <Button onClick={handleLogin}>Login</Button>
            <Button onClick={handleRegister}>Register</Button>
          </Stack>
          {error && (
            <Alert status="error">
              <AlertIcon />
              {error}
            </Alert>
          )}
        </VStack>
      </CardBody>
    </Card>
  );
}

export default Login;
