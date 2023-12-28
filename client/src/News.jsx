import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

const News = ({ isOrganisation }) => {
  return (
    <Box p={4} shadow="md" borderWidth="1px" borderRadius="md">
      <Heading as="h2" size="lg" mb={2}>
        Latest News
      </Heading>
      <Text>{isOrganisation ? "This is an organisation." : "This is not an organisation."}</Text>
    </Box>
  );
};

export default News;
