import React from "react";
import { HStack, Image } from "@chakra-ui/react";
import logo from "../assets/logo.webp";

const NavBar = () => {
  return (
    <HStack>
      <Image src={logo} w="200px" h="20px" padding="2px"></Image>
    </HStack>
  );
};

export default NavBar;
