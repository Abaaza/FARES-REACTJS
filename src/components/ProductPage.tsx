import React, { useState } from "react";
import { useParams } from "react-router-dom";
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
  useColorModeValue, // Import useColorModeValue
} from "@chakra-ui/react";
import products from "./product";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";
import ProductSlider from "./ProductSlider";

interface Variant {
  id: string;
  size: string;
  price: number;
}

interface Product {
  id: string;
  name: string;
  description: string;
  images: string[]; // Allow multiple images
  variants: Variant[];
  color: string[];
  theme: string;
  threePiece: string;
}

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find((product) => product.id === id);
  const navigate = useNavigate();
  const { addItem } = useCart();

  const [selectedVariant, setSelectedVariant] = useState<Variant | undefined>(
    product?.variants[0]
  );
  const [selectedImage, setSelectedImage] = useState<string>(
    product?.images[0] || "" // Provide a fallback to an empty string
  );

  if (!product) {
    return <p>Product not found</p>;
  }

  const handleVariantChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const variant = product.variants.find(
      (variant: Variant) => variant.id === event.target.value
    );
    setSelectedVariant(variant);
  };

  const handleAddToCart = () => {
    if (selectedVariant) {
      addItem({
        id: `${product.id}-${selectedVariant.id}`, // Ensure unique ID for cart item
        name: product.name,
        size: selectedVariant.size,
        price: selectedVariant.price,
        image: selectedImage, // Use the selected image
        quantity: 1, // Initialize quantity as 1
      });
    }
  };

  // Use Chakra UI's breakpoint value for responsive padding
  const padding = useBreakpointValue({ base: "4", md: "5" });

  // Use Chakra UI's color mode value for dynamic background color
  const descriptionBg = useColorModeValue("gray.50", "gray.700");

  return (
    <Box p={padding}>
      <Button onClick={() => navigate(-1)} mb={4}>
        Back
      </Button>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 4, md: 10 }}>
        <VStack align="stretch">
          {/* Main Image */}
          <Image
            src={selectedImage}
            alt={product.name}
            maxW="100%"
            height="auto"
            objectFit="contain"
            boxSize={{ base: "100%", md: "500px" }}
            mb={4}
          />

          {/* Thumbnail Images */}
          <SimpleGrid
            columns={{ base: 3, md: product.images.length }}
            spacing={2}
          >
            {product.images.map((image: string, index: number) => (
              <Image
                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                boxSize={{ base: "80px", md: "100px" }}
                objectFit="cover"
                cursor="pointer"
                border={selectedImage === image ? "2px solid teal" : "none"}
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </SimpleGrid>
        </VStack>

        <VStack align="stretch" spacing={4}>
          <Heading as="h1" mb={4} fontSize={{ base: "xl", md: "2xl" }}>
            {product.name}
          </Heading>

          {/* Variant Selector */}
          <Select
            placeholder="Select size"
            onChange={handleVariantChange}
            value={selectedVariant?.id}
            mb={4}
          >
            {product.variants.map((variant: Variant) => (
              <option key={variant.id} value={variant.id}>
                {variant.size} - {variant.price} EGP
              </option>
            ))}
          </Select>

          {/* Display selected variant details */}
          {selectedVariant && (
            <>
              <Text mb={0}>Selected Size: {selectedVariant.size}</Text>
              <Text mb={0}>Price: {selectedVariant.price} EGP</Text>
              <Text mb={0}>Material: Canvas</Text>
              <Button colorScheme="teal" onClick={handleAddToCart}>
                Add to cart
              </Button>
            </>
          )}

          {/* Product Description */}
          <Box
            p={4}
            borderWidth="1px"
            borderRadius="md"
            boxShadow="md"
            bg={descriptionBg} // Use the dynamic background color
          >
            <Text>{product.description}</Text>
            <Text>Theme: {product.theme}</Text>
            <Text>Colors: {product.color.join(", ")}</Text>
            <Text>Three Piece: {product.threePiece}</Text>
          </Box>
        </VStack>
      </SimpleGrid>

      {/* Product Slider for related items */}
      <Box mt={8}>
        <ProductSlider />
      </Box>
    </Box>
  );
};

export default ProductPage;
