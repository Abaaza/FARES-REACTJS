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
} from "@chakra-ui/react";
import { FaShoppingCart } from "react-icons/fa";

const CartIcon: React.FC = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  const handleCartClick = () => {
    navigate("/cart");
  };

  return (
    <Box position="relative">
      <Tooltip label={`Cart (${cart.length})`} aria-label="Cart">
        <IconButton
          icon={<FaShoppingCart />}
          aria-label="Cart"
          variant="outline"
          colorScheme="teal"
          onClick={handleCartClick} // Handle click event for navigation
        />
      </Tooltip>
      <Menu>
        <MenuButton
          as={Box} // Wrap the IconButton with Box to make it part of the Menu
          position="absolute"
          top="100%" // Position the MenuList below the IconButton
          left="0"
          width="100%" // Adjust width as needed
        >
          <Box
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            cursor="pointer"
            display="block"
            onClick={handleCartClick} // Handle click event for navigation
          />
        </MenuButton>
        <MenuList>
          <MenuItem onClick={handleCartClick}>View Cart</MenuItem>
          <MenuItem>Another Option</MenuItem>
          {/* Add more menu items as needed */}
        </MenuList>
      </Menu>
    </Box>
  );
};

export default CartIcon;
