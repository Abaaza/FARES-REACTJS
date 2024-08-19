import React, { useMemo, useState } from "react";
import products from "./product";
import { SimpleGrid, Button, Box } from "@chakra-ui/react";
import ProductCard from "./ProductCard";

function shuffleArray<T>(array: T[]): T[] {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

const ProductGrid = () => {
  const [visibleCount, setVisibleCount] = useState(40);

  const shuffledProducts = useMemo(() => shuffleArray(products), [products]);

  const showMoreItems = () => {
    setVisibleCount((prevCount) => prevCount + 40);
  };

  return (
    <>
      <SimpleGrid columns={{ sm: 2, md: 2, lg: 4 }} spacing={5}>
        {shuffledProducts.slice(0, visibleCount).map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            image={product.image}
            price={product.price}
            size={product.size}
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
