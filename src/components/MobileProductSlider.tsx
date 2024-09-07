import React, { useCallback, useEffect, useState } from "react";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import useTranslatedProducts from "./product"; // Updated import to use hook for translated products
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import styles from "./MobileProductSlider.module.css";
import { useNavigate } from "react-router-dom";
import { Product, Variant } from "./types";
import { Box } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

const convertToArabicNumerals = (input: number): string => {
  return input
    .toString()
    .replace(/\d/g, (digit) => "٠١٢٣٤٥٦٧٨٩"[parseInt(digit, 10)]);
};

const MobileProductSlider: React.FC = () => {
  const { t, i18n } = useTranslation(); // Hook to detect language changes
  const products = useTranslatedProducts(); // Fetch translated products internally
  const [limitedProducts, setLimitedProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  const getRandomProducts = useCallback(
    (products: Product[], count: number): Product[] => {
      const shuffled = products.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    },
    []
  );

  useEffect(() => {
    // We need to ensure that products are updated when the language changes
    const randomProducts = getRandomProducts(products, 15);
    setLimitedProducts(randomProducts);

    // Store products in session storage in case we need to refresh the view
    sessionStorage.setItem(
      "limitedProductsMobile",
      JSON.stringify(randomProducts)
    );
  }, [getRandomProducts, products, i18n.language]); // Added `i18n.language` as a dependency to refresh on language change

  const handleSlideClick = useCallback(
    (productId: string) => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      navigate(`/product/${productId}`);
    },
    [navigate]
  );

  const getPriceRange = useCallback(
    (variants: Variant[]): { min: number; max: number } => {
      if (variants.length === 0) {
        return { min: 0, max: 0 };
      }

      const prices = variants.map((variant) => variant.price);
      return {
        min: Math.min(...prices),
        max: Math.max(...prices),
      };
    },
    []
  );

  const getSizeCount = useCallback((variants: Variant[]): number => {
    const sizes = variants.map((variant) => variant.size);
    return new Set(sizes).size;
  }, []);

  const formatSizeCount = useCallback(
    (count: number): string => {
      return i18n.language === "ar"
        ? convertToArabicNumerals(count)
        : count.toString();
    },
    [i18n.language]
  );

  return (
    <div className={styles.sliderWrapper}>
      <CarouselProvider
        naturalSlideWidth={340}
        naturalSlideHeight={450}
        totalSlides={limitedProducts.length}
        visibleSlides={2}
        infinite
        isIntrinsicHeight
      >
        <Slider>
          {limitedProducts.map((product: Product, index) => {
            const { min, max } = getPriceRange(product.variants);
            const sizeCount = getSizeCount(product.variants);

            const displayMinPrice =
              i18n.language === "ar"
                ? convertToArabicNumerals(min)
                : min.toString();

            const displayMaxPrice =
              i18n.language === "ar"
                ? convertToArabicNumerals(max)
                : max.toString();

            return (
              <Slide index={index} key={product.id} className={styles.slide}>
                <div
                  onClick={() => handleSlideClick(product.id)}
                  className={styles.details}
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className={styles.image}
                  />
                  <div>
                    <h2>{product.name}</h2>
                    <div>
                      <p>
                        {t("priceRange", {
                          min: displayMinPrice,
                          max: displayMaxPrice,
                        })}
                      </p>
                      <p>
                        {formatSizeCount(sizeCount)} {t("sizesAvailable")}
                      </p>
                    </div>
                  </div>
                </div>
              </Slide>
            );
          })}
        </Slider>

        <Box position="relative">
          <ButtonBack>
            <Box
              position="absolute"
              top="-400%"
              left="10px"
              transform="translateY(-50%)"
              background="transparent"
              border="none"
              cursor="pointer"
              zIndex="10"
              padding="10px"
            >
              <FaChevronLeft size={28} />
            </Box>
          </ButtonBack>

          <ButtonNext>
            <Box
              position="absolute"
              top="-400%"
              right="10px"
              transform="translateY(-50%)"
              background="transparent"
              border="none"
              cursor="pointer"
              zIndex="10"
              padding="10px"
            >
              <FaChevronRight size={28} />
            </Box>
          </ButtonNext>
        </Box>
      </CarouselProvider>
    </div>
  );
};

export default React.memo(MobileProductSlider);
