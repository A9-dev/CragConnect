import EventList from "../components/EventList";
import { Box } from "@chakra-ui/react";

const Events = () => {
  return (
    <Box width={"50%"} margin={"auto"} p={5} data-testid="events-page">
      <EventList />
    </Box>
  );
};

export default Events;
