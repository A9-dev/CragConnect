import { useState, createContext, useEffect } from "react";
import {
  ChakraProvider,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Box,
  Container,
  Card,
  CardBody,
  Grid,
  GridItem,
  CardHeader,
  Heading,
  VStack,
  Text,
} from "@chakra-ui/react";
import {
  CalendarIcon,
  SettingsIcon,
  HamburgerIcon,
  BellIcon,
  SearchIcon,
} from "@chakra-ui/icons";

import FeedBlock from "./FeedBlock";
import ToggleColour from "./ToggleColour";
import NewsBlock from "./NewsBlock";
import { getPosts, getEvents } from "./dbFunctions";
import FollowingFeed from "./FollowingFeed";
import Search from "./Search";
import Header from "./Header";
import Footer from "./Footer";
import CreateEventButton from "./CreateEventButton";
// Create a context for the states
export const AppContext = createContext();

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [isOrganisation, setIsOrganisation] = useState(false);
  const [subscriptions, setSubscriptions] = useState([]);
  const [posts, setPosts] = useState([]);
  const [followingPosts, setFollowingPosts] = useState([]);
  const [events, setEvents] = useState([]);

  const populateFeed = () => {
    getPosts()
      .then((posts) => {
        setPosts(posts.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    getEvents()
      .then((events) => {
        setEvents(events.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const refreshFollowingFeed = () => {
    setFollowingPosts(
      posts.filter((post) => subscriptions.includes(post.user.username))
    );
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
          events,
          setEvents,
        }}
      >
        <Box pb={"100px"}>
          <Header />
          <Box p={30}>
            <Grid templateColumns={"repeat(12,1fr)"} gap={6}>
              <GridItem colSpan={8}>
                <Box margin="auto" py={5}>
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
              <GridItem colSpan={4}>
                <Box margin="auto" py={5}>
                  <Card p={5} textAlign={"center"}>
                    <CardHeader>
                      <Heading size="2xl">Events</Heading>
                    </CardHeader>
                    <CardBody>
                      {isOrganisation && <CreateEventButton />}
                      {events.map((event) => (
                        <Card key={event._id}>
                          <CardHeader>
                            <Heading size="lg">{event.eventTitle}</Heading>
                          </CardHeader>
                          <CardBody>
                            <VStack>
                              <Text>{event.eventDescription}</Text>
                              <Text>
                                <b>Address: </b>
                                {event.address}
                              </Text>
                              <Text>
                                <b>Date and time: </b>
                                {event.dateAndTime}
                              </Text>
                            </VStack>
                          </CardBody>
                        </Card>
                      ))}
                    </CardBody>
                  </Card>
                </Box>
              </GridItem>
            </Grid>
          </Box>
          <Footer />
        </Box>
      </AppContext.Provider>
    </ChakraProvider>
  );
};

export default App;
