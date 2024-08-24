import { Box, Flex, Text, Link, Stack, Icon } from "@chakra-ui/react";
import { FaFacebook, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <Box as="footer" bg="gray.900" color="white" py={10} mt={10}>
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align="center"
        maxW="1200px"
        mx="auto"
        px={6}
      >
        {/* Left Side - Company Information */}
        <Stack spacing={3} textAlign={{ base: "center", md: "left" }}>
          <Text fontSize="lg" fontWeight="bold">
            Wall Masters
          </Text>
          <Text fontSize="sm">
            &copy; {new Date().getFullYear()} Wall Masters. All rights reserved.
          </Text>
          <Text fontSize="sm">For Contact Call: +201000544548</Text>
        </Stack>

        {/* Right Side - Navigation Links */}
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={{ base: 3, md: 6 }}
          mt={{ base: 4, md: 0 }}
          align={{ base: "center", md: "flex-start" }}
        >
          <Link href="/" _hover={{ textDecoration: "underline" }}>
            Home
          </Link>
          <Link href="/product-grid" _hover={{ textDecoration: "underline" }}>
            Shop
          </Link>

          {/* Social Media Links */}
          <Stack direction="row" spacing={4}>
            <Link href="https://www.facebook.com/wall.masters" isExternal>
              <Icon as={FaFacebook} w={6} h={6} />
            </Link>
            <Link href="https://www.instagram.com/wall.masters" isExternal>
              <Icon as={FaInstagram} w={6} h={6} />
            </Link>
          </Stack>
        </Stack>
      </Flex>
    </Box>
  );
};

export default Footer;
