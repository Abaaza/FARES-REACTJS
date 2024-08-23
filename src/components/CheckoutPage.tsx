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
  useColorModeValue,
  HStack,
  Select,
} from "@chakra-ui/react";
import { useCart } from "./CartContext"; // Import the useCart hook

const CheckoutPage: React.FC = () => {
  const { cart } = useCart();
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

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
        {cart.map((item) => (
          <Box
            key={item.id}
            borderWidth="1px"
            borderRadius="md"
            p={4}
            bg={boxBgColor}
            boxShadow="md"
          >
            <HStack spacing={4}>
              <Image
                src={item.image}
                alt={item.name}
                boxSize="100px"
                objectFit="cover"
                borderRadius="md"
              />
              <VStack align="start" spacing={2}>
                <Heading size="md" color={headingColor}>
                  {item.name}
                </Heading>
                <Text color={textColor}>Size: {item.size}</Text>
                <Text color={textColor}>Price: {item.price} EGP</Text>
                <Text color={textColor}>Quantity: {item.quantity}</Text>
              </VStack>
            </HStack>
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
          <FormLabel color={textColor}>Phone Number </FormLabel>
          <Input placeholder="Phone Number" bg={formBgColor} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel color={textColor}>Address 1</FormLabel>
          <Input placeholder="Address 1" bg={formBgColor} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel color={textColor}>Address 2 </FormLabel>
          <Input placeholder="Address 2" bg={formBgColor} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel color={textColor}>City </FormLabel>
          <Input placeholder="City" bg={formBgColor} />
        </FormControl>
        <FormControl id="country" isRequired>
          <FormLabel color={textColor}>Country</FormLabel>
          <Input value="Egypt" isReadOnly bg={formBgColor} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel color={textColor}>Comments</FormLabel>
          <Input placeholder="Comments" bg={formBgColor} />
        </FormControl>
        <FormControl id="payment-method" isRequired>
          <FormLabel color={textColor}>Payment Method</FormLabel>
          <Select placeholder="Select payment method" bg={formBgColor}>
            <option value="cash">Cash on Delivery</option>
            <option value="credit-card">Credit Card</option>
          </Select>
        </FormControl>

        <Button colorScheme="teal" onClick={handlePlaceOrder}>
          Place Order
        </Button>
      </VStack>
    </Box>
  );
};

export default CheckoutPage;
