import React from "react";
import {
  Box,
  Button,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import video from "../assets/1.mp4";
import video2 from "../assets/28.mp4";
import ProductSlider from "./ProductSlider";
import Footer from "../components/Footer";
import "./HomePage.css"; // Import custom CSS

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const videoSrc = useBreakpointValue({
    base: video, // Mobile view
    md: video2, // PC view
  });

  const goToProductGrid = () => {
    navigate("/product-grid");
  };

  return (
    <Box p={5}>
      <Box onClick={goToProductGrid} cursor="pointer">
        <video
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          className="homepage-video" // Apply custom CSS class
          style={{ width: "100%", height: "auto" }}
        >
          Your browser does not support the video tag.
        </video>
      </Box>

      {/* Center the heading */}
      <Box textAlign="center">
        <Heading as="h2" size="lg" mb={4} textAlign="center" padding={25}>
          Top Sellers
        </Heading>
      </Box>

      <ProductSlider />

      {/* Contact Us Form */}
      <Box mt={10} width="90%" mx="auto">
        <Heading as="h2" size="lg" mb={4} textAlign="center">
          Contact Us
        </Heading>
        <VStack spacing={4} align="stretch">
          <Box>
            <FormControl id="name">
              <FormLabel>Name</FormLabel>
              <Input placeholder="Your Name" />
            </FormControl>
          </Box>
          <Box>
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder="Your Email" />
            </FormControl>
          </Box>
          <Box>
            <FormControl id="comment">
              <FormLabel>Comment</FormLabel>
              <Textarea placeholder="Your Comment" />
            </FormControl>
          </Box>
          <Button colorScheme="teal" size="lg" alignSelf="center">
            Submit
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default HomePage;
