import { Button, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { AtSignIcon } from "@chakra-ui/icons";

const ProfileButton = ({ username, setLoggedIn, setUsername }) => {
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
