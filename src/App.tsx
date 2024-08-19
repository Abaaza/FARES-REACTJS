import { Button, ButtonGroup, Grid, GridItem, Show } from "@chakra-ui/react";
import React from "react";
import NavBar from "./components/NavBar";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    document.title = "Wall Masters";
  }, []);

  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,
      }}
    >
      <GridItem area="nav" bg="coral">
        <NavBar />
      </GridItem>
      <Show above="base">
        <GridItem area="aside" bg="yellow">
          aside
        </GridItem>
      </Show>
      <GridItem area="main" bg="blue">
        {" "}
        main
      </GridItem>
    </Grid>
  );
};

export default App;
