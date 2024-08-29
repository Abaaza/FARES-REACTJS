import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Image,
  Heading,
  Select,
  Text,
  Button,
  SimpleGrid,
  VStack,
  useBreakpointValue,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";
import products from "./product";
import { useCart } from "./CartContext";
import DesktopProductSlider from "./DesktopProductSlider";
import MobileProductSlider from "./MobileProductSlider";
import { useTranslation } from "react-i18next";

interface Variant {
  id: string;
  size: string;
  price: number;
}

interface Product {
  id: string;
  name: string;
  description: string;
  images: string[];
  variants: Variant[];
  color: string[];
  theme: string;
  threePiece: string;
}

const ProductPage: React.FC = () => {
  const { t } = useTranslation(); // Use the translation hook
  const { id } = useParams<{ id: string }>();
  const product = products.find((product) => product.id === id);
  const navigate = useNavigate();
  const { addItem } = useCart();

  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);
  const [selectedVariant, setSelectedVariant] = useState<Variant | undefined>(
    product?.variants[0]
  );
  const [selectedImage, setSelectedImage] = useState<string>(() => {
    if (product && product.images.length > 0) {
      return product.images[0];
    }
    return "";
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (product) {
      setSelectedImage(product.images[0]);
      setSelectedVariant(product.variants[0]);
    }
  }, [product]);

  if (!product) {
    return <p>{t("productNotFound")}</p>;
  }

  const handleVariantChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const variant = product.variants.find(
      (variant) => variant.id === event.target.value
    );
    setSelectedVariant(variant);
  };

  const handleAddToCart = () => {
    if (selectedVariant) {
      addItem({
        id: `${product.id}-${selectedVariant.id}`,
        name: product.name,
        size: selectedVariant.size,
        price: selectedVariant.price,
        image: selectedImage,
        quantity: 1,
      });
    }
  };

  const padding = useBreakpointValue({ base: "4", md: "5" });
  const descriptionBg = useColorModeValue("gray.50", "gray.700");
  const descriptionFontSize = useBreakpointValue({ base: "md", md: "lg" });

  // Filter out invalid or missing images
  const validImages = product.images.filter(
    (image) => image && image.trim() !== ""
  );

  return (
    <Box p={padding}>
      <Button onClick={() => navigate(-1)} mb={4} mt={2}>
        {t("backButton")}
      </Button>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 4, md: 10 }}>
        <VStack align="stretch">
          <Box flex="1" maxW={{ base: "100%", md: "100%" }}>
            <Image
              src={selectedImage}
              alt={product.name}
              maxW="100%"
              height="auto"
              objectFit="contain"
              mb={4}
            />
          </Box>

          {/* Thumbnails */}
          {validImages.length > 1 && (
            <SimpleGrid
              columns={{
                base: 3,
                md: validImages.length > 0 ? validImages.length : 1,
              }}
              spacing={2}
            >
              {validImages.map((image, index) => (
                <Box
                  key={index}
                  position="relative"
                  _hover={{
                    transform: "scale(1.1)",
                    zIndex: 1,
                    transition: "transform 0.3s ease",
                  }}
                >
                  <Image
                    src={image}
                    alt={t("thumbnailAlt", { index: index + 1 })}
                    boxSize={{ base: "80px", md: "100px" }}
                    objectFit="cover"
                    cursor="pointer"
                    border={selectedImage === image ? "2px solid teal" : "none"}
                    borderRadius="md"
                    boxShadow={
                      selectedImage === image
                        ? "0 0 10px rgba(0, 128, 128, 0.5)"
                        : "none"
                    }
                    onClick={() => setSelectedImage(image)}
                  />
                </Box>
              ))}
            </SimpleGrid>
          )}
        </VStack>

        <VStack align="stretch" spacing={4}>
          <Heading as="h1" mb={4} fontSize={{ base: "xl", md: "2xl" }}>
            {product.name}
          </Heading>

          <Select
            placeholder={t("selectSize")}
            onChange={handleVariantChange}
            value={selectedVariant?.id || ""}
            mb={4}
          >
            {product.variants.map((variant) => (
              <option key={variant.id} value={variant.id}>
                {variant.size} - {variant.price} EGP
              </option>
            ))}
          </Select>

          {selectedVariant && (
            <>
              <Text fontWeight="bold" mb={0}>
                {t("selectedSize", { size: selectedVariant.size })}
              </Text>
              <Text fontWeight="bold" mb={0}>
                {t("price", { price: selectedVariant.price })}
              </Text>
              <Text fontWeight="bold" mb={0}>
                {t("material")}
              </Text>
              <Button colorScheme="teal" onClick={handleAddToCart}>
                {t("addToCart")}
              </Button>
            </>
          )}

          <Box
            p={4}
            borderWidth="1px"
            borderRadius="md"
            boxShadow="md"
            bg={descriptionBg}
          >
            <Text padding={3} fontSize={descriptionFontSize}>
              <Text as="h2" textAlign="center" fontWeight="bold" mb={3}>
                {t("productDescription")}
              </Text>
              <ul>
                <li>{t("highDefinition")}</li>
                <li>{t("forRooms")}</li>
                <li>{t("professionalStretching")}</li>
                <li>{t("bestQuality")}</li>
                <li>{t("frameThickness")}</li>
                <li>{t("packaging")}</li>
              </ul>

              <Text as="h2" textAlign="center" fontWeight="bold" mb={3} mt={5}>
                {t("warmAttention")}
              </Text>
              <ul>
                <li>{t("colorDifference")}</li>
                <li>{t("measureWall")}</li>
              </ul>
            </Text>
          </Box>
        </VStack>
      </SimpleGrid>
      <Box textAlign="center" mt={10}>
        <Heading as="h2" size="lg" mb={4}>
          {t("topSellers")}
        </Heading>
      </Box>
      <Flex mt={25} position="relative">
        {isMobile ? <MobileProductSlider /> : <DesktopProductSlider />}
      </Flex>
    </Box>
  );
};

export default ProductPage;
