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
  Card,
} from "@chakra-ui/react";

const MainPage = () => {
  return (
    <Box p={30} width={"65%"} margin="auto" py={5}>
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
  );
};
export default MainPage;
