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
  const { t, i18n } = useTranslation(); // Get the translation function and i18n object

  // Function to convert numbers to Arabic numerals if the current language is Arabic
  const formatNumber = (number: number): string => {
    if (i18n.language === "ar") {
      // Convert to Arabic numerals
      return number
        .toString()
        .replace(/\d/g, (digit) => "٠١٢٣٤٥٦٧٨٩"[parseInt(digit, 10)]);
    }
    // Return the number as is for other languages
    return number.toString();
  };

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
          {formatNumber(sizeCount)} {t("sizesAvailable")}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
