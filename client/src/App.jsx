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
import { CalendarIcon, SettingsIcon, HamburgerIcon } from "@chakra-ui/icons";

import Login from "./Login";
import FeedBlock from "./FeedBlock";
import ToggleColour from "./ToggleColour";
import ProfileButton from "./ProfileButton";
import NewsBlock from "./NewsBlock";
import { getSubscriptions } from "./dbFunctions";
// 2. Extend the theme to include custom colors, fonts, etc

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [isOrganisation, setIsOrganisation] = useState(false);
  const [subscriptions, setSubscriptions] = useState([]);

  const onLogin = () => {
    getSubscriptions(username)
      .then((result) => {
        console.log("Subscriptions:", result);
        setSubscriptions(result.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

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
                    <FeedBlock
                      loggedIn={loggedIn}
                      username={username}
                      subscriptions={subscriptions}
                      setSubscriptions={setSubscriptions}
                    />
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
                    onLogin={onLogin}
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
