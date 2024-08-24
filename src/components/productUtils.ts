// src/productUtils.ts
import { Variant, Product } from "./types"; // Import the Product type from the correct file
import products from "./product";
import { useMemo } from "react";

export function getPriceRange(variants: Variant[]): { min: number; max: number } {
  if (variants.length === 0) {
    return { min: 0, max: 0 };
  }

  const prices = variants.map(variant => variant.price);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
}

export function getSizes(variants: Variant[]): string[] {
  const sizes = variants.map(variant => variant.size);
  return Array.from(new Set(sizes));
}

export function getUniqueSizeCount(variants: Variant[]): number {
  const sizes = variants.map(variant => variant.size);
  const uniqueSizes = Array.from(new Set(sizes));
  return uniqueSizes.length;
}

// Function to get unique themes from products
export const getUniqueThemes = (products: Product[]): string[] => {
  const themes = products.map(product => product.theme);
  return Array.from(new Set(themes)); // Remove duplicates
};

export const useProductFilters = () => {
  const colors = useMemo(() => {
    const allColors = products.flatMap((product) => product.color);
    return Array.from(new Set(allColors));
  }, []);

  const threePOptions = useMemo(() => [
    { value: "On", label: "3 pieces" },
    { value: "Off", label: "1 Piece" },
  ], []);

  return { colors, threePOptions };
};
