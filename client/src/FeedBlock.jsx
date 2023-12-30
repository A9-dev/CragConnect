import React from "react";
import Feed from "./Feed";
import FeedPost from "./FeedPost";
import { useState, useEffect } from "react";
import { getPosts } from "./dbFunctions";
import { VStack } from "@chakra-ui/react";

const FeedBlock = ({ loggedIn, username, subscriptions, setSubscriptions }) => {
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
    <VStack spacing={35}>
      {loggedIn && <FeedPost username={username} populateFeed={populateFeed} />}
      <Feed
        posts={posts}
        subscriptions={subscriptions}
        username={username}
        setSubscriptions={setSubscriptions}
      />
    </VStack>
  );
};

export default FeedBlock;
