import { Box, Link, Text, useColorModeValue } from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";
const Footer = () => {
  const bgColor = useColorModeValue("gray.300", "gray.900");

  return (
    <Box
      bg={bgColor}
      p={4}
      textAlign="center"
      position="fixed"
      bottom={0}
      left={0}
      right={0}
    >
      <Text fontSize="sm" mt={2}>
        Licensed under the MIT License.
      </Text>
      <Text fontSize="sm" mt={2}>
        Made by{" "}
        <Link href="https://github.com/A9-dev" color="blue.500" isExternal>
          A9-dev
        </Link>{" "}
        /{" "}
        <Link
          href="https://github.com/A9-dev/CragConnect"
          color="blue.500"
          fontSize="sm"
          mt={2}
          isExternal
        >
          GitHub Repository
          <FaGithub
            style={{
              display: "inline-block",
              verticalAlign: "middle",
              marginLeft: "0.5rem",
            }}
          />
        </Link>
      </Text>
    </Box>
  );
};

export default Footer;
