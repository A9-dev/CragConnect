import ToggleColour from "../ToggleColour";
import { Container } from "@chakra-ui/react";

const Settings = () => {
  return (
    <Container>
      <ToggleColour />
      <Menu>
        <MenuButton mt={5} as={Button} rightIcon={<ChevronDownIcon />}>
          Change Workout Theme
        </MenuButton>
        <MenuList>
          <MenuItem>Strength</MenuItem>
          <MenuItem>Flexibility</MenuItem>
        </MenuList>
      </Menu>
    </Container>
  );
};

export default Settings;
