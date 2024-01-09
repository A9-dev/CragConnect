import {
  Input,
  Button,
  Flex,
  VStack,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { searchUser, subscribe, unsubscribe } from "./dbFunctions";
import { useContext } from "react";
import { AppContext } from "./App";
function Search() {
  const [search, setSearch] = useState("");
  const [userList, setUserList] = useState([]);
  const {
    username,
    subscriptions,
    setSubscriptions,
    refreshFollowingFeed,
    loggedIn,
  } = useContext(AppContext);

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const handleClick = () => {
    searchUser(search)
      .then((result) => {
        setUserList(result.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleSubscribe = (toSubscribeUsername) => {
    subscribe(username, toSubscribeUsername);
    setSubscriptions([...subscriptions, toSubscribeUsername]);
    userList
      .find((user) => user.username === toSubscribeUsername)
      .subscribers.push(username);

    refreshFollowingFeed();
  };

  const handleUnsubscribe = (toUnsubscribeUsername) => {
    setSubscriptions(
      subscriptions.filter((sub) => sub !== toUnsubscribeUsername)
    );
    unsubscribe(username, toUnsubscribeUsername);
    userList
      .find((user) => user.username === toUnsubscribeUsername)
      .subscribers.pop(username);
    refreshFollowingFeed();
  };

  return (
    <VStack>
      <Flex align="center" width="50%" margin="auto">
        <Input placeholder="Search for users" onChange={handleChange} />
        <Button ml={2} onClick={handleClick}>
          Search
        </Button>
      </Flex>
      <VStack width="50%">
        {userList
          .filter((user) => user.username !== username)
          .map((user) => (
            <Card variant={"outline"} key={user._id} width="100%">
              <CardHeader>
                <Heading as="h3" size="md">
                  {user.username}
                </Heading>
                <Heading as="h4" size="sm">
                  {user.subscribers.length}{" "}
                  {user.subscribers.length == 1 ? "follower" : "followers"}
                </Heading>
              </CardHeader>

              <CardBody>
                <Text fontSize="sm" textAlign="center" mb="5px">
                  {user.isOrganisation ? "Organisation" : "Individual"}
                </Text>
                {loggedIn &&
                  (subscriptions && subscriptions.includes(user.username) ? (
                    <Button
                      ml={2}
                      width="100%"
                      onClick={() => handleUnsubscribe(user.username)}
                    >
                      Unfollow
                    </Button>
                  ) : (
                    <Button
                      ml={2}
                      width="100%"
                      onClick={() => handleSubscribe(user.username)}
                    >
                      Follow
                    </Button>
                  ))}
              </CardBody>
            </Card>
          ))}
      </VStack>
    </VStack>
  );
}

export default Search;
