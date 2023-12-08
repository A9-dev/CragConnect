import { useState } from "react";
import Typography from "@mui/material/Typography";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Login from "./Login";
import Banner from "./Banner";
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  return (
    <div>
      <Banner />
      {!loggedIn && (
        <Login username={username} setUsername={setUsername} setLoggedIn={setLoggedIn} />
      )}
      {loggedIn && <Typography variant="h1">Logged In</Typography>}
    </div>
  );
}
export default App;
