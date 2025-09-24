import React, { useEffect } from "react";
import {
  Box,
  Text,
  Image,
  Heading,
  VStack,
  Spinner,
  Center,
  Flex,
  useColorModeValue
} from "@chakra-ui/react";
import { useTopProduct } from "../../shared/hooks/useTopProduct";

const TopProductCard = () => {
  const { topProduct, isFetchingTop, fetchTopProduct } = useTopProduct();
  const bgText = useColorModeValue('black', 'black')

  useEffect(() => {
    fetchTopProduct();
  }, []);

  const formatDecimal = (value) =>
    typeof value === "object" && value?.$numberDecimal
      ? parseFloat(value.$numberDecimal).toFixed(2)
      : value;

  if (isFetchingTop) {
    return (
      <Center h="100%">
        <Spinner size="lg" color="blue.500" />
        <Text ml={4}>Cargando producto más vendido...</Text>
      </Center>
    );
  }

  if (!topProduct) {
    return (
      <Center h="100%">
        <Text>No se encontró el producto más vendido.</Text>
      </Center>
    );
  }

  return (
    <Flex
      w="100%"
      maxW="340px"
      mx="auto"
      height="100%"
      minH="100%"
      p={6}
      borderRadius="lg"
      boxShadow="md"
      bg="white"
      textAlign="center"
      direction="column"
      justify="center"
      align="center"
      textColor={bgText}
    >
      <Heading size="md" mb={4}>
        Top Product
      </Heading>

      <VStack spacing={4} align="center">
        <Image
          src={topProduct.image}
          alt={topProduct.name}
          borderRadius="full"
          boxSize="120px"
          objectFit="cover"
          border="2px solid #e2e8f0"
        />

        <Heading size="sm" color="gray.700">
          {topProduct.name}
        </Heading>

        <Text fontSize="md">
          <strong>Categoría:</strong> {topProduct.category}
        </Text>

        <Text fontSize="md">
          <strong>Ventas:</strong> {formatDecimal(topProduct.sales)}
        </Text>
      </VStack>
    </Flex>
  );
};

export default TopProductCard;
