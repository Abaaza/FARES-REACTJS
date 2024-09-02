import i18n from "../assets/i18n"; // Import i18n instance
import { useEffect, useState } from "react"; // Import hooks if you're using React
import { Product } from "./types"; // Ensure correct import path

const additionalImage =
  "https://www.wall-masters.com/images/materialguide.webp";

// Function to convert numbers to Arabic numerals
const convertToArabicNumbers = (input: string | number): string => {
  const arabicNumbersMap: { [key: string]: string } = {
    "0": "٠",
    "1": "١",
    "2": "٢",
    "3": "٣",
    "4": "٤",
    "5": "٥",
    "6": "٦",
    "7": "٧",
    "8": "٨",
    "9": "٩",
  };

  return input
    .toString()
    .split("")
    .map((char) => arabicNumbersMap[char] || char)
    .join("");
};

// Function to translate sizes and prices
const translateProduct = (product: Product): Product => {
  const translatedName = i18n.t(`products.${product.name}`);
  const translatedVariants = product.variants.map((variant) => {
    let translatedSize = variant.size
      .replace("pieces", i18n.t("pieces"))
      .replace("each", i18n.t("each"));

    let displayPrice = variant.price.toString();
    if (i18n.language === "ar") {
      // Convert numbers to Arabic numerals for sizes and prices
      translatedSize = convertToArabicNumbers(translatedSize);
      displayPrice = convertToArabicNumbers(displayPrice);
    }

    return { ...variant, size: translatedSize, displayPrice };
  });

  return { ...product, name: translatedName, variants: translatedVariants };
};

// Sample products array
const products: Product[] = [
  {
    id: "725",
    name: "Wall Frame 725",
    description: "",
    color: ["Black", "Gold", "White"],
    theme: "Abstract",
    threePiece: "Yes",
    images: ["https://www.wall-masters.com/images/725.webp"],
    variants: [
      { id: "725-1", size: "2 pieces 60x40 each", price: 700 },
      { id: "725-2", size: "2 pieces 80x50 each", price: 850 },
      { id: "725-3", size: "2 pieces 100x70 each", price: 1100 },
      { id: "725-4", size: "2 pieces 120x80 each", price: 1350 },
    ],
  },
  {
    id: "574",
    name: "Wall Frame 574",
    description: "",
    color: ["Blue", "White"],
    theme: "Abstract",
    threePiece: "No",
    images: ["https://www.wall-masters.com/images/574.webp"],
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
    description: "",
    color: ["Brown", "Beige"],
    theme: "Abstract",
    threePiece: "No",
    images: ["https://www.wall-masters.com/images/576.webp"],
    variants: [
      { id: "576-1", size: "60x40", price: 350 },
      { id: "576-2", size: "90x60", price: 600 },
      { id: "576-3", size: "100x70", price: 750 },
      { id: "576-4", size: "120x80", price: 950 },
      { id: "576-5", size: "150x100", price: 1150 },
    ],
  },

  // Add more products as needed
];

// Function to generate translated products array
const generateTranslatedProducts = () => {
  const translatedProducts = products.map(translateProduct);

  translatedProducts.forEach((product) => {
    if (!product.images.includes(additionalImage)) {
      product.images.push(additionalImage);
    }
  });

  return translatedProducts;
};

// Custom hook to provide translated products array
const useTranslatedProducts = () => {
  const [translatedProducts, setTranslatedProducts] = useState<Product[]>(
    generateTranslatedProducts()
  );

  useEffect(() => {
    const handleLanguageChange = () => {
      setTranslatedProducts(generateTranslatedProducts());
    };

    i18n.on("languageChanged", handleLanguageChange);

    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, []);

  return translatedProducts;
};

export default useTranslatedProducts;
