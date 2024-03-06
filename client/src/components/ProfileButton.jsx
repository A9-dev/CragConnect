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
import { unsubscribe } from "../dbFunctions";
import { AtSignIcon } from "@chakra-ui/icons";
import { useContext } from "react";
import { AppContext } from "../App";

const ProfileButton = () => {
  const { setLoggedIn, userData, setUserData } = useContext(AppContext);
  const bgColor = useColorModeValue("gray.200", "gray.800");
  const color = useColorModeValue("black", "white");

  const handleSignout = () => {
    setLoggedIn(false);
    setUserData({});
  };
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleProfile = () => {
    onOpen();
  };

  const handleUnfollowButton = (userToUnfollow) => {
    unsubscribe(userData.username, userToUnfollow)
      .then(() => {
        setUserData((prevUserData) => ({
          ...prevUserData,
          subscribingTo: prevUserData.subscribingTo.filter(
            (sub) => sub !== userToUnfollow
          ),
        }));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <Box>
      <Menu>
        <MenuButton
          data-testid="profile-button"
          as={Button}
          leftIcon={<AtSignIcon />}
          bg={bgColor}
          color={color}
        >
          {userData.username}
        </MenuButton>
        <MenuList bg={bgColor} color={color}>
          <MenuItem onClick={handleProfile}>Profile</MenuItem>
          <MenuItem onClick={handleSignout}>Sign out</MenuItem>
        </MenuList>
      </Menu>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={bgColor}>
          <ModalHeader>{userData.fullName}'s Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center>
              <Heading size="md" mb={5}>
                Following
              </Heading>
            </Center>

            <Box width="75%" margin="auto">
              {userData.subscribingTo &&
                userData.subscribingTo.map((subscription) => (
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
