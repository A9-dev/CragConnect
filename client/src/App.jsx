import { useState } from "react";
import { ChakraProvider, Box, Heading } from "@chakra-ui/react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Login from "./Login";
import Banner from "./Banner";
import { extendTheme, VStack } from "@chakra-ui/react";
import * as ReactDOM from "react-dom/client";
import Feed from "./Feed";
// 2. Extend the theme to include custom colors, fonts, etc

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const colors = {
    brand: {
      900: "#1a365d",
      800: "#153e75",
      700: "#2a69ac",
    },
  };

  const theme = extendTheme({ colors });
  return (
    <ChakraProvider>
      <Box display="flex" justifyContent="center">
        {/* <Banner /> */}
        <VStack width="75%" alignItems="center">
          {!loggedIn && (
            <Login username={username} setUsername={setUsername} setLoggedIn={setLoggedIn} />
          )}
          {loggedIn && (
            <Heading as="h1" size="3xl">
              Logged In
            </Heading>
          )}
          <Feed />
        </VStack>
      </Box>
    </ChakraProvider>
  );
}

export default App;
