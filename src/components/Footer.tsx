import { Box, Flex, Text, Link, Stack } from "@chakra-ui/react";

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
        <Stack spacing={3}>
          <Text fontSize="lg" fontWeight="bold">
            Wall Masters
          </Text>
          <Text fontSize="sm">
            &copy; {new Date().getFullYear()} Wall Masters. All rights reserved.
          </Text>
        </Stack>

        {/* Right Side - Navigation Links */}
        <Stack direction="row" spacing={6} mt={{ base: 4, md: 0 }}>
          <Link href="/" _hover={{ textDecoration: "underline" }}>
            Home
          </Link>
          <Link href="/about" _hover={{ textDecoration: "underline" }}>
            About
          </Link>
          <Link href="/contact" _hover={{ textDecoration: "underline" }}>
            Contact
          </Link>
          <Link href="/terms" _hover={{ textDecoration: "underline" }}>
            Terms of Service
          </Link>
          <Link href="/privacy" _hover={{ textDecoration: "underline" }}>
            Privacy Policy
          </Link>
        </Stack>
      </Flex>
    </Box>
  );
};

export default Footer;
