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
    refreshFeed,
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
      .then(() => {
        refreshFeed();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // TODO: Make sure this works
  const isoStringToHowLongAgo = (isoString) => {
    const date = new Date(isoString);
    const now = new Date();
    const diff = now - date;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(weeks / 4);
    const years = Math.floor(months / 12);
    if (years > 0) return `${years} year${years > 1 ? "s" : ""} ago`;
    if (months > 0) return `${months} month${months > 1 ? "s" : ""} ago`;
    if (weeks > 0) return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    if (seconds > 0) return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
    return "just now";
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
                  </Text>

                  <Text>Posted: {isoStringToHowLongAgo(post.dateAndTime)}</Text>
                  {loggedIn &&
                    username !== post.user.username && // Check if logged in before rendering buttons
                    (!subscriptions ||
                    !subscriptions.includes(post.user.username) ? (
                      <Button
                        m={5}
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
