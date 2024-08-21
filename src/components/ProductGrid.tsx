import React, { useMemo, useState } from "react";
import products from "./product"; // Ensure this imports the array of products
import { SimpleGrid, Button, Box } from "@chakra-ui/react";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";

function shuffleArray<T>(array: T[]): T[] {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

const ProductGrid: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState(20);
  const shuffledProducts = useMemo(() => shuffleArray(products), [products]);
  const navigate = useNavigate();

  const showMoreItems = () => {
    setVisibleCount((prevCount) => prevCount + 20);
  };

  const handleCardClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  return (
    <>
      <SimpleGrid columns={{ sm: 2, md: 2, lg: 4 }} spacing={5}>
        {shuffledProducts.slice(0, visibleCount).map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            image={product.image}
            // size={product.size}
            // price={product.price}
            onClick={() => handleCardClick(product.id)} // Pass the string ID
          />
        ))}
      </SimpleGrid>
      {visibleCount < shuffledProducts.length && (
        <Box textAlign="center" mt={5}>
          <Button onClick={showMoreItems}>Show More</Button>
        </Box>
      )}
    </>
  );
};

export default ProductGrid;
