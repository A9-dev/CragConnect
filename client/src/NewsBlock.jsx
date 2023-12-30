import React from "react";
import { useState, useEffect } from "react";
import { getNewsPosts } from "./dbFunctions";
import Feed from "./Feed";
import NewsPost from "./NewsPost";
import { VStack } from "@chakra-ui/react";

const NewsBlock = ({ isOrganisation, username }) => {
  var [newsPosts, setNewsPosts] = useState([]);
  const populateFeed = () => {
    getNewsPosts()
      .then((posts) => {
        console.log("Posts:", posts);
        setNewsPosts(posts.data);
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
      {isOrganisation && <NewsPost username={username} populateFeed={populateFeed} />}
      <Feed posts={newsPosts} />
    </VStack>
  );
};

export default NewsBlock;
