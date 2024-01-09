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
import { uploadPost } from "./dbFunctions";
import { AppContext } from "./App";

const FeedPost = () => {
  const { username, populateFeed } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);
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
      <Button onClick={() => setIsOpen(true)}>Create a Post</Button>
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
            <Input placeholder="Enter title" value={title} mb={3} onChange={(e) => setTitle(e.target.value)} />
            <Textarea placeholder="Enter content" value={content} onChange={(e) => setContent(e.target.value)} />
          </ModalBody>
          <ModalFooter>
            <Button onClick={handlePostData}>Post Data</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FeedPost;
