import {
  Button,
  ButtonGroup,
  Grid,
  GridItem,
  Show,
  SimpleGrid,
} from "@chakra-ui/react";
import React from "react";
import NavBar from "./components/NavBar";
import { useEffect } from "react";
import ColorModeSwitch from "./components/ColorModeSwitch";
import ProductGrid from "./components/ProductGrid";

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
      <GridItem area="nav">
        <NavBar />
      </GridItem>
      <Show above="base">
        <GridItem area="aside">aside</GridItem>
      </Show>
      <GridItem area="main">
        {" "}
        <div className="App">
          <ProductGrid />
        </div>
      </GridItem>
    </Grid>
  );
};

export default App;
