import React, { useState, useContext } from "react";
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
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { postEvent } from "./dbFunctions";
import { AppContext } from "./App";

const CreateEventButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [postcode, setPostcode] = useState("");
  const [dateAndTime, setDateAndTime] = useState("");
  const [error, setError] = useState("");

  const { username, refreshEventList } = useContext(AppContext);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleCreateEvent = () => {
    console.log("Username", username);
    console.log("Creating event:", eventTitle);
    console.log("Phone Number:", phoneNumber);
    console.log("Address:", address);
    console.log("Postcode:", postcode);
    console.log("Description:", eventDescription);
    console.log("Date and Time:", dateAndTime);

    // Send the event details to Express
    if (
      !eventTitle ||
      !eventDescription ||
      !address ||
      !postcode ||
      !dateAndTime
    ) {
      setError("Please enter all required fields");
      return;
    }

    // Send the event details to Express

    postEvent(
      username,
      eventTitle,
      eventDescription,
      address,
      postcode,
      phoneNumber,
      dateAndTime
    )
      .then((result) => {
        console.log("Event created successfully:", result);

        setError("");
        handleCloseModal();
        refreshEventList();
      })
      .catch((error) => {
        console.error("Event creation failed:", error);
        setError(error);
      });
    // ...
  };

  return (
    <>
      <Button onClick={handleOpenModal} m={3}>
        Create an event
      </Button>

      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>Create Event</ModalHeader>
          <ModalBody>
            {error && (
              <Alert status="error">
                <AlertIcon />
                {error}
              </Alert>
            )}
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Event Title</FormLabel>
                <Input
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  placeholder="Enter event name"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Event Description</FormLabel>

                <Textarea
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.target.value)}
                  placeholder="Enter event description"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Address</FormLabel>
                <Input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter address"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Postcode</FormLabel>
                <Input
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                  placeholder="Enter postcode"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Phone Number</FormLabel>
                <Input
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter phone number"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Date and time</FormLabel>
                <Input
                  placeholder="Select Date and Time"
                  size="md"
                  type="datetime-local"
                  onChange={(e) => {
                    setDateAndTime(e.target.value);
                  }}
                />
              </FormControl>
            </VStack>
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
