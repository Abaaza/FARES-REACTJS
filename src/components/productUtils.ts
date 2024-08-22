import { Variant } from "./types";

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