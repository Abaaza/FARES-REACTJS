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
import logo from "../assets/logo.webp";
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
  };

  const handleLinkClick = (path: string) => {
    navigate(path);
    onClose(); // Close the menu after navigating
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const bg = useColorModeValue("gray.800", "gray.800");
  const color = useColorModeValue("white", "white");
  const badgeBgColor = useColorModeValue("gray.100", "gray.700");
  const badgeTextColor = useColorModeValue("black", "white");

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
      <Flex alignItems="center" justifyContent="space-between">
        <Image
          src={logo}
          w="150px"
          h="auto"
          cursor="pointer"
          onClick={handleLogoClick}
        />

        {isMobile ? (
          <>
            <IconButton
              icon={isOpen ? <FaTimes /> : <FaBars />}
              aria-label="Menu"
              onClick={isOpen ? onClose : onOpen}
              variant="ghost"
              colorScheme="teal"
            />
          </>
        ) : (
          <HStack spacing={8}>
            <Link onClick={() => handleLinkClick("/")}>Home</Link>
            <Link onClick={() => handleLinkClick("/about")}>About Us</Link>
            <Link onClick={() => handleLinkClick("/product-grid")}>Shop</Link>
            <ColorModeSwitch />
            <Popover trigger="hover">
              <PopoverTrigger>
                <Link position="relative">
                  <Icon as={FaShoppingCart} w={6} h={6} cursor="pointer" />
                  {totalItems > 0 && (
                    <Badge
                      bg={badgeBgColor}
                      color={badgeTextColor}
                      borderRadius="full"
                      position="absolute"
                      top="-1"
                      right="-1"
                      px={2}
                      py={1}
                    >
                      {totalItems}
                    </Badge>
                  )}
                </Link>
              </PopoverTrigger>
              <PopoverContent bg={bg} color={color}>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>
                  {cart.length === 0 ? (
                    <Text>Your cart is empty</Text>
                  ) : (
                    <VStack spacing={2}>
                      {cart.map((item, index) => (
                        <Flex
                          key={index}
                          alignItems="center"
                          justifyContent="space-between"
                          w="full"
                        >
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
                        <Text fontWeight="bold">
                          Total Price: {totalPrice} EGP
                        </Text>
                      </Box>
                      <Button
                        colorScheme="teal"
                        size="sm"
                        onClick={handleCartClick}
                      >
                        View Cart
                      </Button>
                    </VStack>
                  )}
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </HStack>
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
          <Link onClick={() => handleLinkClick("/about")}>About Us</Link>
          <Link onClick={() => handleLinkClick("/product-grid")}>Shop</Link>
          <ColorModeSwitch />
          <Popover trigger="hover">
            <PopoverTrigger>
              <Link position="relative">
                <Icon as={FaShoppingCart} w={6} h={6} cursor="pointer" />
                {totalItems > 0 && (
                  <Badge
                    bg={badgeBgColor}
                    color={badgeTextColor}
                    borderRadius="full"
                    position="absolute"
                    top="-1"
                    right="-1"
                    px={2}
                    py={1}
                  >
                    {totalItems}
                  </Badge>
                )}
              </Link>
            </PopoverTrigger>
            <PopoverContent bg={bg} color={color}>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverBody>
                {cart.length === 0 ? (
                  <Text>Your cart is empty</Text>
                ) : (
                  <VStack spacing={2}>
                    {cart.map((item, index) => (
                      <Flex
                        key={index}
                        alignItems="center"
                        justifyContent="space-between"
                        w="full"
                      >
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
                      <Text fontWeight="bold">
                        Total Price: {totalPrice} EGP
                      </Text>
                    </Box>
                    <Button
                      colorScheme="teal"
                      size="sm"
                      onClick={handleCartClick}
                    >
                      View Cart
                    </Button>
                  </VStack>
                )}
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </VStack>
      )}
    </Box>
  );
};

export default NavBar;
