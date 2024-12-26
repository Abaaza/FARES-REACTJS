import {
  Box,
  Flex,
  Text,
  Link,
  Stack,
  Icon,
  Menu,
  MenuItem,
  MenuButton,
  MenuList,
  Button,
  Image,
} from "@chakra-ui/react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ChevronDownIcon } from "@chakra-ui/icons";
import navbarbackground from "../assets/cocobackground2.jpg"; // Background image
import logo from "../assets/COCO-Friendly-Dining-Logo.png"; // Logo image

const Footer = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  // Function to handle link clicks for navigation
  const handleLinkClick = (path: string) => {
    navigate(path);
  };

  // Function to handle language change
  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  // Function to handle logo click
  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <Box
      as="footer"
      py={10}
      mt={10}
      color="white"
      bg="#36322f"
      backgroundImage={`url(${navbarbackground})`} // Set the background image
      backgroundSize="cover" // Ensure the image covers the entire background
      backgroundPosition="center" // Center the background image
      backgroundRepeat="no-repeat" // Prevent the image from repeating
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align="center"
        maxW="1200px"
        mx="auto"
        px={6}
        textAlign={{ base: "center", md: "left" }} // Center text on mobile
      >
        {/* Left Side - Company Information */}
        <Stack
          spacing={3}
          mb={{ base: 6, md: 0 }}
          align="center"
          textAlign={{ base: "center", md: "left" }}
        >
          {/* Logo */}
          <Image
            src={logo}
            w="80px"
            h="auto"
            cursor="pointer"
            onClick={handleLogoClick}
            p={1}
          />
          <Text fontSize="sm">
            {t("copyright", { year: new Date().getFullYear() })}
          </Text>
          <Text fontSize="sm">{t("contactInfo")}</Text>
        </Stack>

        {/* Right Side - Navigation Links and Social Media */}
        <Stack
          direction={{ base: "column", md: "row" }} // Vertical on mobile, horizontal on desktop
          spacing={{ base: 6, md: 8 }}
          align="center"
        >
          {/* Navigation Links */}
          <Stack
            direction={{ base: "column", md: "row" }}
            spacing={{ base: 4, md: 8 }}
            justify="center"
            align="center"
          >
            <Link onClick={() => handleLinkClick("/")}>{t("home")}</Link>
            <Link onClick={() => handleLinkClick("/branches")}>
              {t("branches")}
            </Link>
            <Link onClick={() => handleLinkClick("/menu")}>{t("menu")}</Link>
            <Link onClick={() => handleLinkClick("/contact")}>
              {t("contact")}
            </Link>
            {/* Language Switcher */}
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                bg="#555250"
                color="white"
                _hover={{ bg: "#4b4745" }}
              >
                {i18n.language === "en" ? "English" : "العربية"}
              </MenuButton>
              <MenuList bg="#555250" borderColor="#4b4745">
                <MenuItem
                  onClick={() => handleLanguageChange("en")}
                  color="black"
                  _hover={{ bg: "#4b4745", color: "white" }}
                >
                  English
                </MenuItem>
                <MenuItem
                  onClick={() => handleLanguageChange("ar")}
                  color="black"
                  _hover={{ bg: "#4b4745", color: "white" }}
                >
                  العربية
                </MenuItem>
              </MenuList>
            </Menu>
          </Stack>

          {/* Social Media Links */}
          <Stack direction="row" spacing={4} justify="center">
            <Link
              href="https://www.facebook.com/coco.restaurants.eg"
              isExternal
            >
              <Icon as={FaFacebook} w={6} h={6} />
            </Link>
            <Link href="https://www.instagram.com/coco.restaurants/" isExternal>
              <Icon as={FaInstagram} w={6} h={6} />
            </Link>
          </Stack>
        </Stack>
      </Flex>
    </Box>
  );
};

export default Footer;
