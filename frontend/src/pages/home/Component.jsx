import React from "react";
import { Container, Typography } from "@mui/material";

const Home = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Welcome to Expense Tracker 🚀
      </Typography>
      <Typography variant="body1" align="center" color="text.secondary">
        Track and manage your expenses easily.
      </Typography>
    </Container>
  );
};

export default Home;
