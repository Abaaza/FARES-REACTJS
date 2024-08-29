import React from "react";
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  Image,
  VStack,
  Badge,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  useColorModeValue,
  Text,
  Button,
  useBreakpointValue,
  useDisclosure,
  Spacer,
  Select,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import logo from "../assets/logo.png";
import ColorModeSwitch from "./ColorModeSwitch";
import { useCart } from "./CartContext";

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { cart } = useCart();
  const { t, i18n } = useTranslation(); // i18n hook for translation

  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleLogoClick = () => {
    navigate("/");
    if (isMobile && isOpen) onClose(); // Close the menu if on mobile and open
  };

  const handleCartClick = () => {
    navigate("/cart");
    if (isMobile && isOpen) onClose(); // Close the menu if on mobile and open
  };

  const handleLinkClick = (path: string) => {
    navigate(path);
    if (isMobile && isOpen) onClose(); // Close the menu if on mobile and open
  };

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    i18n.changeLanguage(event.target.value);
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const bg = useColorModeValue("gray.800", "gray.800");
  const color = useColorModeValue("white", "white");
  const badgeTextColor = useColorModeValue("gray.800", "gray.800"); // Set badge text color to match navbar background

  const renderCartContent = () => (
    <PopoverContent bg={bg} color={color}>
      <PopoverArrow />
      <PopoverCloseButton />
      <PopoverBody>
        {cart.length === 0 ? (
          <Text>{t("cart_empty")}</Text>
        ) : (
          <VStack spacing={2}>
            {cart.map((item, index) => (
              <Flex key={index} alignItems="center" w="full">
                <Image
                  src={item.image}
                  alt={item.name}
                  boxSize="50px"
                  objectFit="cover"
                  borderRadius="md"
                  mr={2}
                />
                <Box flex="1">
                  <Text>{item.name}</Text>
                  <Text>
                    {t("qty")}: {item.quantity}
                  </Text>
                  <Text>
                    {t("price")}: {item.price} EGP
                  </Text>
                </Box>
              </Flex>
            ))}
            <Box textAlign="right" w="full">
              <Text fontWeight="bold">
                {t("total_price")}: {totalPrice} EGP
              </Text>
            </Box>
            <Button colorScheme="teal" size="sm" onClick={handleCartClick}>
              {t("view_cart")}
            </Button>
          </VStack>
        )}
      </PopoverBody>
    </PopoverContent>
  );

  return (
    <Box
      p={4}
      bg={bg}
      color={color}
      position="fixed"
      top={0}
      width="100%"
      zIndex={1000}
      boxShadow="md"
    >
      <Flex
        alignItems="center"
        direction={{ base: "row", md: "row" }}
        position="relative"
      >
        {isMobile ? (
          <>
            <IconButton
              icon={
                isOpen ? <FaTimes color="white" /> : <FaBars color="white" />
              }
              aria-label="Menu"
              onClick={isOpen ? onClose : onOpen}
              variant="ghost"
              colorScheme="transparent"
              ml="0" // Move hamburger icon to the left
            />
            <Image
              src={logo}
              w="200px"
              h="auto"
              mx="auto" // Center the logo
              cursor="pointer"
              onClick={handleLogoClick}
            />
            <Popover trigger="hover">
              <PopoverTrigger>
                <Link position="relative" mr="2">
                  {" "}
                  {/* Move cart icon to the right */}
                  <Icon
                    as={FaShoppingCart}
                    w={5}
                    h={5}
                    cursor="pointer"
                    color={color}
                  />
                  {totalItems > 0 && (
                    <Badge
                      color={badgeTextColor}
                      borderRadius="full"
                      position="absolute"
                      top="-3.7px"
                      right="-2px"
                      px={2}
                      py={1}
                      fontSize="xs"
                      fontWeight="bold"
                      display="flex"
                      alignItems="center"
                      bg="transparent"
                    >
                      {totalItems}
                    </Badge>
                  )}
                </Link>
              </PopoverTrigger>
              {renderCartContent()}
            </Popover>
            {/* Language Selector */}
            <Select
              w="100px"
              ml={2}
              onChange={handleLanguageChange}
              defaultValue={i18n.language}
            >
              <option value="en">English</option>
              <option value="ar">العربية</option>
            </Select>
          </>
        ) : (
          <Flex w="full" alignItems="center">
            <Image
              src={logo}
              w="350px"
              h="auto"
              cursor="pointer"
              onClick={handleLogoClick}
              ml="5" // Move logo to the left
            />
            <Spacer />
            {/* Navigation Links */}
            <HStack spacing={8} align="center" mr={50}>
              <Link onClick={() => handleLinkClick("/")}>{t("home")}</Link>
              <Link onClick={() => handleLinkClick("/product-grid")}>
                {t("shop")}
              </Link>

              {/* Language Selector */}
              <Select
                w="100px"
                onChange={handleLanguageChange}
                defaultValue={i18n.language}
              >
                <option value="en">English</option>
                <option value="ar">العربية</option>
              </Select>

              {/* Color Mode Switch */}
              <ColorModeSwitch />

              {/* Cart Icon and Badge */}
              <Popover trigger="hover">
                <PopoverTrigger>
                  <Link position="relative">
                    <Icon
                      as={FaShoppingCart}
                      w={6}
                      h={6}
                      cursor="pointer"
                      onClick={handleCartClick}
                      color={color}
                    />
                    {totalItems > 0 && (
                      <Badge
                        color={badgeTextColor}
                        borderRadius="full"
                        position="absolute"
                        top="-1"
                        right="-0.5"
                        px={2}
                        py={1}
                        fontSize="xs"
                        fontWeight="bold"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        bg="transparent"
                      >
                        {totalItems}
                      </Badge>
                    )}
                  </Link>
                </PopoverTrigger>
                {renderCartContent()}
              </Popover>
            </HStack>
          </Flex>
        )}
      </Flex>

      {isMobile && isOpen && (
        <VStack
          spacing={4}
          mt={4}
          bg="gray.700"
          p={4}
          borderRadius="md"
          boxShadow="md"
        >
          <Link onClick={() => handleLinkClick("/")}>Home</Link>
          <Link onClick={() => handleLinkClick("/product-grid")}>Shop</Link>
          <ColorModeSwitch />
          <Popover trigger="hover">
            <PopoverTrigger>
              <Link position="relative">
                <Icon
                  as={FaShoppingCart}
                  w={6}
                  h={6}
                  cursor="pointer"
                  color={color}
                />
                {totalItems > 0 && (
                  <Badge
                    color={badgeTextColor}
                    borderRadius="full"
                    position="absolute"
                    top="-3.7px"
                    right="-1.5px"
                    px={2}
                    py={1}
                    fontSize="xs"
                    fontWeight="bold"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    bg="transparent"
                  >
                    {totalItems}
                  </Badge>
                )}
              </Link>
            </PopoverTrigger>
            {renderCartContent()}
          </Popover>
        </VStack>
      )}
    </Box>
  );
};

export default NavBar;
