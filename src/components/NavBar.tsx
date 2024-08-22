import React from "react";
import { HStack, Image, Link, Spacer } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.webp";
import ColorModeSwitch from "./ColorModeSwitch";
import CartIcon from "./CartIcon";

const NavBar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  return (
    <HStack justifyContent="space-between" padding="10px">
      <Image
        src={logo}
        w="400px"
        h="40px"
        padding="2px"
        cursor="pointer"
        onClick={handleLogoClick}
      />
      <Spacer />
      <HStack spacing={8}>
        <Link onClick={() => navigate("/")}>Home</Link>
        <Link onClick={() => navigate("/about")}>About Us</Link>
        <Link onClick={() => navigate("/product-grid")}>Shop</Link>
        <ColorModeSwitch />
        <Link onClick={handleCartClick}>
          <CartIcon />
        </Link>
      </HStack>
    </HStack>
  );
};

export default NavBar;
