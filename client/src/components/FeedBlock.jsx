import React from "react";
import Feed from "./Feed";
import FeedPost from "./FeedPost";
import { VStack } from "@chakra-ui/react";
import { useContext } from "react";
import { AppContext } from "../App";

const FeedBlock = () => {
  const { loggedIn, posts } = useContext(AppContext);

  return (
    <VStack spacing={35}>
      {loggedIn && <FeedPost />}
      <Feed posts={posts} />
    </VStack>
  );
};

export default FeedBlock;
