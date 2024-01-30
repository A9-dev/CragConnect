import Header from "../Header";
import Footer from "../Footer";
import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <Box pb={"100px"}>
      <Header />
      <Outlet />
      <Footer />
    </Box>
  );
};

export default Root;
