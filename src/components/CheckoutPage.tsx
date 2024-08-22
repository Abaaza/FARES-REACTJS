import React from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Image,
  useColorModeValue, // Import useColorModeValue
} from "@chakra-ui/react";
import { useCart } from "./CartContext"; // Import the useCart hook

const CheckoutPage: React.FC = () => {
  const { cart } = useCart();
  const total = cart.reduce((acc, item) => acc + item.price, 0);

  const bgColor = useColorModeValue("gray.50", "gray.800");
  const textColor = useColorModeValue("gray.800", "gray.200");
  const formBgColor = useColorModeValue("white", "gray.700");
  const boxBgColor = useColorModeValue("gray.100", "gray.900");
  const headingColor = useColorModeValue("gray.800", "gray.100");

  const handlePlaceOrder = () => {
    // Handle order placement logic here
    alert("Order placed successfully!");
  };

  return (
    <Box p={5} bg={bgColor} color={textColor}>
      <Heading as="h1" mb={4} color={headingColor}>
        Checkout
      </Heading>
      <VStack spacing={4} align="stretch">
        {cart.map((item, index) => (
          <Box
            key={index}
            borderWidth="1px"
            borderRadius="md"
            p={4}
            bg={boxBgColor} // Adjust background color for contrast
            boxShadow="md"
          >
            <Image
              src={item.image}
              alt={item.name}
              boxSize="100px"
              objectFit="cover"
              borderRadius="md"
              mb={2}
            />
            <Heading size="md" color={headingColor}>
              {item.name}
            </Heading>
            <Text color={textColor}>Size: {item.size}</Text>
            <Text color={textColor}>Price: {item.price} EGP</Text>
          </Box>
        ))}

        <Box mt={4}>
          <Heading size="lg" color={headingColor}>
            Total: {total} EGP
          </Heading>
        </Box>

        <FormControl isRequired>
          <FormLabel color={textColor}>Name</FormLabel>
          <Input placeholder="Your Name" bg={formBgColor} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel color={textColor}>Address</FormLabel>
          <Input placeholder="Your Address" bg={formBgColor} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel color={textColor}>Payment Method</FormLabel>
          <Input placeholder="Your Payment Method" bg={formBgColor} />
        </FormControl>

        <Button colorScheme="teal" onClick={handlePlaceOrder}>
          Place Order
        </Button>
      </VStack>
    </Box>
  );
};

export default CheckoutPage;
