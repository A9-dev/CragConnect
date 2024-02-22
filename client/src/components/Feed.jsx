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
  Center,
  Spacer,
  IconButton,
  Box,
  Input,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  subscribe,
  unsubscribe,
  deletePost,
  addLikeToPost,
  deleteLikeFromPost,
  addCommentToPost,
  deleteCommentFromPost,
} from "../dbFunctions";
import { useContext, useState } from "react";
import { AppContext } from "../App";
import { DeleteIcon } from "@chakra-ui/icons";
import { FaHeart, FaHeartBroken } from "react-icons/fa";

const Feed = ({ posts }) => {
  const { loggedIn, refreshFeed, userData, setUserData } =
    useContext(AppContext);
  const buttonColorScheme = useColorModeValue("blue", "purple");
  const [commentToPost, setCommentToPost] = useState({});

  const handleLike = (post) => {
    addLikeToPost(post._id, userData._id)
      .then(() => {
        refreshFeed();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleUnlike = (post) => {
    deleteLikeFromPost(post._id, userData._id)
      .then(() => {
        refreshFeed();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleSubscribe = (username, author) => {
    subscribe(username, author);

    if (!userData.subscribingTo)
      setUserData({ ...userData, subscribingTo: [author] });
    else
      setUserData({
        ...userData,
        subscribingTo: [...userData.subscribingTo, author],
      });
  };

  const handleUnsubscribe = (username, author) => {
    unsubscribe(username, author);
    setUserData({
      ...userData,
      subscribingTo: userData.subscribingTo.filter((sub) => sub !== author),
    });
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

  return (
    <VStack spacing="35px" divider={<StackDivider />}>
      {posts &&
        posts.map((post) => (
          <Card key={post._id} variant="filled" width="850px" p={5}>
            <CardHeader>
              <Heading as="h3" mb={3} size="lg" textAlign={"center"}>
                {post.title}
                https://www.wolframalpha.com/input?i=%2865.6*0.35%29%2B%280.65*%28%28x%2B71.6%29%2F2%29%29%3E70
              </Heading>
              <Flex>
                <HStack>
                  <Avatar size="sm" name={post.user.fullName} mr={2} />
                  <Text fontSize="2xl">{post.user.username}</Text>
                  <Spacer />
                  <Text>|</Text>
                  <Spacer />
                  <Text>Posted: {isoStringToHowLongAgo(post.dateAndTime)}</Text>
                  <Spacer />
                  <Text>|</Text>
                  <Spacer />
                  <Text>
                    {post.likes.length}{" "}
                    {post.likes.length === 1 ? "like" : "likes"}
                  </Text>
                </HStack>
                <Spacer />
                {/* Like button */}
                {loggedIn && !post.likes.includes(userData._id) && (
                  <Button
                    onClick={() => handleLike(post)}
                    colorScheme={buttonColorScheme}
                    leftIcon={<FaHeart />}
                  >
                    Like
                  </Button>
                )}
                {loggedIn && post.likes.includes(userData._id) && (
                  <Button
                    colorScheme={buttonColorScheme}
                    onClick={() => handleUnlike(post)}
                    leftIcon={<FaHeartBroken />}
                    variant="outline"
                  >
                    Unlike
                  </Button>
                )}

                {/* Follow/Unfollow button */}

                {loggedIn &&
                  userData.username !== post.user.username && // Check if logged in before rendering buttons
                  (!userData.subscribingTo ||
                  !userData.subscribingTo.includes(post.user.username) ? (
                    <Button
                      colorScheme={buttonColorScheme}
                      ml={3}
                      onClick={() =>
                        handleSubscribe(userData.username, post.user.username)
                      }
                    >
                      Follow
                    </Button>
                  ) : (
                    <Button
                      ml={3}
                      colorScheme={buttonColorScheme}
                      variant="outline"
                      onClick={() =>
                        handleUnsubscribe(userData.username, post.user.username)
                      }
                    >
                      Unfollow
                    </Button>
                  ))}
                {
                  // only show delete button if the post belongs to the logged in user
                  loggedIn && userData.username === post.user.username && (
                    <IconButton
                      ml={3}
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
            <Box textAlign={"left"}>
              {loggedIn && (
                <Center>
                  <Input
                    width={"95%"}
                    type="text"
                    placeholder="Add a comment"
                    value={commentToPost[post._id] || ""}
                    onChange={(e) =>
                      setCommentToPost((prev) => ({
                        ...prev,
                        [post._id]: e.target.value,
                      }))
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        setCommentToPost({ [post._id]: "" });
                        addCommentToPost(post._id, userData._id, e.target.value)
                          .then(() => {
                            refreshFeed();
                          })
                          .catch((error) => {
                            console.error("Error:", error);
                          });
                      }
                    }}
                  />
                </Center>
              )}
              {post.comments
                .map((comment) => (
                  <Box m={5} ml={10} key={comment._id}>
                    <HStack>
                      <Avatar size="sm" name={comment.user.fullName} />
                      <Text>
                        <b>{comment.user.username}</b>: {comment.content}
                      </Text>
                      {loggedIn &&
                        userData.username === comment.user.username && (
                          <IconButton
                            onClick={() => {
                              deleteCommentFromPost(post._id, comment._id)
                                .then(() => {
                                  refreshFeed();
                                })
                                .catch((error) => {
                                  console.error("Error:", error);
                                });
                            }}
                            aria-label="Delete"
                            icon={<DeleteIcon />}
                          />
                        )}
                    </HStack>
                  </Box>
                ))
                .reverse()}
            </Box>
          </Card>
        ))}
    </VStack>
  );
};

export default Feed;
