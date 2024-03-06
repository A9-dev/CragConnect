import React from "react";
import { useColorMode, Button } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

// Handles changing the colour mode of the app
const ToggleColour = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Button
      onClick={toggleColorMode}
      leftIcon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
    >
      Toggle {colorMode === "light" ? "Dark" : "Light"}
    </Button>
  );
};
export default ToggleColour;
