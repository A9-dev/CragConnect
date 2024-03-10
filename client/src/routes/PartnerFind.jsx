import { Box, VStack, Text, CardFooter } from "@chakra-ui/react";
import { Avatar, Flex, HStack, Spacer, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  getPartnerFindEntries,
  addInterestToPartnerFindEntry,
  deleteInterestFromPartnerFindEntry,
} from "../dbFunctions";
import { AppContext } from "../App";
import { useContext } from "react";
import CreatePartnerFind from "../components/CreatePartnerFind";
import { Card, CardHeader, CardBody } from "@chakra-ui/react";
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
    addInterestToPartnerFindEntry(entry._id, userData._id)
      .then((data) => {
        if (data.status === 200) {
          getPartnerFindEntries().then((data) => {
            setEntries(data.data);
          });
        }
      })
      .catch((err) => {
        console.error("Error adding interest to partner find entry:", err);
      });
  };

  const handleUndoRegisterInterest = (entry) => {
    deleteInterestFromPartnerFindEntry(entry._id, userData._id)
      .then((data) => {
        if (data.status === 200) {
          getPartnerFindEntries().then((data) => {
            setEntries(data.data);
          });
        }
      })
      .catch((err) => {
        console.error("Error deleting interest from partner find entry:", err);
      });
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
                    <Text>
                      Date and time: {dateAndTimeToString(entry.dateAndTime)}
                    </Text>
                    <Spacer />
                    <Text>|</Text>
                    <Spacer />
                    <Text>Location: {entry.location}</Text>
                    <Text>|</Text>
                    <Spacer />
                    <Text>
                      {entry.usersInterested.length}{" "}
                      {entry.usersInterested.length === 1
                        ? "person is"
                        : "people are"}{" "}
                      interested
                    </Text>
                  </HStack>
                </Flex>
              </CardHeader>
              <CardBody>
                <VStack align={"left"}>
                  <Text fontSize="xl" align={"center"}>
                    {entry.description}
                  </Text>

                  {loggedIn &&
                    userData.username !== entry.creator.username &&
                    !entry.usersInterested.includes(userData._id) && (
                      <Button
                        width={"80%"}
                        margin={"auto"}
                        onClick={() => {
                          handleRegisterInterest(entry);
                        }}
                      >
                        Register interest
                      </Button>
                    )}
                  {loggedIn &&
                    userData.username !== entry.creator.username &&
                    entry.usersInterested.includes(userData._id) && (
                      <Button
                        width={"80%"}
                        margin={"auto"}
                        onClick={() => {
                          handleUndoRegisterInterest(entry);
                        }}
                      >
                        Undo register interest
                      </Button>
                    )}

                  <CardFooter>
                    <Text as="em">
                      {entry.followingOnly
                        ? `Only people that ${entry.creator.fullName} follows can register interest`
                        : `Anyone can register interest`}
                    </Text>
                  </CardFooter>
                </VStack>
              </CardBody>
            </Card>
          ))}
      </VStack>
    </Box>
  );
};

export default PartnerFind;
