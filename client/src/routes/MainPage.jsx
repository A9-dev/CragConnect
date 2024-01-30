import EventList from "../EventList";
import FeedBlock from "../FeedBlock";
import FollowingFeed from "../FollowingFeed";
import Search from "../Search";
import { HamburgerIcon, BellIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Box,
  Container,
  Card,
  Grid,
  GridItem,
} from "@chakra-ui/react";

const MainPage = () => (
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
                  <SearchIcon mr={2} />
                  Search
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
                  <Search />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Card>
        </Box>
      </GridItem>
      <GridItem colSpan={4}>
        <EventList />
      </GridItem>
    </Grid>
  </Box>
);

export default MainPage;
