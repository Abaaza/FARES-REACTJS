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
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/logo.png";
import ColorModeSwitch from "./ColorModeSwitch";
import { useCart } from "./CartContext";

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { cart } = useCart();

  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleCartClick = () => {
    navigate("/cart");
    if (isMobile) onClose(); // Close the menu on mobile view after navigating to the cart page
  };

  const handleLinkClick = (path: string) => {
    navigate(path);
    if (isMobile) onClose(); // Close the menu on mobile view after navigating to a new page
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
          <Text>Your cart is empty</Text>
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
                  <Text>Qty: {item.quantity}</Text>
                  <Text>Price: {item.price} EGP</Text>
                </Box>
              </Flex>
            ))}
            <Box textAlign="right" w="full">
              <Text fontWeight="bold">Total Price: {totalPrice} EGP</Text>
            </Box>
            <Button colorScheme="teal" size="sm" onClick={handleCartClick}>
              View Cart
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
              ml="-2" // Move hamburger icon to the left
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
                    mr="-1"
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
            <HStack spacing={8} ml={700}>
              {" "}
              {/* Center the navigation links */}
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
            <Box mr="2" /> {/* Move cart icon to the right */}
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
