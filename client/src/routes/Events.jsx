import { AppContext } from "../App";
import CreateEventButton from "../CreateEventButton";
import EventList from "../EventList";
import { useContext } from "react";
import { Box } from "@chakra-ui/react";

const Events = () => {
  const { isOrganisation } = useContext(AppContext);
  return (
    <Box width={"50%"} margin={"auto"} p={5}>
      <EventList />
    </Box>
  );
};

export default Events;
