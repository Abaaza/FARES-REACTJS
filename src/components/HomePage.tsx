// src/components/HomePage.tsx
import React from "react";
import Slider from "react-slick";
import { Box, Button, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import video from "../assets/28.mp4";
import ProductSlider from "./ProductSlider";

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
      <video
        src={video}
        autoPlay
        muted
        loop
        playsInline
        style={{ width: "100%", height: "auto" }}
      >
        Your browser does not support the video tag.
      </video>
      <Heading as="h1" mb={4}>
        Welcome to Our Store
      </Heading>

      <Button mt={5} colorScheme="teal" onClick={goToProductGrid}>
        View Products
      </Button>
      <ProductSlider />
    </Box>
  );
};

export default HomePage;
