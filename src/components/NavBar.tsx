import React from "react";
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  VStack,
  Text,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleLogoClick = () => {
    navigate("/");
    if (isOpen) onClose();
  };

  const handleLinkClick = (path: string) => {
    navigate(path);
    if (isOpen) onClose();
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <Box
      as="header"
      p={4}
      width="100%"
      zIndex={1000}
      bg="transparent"
      height={isMobile ? "100px" : "210px"}
    >
      <Flex
        alignItems="center"
        direction={{ base: "row", md: "column" }}
        justifyContent={{ base: "space-between", md: "center" }}
        position="relative"
        height="100%"
      >
        {/* === Mobile Menu Button === */}
        {isMobile && (
          <IconButton
            icon={isOpen ? <FaTimes /> : <FaBars />}
            aria-label="Menu"
            onClick={isOpen ? onClose : onOpen}
            size="lg"
            width="40px"
            height="40px"
            borderRadius="md"
            bg="white"
            border="1px"
            borderColor="black"
            ml="0"
            display={isMobile ? "flex" : "none"}
            alignItems="center"
            justifyContent="center"
            zIndex={1100}
            _hover={{ bg: "gray.100" }}
            _active={{ bg: "gray.100" }}
            mt={5}
          />
        )}

        {/* === Brand Name / Logo (clickable) === */}
        <Flex
          alignItems="center"
          justifyContent="center"
          cursor="pointer"
          onClick={handleLogoClick}
          direction={isMobile ? "column" : "row"}
          mt={isMobile ? 5 : 0}
        >
          {isMobile ? (
            <>
              <Text fontSize="2xl" color="black" lineHeight="tight">
                فارس
              </Text>
              <Text fontSize="2xl" color="black" lineHeight="tight">
                زيتون
              </Text>
            </>
          ) : (
            <Text fontSize="2xl" color="black" marginEnd={-700}>
              فارس زيتون
            </Text>
          )}
        </Flex>

        {/* === Desktop Links === */}
        {!isMobile && (
          <HStack spacing={100} align="center" mt={10}>
            <Link
              onClick={() => handleLinkClick("/")}
              color={isActive("/") ? "#d3ad62" : "gray.800"}
              fontWeight={isActive("/") ? "bold" : "normal"}
              _hover={{ color: "#d3ad62" }}
            >
              Home
            </Link>
            <Link
              onClick={() => handleLinkClick("/projects")}
              color={isActive("/projects") ? "#d3ad62" : "gray.800"}
              fontWeight={isActive("/projects") ? "bold" : "normal"}
              _hover={{ color: "#d3ad62" }}
            >
              Projects
            </Link>
            <Link
              onClick={() => handleLinkClick("/moving")}
              color={isActive("/moving") ? "#d3ad62" : "gray.800"}
              fontWeight={isActive("/moving") ? "bold" : "normal"}
              _hover={{ color: "#d3ad62" }}
            >
              Moving Image
            </Link>
            <Link
              onClick={() => handleLinkClick("/about")}
              color={isActive("/about") ? "#d3ad62" : "gray.800"}
              fontWeight={isActive("/about") ? "bold" : "normal"}
              _hover={{ color: "#d3ad62" }}
            >
              About
            </Link>
          </HStack>
        )}

        {/* === Mobile Menu Overlay === */}
        {isMobile && (
          <Box
            position="fixed"
            top={0}
            right={0}
            width="75%"
            height="100vh"
            bg="white"
            transform={isOpen ? "translateX(0)" : "translateX(100%)"}
            transition="transform 0.5s ease-in-out"
            zIndex={1000}
            p={6}
          >
            <VStack spacing={6} alignItems="center" mt={12}>
              <Link
                onClick={() => handleLinkClick("/")}
                fontSize="2xl"
                color={isActive("/") ? "#d3ad62" : "gray.800"}
                fontWeight={isActive("/") ? "bold" : "normal"}
                _hover={{ color: "#d3ad62" }}
              >
                Home
              </Link>
              <Link
                onClick={() => handleLinkClick("/projects")}
                fontSize="2xl"
                color={isActive("/projects") ? "#d3ad62" : "gray.800"}
                fontWeight={isActive("/projects") ? "bold" : "normal"}
                _hover={{ color: "#d3ad62" }}
              >
                Projects
              </Link>
              <Link
                onClick={() => handleLinkClick("/moving")}
                fontSize="2xl"
                color={isActive("/moving") ? "#d3ad62" : "gray.800"}
                fontWeight={isActive("/moving") ? "bold" : "normal"}
                _hover={{ color: "#d3ad62" }}
              >
                Moving Image
              </Link>
              <Link
                onClick={() => handleLinkClick("/about")}
                fontSize="2xl"
                color={isActive("/about") ? "#d3ad62" : "gray.800"}
                fontWeight={isActive("/about") ? "bold" : "normal"}
                _hover={{ color: "#d3ad62" }}
              >
                About
              </Link>
            </VStack>
          </Box>
        )}

        {/* Overlay Background */}
        {isOpen && isMobile && (
          <Box
            position="fixed"
            top={0}
            left={0}
            width="25%"
            height="100vh"
            bg="blackAlpha.700"
            zIndex={999}
            onClick={onClose}
          />
        )}
      </Flex>
    </Box>
  );
};

export default NavBar;
