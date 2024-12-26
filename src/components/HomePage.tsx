import React from "react";
import {
  Box,
  Divider,
  Grid,
  GridItem,
  Image,
  Text,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AutoSlideShow from "./AutoSlideShow";
import leftpicture from "../assets/19.webp";
import rightpicture from "../assets/21.webp";
import image1 from "../assets/37.webp";
import image2 from "../assets/16.webp";
import image4 from "../assets/15.webp";
import image5 from "../assets/17.webp";
import image7 from "../assets/29.webp";
import image8 from "../assets/36.jpg";
import image9 from "../assets/38.jpg";

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Array of slideshow images
  const imagesToShow = [image1, image7, image9, image5, image8, image2, image4];

  // Dynamically adjust the grid layout for mobile and larger screens
  const gridTemplateColumns = useBreakpointValue({
    base: "1fr", // Single column layout for mobile
    md: "1fr auto 1fr", // Two equal columns with an auto-sized divider in between
  });

  // Adjust image size and alignment for mobile and larger screens
  const imageSize = useBreakpointValue({
    base: "100vw", // Force the image to be 85% of the viewport width for mobile
    md: "500px", // Larger image size for desktop
  });

  // Adjust font sizes for mobile and desktop
  const fontSize = useBreakpointValue({
    base: "s", // Smaller font size for mobile
    md: "l", // Larger font size for desktop
  });

  const goToProductGrid = () => {
    navigate("/product-grid");
  };

  return <Box p={5}></Box>;
};

export default HomePage;
