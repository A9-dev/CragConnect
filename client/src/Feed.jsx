import React from "react";

import { Heading, Text, VStack, Card, CardBody, CardHeader, StackDivider } from "@chakra-ui/react";

const Feed = ({ posts }) => {
  return (
    <VStack spacing="35px" alignItems="normal" divider={<StackDivider />}>
      {posts &&
        posts.map((post) => (
          <Card key={post._id} variant="filled" width="100%">
            <CardHeader>
              <Heading as="h3" size="lg">
                {post.title}
              </Heading>
              <Text fontSize="2xl">{post.username}</Text>
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
