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
  VStack,
  Text,
  StackDivider,
} from "@chakra-ui/react";
import { updateEntry } from "../dbFunctions";
import { useState } from "react";
import { useEffect } from "react";

const SelectFromInterestedUsers = ({ entry, refreshEntries }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [selected, setSelected] = useState([]);
  const [notSelected, setNotSelected] = useState([]);

  useEffect(() => {
    if (entry && entry.selectedUsers && entry.usersInterested) {
      setSelected(entry.selectedUsers);
      setNotSelected(
        entry.usersInterested.filter(
          (user) => !entry.selectedUsers.some((user2) => user2._id === user._id)
        )
      );
    }
  }, [entry]);

  const handleSelect = (user) => {
    setSelected([...selected, user]);
    setNotSelected(notSelected.filter((user2) => user2._id !== user._id));
  };

  const handleDeselect = (user) => {
    setNotSelected([...notSelected, user]);
    setSelected(selected.filter((user2) => user2._id !== user._id));
  };

  const handleSave = () => {
    const selectedIds = selected.map((user) => user._id) || [];
    const updatedEntry = { ...entry, selectedUsers: selectedIds };
    updateEntry(updatedEntry).then(() => {
      refreshEntries();
      onClose();
    });
  };

  return (
    <>
      <Button onClick={onOpen} width={"80%"} margin={"auto"}>
        Select from interested users
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size={"2xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Interested Users</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HStack divider={<StackDivider />} align={"top"}>
              <VStack width={"50%"}>
                <Text>Selected Users</Text>
                {selected &&
                  selected.map((user) => (
                    <Button key={user._id} onClick={() => handleDeselect(user)}>
                      {user.fullName}
                    </Button>
                  ))}
              </VStack>
              <VStack width={"50%"}>
                <Text>Not Selected Users</Text>
                {notSelected &&
                  notSelected.map((user) => (
                    <Button key={user._id} onClick={() => handleSelect(user)}>
                      {user.fullName}
                    </Button>
                  ))}
              </VStack>
            </HStack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleSave}>Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SelectFromInterestedUsers;
