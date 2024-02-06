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
  const bgColor = useColorModeValue("gray.200", "gray.800");
  const color = useColorModeValue("black", "white");

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
          bg={bgColor}
          color={color}
        >
          {username}
        </MenuButton>
        <MenuList bg={bgColor} color={color}>
          <MenuItem onClick={handleProfile}>Profile</MenuItem>
          <MenuItem onClick={handleSignout}>Sign out</MenuItem>
        </MenuList>
      </Menu>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={bgColor}>
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
                <Flex mb={3} key={subscription}>
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
