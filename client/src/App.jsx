import { useState, createContext, useEffect } from "react";
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
import { CalendarIcon, SettingsIcon, HamburgerIcon, BellIcon } from "@chakra-ui/icons";

import Login from "./Login";
import FeedBlock from "./FeedBlock";
import ToggleColour from "./ToggleColour";
import ProfileButton from "./ProfileButton";
import NewsBlock from "./NewsBlock";
import { getSubscriptions, getPosts } from "./dbFunctions";
import FollowingFeed from "./FollowingFeed";

// Create a context for the states
export const AppContext = createContext();

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [isOrganisation, setIsOrganisation] = useState(false);
  const [subscriptions, setSubscriptions] = useState([]);
  const [posts, setPosts] = useState([]);
  const [followingPosts, setFollowingPosts] = useState([]);

  const populateFeed = () => {
    getPosts()
      .then((posts) => {
        setPosts(posts.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const onLogin = () => {
    getSubscriptions(username)
      .then((result) => {
        console.log("Subscriptions:", result);
        setSubscriptions(result.data);
        setFollowingPosts(posts.filter((post) => result.data.includes(post.username)));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const refreshFollowingFeed = () => {
    setFollowingPosts(posts.filter((post) => subscriptions.includes(post.username)));
  };

  useEffect(() => {
    populateFeed();
  }, []);
  return (
    <ChakraProvider>
      {/* Provide the states through the context */}
      <AppContext.Provider
        value={{
          loggedIn,
          setLoggedIn,
          username,
          setUsername,
          isOrganisation,
          setIsOrganisation,
          subscriptions,
          setSubscriptions,
          posts,
          setPosts,
          populateFeed,
          followingPosts,
          setFollowingPosts,
          refreshFollowingFeed,
        }}
      >
        <Grid templateColumns={"repeat(4,1fr)"}>
          <GridItem colSpan={3}>
            <Box margin="auto" py={5} px={20}>
              <Card p={5}>
                <Tabs align="center" variant="enclosed">
                  <TabList>
                    <Tab>
                      <BellIcon mr={2} />
                      Following
                    </Tab>
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
                      <FollowingFeed />
                    </TabPanel>
                    <TabPanel>
                      <FeedBlock />
                    </TabPanel>
                    <TabPanel>
                      <NewsBlock />
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
                    <Login onLogin={onLogin} />
                  ) : (
                    <>
                      <ProfileButton />
                    </>
                  )}
                </HStack>
              </Card>
            </Box>
          </GridItem>
        </Grid>
      </AppContext.Provider>
    </ChakraProvider>
  );
};

export default App;
