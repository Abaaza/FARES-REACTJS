import React, { useMemo, useState } from "react";
import products from "./product";
import { SimpleGrid, Button, Box } from "@chakra-ui/react";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";
import { getPriceRange, getSizes } from "./productUtils";
import SortSelector from "./SortSelector";
import { getUniqueThemes } from "./productUtils"; // Import the utility function

// Shuffle array function
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
  const [selectedTheme, setSelectedTheme] = useState<string>("All");
  const navigate = useNavigate();

  const uniqueThemes = useMemo(() => getUniqueThemes(products), [products]);

  // Filter products based on the selected theme
  const filteredProducts = useMemo(() => {
    return selectedTheme === "All"
      ? products
      : products.filter((product) => product.theme === selectedTheme);
  }, [selectedTheme]);

  const shuffledProducts = useMemo(
    () => shuffleArray(filteredProducts),
    [filteredProducts]
  );

  const showMoreItems = () => {
    setVisibleCount((prevCount) => prevCount + 20);
  };

  const handleCardClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  return (
    <>
      <SimpleGrid
        columns={{ base: 2, sm: 2, md: 3, lg: 4 }} // Responsive column configuration
        spacing={5}
      >
        {shuffledProducts.slice(0, visibleCount).map((product) => {
          const priceRange = getPriceRange(product.variants);
          const sizes = getSizes(product.variants);

          return (
            <ProductCard
              key={product.id}
              name={product.name}
              image={product.image}
              priceRange={priceRange}
              sizes={sizes}
              sizeCount={sizes.length}
              onClick={() => handleCardClick(product.id)}
            />
          );
        })}
      </SimpleGrid>
      <SortSelector themes={uniqueThemes} onThemeSelect={setSelectedTheme} />
      {visibleCount < shuffledProducts.length && (
        <Box textAlign="center" mt={5}>
          <Button onClick={showMoreItems}>Show More</Button>
        </Box>
      )}
    </>
  );
};

export default ProductGrid;
