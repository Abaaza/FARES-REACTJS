import React from "react";
import { Card, CardBody, Heading, Image } from "@chakra-ui/react";

interface ProductCardProps {
  name: string;
  image: string;
  size: number | string;
  price: number | string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  image,
  size,
  price,
}) => {
  return (
    <Card>
      <Image src={image} alt={name} />
      <CardBody>
        <Heading fontSize={20}>{name}</Heading>
        <Heading fontSize={16}>Size: {size} cm</Heading>
        <Heading fontSize={14}>{price} EGP</Heading>
      </CardBody>
    </Card>
  );
};

export default ProductCard;
