import React from "react";
import { Container, Box, Text } from "@chakra-ui/react";

const bannerStyle = {
  padding: "16px",
  backgroundColor: "lightblue ",
  color: "white",
};

const Banner = () => {
  return (
    <Box as="section" bg="blue.500" color="white" p={4}>
      <Container style={bannerStyle}>
        <Text fontSize="4xl">Welcome to the Feed</Text>
      </Container>
    </Box>
  );
};

export default Banner;
