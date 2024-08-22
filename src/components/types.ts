export interface Variant {
    id: string;
    size: string;
    price: number;
  }
  
  export interface Product {
    id: string;
    name: string;
    description: string;
    image: string;
    variants: Variant[];
    color: string[];
    theme: string;
    "3p": boolean;
  }