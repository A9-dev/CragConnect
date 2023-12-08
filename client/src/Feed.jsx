import React from "react";

import { useState, useEffect } from "react";
import { Heading, Text, VStack, Card, CardBody, CardHeader, StackDivider } from "@chakra-ui/react";
import { getPosts } from "./dbFunctions";

const Feed = () => {
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
    <VStack spacing="35px" alignItems="normal" divider={<StackDivider />}>
      <Heading as="h1" size="3xl" textAlign="center">
        Feed
      </Heading>
      {posts &&
        posts.map((post) => (
          <Card key={post.id} variant="outlined">
            <CardHeader>
              <Heading as="h3" size="lg">
                {post.title} - {post.username}
              </Heading>
            </CardHeader>
            <CardBody>
              <Text id={post.id}>{post.content}</Text>
            </CardBody>
          </Card>
        ))}
    </VStack>
  );
};

export default Feed;
