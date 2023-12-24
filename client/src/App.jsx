import { useState } from "react";
import { ChakraProvider, Tabs, Tab, TabList, TabPanels, TabPanel, Box } from "@chakra-ui/react";
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
      <Box width="50%" margin="auto" padding={5}>
        <Tabs align="center" variant={"soft-rounded"}>
          <TabList>
            <Tab>Login</Tab>
            <Tab>Feed</Tab>

            <Tab>News</Tab>
            <Tab>Settings</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Login username={username} setUsername={setUsername} setLoggedIn={setLoggedIn} />
            </TabPanel>
            <TabPanel>
              <FeedBlock loggedIn={loggedIn} username={username} />
            </TabPanel>
            <TabPanel>
              <p>News</p>
            </TabPanel>
            <TabPanel>
              <p>Settings</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      {/* TODO: Change login to own page */}
    </ChakraProvider>
  );
}

export default App;
