import React from "react";
import { useState, useEffect, useContext } from "react";
import { getNewsPosts } from "../dbFunctions";
import Feed from "../components/Feed";
import NewsPost from "../components/NewsPost";
import {
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  useColorModeValue,
  Box,
  Text,
} from "@chakra-ui/react";
import { AppContext } from "../App";
import Search from "../components/Search";
import { HamburgerIcon, BellIcon, SearchIcon } from "@chakra-ui/icons";

const News = () => {
  const { userData, newsPosts } = useContext(AppContext);
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
            {userData.organisation && <NewsPost />}
            <Feed posts={newsPosts} />
          </TabPanel>
          <TabPanel>
            {userData.subscribingTo ? (
              <Feed
                posts={newsPosts.filter((post) => {
                  return userData.subscribingTo.includes(post.user.username);
                })}
              />
            ) : (
              <Text>Follow an organisation to see their posts here.</Text>
            )}
          </TabPanel>
          <TabPanel>
            <Search organisationSearch={true} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default News;
