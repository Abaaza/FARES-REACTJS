import React, { useState, useMemo, useEffect } from "react";
import { Button, Box, Spacer } from "@chakra-ui/react";
import ProductCard from "./ProductCard";
import { getPriceRange, getSizes } from "./productUtils";
import { useProductFilters } from "./productUtils";
import SortSelector from "./SortSelector";
import products from "./product";
import { useNavigate } from "react-router-dom";
import { Container, StyledSimpleGrid } from "./StyledComponents";
import { useTranslation } from "react-i18next"; // Import useTranslation

// Utility function to shuffle the products array
function shuffleArray(array: any[]) {
  return array.sort(() => Math.random() - 0.5);
}

const ProductGrid: React.FC = () => {
  const { t } = useTranslation(); // Use the translation hook
  const [visibleCount, setVisibleCount] = useState(20);
  const [selectedTheme, setSelectedTheme] = useState<string>("");
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedThreeP, setSelectedThreeP] = useState<string>("");
  const [shuffledProducts, setShuffledProducts] = useState<any[]>([]);

  const { colors, threePOptions } = useProductFilters();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the shuffled product array is already stored in sessionStorage
    const storedProducts = sessionStorage.getItem("shuffledProducts");

    if (storedProducts) {
      setShuffledProducts(JSON.parse(storedProducts));
    } else {
      // Shuffle the products array and store it in sessionStorage
      const shuffled = shuffleArray([...products]);
      sessionStorage.setItem("shuffledProducts", JSON.stringify(shuffled));
      setShuffledProducts(shuffled);
    }
  }, []);

  // Memoize filtered products based on user filters
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
    navigate(`/product/${productId}`);
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
          themes={Array.from(new Set(products.map((p) => p.theme)))}
          colors={Array.from(new Set(products.flatMap((p) => p.color)))}
          threePOptions={[
            { value: "No", label: t("onePiece") }, // Use translation
            { value: "Yes", label: t("threePieces") }, // Use translation
          ]}
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
          <Button onClick={showMoreItems}>{t("showMore")}</Button>{" "}
          {/* Use translation */}
        </Box>
      )}
    </Container>
  );
};

export default ProductGrid;
