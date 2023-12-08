import { loginUser, uploadUser } from "./dbFunctions";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";

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
    <Stack direction="column" spacing={2} alignItems="center">
      <Typography variant="h1">Login</Typography>
      <TextField
        label="Username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <Stack direction="row" spacing={2}>
        <Button variant="contained" onClick={handleLogin}>
          Login
        </Button>
        <Button variant="contained" onClick={handleRegister}>
          Register
        </Button>
      </Stack>
      {error && <Alert severity="error">{error}</Alert>}
    </Stack>
  );
}

export default Login;
