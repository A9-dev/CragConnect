import { useState } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import axios from "axios";

function Login({ setLoggedIn, username, setUsername }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!username || !password) {
      console.log("Username and password are required.");
      return;
    }
    // Send the username and password values to Express
    axios
      .post("http://localhost:5000/login", { username, password })
      .then((response) => {
        // Handle the response from Express
        console.log(response.data);
        console.log(response.status);
        setLoggedIn(true);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError(error.message);
      });
  };
  const handleRegister = () => {
    if (!username || !password) {
      console.log("Username and password are required.");
      return;
    }
    // Send the username and password values to Express
    axios
      .post("http://localhost:5000/register", { username, password })
      .then((response) => {
        // Handle the response from Express
        console.log(response);
        console.log("HERE");
        console.log(response.data.message);
        setLoggedIn(true);
        setError("");
      })
      .catch((error) => {
        console.error("Error:", error);
        setError(error.message);
      });
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
      {error && <Typography variant="h2">{error}</Typography>}
    </Stack>
  );
}

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  return (
    <div>
      {!loggedIn && (
        <Login
          username={username}
          setUsername={setUsername}
          setLoggedIn={setLoggedIn}
        />
      )}
      {loggedIn && <Typography variant="h1">Logged In</Typography>}
    </div>
  );
}
export default App;
