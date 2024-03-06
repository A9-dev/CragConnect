import {
  Input,
  Button,
  Flex,
  VStack,
  Card,
  CardBody,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { searchUser, subscribe, unsubscribe } from "../dbFunctions";
import { useContext } from "react";
import { AppContext } from "../App";
function Search({ organisationSearch }) {
  const [search, setSearch] = useState("");
  const [userList, setUserList] = useState([]);
  const { loggedIn, setUserData, userData } = useContext(AppContext);
  const buttonColorScheme = useColorModeValue("blue", "purple");

  // Handle the search input
  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  // Handle the enter key, triggers the search
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleClick();
    }
  };

  // Handle the search button being clicked
  const handleClick = () => {
    searchUser(search)
      .then((result) => {
        setUserList(
          result.data.filter((user) => user.organisation === organisationSearch)
        );
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleSubscribe = (toSubscribeUsername) => {
    // set the userData subscribingTo array
    setUserData((prevUserData) => ({
      ...prevUserData,
      subscribingTo: [...prevUserData.subscribingTo, toSubscribeUsername],
    }));
    subscribe(userData.username, toSubscribeUsername);
    userList
      .find((user) => user.username === toSubscribeUsername)
      .subscribers.push(userData.username);
  };

  const handleUnsubscribe = (toUnsubscribeUsername) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      subscribingTo: prevUserData.subscribingTo.filter(
        (sub) => sub !== toUnsubscribeUsername
      ),
    }));
    unsubscribe(userData.username, toUnsubscribeUsername);
    userList
      .find((user) => user.username === toUnsubscribeUsername)
      .subscribers.pop(userData.username);
  };

  return (
    <VStack>
      <Flex align="center" width="50%" margin="auto">
        <Input
          data-testid="search-bar"
          placeholder={
            organisationSearch
              ? "Search for organisations"
              : "Search for individuals"
          }
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <Button ml={2} onClick={handleClick} data-testid="submit-search-button">
          Search
        </Button>
      </Flex>
      <VStack width="50%">
        {userList
          .filter((user) => user.username !== userData.username)
          .map((user) => (
            <Card variant={"outline"} key={user._id} width="100%">
              <CardBody>
                <VStack spacing={2}>
                  <Heading as="h3" size="md">
                    @{user.username} - {user.fullName}
                  </Heading>
                  <Heading as="h4" size="sm">
                    {user.subscribers.length}{" "}
                    {user.subscribers.length == 1 ? "follower" : "followers"}
                  </Heading>
                  {loggedIn &&
                    (userData.subscribingTo &&
                    userData.subscribingTo.includes(user.username) ? (
                      <Button
                        colorScheme={buttonColorScheme}
                        variant={"outline"}
                        onClick={() => handleUnsubscribe(user.username)}
                      >
                        Unfollow
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handleSubscribe(user.username)}
                        colorScheme={buttonColorScheme}
                      >
                        Follow
                      </Button>
                    ))}
                </VStack>
              </CardBody>
            </Card>
          ))}
      </VStack>
    </VStack>
  );
}

export default Search;
