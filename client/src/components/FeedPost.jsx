import { useState, useContext } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  Textarea,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { uploadPost } from "../dbFunctions";
import { AppContext } from "../App";

const FeedPost = () => {
  const { userData, refreshFeed } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  // Handle the Enter key being pressed, creates a new post
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handlePostData();
    }
  };

  const handlePostData = () => {
    if (title === "" || content === "") {
      setError("Please enter a title and content");
      return;
    }

    uploadPost(userData.username, title, content)
      .then(() => {
        refreshFeed();
        setError("");
        setIsOpen(false);
      })
      .catch((error) => {
        setError(error);
      });

    setTitle("");
    setContent("");
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        data-testid="create-post-button"
        mb={5}
      >
        Create a Post
      </Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a Post</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            {error && (
              <Alert status="error" data-testid="create-post-error">
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
              data-testid="create-post-modal"
              placeholder="Enter content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              data-testid="create-post-button-submit"
              onClick={handlePostData}
            >
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FeedPost;
