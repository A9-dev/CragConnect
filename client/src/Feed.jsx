import React from "react";

import { Heading, Text, VStack, Card, CardBody, CardHeader, StackDivider } from "@chakra-ui/react";

const Feed = ({ posts }) => {
  return (
    <VStack spacing="35px" alignItems="normal" divider={<StackDivider />}>
      <Heading as="h1" size="3xl" textAlign="center">
        Feed
      </Heading>
      {posts &&
        posts.map((post) => (
          <Card key={post._id} variant="outlined">
            <CardHeader>
              <Heading as="h3" size="lg">
                {post.title}
              </Heading>
              <Heading as="h4" size="md">
                {post.username}
              </Heading>
            </CardHeader>
            <CardBody>
              <Text>{post.content}</Text>
            </CardBody>
          </Card>
        ))}
    </VStack>
  );
};

export default Feed;
