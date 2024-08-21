interface Variant {
  id: string;
  size: string;
  price: number;
}

interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  variants: Variant[];
}

const products = [
  {
    id: "574",
    name: "Wall Frame 574",
    description: "This is a parent product.",
    image:
      "https://www.wall-masters.com/wp-content/uploads/2021/10/574-scaled.jpg",
    variants: [
      {
        id: "574-1",
        size: "Small",
        price: 100,
      },
      {
        id: "574-2",
        size: "Medium",
        price: 150,
      },
      {
        id: "574-3",
        size: "Large",
        price: 200,
      },
    ],
  },
  {
    id: "576",
    name: "Wall Frame 576",
    description: "This is a parent product.",
    image:
      "https://www.wall-masters.com/wp-content/uploads/2021/10/576-scaled.jpg",
    variants: [
      {
        id: "576-1",
        size: "Small",
        price: 100,
      },
      {
        id: "576-2",
        size: "Medium",
        price: 150,
      },
      {
        id: "576-3",
        size: "Large",
        price: 200,
      },
    ],
  },
];

export default products;
