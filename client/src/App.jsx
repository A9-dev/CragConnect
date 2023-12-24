import { useState } from "react";
import { ChakraProvider, Box, Heading, VStack } from "@chakra-ui/react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Login from "./Login";
import FeedBlock from "./FeedBlock";
// 2. Extend the theme to include custom colors, fonts, etc

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  return (
    <ChakraProvider>
      <Box display="flex" justifyContent="center">
        <VStack width="75%" alignItems="center" spacing={2}>
          {!loggedIn && (
            <Login username={username} setUsername={setUsername} setLoggedIn={setLoggedIn} />
          )}
          {loggedIn && (
            <Heading as="h1" size="3xl" padding={4}>
              Logged In
            </Heading>
          )}
          <FeedBlock loggedIn={loggedIn} username={username} />
        </VStack>
      </Box>
    </ChakraProvider>
  );
}

export default App;
