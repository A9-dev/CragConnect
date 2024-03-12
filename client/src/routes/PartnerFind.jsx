import {
  Card,
  Avatar,
  Box,
  VStack,
  Text,
  CardFooter,
  StackDivider,
  Flex,
  HStack,
  Button,
  CardHeader,
  CardBody,
  IconButton,
  Divider,
} from "@chakra-ui/react";
import {
  getPartnerFindEntries,
  addInterestToPartnerFindEntry,
  deleteInterestFromPartnerFindEntry,
  deletePartnerFindEntry,
} from "../dbFunctions";
import { useEffect, useState } from "react";
import { AppContext } from "../App";
import { useContext } from "react";
import CreatePartnerFind from "../components/CreatePartnerFind";
import { DeleteIcon } from "@chakra-ui/icons";
import SelectFromInterestedUsers from "../components/SelectFromInterestedUsers";

const PartnerFind = () => {
  const [entries, setEntries] = useState([]);
  const { loggedIn, userData } = useContext(AppContext);

  useEffect(() => {
    refreshEntries();
  }, []);

  const refreshEntries = () => {
    getPartnerFindEntries().then((data) => {
      setEntries(data.data);
    });
  };

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

  const handleDeleteEntry = (entryId) => {
    // Delete the entry
    deletePartnerFindEntry(entryId)
      .then((data) => {
        if (data.status === 200) {
          getPartnerFindEntries().then((data) => {
            setEntries(data.data);
          });
        }
      })
      .catch((err) => {
        console.error("Error deleting partner find entry:", err);
      });
  };

  return (
    <Box width={"75%"} m={"auto"} mt={"15"}>
      {loggedIn && <CreatePartnerFind refreshEntries={refreshEntries} />}
      <VStack spacing={5}>
        {entries &&
          entries.map((entry) => (
            // Info I have: Creator, Description, Date and time (ISO), location, interested people, and bool for if it's restricted to following only
            <Card key={entry._id} width="850px">
              <CardHeader>
                <Flex>
                  <HStack divider={<StackDivider orientation="horizontal" />}>
                    <Flex>
                      <Avatar size="sm" name={entry.creator.fullName} mr={2} />
                      <Text fontSize="2xl">{entry.creator.username}</Text>
                    </Flex>
                    <Text textAlign={"center"}>
                      Date and Time: {dateAndTimeToString(entry.dateAndTime)}
                    </Text>
                    <Text textAlign={"center"}>Location: {entry.location}</Text>
                    <Text textAlign={"center"}>
                      {entry.usersInterested.length}{" "}
                      {entry.usersInterested.length === 1
                        ? "person is"
                        : "people are"}{" "}
                      interested
                    </Text>
                    {loggedIn &&
                      userData.username === entry.creator.username && (
                        <IconButton
                          ml={3}
                          onClick={() => {
                            handleDeleteEntry(entry._id);
                          }}
                          aria-label="Delete"
                          icon={<DeleteIcon />}
                        />
                      )}
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
                    entry.creator.subscribingTo &&
                    entry.creator.subscribingTo.includes(userData.username) &&
                    !entry.usersInterested.some(
                      (user) => user._id === userData._id
                    ) && (
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
                    userData._id !== entry.creator._id &&
                    entry.usersInterested.some(
                      (user) => user._id === userData._id
                    ) && (
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
                  {loggedIn && userData.username === entry.creator.username && (
                    <SelectFromInterestedUsers
                      entry={entry}
                      refreshEntries={refreshEntries}
                    />
                  )}
                  {entry.selectedUsers.length > 0 && (
                    <>
                      <Card>
                        <CardBody alignContent={"center"}>
                          <VStack width={"50%"} margin={"auto"}>
                            <Text as="b">Selected Users</Text>
                            <Divider />
                            {entry.selectedUsers &&
                              entry.selectedUsers.map((user) => (
                                <Box key={user._id}>
                                  <Text>{user.fullName}</Text>
                                </Box>
                              ))}
                          </VStack>
                        </CardBody>
                      </Card>
                    </>
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
