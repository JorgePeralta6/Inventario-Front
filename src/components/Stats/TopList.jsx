import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Spinner,
    Box,
    Image,
    Text,
    Heading,
    Center,
    useColorModeValue
  } from "@chakra-ui/react";
  import { useEffect } from "react";
  import { useTop3 } from "../../shared/hooks/useTop3"; // Asegúrate de que la ruta esté correcta
  
  const Top3Table = () => {
    const { top3Products, isFetchingTop3, fetchTop3Products } = useTop3();
    const bgText = useColorModeValue('black', 'black')
  
    useEffect(() => {
      fetchTop3Products();
    }, []);
  
    if (isFetchingTop3) {
      return (
        <Center py={10}>
          <Spinner size="xl" color="blue.500" />
        </Center>
      );
    }
  
    return (
      <Box mt={8} p={4} bg="white" rounded="md" shadow="md">
        <Heading size="md" mb={4} textAlign="center" color="blue.600">
          Top 3 Productos Más Vendidos
        </Heading>
  
        <TableContainer>
          <Table variant="striped" colorScheme="blue" size="md" textColor={bgText} >
            <Thead>
              <Tr>
                <Th>#</Th>
                <Th>Imagen</Th>
                <Th>Nombre</Th>
                <Th>Categoría</Th>
                <Th>Ventas</Th>
                <Th>Fecha de Entrada</Th>
              </Tr>
            </Thead>
            <Tbody fontWeight='bold'>
              {top3Products.map((product, index) => (
                <Tr key={index}>
                  <Td>{index + 1}</Td>
                  <Td>
                    <Image
                      src={
                        product.image !== "Imagen no disponible"
                          ? product.image
                          : "https://via.placeholder.com/60?text=Sin+Imagen"
                      }
                      boxSize="60px"
                      objectFit="cover"
                      borderRadius="md"
                    />
                  </Td>
                  <Td>{product.name}</Td>
                  <Td>{product.category}</Td>
                  <Td>{product.sales}</Td>
                  <Td>{Number(product.price?.$numberDecimal || 0).toFixed(2)}</Td>
                  <Td>
                    {new Date(product.entryDate).toLocaleDateString("es-GT", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    );
  };
  
  export default Top3Table;
  