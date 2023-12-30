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
  Container,
  Card,
  Grid,
  GridItem,
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
import NewsBlock from "./NewsBlock";
// 2. Extend the theme to include custom colors, fonts, etc

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [isOrganisation, setIsOrganisation] = useState(false);

  return (
    <ChakraProvider>
      <Grid templateColumns={"repeat(4,1fr)"}>
        <GridItem colSpan={3}>
          <Box margin="auto" py={5} px={20}>
            <Card p={5}>
              <Tabs align="center" variant="enclosed">
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
                    <NewsBlock isOrganisation={isOrganisation} username={username} />
                  </TabPanel>
                  <TabPanel>
                    <Container>
                      <ToggleColour />
                    </Container>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Card>
          </Box>
        </GridItem>
        <GridItem>
          <Box px={5} py={5}>
            <Card p={5} alignItems={"center"}>
              <HStack>
                {!loggedIn ? (
                  <Login
                    setLoggedIn={setLoggedIn}
                    username={username}
                    setUsername={setUsername}
                    setIsOrganisation={setIsOrganisation}
                  />
                ) : (
                  <>
                    <ProfileButton
                      username={username}
                      setLoggedIn={setLoggedIn}
                      setUsername={setUsername}
                    />
                  </>
                )}
              </HStack>
            </Card>
          </Box>
        </GridItem>
      </Grid>
    </ChakraProvider>
  );
}

export default App;
