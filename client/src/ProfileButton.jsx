import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
} from "@chakra-ui/react";
import { AtSignIcon } from "@chakra-ui/icons";
import { useContext } from "react";
import { AppContext } from "./App";

const ProfileButton = () => {
  const { setLoggedIn, setUsername, username } = useContext(AppContext);
  const isDarkMode = useColorModeValue(false, true);

  const handleSignout = () => {
    setLoggedIn(false);
    setUsername("");
  };

  const handleProfile = () => {
    console.log("Profile clicked");
    // TODO: Add functionality to profile button
  };

  return (
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
  );
};

export default ProfileButton;
