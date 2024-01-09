import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Textarea,
} from "@chakra-ui/react";

const CreateEventButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [error, setError] = useState("");

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleCreateEvent = () => {
    console.log("Creating event:", eventTitle);
    // Send the event title to Express
    // ...
  };

  return (
    <>
      <Button onClick={handleOpenModal}>Create an event</Button>

      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>Create Event</ModalHeader>
          <ModalBody>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Event Title</FormLabel>
                <Input
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  placeholder="Enter event name"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Event Description</FormLabel>
                <Textarea
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.target.value)}
                  placeholder="Enter event description"
                />
              </FormControl>
            </VStack>
            {/* Add more form inputs here */}
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleCreateEvent}>Done</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateEventButton;
