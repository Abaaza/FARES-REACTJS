import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Image, Heading, Select, Text, Button } from "@chakra-ui/react";
import products from "./product";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";

interface Variant {
  id: string;
  size: string;
  price: number;
}

interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  variants: Variant[];
}

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find((product) => product.id === id);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [selectedVariant, setSelectedVariant] = useState<Variant | undefined>(
    product?.variants[0]
  );

  if (!product) {
    return <p>Product not found</p>;
  }

  const handleVariantChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const variant = product.variants.find(
      (variant) => variant.id === event.target.value
    );
    setSelectedVariant(variant);
  };

  const handleAddToCart = () => {
    if (selectedVariant) {
      addToCart({
        id: product.id,
        name: product.name,
        size: selectedVariant.size,
        price: selectedVariant.price,
      });
    }
  };

  return (
    <Box p={5}>
      <Button onClick={() => navigate(-1)} mb={4}>
        Back
      </Button>
      <Heading as="h1" mb={4}>
        {product.name}
      </Heading>
      <Image src={product.image} alt={product.name} mb={4} boxSize={500} />

      {/* Variant Selector */}
      <Select
        placeholder="Select size"
        onChange={handleVariantChange}
        value={selectedVariant?.id}
        mb={4}
      >
        {product.variants.map((variant) => (
          <option key={variant.id} value={variant.id}>
            {variant.size} - {variant.price} EGP
          </option>
        ))}
      </Select>

      {/* Display selected variant details */}
      {selectedVariant && (
        <>
          <Text mb={2}>Selected Size: {selectedVariant.size}</Text>
          <Text mb={4}>Price: {selectedVariant.price} EGP</Text>
          <Button colorScheme="teal" onClick={handleAddToCart}>
            Add to cart
          </Button>
        </>
      )}
      <Text mb={2}>{product.description}</Text>
    </Box>
  );
};

export default ProductPage;
