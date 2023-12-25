import { useState } from "react";
import {
  ChakraProvider,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Box,
  HStack,
} from "@chakra-ui/react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CalendarIcon, SettingsIcon, HamburgerIcon } from "@chakra-ui/icons";

import Login from "./Login";
import FeedBlock from "./FeedBlock";
import ToggleColour from "./ToggleColour";
import ProfileButton from "./ProfileButton";
// 2. Extend the theme to include custom colors, fonts, etc

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  return (
    <ChakraProvider>
      <Box width="50%" margin="auto" padding={5}>
        <HStack>
          {!loggedIn ? (
            <Login setLoggedIn={setLoggedIn} username={username} setUsername={setUsername} />
          ) : (
            <>
              <ProfileButton
                username={username}
                setLoggedIn={setLoggedIn}
                setUsername={setUsername}
              />
            </>
          )}

          <ToggleColour />
        </HStack>
        <Tabs align="center" variant="line">
          <TabList>
            <Tab>
              <HamburgerIcon mr={2} />
              Feed
            </Tab>

            <Tab>
              <CalendarIcon mr={2} />
              News
            </Tab>
            <Tab>
              <SettingsIcon mr={2} />
              Settings
            </Tab>
          </TabList>

          <TabPanels>
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
