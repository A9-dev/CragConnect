import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
  VStack,
  IconButton,
} from "@chakra-ui/react";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../App";
import CreateEventButton from "./CreateEventButton";
import { getEvents, deleteEvent } from "../dbFunctions";
import { DeleteIcon } from "@chakra-ui/icons";

const iso8601ToHumanReadable = (iso8601) => {
  const date = new Date(iso8601);
  return date.toLocaleString();
};

const EventList = () => {
  const [events, setEvents] = useState([]);

  // Fetch the events from the server
  const refreshEventList = () => {
    getEvents()
      .then((events) => {
        setEvents(events.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    refreshEventList();
  }, []);

  const { userData } = useContext(AppContext);
  return (
    <Box margin="auto" py={5}>
      {userData.organisation && (
        <Box textAlign={"center"}>
          <CreateEventButton refreshEventList={refreshEventList} />
        </Box>
      )}
      <VStack spacing={5}>
        {events.map((event) => (
          <Card key={event._id} width={"100%"}>
            <CardHeader>
              <Heading size="lg" textAlign={"center"}>
                {event.eventTitle}
              </Heading>
              {userData._id && userData._id === event.creator._id && (
                <IconButton
                  position={"absolute"}
                  left={"92%"}
                  top={5}
                  onClick={() => {
                    console.log("Delete event");
                    deleteEvent(event._id)
                      .then(() => {
                        refreshEventList();
                      })
                      .catch((error) => {
                        console.error("Error:", error);
                      });
                  }}
                  aria-label="Delete"
                  icon={<DeleteIcon />}
                />
              )}
            </CardHeader>
            <CardBody>
              <VStack>
                {event.eventDescription && (
                  <Text textAlign={"justify"}>{event.eventDescription}</Text>
                )}
                {event.address && (
                  <Text>
                    <b>Address: </b>
                    {event.address}
                  </Text>
                )}
                {event.dateAndTime && (
                  <Text>
                    <b>Date and time: </b>
                    {iso8601ToHumanReadable(event.dateAndTime)}
                  </Text>
                )}
                {event.postcode && (
                  <Text>
                    <b>Postcode: </b>
                    {event.postcode}
                  </Text>
                )}
                {event.phoneNumber && (
                  <Text>
                    <b>Phone number: </b>
                    {event.phoneNumber}
                  </Text>
                )}
              </VStack>
            </CardBody>
          </Card>
        ))}
      </VStack>
    </Box>
  );
};

export default EventList;
