import React from "react";
import Feed from "./Feed";
import FeedPost from "./FeedPost";
import { VStack, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { AppContext } from "./App";

const FeedBlock = () => {
  const { loggedIn, followingPosts } = useContext(AppContext);
  return (
    <VStack spacing={35}>
      {loggedIn && <FeedPost />}
      {!loggedIn && <Text>Log in to see posts from people you follow.</Text>}
      <Feed posts={followingPosts} />
    </VStack>
  );
};

export default FeedBlock;
