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
  Box,
  Text,
} from "@chakra-ui/react";
import { AppContext } from "../App";
import Search from "../components/Search";
import { HamburgerIcon, BellIcon, SearchIcon } from "@chakra-ui/icons";

const News = () => {
  const { userData } = useContext(AppContext);
  var [newsPosts, setNewsPosts] = useState([]);
  const refreshNewsPosts = () => {
    getNewsPosts()
      .then((posts) => {
        setNewsPosts(posts.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    refreshNewsPosts();
  }, []);
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
            {userData.organisation && (
              <NewsPost refreshNewsPosts={refreshNewsPosts} />
            )}
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
