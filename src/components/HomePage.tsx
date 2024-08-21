// src/components/HomePage.tsx
import React from "react";
import Slider from "react-slick";
import { Box, Button, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const goToProductGrid = () => {
    navigate("/product-grid");
  };

  return (
    <Box p={5}>
      <Heading as="h1" mb={4}>
        Welcome to Our Store
      </Heading>

      <Button mt={5} colorScheme="teal" onClick={goToProductGrid}>
        View Products
      </Button>
    </Box>
  );
};

export default HomePage;
