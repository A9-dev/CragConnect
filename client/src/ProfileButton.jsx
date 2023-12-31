import { Button, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { AtSignIcon } from "@chakra-ui/icons";
import { useContext } from "react";
import { AppContext } from "./App";

const ProfileButton = () => {
  const { setLoggedIn, setUsername, username } = useContext(AppContext);
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
      <MenuButton as={Button} leftIcon={<AtSignIcon />}>
        {username}
      </MenuButton>
      <MenuList>
        <MenuItem onClick={handleProfile}>Profile</MenuItem>
        <MenuItem onClick={handleSignout}>Sign out</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ProfileButton;
