import ToggleColour from "../ToggleColour";
import { Container } from "@chakra-ui/react";
import { useContext } from "react";
import { AppContext } from "../App";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  VStack,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

import { updateUserData } from "../dbFunctions";

const Settings = () => {
  const { userData, setUserData } = useContext(AppContext);
  const fitnessPlan = userData.fitnessPlan;

  const setFitnessPlan = (plan) => {
    setUserData({ ...userData, fitnessPlan: plan });
    updateUserData({ ...userData, fitnessPlan: plan });
  };

  return (
    <Container p={5}>
      <VStack>
        <ToggleColour />
        {fitnessPlan && (
          <Menu>
            <MenuButton mt={5} as={Button} rightIcon={<ChevronDownIcon />}>
              Workout Theme: {fitnessPlan}
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => setFitnessPlan("Strength")}>
                Strength
              </MenuItem>
              <MenuItem onClick={() => setFitnessPlan("Flexibility")}>
                Flexibility
              </MenuItem>
            </MenuList>
          </Menu>
        )}
      </VStack>
    </Container>
  );
};

export default Settings;
