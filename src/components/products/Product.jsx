import { SimpleGrid } from "@chakra-ui/react";
import { ProductCard } from "./ProductCard";

export const Products = ({ products, handleEditProduct, handleDeleteProduct }) => {
  return (
    <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={8}>
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          handleEditProduct={handleEditProduct}
          handleDeleteProduct={handleDeleteProduct}
        />
      ))}
    </SimpleGrid>
  );
};