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
    <VStack spacing={35}>
      {isOrganisation && <NewsPost refreshNewsPosts={refreshNewsPosts} />}
      <Feed posts={newsPosts} />
    </VStack>
  );
};

export default NewsBlock;
