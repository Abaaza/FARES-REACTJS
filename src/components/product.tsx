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
  color: string[]; // Changed to string[] to match the array of colors
  theme: string;
  "3p": boolean; // Property names with special characters should be quoted
}

const products: Product[] = [
  {
    id: "574",
    name: "Wall Frame 574",
    description: "This is a parent product.",
    color: ["blue", "white"],
    theme: "abstract",
    "3p": false,
    image:
      "https://www.wall-masters.com/wp-content/uploads/2021/10/574-scaled.jpg",
    variants: [
      { id: "574-1", size: "60x40", price: 350 },
      { id: "574-2", size: "90x60", price: 600 },
      { id: "574-3", size: "100x70", price: 750 },
      { id: "574-4", size: "120x80", price: 950 },
      { id: "574-5", size: "150x100", price: 1150 },
    ],
  },
  {
    id: "576",
    name: "Wall Frame 576",
    description: "This is a parent product.",
    color: ["blue", "white"],
    theme: "abstract",
    "3p": false,
    image:
      "https://www.wall-masters.com/wp-content/uploads/2021/10/576-scaled.jpg",
    variants: [
      { id: "576-1", size: "60x40", price: 350 },
      { id: "576-2", size: "90x60", price: 600 },
      { id: "576-3", size: "100x70", price: 750 },
      { id: "576-4", size: "120x80", price: 950 },
      { id: "576-5", size: "150x100", price: 1150 },
    ],
  },
  {
    id: "493",
    name: "Wall Frame 493",
    description: "This is a parent product.",
    color: ["blue", "white"],
    theme: "floral",
    "3p": false,
    image:
      "https://www.wall-masters.com/wp-content/uploads/2021/10/493-scaled.jpg",
    variants: [
      { id: "493-1", size: "60x40", price: 350 },
      { id: "493-2", size: "90x60", price: 600 },
      { id: "493-3", size: "100x70", price: 750 },
      { id: "493-4", size: "120x80", price: 950 },
      { id: "493-5", size: "150x100", price: 1150 },
    ],
  },
  {
    id: "518",
    name: "Wall Frame 518",
    description: "This is a parent product.",
    color: ["blue", "white"],
    theme: "abstract",
    "3p": false,
    image:
      "https://www.wall-masters.com/wp-content/uploads/2021/10/518-scaled.jpg",
    variants: [
      { id: "518-1", size: "60x40", price: 350 },
      { id: "518-2", size: "90x60", price: 600 },
      { id: "518-3", size: "100x70", price: 750 },
      { id: "518-4", size: "120x80", price: 950 },
      { id: "518-5", size: "150x100", price: 1150 },
    ],
  },
];

export default products;
