import React from "react";
import { Container, Paper, TableContainer, Typography } from "@mui/material";

const bannerStyle = {
  padding: "16px",
  backgroundColor: "lightblue ",
  color: "white",
};

const Banner = () => {
  return (
    <TableContainer component={Paper}>
      <Container style={bannerStyle}>
        <Typography variant="h1">Welcome to the Feed</Typography>
      </Container>
    </TableContainer>
  );
};

export default Banner;
