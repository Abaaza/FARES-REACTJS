import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import ProductGrid from "./components/ProductGrid";
import ProductPage from "./components/ProductPage";
import HomePage from "./components/HomePage";
import CartPage from "./components/CartPage";
import { CartProvider } from "./components/CartContext";
import CheckoutPage from "./components/CheckoutPage";
import AboutUs from "./components/AboutUs";

const App: React.FC = () => {
  useEffect(() => {
    document.title = "Wall Masters";
  }, []);

  return (
    <Router>
      <CartProvider>
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
              {/* Add the HomePage route */}
              <Route path="/product-grid" element={<ProductGrid />} />{" "}
              {/* Ensure the path is correctly used */}
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage />} />{" "}
              {/* Add route for CartPage */}
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="*" element={<p>Page not found</p>} />
            </Routes>
          </GridItem>
        </Grid>
      </CartProvider>
    </Router>
  );
};

export default App;
