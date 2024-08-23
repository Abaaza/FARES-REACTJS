import React, { useMemo, useState } from "react";
import { Button, Box } from "@chakra-ui/react";
import ProductCard from "./ProductCard";
import { getPriceRange, getSizes } from "./productUtils";
import { useProductFilters } from "./productUtils"; // Import the filter hook
import SortSelector from "./SortSelector";
import products from "./product"; // Import products
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Container, StyledSimpleGrid } from "./StyledComponents";

const ProductGrid: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState(20);
  const [selectedTheme, setSelectedTheme] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedThreeP, setSelectedThreeP] = useState<string>("");

  const { colors, threePOptions } = useProductFilters();
  const navigate = useNavigate(); // Initialize useNavigate

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesTheme = selectedTheme
        ? product.theme === selectedTheme
        : true;
      const matchesColor = selectedColor
        ? product.color.includes(selectedColor)
        : true;
      const matchesThreeP =
        selectedThreeP !== "" ? product.threePiece === selectedThreeP : true;

      return matchesTheme && matchesColor && matchesThreeP;
    });
  }, [selectedTheme, selectedColor, selectedThreeP]);

  const showMoreItems = () => {
    setVisibleCount((prevCount) => prevCount + 20);
  };

  const handleCardClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  const handleResetFilters = () => {
    // Reset the state to initial values or default values
    setSelectedTheme("");
    setSelectedColor("");
    setSelectedThreeP("");
  };

  return (
    <Container>
      <SortSelector
        themes={Array.from(new Set(products.map((p) => p.theme)))}
        colors={Array.from(new Set(products.flatMap((p) => p.color)))}
        threePOptions={[
          { value: "No", label: "1 Piece" },
          { value: "Yes", label: "3 Pieces" },
        ]}
        onThemeSelect={setSelectedTheme}
        onColorSelect={setSelectedColor}
        onThreePSelect={(option) => setSelectedThreeP(option)}
        onResetFilters={handleResetFilters}
      />
      <StyledSimpleGrid columns={{ base: 2, sm: 2, md: 3, lg: 4 }} spacing={5}>
        {filteredProducts.slice(0, visibleCount).map((product) => {
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
