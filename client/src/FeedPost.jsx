import { Input, Button, Heading, VStack, Alert, AlertIcon, Textarea } from "@chakra-ui/react";
import { useState, useContext } from "react";
import { uploadPost } from "./dbFunctions";
import { AppContext } from "./App";

const FeedPost = () => {
  const { username, populateFeed } = useContext(AppContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const handlePostData = () => {
    console.time("uploadPost");

    if (title === "" || content === "") {
      setError("Please enter a title and content");
      return;
    }

    uploadPost(username, title, content)
      .then((result) => {
        console.log("Post uploaded successfully:", result);
        populateFeed();
        setError("");
      })
      .catch((error) => {
        console.error("Post upload failed:", error);
        setError(error);
      });

    setTitle("");
    setContent("");
    console.timeEnd("uploadPost");
  };

  return (
    <VStack spacing={2} width="100%" margin="5">
      <Heading as="h1" size="3xl">
        Post
      </Heading>
      {error && (
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      )}{" "}
      <Input placeholder="Enter title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <Textarea
        placeholder="Enter content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button onClick={handlePostData}>Post Data</Button>
    </VStack>
  );
};

export default FeedPost;
