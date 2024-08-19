import React from "react";
import { HStack, Image } from "@chakra-ui/react";
import logo from "../assets/logo.webp";
import ColorModeSwitch from "./ColorModeSwitch";

const NavBar = () => {
  return (
    <HStack justifyContent="space-between">
      <Image src={logo} w="400px" h="40px" padding="2px"></Image>
      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;
