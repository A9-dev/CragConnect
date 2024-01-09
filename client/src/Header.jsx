import React from "react";
import {
  Box,
  Flex,
  Heading,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react";
import { AppContext } from "./App";
import { useContext } from "react";
import Login from "./Login";
import ProfileButton from "./ProfileButton";

const Header = () => {
  const isDarkMode = useColorModeValue(false, true);
  const bgColor = isDarkMode ? "purple.700" : "blue.500";
  const textColor = isDarkMode ? "white" : "white";
  const { loggedIn } = useContext(AppContext);

  return (
    <Box bg={bgColor} py={4} px={6} color={textColor}>
      <Flex justify="space-between" align="center">
        <Heading p={3} size="2xl">
          CragConnect{" "}
        </Heading>
        <HStack>
          {!loggedIn ? (
            <Login />
          ) : (
            <>
              <ProfileButton />
            </>
          )}
        </HStack>
        {/* Add more header components here */}
      </Flex>
    </Box>
  );
};

export default Header;
