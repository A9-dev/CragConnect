import React from "react";
import { Box, Flex, Heading, IconButton } from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";

const Header = () => {
  return (
    <Box bg="blue.500" py={4} px={6} color="white">
      <Flex justify="space-between" align="center">
        <Heading size="2xl">CragConnect </Heading>
        <IconButton icon={<FiMenu />} aria-label="Menu" colorScheme="whiteAlpha" />
        {/* Add more header components here */}
      </Flex>
    </Box>
  );
};

export default Header;
