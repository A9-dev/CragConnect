import EventList from "../EventList";
import { Box } from "@chakra-ui/react";

const Events = () => {
  return (
    <Box width={"50%"} margin={"auto"} p={5}>
      <EventList />
    </Box>
  );
};

export default Events;
