import React from "react";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css"; // Import the carousel styles
import products from "./product"; // Update this path according to your project structure
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Import arrow icons from react-icons
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
  image: string;
  variants: Variant[];
  color: string[];
  theme: string;
  "3p": boolean;
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
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSlideClick = (productId: string) => {
    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Navigate to the product details page
    navigate(`/product/${productId}`);
  };

  return (
    <CarouselProvider
      naturalSlideWidth={100}
      naturalSlideHeight={125}
      totalSlides={products.length}
      visibleSlides={2}
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
                  src={product.image}
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
                      {sizeCount} {sizeCount === 1 ? "size" : "sizes"} available
                    </p>
                  </div>
                </div>
              </div>
            </Slide>
          );
        })}
      </Slider>

      <ButtonBack
        style={{
          position: "absolute",
          left: "10px",
          top: "50%",
          transform: "translateY(-50%)",
          background: "transparent",
          border: "none",
        }}
      >
        <FaArrowLeft size={24} />
      </ButtonBack>
      <ButtonNext
        style={{
          position: "absolute",
          right: "10px",
          top: "50%",
          transform: "translateY(-50%)",
          background: "transparent",
          border: "none",
        }}
      >
        <FaArrowRight size={24} />
      </ButtonNext>
    </CarouselProvider>
  );
};

export default ProductSlider;
