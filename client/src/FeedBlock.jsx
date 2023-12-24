import React from "react";
import Feed from "./Feed";
import FeedPost from "./FeedPost";
import { useState, useEffect } from "react";
import { getPosts } from "./dbFunctions";
import { VStack, Box } from "@chakra-ui/react";

const FeedBlock = ({ loggedIn, username }) => {
  var [posts, setPosts] = useState([]);
  const populateFeed = () => {
    getPosts()
      .then((posts) => {
        console.log("Posts:", posts);
        setPosts(posts.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    populateFeed();
  }, []);
  return (
    <Box w="30%" p={4}>
      <VStack spacing={35} alignItems="center">
        {loggedIn && <FeedPost username={username} populateFeed={populateFeed} />}
        <Feed posts={posts} />
      </VStack>
    </Box>
  );
};

export default FeedBlock;
