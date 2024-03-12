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
import { postEvent } from "../dbFunctions";
import { AppContext } from "../App";

const CreateEventButton = ({ refreshEventList }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [postcode, setPostcode] = useState("");
  const [dateAndTime, setDateAndTime] = useState("");
  const [error, setError] = useState("");

  const { userData } = useContext(AppContext);

  // Handle the Enter key being pressed, creates a new event
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleCreateEvent();
    }
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const checkPostCode = (postcode) => {
    const postcodeRegex = /([a-zA-Z]{2}[0-9]{1,2}\s{0,1}[0-9]{1,2}[a-zA-Z]{2})/;
    return postcodeRegex.test(postcode);
  };

  const checkPhoneNumber = (phoneNumber) => {
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    return phoneRegex.test(phoneNumber);
  };

  const handleCreateEvent = () => {
    // Send the event details to Express
    if (
      !eventTitle ||
      !eventDescription ||
      !address ||
      !postcode ||
      !dateAndTime
    ) {
      setError("Please enter all required fields");
      console.log("Please enter all required fields");
      return;
    }

    if (phoneNumber && !checkPhoneNumber(phoneNumber)) {
      setError("Please enter a valid phone number. Example: +1234567890");

      return;
    }

    if (!checkPostCode(postcode)) {
      setError("Please enter a valid postcode. Example: AB12 3CD");
      return;
    }
    // Send the event details to Express

    postEvent(
      userData.username,
      eventTitle,
      eventDescription,
      address,
      postcode,
      phoneNumber,
      dateAndTime
    )
      .then(() => {
        setError("");
        handleCloseModal();
        refreshEventList();
      })
      .catch((error) => {
        setError(error);
      });
    // ...
  };

  return (
    <>
      <Button onClick={handleOpenModal} m={3} data-testid="create-event-button">
        Create an event
      </Button>

      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>Create Event</ModalHeader>
          <ModalBody data-testid="create-event-modal">
            <VStack spacing={4}>
              {error && (
                <Alert status="error">
                  <AlertIcon />
                  {error}
                </Alert>
              )}
              <FormControl isRequired>
                <FormLabel>Event Title</FormLabel>
                <Input
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  placeholder="Enter event name"
                  onKeyDown={handleKeyDown}
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
                  onKeyDown={handleKeyDown}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Postcode</FormLabel>
                <Input
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value.toUpperCase())}
                  placeholder="Enter postcode"
                  onKeyDown={handleKeyDown}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Phone Number</FormLabel>
                <Input
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter phone number"
                  onKeyDown={handleKeyDown}
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
                  onKeyDown={handleKeyDown}
                />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              data-testid="create-event-submit-button"
              onClick={handleCreateEvent}
            >
              Done
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateEventButton;
