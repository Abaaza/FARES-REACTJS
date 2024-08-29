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
import emailjs from "emailjs-com";
import { useTranslation } from "react-i18next";

const SHIPPING_COST = 70;
const FREE_SHIPPING_THRESHOLD = 2000;

const CheckoutPage: React.FC = () => {
  const { t } = useTranslation(); // Use the translation hook
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
  const [email, setEmail] = useState("");
  const bgColor = useColorModeValue("gray.50", "gray.800");
  const textColor = useColorModeValue("gray.800", "gray.200");
  const formBgColor = useColorModeValue("white", "gray.700");
  const boxBgColor = useColorModeValue("gray.100", "gray.900");
  const headingColor = useColorModeValue("gray.800", "gray.100");

  const handlePlaceOrder = () => {
    // Generate a unique order number
    const orderNumber = `Order #${Math.floor(Math.random() * 1000000)}`;

    const order = {
      orderNumber,
      customer: {
        name,
        phone,
        email,
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

    // Prepare email content
    const emailContent = `
      Order Number: ${orderNumber} 
      Name: ${name}
      Phone: ${phone}
      Email: ${email}
      Address 1: ${address1}
      Address 2: ${address2}
      City: ${city}
      Comments: ${comments}
      Payment Method: ${paymentMethod}
      
      Cart Items:
      ${cart
        .map(
          (item) => `
          ${item.name}
          Size: ${item.size}
          Price: ${item.price} EGP
          Quantity: ${item.quantity}
      `
        )
        .join("")}
      Total Amount:
      Subtotal: ${total} EGP
      Shipping: ${shippingCost} EGP 
      Total: ${grandTotal} EGP
    `;

    // Send email using EmailJS
    emailjs
      .send(
        "service_4hrebk8", // Service ID
        "template_mkn1fxf", // Template ID
        {
          message: emailContent,
          to_email: email,
          user_name: name,
          order_number: orderNumber,
        },
        "1mIy5IpEpJPFCN01g" // User ID
      )
      .then((response) => {
        console.log("Success:", response);
        alert(t("orderConfirmation"));
      })
      .catch((error) => {
        console.error("Error:", error);
        alert(t("orderError"));
      });
  };

  return (
    <Box p={5} bg={bgColor} color={textColor}>
      <Heading as="h1" mb={4} color={headingColor}>
        {t("checkout")}
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
                <Text color={textColor}>
                  {t("price")}: {item.price} EGP
                </Text>
                <Text color={textColor}>Quantity: {item.quantity}</Text>
              </VStack>
            </HStack>
          </Box>
        ))}
        <Box mt={4}>
          <Heading size="m" color={headingColor}>
            {t("subtotal")}: {total} EGP
          </Heading>
          <Text fontSize="lg" color={textColor}>
            {t("shipping")}: {shippingCost} EGP (6 business days)
          </Text>
          <Heading size="m" color={headingColor}>
            {t("total")}: {grandTotal} EGP
          </Heading>
        </Box>
        <FormControl isRequired>
          <FormLabel color={textColor}>{t("name")}</FormLabel>
          <Input
            placeholder={t("name")}
            bg={formBgColor}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel color={textColor}>{t("phone")}</FormLabel>
          <Input
            placeholder={t("phone")}
            bg={formBgColor}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel color={textColor}>{t("email")}</FormLabel>
          <Input
            placeholder={t("email")}
            bg={formBgColor}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel color={textColor}>{t("address1")}</FormLabel>
          <Input
            placeholder={t("address1")}
            bg={formBgColor}
            value={address1}
            onChange={(e) => setAddress1(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel color={textColor}>{t("address2")}</FormLabel>
          <Input
            placeholder={t("address2")}
            bg={formBgColor}
            value={address2}
            onChange={(e) => setAddress2(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel color={textColor}>{t("city")}</FormLabel>
          <Input
            placeholder={t("city")}
            bg={formBgColor}
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </FormControl>
        <FormControl id="country" isRequired>
          <FormLabel color={textColor}>{t("country")}</FormLabel>
          <Input value="Egypt" isReadOnly bg={formBgColor} />
        </FormControl>
        <FormControl>
          <FormLabel color={textColor}>{t("comments")}</FormLabel>
          <Input
            placeholder={t("comments")}
            bg={formBgColor}
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />
        </FormControl>
        <FormControl id="payment-method" isRequired>
          <FormLabel color={textColor}>{t("paymentMethod")}</FormLabel>
          <Select
            placeholder={t("paymentMethod")}
            bg={formBgColor}
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="cash">{t("cashOnDelivery")}</option>
          </Select>
        </FormControl>
        <Button colorScheme="teal" onClick={handlePlaceOrder}>
          {t("placeOrder")}
        </Button>
      </VStack>
    </Box>
  );
};

export default CheckoutPage;
