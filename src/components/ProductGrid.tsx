// src/components/ProductGrid.tsx
import React, { useMemo, useState } from "react";
import { Button, Box } from "@chakra-ui/react";
import ProductCard from "./ProductCard";
import { getPriceRange, getSizes } from "./productUtils";
import { useProductFilters } from "./productUtils";
import SortSelector from "./SortSelector";
import products from "./product";
import { useNavigate } from "react-router-dom";
import { Container, StyledSimpleGrid } from "./StyledComponents";

const ProductGrid: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState(20);
  const [selectedTheme, setSelectedTheme] = useState<string>("");
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedThreeP, setSelectedThreeP] = useState<string>("");

  const { colors, threePOptions } = useProductFilters();
  const navigate = useNavigate();

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesTheme = selectedTheme
        ? product.theme === selectedTheme
        : true;
      const matchesColor =
        selectedColors.length > 0
          ? selectedColors.every((color) => product.color.includes(color))
          : true;
      const matchesThreeP =
        selectedThreeP !== "" ? product.threePiece === selectedThreeP : true;

      return matchesTheme && matchesColor && matchesThreeP;
    });
  }, [selectedTheme, selectedColors, selectedThreeP]);

  const showMoreItems = () => {
    setVisibleCount((prevCount) => prevCount + 20);
  };

  const handleCardClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  const handleResetFilters = () => {
    setSelectedTheme("");
    setSelectedColors([]);
    setSelectedThreeP("");
  };

  return (
    <Container>
      <Box mt={5}>
        <SortSelector
          themes={Array.from(new Set(products.map((p) => p.theme)))}
          colors={Array.from(new Set(products.flatMap((p) => p.color)))}
          threePOptions={[
            { value: "No", label: "1 Piece" },
            { value: "Yes", label: "3 Pieces" },
          ]}
          onThemeSelect={setSelectedTheme}
          onColorSelect={setSelectedColors}
          onThreePSelect={setSelectedThreeP}
          onResetFilters={handleResetFilters}
        />
      </Box>
      <StyledSimpleGrid columns={{ base: 2, sm: 2, md: 3, lg: 4 }} spacing={5}>
        {filteredProducts.slice(0, visibleCount).map((product) => {
          const priceRange = getPriceRange(product.variants);
          const sizes = getSizes(product.variants);

          return (
            <ProductCard
              key={product.id}
              name={product.name}
              image={product.images[0]} // Use the first image or adjust as needed
              priceRange={priceRange}
              sizes={sizes}
              sizeCount={sizes.length}
              onClick={() => handleCardClick(product.id)}
            />
          );
        })}
      </StyledSimpleGrid>
      {visibleCount < filteredProducts.length && (
        <Box textAlign="center" mt={5}>
          <Button onClick={showMoreItems}>Show More</Button>
        </Box>
      )}
    </Container>
  );
};

export default ProductGrid;
