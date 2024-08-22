// ProductCard.tsx

import React from "react";
import { getUniqueSizeCount } from "./productUtils";

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
  return (
    <div onClick={onClick}>
      <img
        src={image}
        alt={name}
        style={{ width: "100%", borderRadius: "8px" }}
      />
      <div>
        <h3>{name}</h3>
        <p>
          Price: {priceRange.min} - {priceRange.max} EGP
        </p>
        <p>{sizeCount} sizes available</p>
      </div>
    </div>
  );
};

export default ProductCard;
