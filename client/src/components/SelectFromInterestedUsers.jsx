import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  HStack,
  Box,
  VStack,
  Text,
  StackDivider,
} from "@chakra-ui/react";
import { getSingleEntry, updateEntry } from "../dbFunctions";
import { useState } from "react";
import { useEffect } from "react";
const SelectFromInterestedUsers = ({ entryID }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const [entry, setEntry] = useState({
    selectedUsers: [],
    usersInterested: [],
  });

  const selected = entry.selectedUsers;
  const notSelected =
    entry.usersInterested.filter(
      (user) =>
        !entry.selectedUsers.some(
          (selectedUser) => selectedUser._id === user._id
        )
    ) || [];
  useEffect(() => {
    getSingleEntry(entryID).then((data) => {
      setEntry(data.data);
    });
  }, [entryID]);

  const handleSelect = (user) => {
    const newEntry = {
      ...entry,
      selectedUsers: [...entry.selectedUsers, user._id],
    };
    updateEntry(newEntry).then((data) => {
      setEntry(data.data);
    });
  };

  const handleDeselect = (user) => {
    const newEntry = {
      ...entry,
      selectedUsers: entry.selectedUsers.filter((id) => id !== user._id),
    };
    updateEntry(newEntry).then((data) => {
      setEntry(data.data);
    });
  };

  return (
    <>
      <Button onClick={onOpen} width={"80%"} margin={"auto"}>
        Select from interested users
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Interested Users</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HStack divider={<StackDivider />}>
              <Box>
                <VStack>
                  <Text>Selected Users</Text>
                  {selected.map((user) => (
                    <Button key={user._id} onClick={() => handleDeselect(user)}>
                      {user.username}
                    </Button>
                  ))}
                </VStack>
              </Box>
              <Box>
                <VStack>
                  <Text>Not Selected Users</Text>
                  {notSelected.map((user) => (
                    <Button key={user._id} onClick={() => handleSelect(user)}>
                      {user.username}
                    </Button>
                  ))}
                </VStack>
              </Box>
            </HStack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SelectFromInterestedUsers;
