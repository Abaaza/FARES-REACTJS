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
import { useCart } from "./CartContext"; // Import the useCart hook
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa"; // Import a trash icon for the remove button
import { useTranslation } from "react-i18next"; // Import the useTranslation hook

const SHIPPING_COST = 70;
const FREE_SHIPPING_THRESHOLD = 2000;

const CartPage: React.FC = () => {
  const { t } = useTranslation(); // Initialize translation hook
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

  return (
    <Box p={5} bg={bgColor} color={textColor}>
      <Heading as="h1" mb={4} color={headingColor}>
        {t("cartPage.title")}
      </Heading>
      {cart.length === 0 ? (
        <Text>{t("cartPage.emptyMessage")}</Text>
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
                  src={item.image} // Use the image URL from the cart item
                  alt={item.name}
                  boxSize="100px"
                  objectFit="cover"
                  borderRadius="md"
                  fallbackSrc="path/to/placeholder-image.png" // Fallback image
                  onError={(e) => {
                    // Handle image load error
                    e.currentTarget.src = "path/to/placeholder-image.png";
                  }}
                />
                <VStack align="start" spacing={2} flex="1">
                  <Heading size="md" color={headingColor}>
                    {item.name}
                  </Heading>
                  <Text color={textColor}>
                    {t("cartPage.sizeLabel")}: {item.size}
                  </Text>
                  <Text color={textColor}>
                    {t("cartPage.priceLabel")}: {item.price} EGP
                  </Text>
                  <HStack spacing={2}>
                    <Button size="sm" onClick={() => decreaseQuantity(item.id)}>
                      -
                    </Button>
                    <Text color={textColor}>
                      {t("cartPage.qtyLabel")}: {item.quantity}
                    </Text>
                    <Button size="sm" onClick={() => increaseQuantity(item.id)}>
                      +
                    </Button>
                    <IconButton
                      aria-label={t("cartPage.removeItem")}
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
              {t("cartPage.subtotal", { subtotal: totalPrice })}
            </Text>
            <Text fontSize="lg" color={textColor}>
              {t("cartPage.shipping", { shipping: shippingCost })}
            </Text>
            {totalPrice >= FREE_SHIPPING_THRESHOLD && (
              <Text fontSize="lg" color="green.500">
                {t("cartPage.freeShipping")}
              </Text>
            )}
            <Text fontSize="lg" fontWeight="bold" color={headingColor}>
              {t("cartPage.total", { total: grandTotal })}
            </Text>
          </Box>
          <Button colorScheme="teal" onClick={handleCheckout}>
            {t("cartPage.proceedToCheckout")}
          </Button>
        </VStack>
      )}
    </Box>
  );
};

export default CartPage;
