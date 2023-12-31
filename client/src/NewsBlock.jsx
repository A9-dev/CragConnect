import React from "react";
import { useState, useEffect, useContext } from "react";
import { getNewsPosts } from "./dbFunctions";
import Feed from "./Feed";
import NewsPost from "./NewsPost";
import { VStack } from "@chakra-ui/react";
import { AppContext } from "./App";

const NewsBlock = () => {
  const { isOrganisation } = useContext(AppContext);
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
      {isOrganisation && <NewsPost populateFeed={populateFeed} />}
      <Feed posts={newsPosts} />
    </VStack>
  );
};

export default NewsBlock;
