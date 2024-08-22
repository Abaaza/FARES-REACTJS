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

const ProductSlider: React.FC = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSlideClick = (productId: string) => {
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
        {products.map((product: Product) => (
          <Slide
            index={products.indexOf(product)}
            key={product.id}
            onClick={() => handleSlideClick(product.id)} // Add onClick handler
            style={{ cursor: "pointer" }} // Change cursor to pointer to indicate clickability
          >
            <div style={{ padding: "10px" }}>
              <img
                src={product.image}
                alt={product.name}
                style={{ width: "100%", borderRadius: "8px" }}
              />
              <div>
                <h2>{product.name}</h2>
                <div>
                  {product.variants.map((variant: Variant) => (
                    <div key={variant.id}>
                      <p>
                        {variant.size}: {variant.price} EGP
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Slide>
        ))}
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
