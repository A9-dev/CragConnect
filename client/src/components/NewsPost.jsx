import { useState, useContext } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Input,
  Textarea,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { uploadNewsPost } from "../dbFunctions";
import { AppContext } from "../App";

const FeedPost = () => {
  const { userData, refreshFeed } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handlePostData();
    }
  };

  const handlePostData = () => {
    console.time("uploadPost");

    if (title === "" || content === "") {
      setError("Please enter a title and content");
      return;
    }

    uploadNewsPost(userData.username, title, content)
      .then(() => {
        refreshFeed();
        setError("");
        setIsOpen(false);
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
    <>
      <Button onClick={() => setIsOpen(true)} mb={5}>
        Create a Post
      </Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a Post</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            {error && (
              <Alert status="error">
                <AlertIcon />
                {error}
              </Alert>
            )}
            <Input
              placeholder="Enter title"
              value={title}
              mb={3}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Textarea
              placeholder="Enter content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </ModalBody>
          <ModalFooter>
            <Button onClick={handlePostData}>Post</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FeedPost;
