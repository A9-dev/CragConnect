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
  HStack,
  Avatar,
  Flex,
  Spacer,
  IconButton,
} from "@chakra-ui/react";
import { subscribe, unsubscribe, deletePost } from "./dbFunctions";
import { useContext, useEffect } from "react";
import { AppContext } from "./App";
import { DeleteIcon } from "@chakra-ui/icons";

const Feed = ({ posts }) => {
  const {
    username,
    subscriptions,
    setSubscriptions,
    loggedIn,
    refreshFollowingFeed,
  } = useContext(AppContext);

  // ... existing code ...
  const handleSubscribe = (username, author) => {
    subscribe(username, author);
    if (!subscriptions) setSubscriptions([author]);
    else setSubscriptions([...subscriptions, author]);
    refreshFollowingFeed();
  };

  const handleUnsubscribe = (username, author) => {
    unsubscribe(username, author);
    setSubscriptions(subscriptions.filter((sub) => sub !== author));
    refreshFollowingFeed();
  };

  const handleDeletePost = (postId) => {
    deletePost(postId)
      .then((result) => {
        console.log("Deleted post successfully:", result);
        // Refresh the feed
        refreshFollowingFeed();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    refreshFollowingFeed();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subscriptions]); // Add refreshFollowingFeed as a dependency

  return (
    <VStack spacing="35px" divider={<StackDivider />}>
      {posts &&
        posts.map((post) => (
          <Card key={post._id} variant="filled" width="100%">
            <CardHeader>
              <Heading as="h3" size="lg">
                {post.title}
              </Heading>
              <Flex>
                <HStack>
                  <Avatar size="sm" name={post.user.fullName} mr={2} />
                  <Text fontSize="2xl" textAlign="left">
                    {post.user.username}
                    {loggedIn &&
                      username !== post.user.username && // Check if logged in before rendering buttons
                      (!subscriptions ||
                      !subscriptions.includes(post.user.username) ? (
                        <Button
                          onClick={() =>
                            handleSubscribe(username, post.user.username)
                          }
                        >
                          Follow
                        </Button>
                      ) : (
                        <Button
                          onClick={() =>
                            handleUnsubscribe(username, post.user.username)
                          }
                        >
                          Unfollow
                        </Button>
                      ))}
                  </Text>
                </HStack>
                <Spacer />
                {
                  // only show delete button if the post belongs to the logged in user
                  loggedIn && username === post.user.username && (
                    <IconButton
                      onClick={() => {
                        handleDeletePost(post._id);
                      }}
                      aria-label="Delete"
                      icon={<DeleteIcon />}
                    />
                  )
                }
              </Flex>
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
