import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
  Box,
  Heading,
  Center,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Text,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { AtSignIcon } from "@chakra-ui/icons";
import { useContext } from "react";
import { AppContext } from "./App";

const ProfileButton = () => {
  const { setLoggedIn, setUsername, username, subscriptions } =
    useContext(AppContext);
  const isDarkMode = useColorModeValue(false, true);

  const handleSignout = () => {
    setLoggedIn(false);
    setUsername("");
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleProfile = () => {
    onOpen();
    // TODO: Add functionality to profile button
  };

  return (
    <Box>
      <Menu>
        <MenuButton
          as={Button}
          leftIcon={<AtSignIcon />}
          bg={isDarkMode ? "gray.800" : "gray.200"}
          color={isDarkMode ? "white" : "black"}
        >
          {username}
        </MenuButton>
        <MenuList
          bg={isDarkMode ? "gray.800" : "gray.200"}
          color={isDarkMode ? "white" : "black"}
        >
          <MenuItem onClick={handleProfile}>Profile</MenuItem>
          <MenuItem onClick={handleSignout}>Sign out</MenuItem>
        </MenuList>
      </Menu>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={isDarkMode ? "gray.800" : "gray.200"}>
          <ModalHeader>Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center>
              <Heading>{username}</Heading>
            </Center>
            <Text>Following:</Text>
            {subscriptions.map((subscription) => {
              return <Text key={subscription}>{subscription}</Text>;
            })}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProfileButton;
