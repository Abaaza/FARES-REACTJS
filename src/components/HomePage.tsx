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
import { useTranslation } from "react-i18next"; // Import useTranslation
import DesktopProductSlider from "./DesktopProductSlider";
import MobileProductSlider from "./MobileProductSlider";
import AutoSlideShow from "./AutoSlideShow";

const HomePage: React.FC = () => {
  const { t } = useTranslation(); // Initialize useTranslation hook
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
    base: mobileImages,
    md: pcImages,
  });

  // Determine which product slider to display based on breakpoint
  const ProductSliderToShow = useBreakpointValue({
    base: MobileProductSlider,
    md: DesktopProductSlider,
  });

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [comment, setComment] = React.useState("");

  const handleSubmit = () => {
    if (!name || !email || !comment) {
      alert(t("formAlert"));
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
        alert(t("successMessage"));
      })
      .catch((error) => {
        console.error("FAILED...", error);
        alert(t("errorMessage"));
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
          {t("topSellers")}
        </Heading>
      </Box>

      <Box textAlign="center" mt={10}>
        {/* Conditionally render the appropriate product slider */}
        {ProductSliderToShow && <ProductSliderToShow />}
      </Box>

      <Box mt={10} width="85%" mx="auto">
        <Heading as="h2" size="lg" mb={4} textAlign="center">
          {t("contactUs")}
        </Heading>
        <VStack spacing={4} align="stretch">
          <FormControl id="name">
            <FormLabel>{t("nameLabel")}</FormLabel>
            <Input
              placeholder={t("namePlaceholder")}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>

          <FormControl id="email">
            <FormLabel>{t("emailLabel")}</FormLabel>
            <Input
              type="email"
              placeholder={t("emailPlaceholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <FormControl id="comment">
            <FormLabel>{t("commentLabel")}</FormLabel>
            <Textarea
              placeholder={t("commentPlaceholder")}
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
            {t("submitButton")}
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default HomePage;
