import FeedBlock from "../components/FeedBlock";
import FollowingFeed from "../components/FollowingFeed";
import Search from "../components/Search";
import { HamburgerIcon, BellIcon, SearchIcon } from "@chakra-ui/icons";
import { Tabs, Tab, TabList, TabPanels, TabPanel, Box } from "@chakra-ui/react";

const MainPage = () => {
  return (
    <Box p={30} width={"65%"} margin="auto" py={5}>
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
            <Search organisationSearch={false} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};
export default MainPage;
