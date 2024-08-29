import React from "react";
import { useTranslation } from "react-i18next";

interface ProductCardProps {
  name: string;
  image: string;
  priceRange: { min: number; max: number };
  sizes: string[];
  onClick: () => void;
  sizeCount: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  image,
  priceRange,
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
        <p>
          {t("priceLabel")}: {priceRange.min} - {priceRange.max} {t("currency")}
        </p>
        <p>
          {sizeCount} {t("sizesAvailable")}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
