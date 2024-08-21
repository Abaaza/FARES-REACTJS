import React from "react";
import { Card, CardBody, Heading, Image } from "@chakra-ui/react";

interface ProductCardProps {
  name: string;
  image: string;

  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, image, onClick }) => {
  return (
    <Card onClick={onClick} cursor="pointer">
      <Image src={image} alt={name} />
      <CardBody>
        <Heading size="md" fontSize={20}>
          {name}
        </Heading>
      </CardBody>
    </Card>
  );
};

export default ProductCard;
