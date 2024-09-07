import React, { useState, useMemo, useEffect } from "react";
import { Button, Box, Spacer } from "@chakra-ui/react";
import ProductCard from "./ProductCard";
import { getPriceRange, getSizes, getDisplayPriceRange } from "./productUtils";
import SortSelector from "./SortSelector";
import { useNavigate } from "react-router-dom";
import { Container, StyledSimpleGrid } from "./StyledComponents";
import { useTranslation } from "react-i18next";
import useTranslatedProducts from "./product";

const ProductGrid: React.FC = () => {
  const { t, i18n } = useTranslation();

  const [visibleCount, setVisibleCount] = useState(() => {
    try {
      const savedCount = sessionStorage.getItem("visibleCount");
      return savedCount ? parseInt(savedCount, 10) : 20;
    } catch (e) {
      console.error("Error retrieving visibleCount from sessionStorage", e);
      return 20;
    }
  });

  const [selectedTheme, setSelectedTheme] = useState<string>(() => {
    try {
      return sessionStorage.getItem("selectedTheme") || "";
    } catch (e) {
      console.error("Error retrieving selectedTheme from sessionStorage", e);
      return "";
    }
  });

  const [selectedColors, setSelectedColors] = useState<string[]>(() => {
    try {
      const savedColors = sessionStorage.getItem("selectedColors");
      return savedColors ? JSON.parse(savedColors) : [];
    } catch (e) {
      console.error("Error retrieving selectedColors from sessionStorage", e);
      return [];
    }
  });

  const [selectedThreeP, setSelectedThreeP] = useState<string>(() => {
    try {
      return sessionStorage.getItem("selectedThreeP") || "";
    } catch (e) {
      console.error("Error retrieving selectedThreeP from sessionStorage", e);
      return "";
    }
  });

  const translatedProducts = useTranslatedProducts();
  const navigate = useNavigate();

  // Use products directly without shuffling
  const products = useMemo(() => translatedProducts, [translatedProducts]);

  // Extract unique translated values from translatedProducts
  const themes = Array.from(new Set(products.map((p) => p.theme)));
  const colors = Array.from(new Set(products.flatMap((p) => p.color)));
  const threePOptions = [
    { value: "No", label: t("onePiece") },
    { value: "Yes", label: t("threePieces") },
  ];

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
  }, [products, selectedTheme, selectedColors, selectedThreeP]);

  const showMoreItems = () => {
    setVisibleCount((prevCount) => {
      const newCount = prevCount + 20;
      try {
        sessionStorage.setItem("visibleCount", newCount.toString());
      } catch (e) {
        console.error("Error setting visibleCount in sessionStorage", e);
      }
      return newCount;
    });
  };

  const handleCardClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  const handleResetFilters = () => {
    setSelectedTheme("");
    setSelectedColors([]);
    setSelectedThreeP("");
  };

  // Save state to sessionStorage when filters change
  useEffect(() => {
    try {
      sessionStorage.setItem("selectedTheme", selectedTheme);
      sessionStorage.setItem("selectedColors", JSON.stringify(selectedColors));
      sessionStorage.setItem("selectedThreeP", selectedThreeP);
    } catch (e) {
      console.error("Error setting filter values in sessionStorage", e);
    }
  }, [selectedTheme, selectedColors, selectedThreeP]);

  // Update products when the language changes
  useEffect(() => {
    const handleLanguageChange = () => {
      // Reload products or perform any actions needed on language change
      // Here we simply reset the visible count
      setVisibleCount(20);
    };

    i18n.on("languageChanged", handleLanguageChange);
    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [i18n]);

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
