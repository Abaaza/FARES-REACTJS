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
import "./app.css";

const App: React.FC = () => {
  useEffect(() => {
    document.title = "Wall Masters";
  }, []);

  return (
    <Router>
      <CartProvider>
        <Flex direction="column" minHeight="100vh">
          <NavBar />{" "}
          {/* Place the NavBar outside the Grid to make it fixed or sticky */}
          <Grid
            templateAreas={{
              base: `"main"`,
              lg: `"main"`,
            }}
            templateRows="auto 1fr" // Ensure main content takes the remaining space
            flex="1"
            paddingTop="60px" // Adjust based on the height of your NavBar
          >
            <GridItem area="main">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/product-grid" element={<ProductGrid />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="*" element={<p>Page not found</p>} />
              </Routes>
            </GridItem>
          </Grid>
          <Footer /> {/* Footer at the bottom */}
        </Flex>
      </CartProvider>
    </Router>
  );
};

export default App;
