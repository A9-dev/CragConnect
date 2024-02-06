import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useContext } from "react";
import { AppContext } from "./App";
import CreateEventButton from "./CreateEventButton";

const iso8601ToHumanReadable = (iso8601) => {
  const date = new Date(iso8601);
  return date.toLocaleString();
};

const EventList = () => {
  const { events, isOrganisation } = useContext(AppContext);
  return (
    <Box margin="auto" py={5}>
      <Card p={5} textAlign={"center"}>
        <CardBody>
          {isOrganisation && <CreateEventButton />}
          <VStack spacing={5}>
            {events.map((event) => (
              <Card key={event._id} width={"100%"}>
                <CardHeader>
                  <Heading size="lg">{event.eventTitle}</Heading>
                </CardHeader>
                <CardBody>
                  <VStack>
                    {event.eventDescription && (
                      <Text>{event.eventDescription}</Text>
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
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </VStack>
        </CardBody>
      </Card>
    </Box>
  );
};

export default EventList;
