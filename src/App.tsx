import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Flex, Box, Grid, GridItem } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import ProductGrid from "./components/ProductGrid";
import ProductPage from "./components/ProductPage";
import HomePage from "./components/HomePage";
import CartPage from "./components/CartPage";
import { CartProvider } from "./components/CartContext";
import CheckoutPage from "./components/CheckoutPage";
import AboutUs from "./components/AboutUs";
import Footer from "./components/Footer";

const App: React.FC = () => {
  useEffect(() => {
    document.title = "Wall Masters";
  }, []);

  return (
    <Router>
      <CartProvider>
        <Flex
          direction="column"
          minHeight="100vh" // Ensures the full height of the viewport is used
        >
          <Box flex="1">
            <Grid
              templateAreas={{
                base: `"nav" "main"`,
                lg: `"nav nav" "main"`,
              }}
            >
              <GridItem area="nav">
                <NavBar />
              </GridItem>

              <GridItem area="main">
                <Routes>
                  <Route path="/" element={<HomePage />} />{" "}
                  {/* HomePage route */}
                  <Route path="/product-grid" element={<ProductGrid />} />{" "}
                  {/* ProductGrid route */}
                  <Route path="/product/:id" element={<ProductPage />} />{" "}
                  {/* ProductPage route */}
                  <Route path="/cart" element={<CartPage />} />{" "}
                  {/* CartPage route */}
                  <Route path="/checkout" element={<CheckoutPage />} />{" "}
                  {/* CheckoutPage route */}
                  <Route path="/about" element={<AboutUs />} />{" "}
                  {/* AboutUs route */}
                  <Route path="*" element={<p>Page not found</p>} />{" "}
                  {/* Fallback route */}
                </Routes>
              </GridItem>
            </Grid>
          </Box>
          <Footer />
        </Flex>
      </CartProvider>
    </Router>
  );
};

export default App;
