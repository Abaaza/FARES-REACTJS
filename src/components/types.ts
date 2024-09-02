// src/types.ts
export interface Variant {
  
  id: string;
  size: string;
  price: number;
  displayPrice?: string; // Add this property to match your usage
}

export interface Product {
  id: string;
  name: string;
  description: string;
  images: string[]; // Allow multiple images
  variants: Variant[];
  color: string[];
  theme: string;
  threePiece: string;
}
