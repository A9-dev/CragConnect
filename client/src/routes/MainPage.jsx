import { useContext } from "react";
import Feed from "../components/Feed";
import FollowingFeed from "../components/FollowingFeed";
import Search from "../components/Search";
import { HamburgerIcon, BellIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import { AppContext } from "../App";

const MainPage = () => {
  const { posts } = useContext(AppContext);
  const tabsColourScheme = useColorModeValue("blue", "purple");
  return (
    <Box
      p={10}
      width={"65%"}
      margin="auto"
      py={5}
      borderRadius={15}
      borderWidth={1}
      m={5}
      mx={"auto"}
    >
      <Tabs align="center" variant="enclosed" colorScheme={tabsColourScheme}>
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
            <Feed posts={posts} />
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
