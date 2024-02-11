import React from "react";
import Feed from "./Feed";
import { VStack, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { AppContext } from "../App";

const FeedBlock = () => {
  const { loggedIn, posts, userData } = useContext(AppContext);
  return (
    <VStack spacing={35}>
      {!loggedIn && <Text>Log in to see posts from people you follow.</Text>}
      {loggedIn && !userData.subscribingTo && (
        <Text>Follow someone to see their posts here.</Text>
      )}
      {loggedIn && userData.subscribingTo && (
        <Feed
          posts={posts.filter((post) => {
            return userData.subscribingTo.includes(post.user.username);
          })}
        />
      )}
    </VStack>
  );
};

export default FeedBlock;
