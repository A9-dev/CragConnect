import React from "react";
import { useState, useEffect, useContext } from "react";
import { getNewsPosts } from "../dbFunctions";
import Feed from "../Feed";
import NewsPost from "../NewsPost";
import { VStack, Box } from "@chakra-ui/react";
import { AppContext } from "../App";

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
    <Box p={5} width={"50%"} m={"auto"}>
      <VStack spacing={35}>
        {userData.organisation && (
          <NewsPost refreshNewsPosts={refreshNewsPosts} />
        )}
        <Feed posts={newsPosts} />
      </VStack>
    </Box>
  );
};

export default News;
