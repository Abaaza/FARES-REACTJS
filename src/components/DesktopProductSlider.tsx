import React, { useState, useEffect, useCallback } from "react";
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
import { useNavigate } from "react-router-dom";
import styles from "./DesktopProductSlider.module.css";
import { useTranslation } from "react-i18next";

interface Variant {
  id: string;
  size: string;
  price: number;
}

interface Product {
  id: string;
  name: string;
  description: string;
  images: string[];
  variants: Variant[];
  color: string[];
  theme: string;
  threePiece: string;
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
  return new Set(sizes).size;
};

const getRandomProducts = (products: Product[], count: number): Product[] => {
  const shuffled = products.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const DesktopProductSlider: React.FC = React.memo(() => {
  const [limitedProducts, setLimitedProducts] = useState<Product[]>([]);
  const [visibleSlides, setVisibleSlides] = useState<number>(4);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const updateVisibleSlides = useCallback(() => {
    const isMobile = window.innerWidth < 768;
    setVisibleSlides(isMobile ? 2 : 4);
  }, []);

  useEffect(() => {
    let sessionProducts = sessionStorage.getItem("limitedProducts");

    if (sessionProducts) {
      setLimitedProducts(JSON.parse(sessionProducts));
    } else {
      const randomProducts = getRandomProducts(products, 20);
      sessionStorage.setItem("limitedProducts", JSON.stringify(randomProducts));
      setLimitedProducts(randomProducts);
    }

    updateVisibleSlides();
    window.addEventListener("resize", updateVisibleSlides);

    return () => {
      window.removeEventListener("resize", updateVisibleSlides);
    };
  }, [updateVisibleSlides]);

  const handleSlideClick = useCallback(
    (productId: string) => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      navigate(`/product/${productId}`);
    },
    [navigate]
  );

  return (
    <div className={styles.sliderWrapper}>
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={125}
        totalSlides={limitedProducts.length}
        visibleSlides={visibleSlides}
        infinite
        isIntrinsicHeight
      >
        <Slider>
          {limitedProducts.map((product: Product, index: number) => {
            const priceRange = getPriceRange(product.variants);
            const sizeCount = getSizeCount(product.variants);

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
                          min: priceRange.min,
                          max: priceRange.max,
                        })}
                      </p>
                      {sizeCount} {t("sizesAvailable")}
                    </div>
                  </div>
                </div>
              </Slide>
            );
          })}
        </Slider>

        <ButtonBack className={styles.buttonBack}>
          <FaChevronLeft size={28} />
        </ButtonBack>
        <ButtonNext className={styles.buttonNext}>
          <FaChevronRight size={28} />
        </ButtonNext>
      </CarouselProvider>
    </div>
  );
});

export default DesktopProductSlider;
