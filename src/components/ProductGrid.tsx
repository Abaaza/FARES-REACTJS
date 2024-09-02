import React, { useState, useMemo } from "react";
import { Button, Box, Spacer } from "@chakra-ui/react";
import ProductCard from "./ProductCard";
import { getPriceRange, getSizes, getDisplayPriceRange } from "./productUtils";
import { useProductFilters } from "./productUtils";
import SortSelector from "./SortSelector";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Container, StyledSimpleGrid } from "./StyledComponents";
import { useTranslation } from "react-i18next";
import useTranslatedProducts from "./product";

// Utility function to shuffle the products array
function shuffleArray(array: any[]) {
  return array.slice().sort(() => Math.random() - 0.5);
}

const ProductGrid: React.FC = () => {
  const { t } = useTranslation();
  const [visibleCount, setVisibleCount] = useState(20);
  const [selectedTheme, setSelectedTheme] = useState<string>("");
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedThreeP, setSelectedThreeP] = useState<string>("");

  const translatedProducts = useTranslatedProducts();
  const navigate = useNavigate(); // Use useNavigate hook

  const shuffledProducts = useMemo(
    () => shuffleArray(translatedProducts),
    [translatedProducts]
  );

  // Extract unique values from translatedProducts
  const themes = Array.from(new Set(translatedProducts.map((p) => p.theme)));
  const colors = Array.from(
    new Set(translatedProducts.flatMap((p) => p.color))
  );
  const threePOptions = [
    { value: "No", label: t("onePiece") },
    { value: "Yes", label: t("threePieces") },
  ];

  const filteredProducts = useMemo(() => {
    return shuffledProducts.filter((product) => {
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
  }, [shuffledProducts, selectedTheme, selectedColors, selectedThreeP]);

  const showMoreItems = () => {
    setVisibleCount((prevCount) => prevCount + 20);
  };

  const handleCardClick = (productId: string) => {
    navigate(`/product/${productId}`); // Use navigate for routing
  };

  const handleResetFilters = () => {
    setSelectedTheme("");
    setSelectedColors([]);
    setSelectedThreeP("");
  };

  return (
    <Container>
      <Box mt={7} mb={5}>
        <SortSelector
          themes={themes}
          colors={colors}
          threePOptions={threePOptions}
          onThemeSelect={setSelectedTheme}
          onColorSelect={setSelectedColors}
          onThreePSelect={setSelectedThreeP}
          onResetFilters={handleResetFilters}
        />
      </Box>
      <Spacer />
      <StyledSimpleGrid columns={{ base: 2, sm: 2, md: 3, lg: 4 }} spacing={5}>
        {filteredProducts.slice(0, visibleCount).map((product) => {
          const priceRange = getPriceRange(product.variants);
          const displayPriceRange = getDisplayPriceRange(product.variants);
          const sizes = getSizes(product.variants);

          return (
            <ProductCard
              key={product.id}
              name={product.name}
              image={product.images[0] ?? ""}
              priceRange={priceRange}
              displayPriceRange={displayPriceRange}
              sizes={sizes}
              sizeCount={sizes.length}
              onClick={() => handleCardClick(product.id)}
            />
          );
        })}
      </StyledSimpleGrid>
      {visibleCount < filteredProducts.length && (
        <Box textAlign="center" mt={5}>
          <Button onClick={showMoreItems}>{t("showMore")}</Button>
        </Box>
      )}
    </Container>
  );
};

export default ProductGrid;
