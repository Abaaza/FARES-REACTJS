import React from "react";
import { HStack, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.webp";
import ColorModeSwitch from "./ColorModeSwitch";

const NavBar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <HStack justifyContent="space-between">
      <Image
        src={logo}
        w="400px"
        h="40px"
        padding="2px"
        cursor="pointer" // Add a cursor pointer style
        onClick={handleLogoClick} // Handle logo click to navigate to home
      />
      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;
