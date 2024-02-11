import React from "react";
import {
  Box,
  Flex,
  Heading,
  useColorModeValue,
  HStack,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { AppContext } from "../App";
import { useContext } from "react";
import Login from "./Login";
import ProfileButton from "./ProfileButton";
import { Link as ReactRouterLink } from "react-router-dom";
import {
  AiFillHome,
  AiOutlineRead,
  AiTwotoneCalendar,
  AiOutlineShareAlt,
  AiOutlineSetting,
  AiOutlineTrophy,
} from "react-icons/ai";
const Header = () => {
  const bgColor = useColorModeValue("blue.500", "purple.700");
  const buttonColor = useColorModeValue("blue.600", "purple.600");
  const { loggedIn } = useContext(AppContext);

  return (
    <Box bg={bgColor} py={4} px={6} color={"white"}>
      <Flex justify="space-between" align="center">
        <Heading p={3} size="2xl">
          CragConnect
        </Heading>
        <HStack>
          <Button
            as={ReactRouterLink}
            to={`/`}
            leftIcon={<AiFillHome />}
            aria-label="Home"
            bg={buttonColor} // Add color prop
            color={"white"}
          >
            Home
          </Button>
          <Button
            as={ReactRouterLink}
            to={`/news`}
            leftIcon={<AiOutlineRead />}
            aria-label="News"
            color={"white"}
            bg={buttonColor} // Add color prop
          >
            News
          </Button>
          <Button
            as={ReactRouterLink}
            to={`/events`}
            leftIcon={<AiTwotoneCalendar />}
            aria-label="Events"
            bg={buttonColor} // Add color prop
            color={"white"}
          >
            Events
          </Button>
          <Button
            as={ReactRouterLink}
            to={`/gearShare`}
            leftIcon={<AiOutlineShareAlt />}
            aria-label="GearShare"
            bg={buttonColor} // Add color prop
            color={"white"}
          >
            GearShare
          </Button>
          <Button
            as={ReactRouterLink}
            to={`/fitness`}
            leftIcon={<AiOutlineTrophy />}
            aria-label="Fitness"
            bg={buttonColor} // Add color prop
            color={"white"}
          >
            Fitness
          </Button>
          <IconButton
            as={ReactRouterLink}
            to={`/settings`}
            icon={<AiOutlineSetting />}
            aria-label="Settings"
            bg={buttonColor} // Add color prop
            color={"white"}
          />

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
