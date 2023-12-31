import React from "react";

import {
  Heading,
  Text,
  VStack,
  Card,
  CardBody,
  CardHeader,
  StackDivider,
  Button,
} from "@chakra-ui/react";
import { subscribe, unsubscribe } from "./dbFunctions";
import { useContext } from "react";
import { AppContext } from "./App";

const Feed = ({ posts }) => {
  const { username, subscriptions, setSubscriptions, loggedIn } = useContext(AppContext);

  const handleSubscribe = (username, author) => {
    subscribe(username, author);
    if (!subscriptions) setSubscriptions([author]);
    else setSubscriptions([...subscriptions, author]);
  };

  const handleUnsubscribe = (username, author) => {
    unsubscribe(username, author);
    setSubscriptions(subscriptions.filter((sub) => sub !== author));
  };

  return (
    <VStack spacing="35px" divider={<StackDivider />}>
      {posts &&
        posts.map((post) => (
          <Card key={post._id} variant="filled" width="100%">
            <CardHeader>
              <Heading as="h3" size="lg">
                {post.title}
              </Heading>
              <Text fontSize="2xl" textAlign="left">
                {post.username}
                {subscriptions && subscriptions.includes(post.username) && " (Subscribed)"}
                {loggedIn && // Check if logged in before rendering buttons
                  (!subscriptions || !subscriptions.includes(post.username) ? (
                    <Button onClick={() => handleSubscribe(username, post.username)}>
                      Subscribe
                    </Button>
                  ) : (
                    <Button onClick={() => handleUnsubscribe(username, post.username)}>
                      Unsubscribe
                    </Button>
                  ))}
              </Text>
            </CardHeader>
            <CardBody>
              <Text textAlign="justify">{post.content}</Text>
            </CardBody>
          </Card>
        ))}
    </VStack>
  );
};

export default Feed;
