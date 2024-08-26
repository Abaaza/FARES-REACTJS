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
import emailjs from "emailjs-com";
import { useNavigate } from "react-router-dom";
import DesktopProductSlider from "./DesktopProductSlider";
import MobileProductSlider from "./MobileProductSlider";
import AutoSlideShow from "./AutoSlideShow";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  // Generate arrays of image URLs for mobile and PC versions
  const mobileImages = Array.from(
    { length: 21 },
    (_, i) => `https://www.wall-masters.com/images/videomobile${i + 1}.webp`
  );

  const pcImages = Array.from(
    { length: 22 },
    (_, i) => `https://www.wall-masters.com/images/videopc${i + 1}.webp`
  );

  // Determine which images to display based on breakpoint
  const imagesToShow = useBreakpointValue({
    base: mobileImages, // Mobile images
    md: pcImages, // PC images
  });

  // Determine which product slider to display based on breakpoint
  const ProductSliderToShow = useBreakpointValue({
    base: MobileProductSlider, // Mobile product slider
    md: DesktopProductSlider, // Desktop product slider
  });

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [comment, setComment] = React.useState("");

  const handleSubmit = () => {
    if (!name || !email || !comment) {
      alert("Please fill out all fields.");
      return;
    }

    // Prepare data for EmailJS
    const templateParams = {
      user_name: name,
      user_email: email,
      user_comment: comment,
    };

    // Send the email using EmailJS
    emailjs
      .send(
        "service_4hrebk8", // Service ID
        "template_1zxs0jz", // Template ID
        templateParams,
        "1mIy5IpEpJPFCN01g" // User ID
      )
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
        alert("Your message has been sent successfully!");
      })
      .catch((error) => {
        console.error("FAILED...", error);
        alert("There was an error sending your message. Please try again.");
      });
  };

  const goToProductGrid = () => {
    navigate("/product-grid");
  };

  return (
    <Box p={5}>
      {/* AutoSlideShow Component for images */}
      <Box onClick={goToProductGrid} cursor="pointer">
        {imagesToShow && <AutoSlideShow images={imagesToShow} />}
      </Box>

      <Box textAlign="center" mt={10}>
        <Heading as="h2" size="lg" mb={4}>
          Top Sellers
        </Heading>
      </Box>
      <Box textAlign="center" mt={10}>
        {/* Conditionally render the appropriate product slider */}
        {ProductSliderToShow && <ProductSliderToShow />}
      </Box>
      <Box mt={10} width="90%" mx="auto">
        <Heading as="h2" size="lg" mb={4} textAlign="center">
          Contact Us
        </Heading>
        <VStack spacing={4} align="stretch">
          <FormControl id="name">
            <FormLabel>Name</FormLabel>
            <Input
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>

          <FormControl id="email">
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <FormControl id="comment">
            <FormLabel>Comment</FormLabel>
            <Textarea
              placeholder="Your Comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </FormControl>

          <Button
            colorScheme="teal"
            size="lg"
            alignSelf="center"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default HomePage;
