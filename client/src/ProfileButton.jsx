import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Heading,
  Center,
  Text,
  Spacer,
  Flex,
} from "@chakra-ui/react";
import { unsubscribe } from "./dbFunctions";
import { AtSignIcon } from "@chakra-ui/icons";
import { useContext } from "react";
import { AppContext } from "./App";

const ProfileButton = () => {
  const {
    setLoggedIn,
    setUsername,
    username,
    subscriptions,
    fullName,
    setSubscriptions,
  } = useContext(AppContext);
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

  const handleUnfollowButton = (userToUnfollow) => {
    unsubscribe(username, userToUnfollow)
      .then((result) => {
        setSubscriptions(subscriptions.filter((sub) => sub !== userToUnfollow));
        console.log("Unsubscribed successfully:", result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
          <ModalHeader>{fullName}'s Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center>
              <Heading size="md" mb={5}>
                Following
              </Heading>
            </Center>

            <Box width="75%" margin="auto">
              {subscriptions.map((subscription) => (
                <Flex mb={3}>
                  <Text key={subscription}>{subscription}</Text>
                  <Spacer />
                  <Button
                    onClick={() => {
                      handleUnfollowButton(subscription);
                    }}
                  >
                    Unfollow
                  </Button>
                </Flex>
              ))}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProfileButton;
