import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  VStack,
  Checkbox,
} from "@chakra-ui/react";
import { createPartnerFindEntry } from "../dbFunctions";
import { Button, useDisclosure } from "@chakra-ui/react";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useState, useContext } from "react";
import { AppContext } from "../App";
import { Alert, AlertIcon } from "@chakra-ui/react";

function CreatePartnerFind() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [dateAndTime, setDateAndTime] = useState("");
  const [location, setLocation] = useState("");
  const { userData } = useContext(AppContext);
  const [followingOnly, setFollowingOnly] = useState(false);

  const handleSubmit = () => {
    if (description === "") {
      setError("Please enter an entry description");
      return;
    }
    if (dateAndTime === "") {
      setError("Please enter a date and time");
      return;
    }
    if (location === "") {
      setError("Please enter a location");
      return;
    }
    const entry = {
      creator: userData._id,
      description,
      dateAndTime,
      location,

      followingOnly,
    };
    createPartnerFindEntry(entry)
      .then(() => {
        onClose();
      })
      .catch((err) => {
        console.error("Error creating partner find entry:", err);
      });
  };
  return (
    <>
      <Button onClick={onOpen}>Create Entry</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create PartnerFindEntry</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              {error && (
                <Alert status="error">
                  <AlertIcon />
                  {error}
                </Alert>
              )}
              <FormControl isRequired>
                <FormLabel>Entry Description</FormLabel>
                <Input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Date and Time</FormLabel>
                <Input
                  placeholder="Select Date and Time"
                  size="md"
                  type="datetime-local"
                  onChange={(e) => {
                    setDateAndTime(e.target.value);
                  }}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Location</FormLabel>
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>
                  Only allow users you follow to submit interest?
                </FormLabel>
                <Checkbox
                  size="lg"
                  isChecked={followingOnly}
                  onChange={(e) => setFollowingOnly(e.target.checked)}
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleSubmit}>Submit</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreatePartnerFind;
