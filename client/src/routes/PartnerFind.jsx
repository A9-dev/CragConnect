import { Box } from "@chakra-ui/react";
// import { useEffect, useState } from "react";
// import { getPartnerFindEntries } from "../dbFunctions";
import { AppContext } from "../App";
import { useContext } from "react";
import CreatePartnerFind from "../components/CreatePartnerFind";

const PartnerFind = () => {
  // const [entries, setEntries] = useState([]);
  const { loggedIn } = useContext(AppContext);

  // useEffect(() => {
  //   getPartnerFindEntries().then((data) => {
  //     setEntries(data);
  //   });
  // }, []);

  return (
    <Box width={"75%"} m={"auto"} mt={"15"}>
      {loggedIn && <CreatePartnerFind />}
    </Box>
  );
};

export default PartnerFind;
