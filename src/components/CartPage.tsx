import React from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  Image,
  useColorModeValue,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const SHIPPING_COST = 70;
const FREE_SHIPPING_THRESHOLD = 2000;

// Utility function to convert numbers to Arabic numerals
const convertToArabicNumerals = (input: number): string => {
  return input
    .toString()
    .replace(/\d/g, (digit) => "٠١٢٣٤٥٦٧٨٩"[parseInt(digit, 10)]);
};

const CartPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { cart, removeItem, increaseQuantity, decreaseQuantity } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shippingCost =
    totalPrice >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;

  const grandTotal = totalPrice + shippingCost;

  const bgColor = useColorModeValue("gray.50", "gray.800");
  const textColor = useColorModeValue("gray.800", "gray.200");
  const itemBgColor = useColorModeValue("gray.100", "gray.900");
  const totalBgColor = useColorModeValue("gray.50", "gray.700");
  const headingColor = useColorModeValue("gray.800", "gray.100");

  // Convert numbers based on the current language
  const formatAndConvertNumber = (number: number) => {
    return i18n.language === "ar"
      ? convertToArabicNumerals(number)
      : number.toLocaleString(); // Use locale string for formatting in English
  };

  // Function to get translated product name
  const getTranslatedProductName = (name: string) => {
    return t(`products.${name}`, name);
  };

  // Function to get translated size
  const getTranslatedSize = (size: string) => {
    return t(`sizes.${size}`, size);
  };

  // Function to get translated currency
  const getTranslatedCurrency = () => {
    return t("currency", "EGP");
  };

  return (
    <Box p={5} bg={bgColor} color={textColor}>
      <Heading as="h1" mb={4} color={headingColor}>
        {t("title")}
      </Heading>
      {cart.length === 0 ? (
        <Text>{t("emptyMessage")}</Text>
      ) : (
        <VStack spacing={4} align="stretch">
          {cart.map((item) => (
            <Box
              key={item.id}
              borderWidth="1px"
              borderRadius="md"
              p={4}
              bg={itemBgColor}
              boxShadow="md"
            >
              <HStack spacing={4} align="center">
                <Image
                  src={item.image}
                  alt={item.name}
                  boxSize="100px"
                  objectFit="cover"
                  borderRadius="md"
                  fallbackSrc="path/to/placeholder-image.png"
                  onError={(e) => {
                    e.currentTarget.src = "path/to/placeholder-image.png";
                  }}
                />
                <VStack align="start" spacing={2} flex="1">
                  <Heading size="md" color={headingColor}>
                    {getTranslatedProductName(item.name)}
                  </Heading>
                  <Text color={textColor}>
                    {t("sizeLabel")}: {getTranslatedSize(item.size)}
                  </Text>
                  <Text color={textColor}>
                    {t("priceLabel")}: {formatAndConvertNumber(item.price)}{" "}
                    {getTranslatedCurrency()}
                  </Text>
                  <HStack spacing={2}>
                    <Button size="sm" onClick={() => decreaseQuantity(item.id)}>
                      -
                    </Button>
                    <Text color={textColor}>
                      {t("qtyLabel")}: {formatAndConvertNumber(item.quantity)}
                    </Text>
                    <Button size="sm" onClick={() => increaseQuantity(item.id)}>
                      +
                    </Button>
                    <IconButton
                      aria-label={t("removeItem")}
                      icon={<FaTrash />}
                      colorScheme="red"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                    />
                  </HStack>
                </VStack>
              </HStack>
            </Box>
          ))}
          <Box
            w="full"
            pt={4}
            borderTopWidth="1px"
            borderColor={textColor}
            bg={totalBgColor}
            p={4}
            borderRadius="md"
          >
            <Text fontSize="lg" fontWeight="bold" color={headingColor}>
              {t("subtotal")}: {formatAndConvertNumber(totalPrice)}{" "}
              {t("currency")}
            </Text>
            <Text fontSize="lg" color={textColor}>
              {t("shipping")}: {formatAndConvertNumber(shippingCost)}{" "}
              {t("currency")}
            </Text>
            {totalPrice >= FREE_SHIPPING_THRESHOLD && (
              <Text fontSize="lg" color="green.500">
                {t("freeShipping")}
              </Text>
            )}
            <Text fontSize="lg" fontWeight="bold" color={headingColor}>
              {t("total")}: {formatAndConvertNumber(grandTotal)} {t("currency")}
            </Text>
          </Box>
          <Button colorScheme="teal" onClick={handleCheckout}>
            {t("proceedToCheckout")}
          </Button>
        </VStack>
      )}
    </Box>
  );
};

export default CartPage;
