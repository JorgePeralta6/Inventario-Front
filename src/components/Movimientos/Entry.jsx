import { useState, useEffect } from "react";
import { useEntry, useProduct } from "../../shared/hooks";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useColorModeValue,
  Stack,
  Heading,
  Flex,
  Select,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { Search } from "lucide-react";

export const Entry = ({ switchEntryHandler }) => {
  const { registrarMovimientoEntrada, isLoading } = useEntry();
  const { products, getProducts } = useProduct();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [formState, setFormState] = useState({
    productId: { value: "", isValid: true, showError: false },
    quantity: { value: "", isValid: true, showError: false },
    reason: { value: "", isValid: true, showError: false },
  });

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    if (products) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [products, searchTerm]);

  const handleInputValueChange = (value, field) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: { ...prevState[field], value },
    }));
  };

  const handleEntrySubmit = (e) => {
    e.preventDefault();
    registrarMovimientoEntrada(
      formState.productId.value,
      Number(formState.quantity.value),
      formState.reason.value
    );
  };

  const formBackground = useColorModeValue("white", "gray.700");
  const labelColor = useColorModeValue("gray.700", "gray.200");
  const buttonColor = useColorModeValue("red.500", "red.800");

  return (
    <Flex position="relative" minH="100vh" align="center" justify="center" p={8}>
      <Stack direction={{ base: "column", md: "row" }} spacing={8} align="center">
        <Box flex="1" bg={formBackground} p={8} borderRadius="md" boxShadow="dark-lg" maxW="md" w="full">
          <Stack spacing={4}>
            <Heading fontSize="3xl" textAlign="center">Registrar Entrada</Heading>
            <Box as="form" onSubmit={handleEntrySubmit}>
              <VStack spacing={4}>
                <FormControl>
                  <FormLabel color={labelColor}>Buscar Producto</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <Search size={18} />
                    </InputLeftElement>
                    <Input
                      placeholder="Escribe para buscar..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </InputGroup>
                </FormControl>

                <FormControl>
                  <FormLabel color={labelColor}>Producto</FormLabel>
                  <Select
                    placeholder="Selecciona un producto"
                    value={formState.productId.value}
                    onChange={(e) => handleInputValueChange(e.target.value, 'productId')}
                  >
                    {filteredProducts?.map((producto) => (
                      <option key={producto._id} value={producto._id}>
                        {producto.name}
                      </option>
                    ))}
                  </Select>
                  {searchTerm && filteredProducts.length === 0 && (
                    <Text mt={2} fontSize="sm" color="gray.500">
                      No se encontraron productos
                    </Text>
                  )}
                </FormControl>

                <FormControl>
                  <FormLabel color={labelColor}>Cantidad</FormLabel>
                  <Input
                    type="number"
                    value={formState.quantity.value}
                    onChange={(e) => handleInputValueChange(e.target.value, 'quantity')}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel color={labelColor}>Motivo</FormLabel>
                  <Input
                    type="text"
                    value={formState.reason.value}
                    onChange={(e) => handleInputValueChange(e.target.value, "reason")}
                  />
                </FormControl>

                <Button
                  bg={buttonColor}
                  color="white"
                  _hover={{ bg: "red.700" }}
                  width="full"
                  type="submit"
                  isLoading={isLoading}
                >
                  Registrar Entrada
                </Button>
                <Button variant="outline" onClick={switchEntryHandler}>
                  Volver a Movimientos
                </Button>
              </VStack>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};