import React from "react";
import { useTranslation } from "react-i18next";

interface ProductCardProps {
  name: string;
  image: string;
  priceRange: { min: number; max: number }; // Keep for any calculations or logic requiring numeric prices
  displayPriceRange: { min: string; max: string }; // Add this property for Arabic numeral support
  sizes: string[];
  onClick: () => void;
  sizeCount: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  image,
  priceRange,
  displayPriceRange, // Include displayPriceRange in the props
  sizes,
  onClick,
  sizeCount,
}) => {
  const { t } = useTranslation(); // Get the translation function

  return (
    <div
      onClick={onClick}
      style={{
        cursor: "pointer", // Apply the cursor pointer style
      }}
    >
      <img
        src={image}
        alt={name}
        style={{ width: "100%", borderRadius: "8px" }}
      />
      <div>
        <h3>{name}</h3>
        {/* Use displayPriceRange for displaying the price */}
        <p>
          {t("priceLabel")}: {displayPriceRange.min} - {displayPriceRange.max}{" "}
          {t("currency")}
        </p>
        <p>
          {sizeCount} {t("sizesAvailable")}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
