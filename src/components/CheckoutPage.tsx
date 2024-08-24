import React, { useState } from "react";
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

const SHIPPING_COST = 70;
const FREE_SHIPPING_THRESHOLD = 2000;

const CheckoutPage: React.FC = () => {
  const { cart } = useCart();
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Calculate shipping cost
  const shippingCost = total >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;

  // Total amount including shipping
  const grandTotal = total + shippingCost;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [comments, setComments] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const bgColor = useColorModeValue("gray.50", "gray.800");
  const textColor = useColorModeValue("gray.800", "gray.200");
  const formBgColor = useColorModeValue("white", "gray.700");
  const boxBgColor = useColorModeValue("gray.100", "gray.900");
  const headingColor = useColorModeValue("gray.800", "gray.100");

  const handlePlaceOrder = () => {
    const order = {
      customer: {
        name,
        phone,
        address1,
        address2,
        city,
        comments,
      },
      paymentMethod,
      cart,
      total,
      shippingCost,
      grandTotal,
    };

    // Example: Log the order to the console (you can replace this with an API call)
    console.log("Order Details:", order);

    // Example: Send the order data to an API endpoint
    // fetch('/api/place-order', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(order),
    // })
    // .then(response => response.json())
    // .then(data => {
    //   console.log('Success:', data);
    //   alert('Order placed successfully!');
    // })
    // .catch((error) => {
    //   console.error('Error:', error);
    //   alert('There was an error placing your order. Please try again.');
    // });

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
          <Heading size="m" color={headingColor}>
            Subtotal: {total} EGP
          </Heading>
          <Text fontSize="lg" color={textColor}>
            Shipping: {shippingCost} EGP
          </Text>
          <Heading size="m" color={headingColor}>
            Total: {grandTotal} EGP
          </Heading>
        </Box>

        <FormControl isRequired>
          <FormLabel color={textColor}>Name</FormLabel>
          <Input
            placeholder="Your Name"
            bg={formBgColor}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel color={textColor}>Phone Number</FormLabel>
          <Input
            placeholder="Phone Number"
            bg={formBgColor}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel color={textColor}>Address 1</FormLabel>
          <Input
            placeholder="Address 1"
            bg={formBgColor}
            value={address1}
            onChange={(e) => setAddress1(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel color={textColor}>Address 2</FormLabel>
          <Input
            placeholder="Address 2"
            bg={formBgColor}
            value={address2}
            onChange={(e) => setAddress2(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel color={textColor}>City</FormLabel>
          <Input
            placeholder="City"
            bg={formBgColor}
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </FormControl>
        <FormControl id="country" isRequired>
          <FormLabel color={textColor}>Country</FormLabel>
          <Input value="Egypt" isReadOnly bg={formBgColor} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel color={textColor}>Comments</FormLabel>
          <Input
            placeholder="Comments"
            bg={formBgColor}
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />
        </FormControl>
        <FormControl id="payment-method" isRequired>
          <FormLabel color={textColor}>Payment Method</FormLabel>
          <Select
            placeholder="Select payment method"
            bg={formBgColor}
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
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
