import EventList from "../EventList";
import { Box } from "@chakra-ui/react";

const Events = () => {
  return (
    <Box p={30} width={"65%"} margin="auto" py={5}>
      <EventList />
    </Box>
  );
};

export default Events;
