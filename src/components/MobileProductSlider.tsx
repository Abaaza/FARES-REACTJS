import React, { useCallback } from "react";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import products from "./product";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import styles from "./MobileProductSlider.module.css";
import { useNavigate } from "react-router-dom";
import { Product, Variant } from "./types"; // Import Product and Variant types
import { Box } from "@chakra-ui/react";

const MobileProductSlider: React.FC = React.memo(() => {
  const navigate = useNavigate(); // Initialize navigate

  // Use useCallback to memoize getRandomProducts function
  const getRandomProducts = useCallback(
    (products: Product[], count: number): Product[] => {
      const shuffled = products.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    },
    []
  );

  const limitedProducts = getRandomProducts(products, 15);

  // Use useCallback to memoize handleSlideClick function
  const handleSlideClick = useCallback(
    (productId: string) => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      navigate(`/product/${productId}`); // Use navigate function to redirect
    },
    [navigate]
  );

  // Memoize getPriceRange function
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

  // Memoize getSizeCount function
  const getSizeCount = useCallback((variants: Variant[]): number => {
    const sizes = variants.map((variant) => variant.size);
    return new Set(sizes).size;
  }, []);

  return (
    <>
      <div className={styles.sliderWrapper}>
        <CarouselProvider
          naturalSlideWidth={340} // Set to 360px
          naturalSlideHeight={450} // Adjust to maintain aspect ratio
          totalSlides={limitedProducts.length}
          visibleSlides={2} // Show 2 slides on mobile
          infinite
          isIntrinsicHeight
        >
          <Slider>
            {limitedProducts.map((product: Product) => {
              const { min, max } = getPriceRange(product.variants);
              const sizeCount = getSizeCount(product.variants);

              return (
                <Slide
                  index={limitedProducts.indexOf(product)}
                  key={product.id}
                  className={styles.slide}
                >
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
                          Price: {min} - {max} EGP
                        </p>
                        <p>
                          {sizeCount} {sizeCount === 1 ? "size" : "sizes"}{" "}
                          available
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
    </>
  );
});

export default MobileProductSlider;
