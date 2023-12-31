import React from "react";
import Feed from "./Feed";
import FeedPost from "./FeedPost";
import { useState, useEffect } from "react";
import { getPosts } from "./dbFunctions";
import { VStack } from "@chakra-ui/react";
import { useContext } from "react";
import { AppContext } from "./App";

const FeedBlock = () => {
  const { loggedIn } = useContext(AppContext);
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
      {loggedIn && <FeedPost populateFeed={populateFeed} />}
      <Feed posts={posts} />
    </VStack>
  );
};

export default FeedBlock;
