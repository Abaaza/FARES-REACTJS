import React from "react";
import { useCart } from "./CartContext"; // Import the useCart hook
import { IconButton, Tooltip } from "@chakra-ui/react";
import { FaShoppingCart } from "react-icons/fa";

const CartIcon: React.FC = () => {
  const { cart } = useCart();

  return (
    <Tooltip label={`Cart (${cart.length})`} aria-label="Cart">
      <IconButton
        icon={<FaShoppingCart />}
        aria-label="Cart"
        variant="outline"
        colorScheme="teal"
      />
    </Tooltip>
  );
};

export default CartIcon;
