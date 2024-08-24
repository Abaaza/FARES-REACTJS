import React, { useState, useEffect } from "react";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css"; // Import carousel styles
import products from "./product"; // Update the path according to your project structure
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Import new arrow icons
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import styles from "./ProductSlider.module.css"; // Import the CSS module

// Define types for Product and Variant
interface Variant {
  id: string;
  size: string;
  price: number;
}

interface Product {
  id: string;
  name: string;
  description: string;
  images: string[]; // Changed from image to images
  variants: Variant[];
  color: string[];
  theme: string;
  threePiece: string; // Updated to string
}

interface PriceRange {
  min: number;
  max: number;
}

const getPriceRange = (variants: Variant[]): PriceRange => {
  if (variants.length === 0) {
    return { min: 0, max: 0 };
  }

  const prices = variants.map((variant) => variant.price);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
};

const getSizeCount = (variants: Variant[]): number => {
  const sizes = variants.map((variant) => variant.size);
  return new Set(sizes).size; // Return the count of unique sizes
};

const ProductSlider: React.FC = () => {
  const [visibleSlides, setVisibleSlides] = useState<number>(4);
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    // Handle responsive slide count
    const updateVisibleSlides = () => {
      if (window.innerWidth < 768) {
        // Adjust breakpoint as needed
        setVisibleSlides(2);
      } else {
        setVisibleSlides(4);
      }
    };

    updateVisibleSlides();
    window.addEventListener("resize", updateVisibleSlides);

    return () => {
      window.removeEventListener("resize", updateVisibleSlides);
    };
  }, []);

  const handleSlideClick = (productId: string) => {
    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Navigate to the product details page
    navigate(`/product/${productId}`);
  };

  return (
    <div className={styles.sliderWrapper}>
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={125}
        totalSlides={products.length}
        visibleSlides={visibleSlides}
        infinite
        isIntrinsicHeight
      >
        <Slider>
          {products.map((product: Product) => {
            const priceRange = getPriceRange(product.variants);
            const sizeCount = getSizeCount(product.variants);

            return (
              <Slide
                index={products.indexOf(product)}
                key={product.id}
                className={styles.slide} // Apply CSS module class
              >
                <div
                  onClick={() => handleSlideClick(product.id)} // Add onClick handler to the wrapper div
                  className={styles.details} // Apply CSS module class
                >
                  <img
                    src={product.images[0]} // Use the first image from the images array
                    alt={product.name}
                    className={styles.image} // Apply CSS module class
                  />
                  <div>
                    <h2>{product.name}</h2>
                    <div>
                      <p>
                        Price: {priceRange.min} - {priceRange.max} EGP
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

        <ButtonBack className={styles.buttonBack}>
          <FaChevronLeft size={24} />
        </ButtonBack>
        <ButtonNext className={styles.buttonNext}>
          <FaChevronRight size={24} />
        </ButtonNext>
      </CarouselProvider>
    </div>
  );
};

export default ProductSlider;
