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
const location = useLocation();

  useEffect(() => {
    // Extract query parameters from the URL
    const params = new URLSearchParams(location.search);
    setSelectedTheme(params.get("theme") || "");
    setSelectedColors(params.getAll("color"));
    setSelectedThreeP(params.get("threeP") || "");
    const page = Number(params.get("page")) || 1;
    setCurrentPage(page);

    // Shuffle products or retrieve from session storage
    const storedProducts = sessionStorage.getItem("shuffledProducts");

    if (storedProducts) {
      setShuffledProducts(JSON.parse(storedProducts));
    } else {
      const shuffled = shuffleArray([...products]);
      sessionStorage.setItem("shuffledProducts", JSON.stringify(shuffled));
      setShuffledProducts(shuffled);
    }
  }, [location.search]);

  useEffect(() => {
    // Update the URL with the selected filters and pagination
    const queryParams = new URLSearchParams();
    if (selectedTheme) queryParams.set("theme", selectedTheme);
    if (selectedColors.length > 0)
      selectedColors.forEach((color) => queryParams.append("color", color));
    if (selectedThreeP) queryParams.set("threeP", selectedThreeP);
    queryParams.set("page", currentPage.toString());

    navigate(`?${queryParams.toString()}`, { replace: true });
  }, [selectedTheme, selectedColors, selectedThreeP, currentPage, navigate]);

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

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedProducts = useMemo(() => {
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, startIndex, endIndex]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
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
          threePOptions={threePOptions}
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
