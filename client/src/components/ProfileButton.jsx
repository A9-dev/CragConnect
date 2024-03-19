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
  Text,
  Center,
  Spacer,
  Flex,
} from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { unsubscribe } from "../dbFunctions";
import { AtSignIcon } from "@chakra-ui/icons";
import { useContext } from "react";
import { AppContext } from "../App";

const ProfileButton = () => {
  const { setLoggedIn, userData, setUserData } = useContext(AppContext);
  const bgColor = useColorModeValue("gray.200", "gray.800");
  const color = useColorModeValue("black", "white");
  const tabsColourScheme = useColorModeValue("blue", "purple");

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
            <Tabs
              align="center"
              variant="enclosed"
              colorScheme={tabsColourScheme}
            >
              <TabList>
                <Tab>Following</Tab>
                <Tab>Followers</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <Box width="75%" margin="auto">
                    {userData.subscribingTo &&
                      userData.subscribingTo.sort().map((subscription) => (
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
                </TabPanel>
                <TabPanel>
                  <Box width="75%" margin="auto">
                    {userData.subscribers &&
                      userData.subscribers.sort().map((subscriber) => (
                        <Center mb={3}>
                          <Text key={subscriber}>{subscriber}</Text>
                        </Center>
                      ))}
                  </Box>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProfileButton;
