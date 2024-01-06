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
import { CalendarIcon, SettingsIcon, HamburgerIcon, BellIcon, SearchIcon } from "@chakra-ui/icons";

import Login from "./Login";
import FeedBlock from "./FeedBlock";
import ToggleColour from "./ToggleColour";
import ProfileButton from "./ProfileButton";
import NewsBlock from "./NewsBlock";
import { getPosts } from "./dbFunctions";
import FollowingFeed from "./FollowingFeed";
import Search from "./Search";
import Header from "./Header";
import Footer from "./Footer";
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

  const refreshFollowingFeed = () => {
    setFollowingPosts(posts.filter((post) => subscriptions.includes(post.user.username)));
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
        <Header />
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
                      <BellIcon mr={2} />
                      Following
                    </Tab>

                    <Tab>
                      <CalendarIcon mr={2} />
                      News
                    </Tab>
                    <Tab>
                      <SearchIcon mr={2} />
                      Search
                    </Tab>
                    <Tab>
                      <SettingsIcon mr={2} />
                      Settings
                    </Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      <FeedBlock />
                    </TabPanel>
                    <TabPanel>
                      <FollowingFeed />
                    </TabPanel>
                    <TabPanel>
                      <NewsBlock />
                    </TabPanel>
                    <TabPanel>
                      <Search />
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
                    <Login />
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
        <Footer />
      </AppContext.Provider>
    </ChakraProvider>
  );
};

export default App;
