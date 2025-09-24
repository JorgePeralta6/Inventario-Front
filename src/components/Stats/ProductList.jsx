import React, { useEffect, useState } from "react";
import {
  Box,
  Stack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  Heading,
  Center,
  TableContainer,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useProduct } from "../../shared/hooks";

const ProductList = () => {
  const { products, isFetching, getProducts } = useProduct();
  const [canFetch, setCanFetch] = useState(true);
  const bgText = useColorModeValue('black', 'black');


  useEffect(() => {
    if (canFetch) {
      getProducts();
      setCanFetch(false);
      const timeoutId = setTimeout(() => setCanFetch(true), 5000);
      return () => clearTimeout(timeoutId);
    }
  }, [canFetch, getProducts]);



  if (isFetching) {
    return (
      <Center py={10}>
        <Spinner size="xl" />
      </Center>
    );
  }

  if (!products || products.length === 0) {
    return <Center py={10}><Text>No hay productos disponibles</Text></Center>;
  }

  const data = products.map((p, index) => ({
    id: index + 1,
    Producto: p.name,
    stock: p.stock,
    price:
      p.price && p.price.$numberDecimal
        ? parseFloat(p.price.$numberDecimal)
        : 0,
  }));

  return (
    <Box w="100%" display="flex" justifyContent="center" mt="10vh">
      <Stack spacing={4} align="center" w="95%">
        <Heading as="h2" size="lg" textAlign="center" >
          Lista de Productos
        </Heading>
        <TableContainer
          w="100%"
          maxW="container.xl"
          boxShadow="md"
          borderRadius="md"
          border="1px solid"
          borderColor="gray.200"
          overflowX="auto"
          bg="white"
        >
          <Table size="sm" variant="simple" layout="auto">
            <Thead bg="gray.100">
              <Tr>
                <Th fontSize="xs" px={2} textAlign="left">Producto</Th>
                <Th fontSize="xs" px={2} textAlign="center">Stock</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((item, idx) => (
                <Tr key={item.id} bg={idx % 2 === 0 ? "gray.50" : "white"}>
                  <Td px={2} fontSize="sm" textColor={bgText} >{item.Producto}</Td>
                  <Td px={2} textAlign="center" textColor={bgText} >{item.stock}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Stack>
    </Box>
  );
};

export default ProductList;












