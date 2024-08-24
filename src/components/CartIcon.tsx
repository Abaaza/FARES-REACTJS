import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";
import {
  IconButton,
  Tooltip,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
  Text,
} from "@chakra-ui/react";
import { FaShoppingCart } from "react-icons/fa";

const SHIPPING_COST = 70;
const FREE_SHIPPING_THRESHOLD = 2000;

const CartIcon: React.FC = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  const handleCartClick = () => {
    navigate("/cart");
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingCost = total >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const grandTotal = total + shippingCost;

  return (
    <Box position="relative" display="inline-block">
      <Tooltip
        label={`Cart (${cart.length}) - Shipping: ${shippingCost} EGP`}
        aria-label="Cart"
      >
        <IconButton
          icon={<FaShoppingCart />}
          aria-label="Cart"
          variant="outline"
          colorScheme="teal"
          onClick={handleCartClick}
          position="relative"
          zIndex="1" // Ensure the button is above the badge
        />
      </Tooltip>
      {cart.length > 0 && (
        <Box
          position="absolute"
          top="-4px" // Adjust as needed
          right="-4px" // Adjust as needed
          color="red.500"
          fontSize="sm" // Adjust font size as needed
          fontWeight="bold"
          zIndex="1" // Ensure the number is above the button
          transform="translate(50%, -50%)" // Center the number properly
        >
          {cart.length}
        </Box>
      )}
      <Menu>
        <MenuButton
          as={Box}
          position="absolute"
          top="100%"
          left="0"
          width="100%"
        >
          <Box
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            cursor="pointer"
            display="block"
            onClick={handleCartClick}
          />
        </MenuButton>
        <MenuList>
          <MenuItem onClick={handleCartClick}>View Cart</MenuItem>
          <MenuItem>
            <Text fontWeight="bold">Shipping:</Text>
            <Text>{shippingCost} EGP</Text>
          </MenuItem>
          <MenuItem>
            <Text fontWeight="bold">Total:</Text>
            <Text>{grandTotal} EGP</Text>
          </MenuItem>
          {/* Add more menu items as needed */}
        </MenuList>
      </Menu>
    </Box>
  );
};

export default CartIcon;
