import React from "react";
import {
  Box,
  Heading,
  Text,
  Grid,
  GridItem,
  Image,
  Icon,
  Stack,
  Link,
} from "@chakra-ui/react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import riverwalk from "../assets/29.webp";
import almaza from "../assets/37.webp";
import cfc from "../assets/36.webp";
import arkan from "../assets/38.webp";
import madinaty from "../assets/9.webp";
import heliopolis from "../assets/5.webp";

// Update the branchesData array to hold actual Google Maps search URLs for each branch
const branchesData = [
  {
    name: "Riverwalk",
    location: "New Cairo",
    address: "Riverwalk mall, Mohamed Naguib Axis, New Cairo",
    src: riverwalk,
    mapUrl: "https://www.google.com/maps?q=123+Main+St,+New+York,+NY+10001",
  },
  {
    name: "Almaza",
    location: "Heliopolis",
    address: "City Center Almaza, Suez Road, Heliopolis",
    src: almaza,
    mapUrl: "https://www.google.com/maps?q=456+Baker+St,+London,+UK+W1U+7RT",
  },
  {
    name: "Cairo Festival City",
    location: "New Cairo",
    address: "Cairo Festival City Mall, New Cairo",
    src: cfc,
    mapUrl:
      "https://www.google.com/maps?q=789+Rue+de+Paris,+Paris,+France+75001",
  },
  {
    name: "Heliopolis",
    location: "Heliopolis",
    address: "103 Omar Ibn El Khattab, Heliopolis",
    src: heliopolis,
    mapUrl: "https://www.google.com/maps?q=Tokyo+Tower,+Minato,+Tokyo,+Japan",
  },
  {
    name: "Arkan",
    location: "Sheikh Zayed",
    address: "Arkan Plaza, 6 of October",
    src: arkan,
    mapUrl:
      "https://www.google.com/maps?q=202+Alexanderplatz,+Berlin,+Germany+10178",
  },
  {
    name: "Air Mall",
    location: "Madinaty",
    address: "Open Air Mall, Madinaty",
    src: madinaty,
    mapUrl:
      "https://www.google.com/maps?q=303+George+St,+Sydney,+Australia+2000",
  },
];

const StrangerTourist: React.FC = () => {
  const { t } = useTranslation(); // Hook to get translation function

  return (
    <Box p={5}>
      <Heading as="h1" mb={4} textAlign="center">
        {t("Our Branches")} {/* Translated */}
      </Heading>
      <Text mb={6} textAlign="center">
        {t(
          "Explore our branches located in Egypt. Visit us at any of these locations!"
        )}{" "}
        {/* Translated */}
      </Text>

      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
        {branchesData.map((branch, index) => (
          <GridItem
            key={index}
            border="1px solid"
            borderRadius="md"
            p={4}
            boxShadow="md"
            textAlign="center" // Ensures the entire grid item content is centered
          >
            <Box h="200px" w="100%" overflow="hidden">
              <Image
                src={branch.src} // Use the imported image here
                alt={branch.name}
                h="100%"
                w="100%"
                objectFit="cover" // Ensures the image covers the container without distortion
              />
            </Box>
            <Heading as="h3" size="md" mb={2}>
              {t(branch.name)} {/* Translated */}
            </Heading>
            <Stack
              direction="row"
              align="center"
              justifyContent="center" // Center the location icon and text
              mb={2}
            >
              <Link href={branch.mapUrl} isExternal>
                <Icon as={FaMapMarkerAlt} color="red.500" cursor="pointer" />
              </Link>
              <Text fontWeight="bold">
                {t(branch.location)} {/* Translated */}
              </Text>
            </Stack>
            <Text>
              {t(branch.address)} {/* Translated */}
            </Text>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default StrangerTourist;
