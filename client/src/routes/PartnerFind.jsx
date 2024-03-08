import { Box, VStack, Text } from "@chakra-ui/react";
import { Avatar, Flex, HStack, Spacer, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getPartnerFindEntries } from "../dbFunctions";
import { AppContext } from "../App";
import { useContext } from "react";
import CreatePartnerFind from "../components/CreatePartnerFind";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
const PartnerFind = () => {
  const [entries, setEntries] = useState([]);
  const { loggedIn, userData } = useContext(AppContext);

  useEffect(() => {
    getPartnerFindEntries().then((data) => {
      setEntries(data.data);
    });
  }, []);

  const dateAndTimeToString = (dateAndTime) => {
    const date = new Date(dateAndTime);
    return date.toLocaleString();
  };

  const handleRegisterInterest = (entry) => {
    console.log("Registering interest in", entry);
  };

  return (
    <Box width={"75%"} m={"auto"} mt={"15"}>
      {loggedIn && <CreatePartnerFind />}
      <VStack>
        {entries &&
          entries.map((entry) => (
            // Info I have: Creator, Description, Date and time (ISO), location, interested people, and bool for if it's restricted to following only
            <Card key={entry._id} width="850px">
              <CardHeader>
                <Flex>
                  <HStack>
                    <Avatar size="sm" name={entry.creator.fullName} mr={2} />
                    <Text fontSize="2xl">{entry.creator.username}</Text>
                    <Spacer />
                    <Text>|</Text>
                    <Spacer />
                    <Text>{dateAndTimeToString(entry.dateAndTime)}</Text>
                    <Spacer />
                  </HStack>
                </Flex>
              </CardHeader>
              <CardBody>
                <Text mb={3}>{entry.description}</Text>
                <Text mb={3}>
                  {entry.usersInterested.length}{" "}
                  {entry.usersInterested.length === 1 ? "person" : "people"} are
                  interested
                </Text>
                {loggedIn && userData.username !== entry.creator.username && (
                  <Button
                    onClick={() => {
                      handleRegisterInterest(entry);
                    }}
                  >
                    Register Interest
                  </Button>
                )}
              </CardBody>
              <CardFooter>
                {entry.followingOnly
                  ? `Only people that ${entry.creator.fullName} follows can register interest`
                  : `Anyone can register interest`}
              </CardFooter>
            </Card>
          ))}
      </VStack>
    </Box>
  );
};

export default PartnerFind;
