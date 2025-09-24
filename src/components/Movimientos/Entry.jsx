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
} from "@chakra-ui/react";

export const Entry = ({ switchEntryHandler }) => {
  const { registrarMovimientoEntrada, isLoading } = useEntry();
  const { products, getProducts } = useProduct();

  const [formState, setFormState] = useState({
    productId: { value: "", isValid: true, showError: false },
    quantity: { value: "", isValid: true, showError: false },
  });

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
      Number(formState.quantity.value)
    );
  };

  useEffect(() => {
    getProducts();
  }, []);
  

  const formBackground = useColorModeValue("white", "gray.700");
  const labelColor = useColorModeValue("gray.700", "gray.200");
  const buttonColor = useColorModeValue("red.500", "red.800");

  return (
    <Flex position="relative" minH="100vh" align="center" justify="center" p={8}>
      <Stack direction={{ base: "column", md: "row" }} spacing={8} align="center">
        <Box flex="1" bg={formBackground} p={8} borderRadius="md" boxShadow="dark-lg" maxW="md" w="full">
          <Stack spacing={4}>
            <Heading fontSize="3xl" textAlign="center">Registrar Entrada</Heading>
            <form onSubmit={handleEntrySubmit}>
              <VStack spacing={4}>

                <FormControl>
                  <FormLabel color={labelColor}>Producto</FormLabel>
                  <Select
                    placeholder="Selecciona un producto"
                    value={formState.productId.value}
                    onChange={(e) => handleInputValueChange(e.target.value, 'productId')}
                  >
                    {products?.map((producto) => (
                      <option key={producto._id} value={producto._id}>
                        {producto.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel color={labelColor}>Cantidad</FormLabel>
                  <Input
                    type="number"
                    value={formState.quantity.value}
                    onChange={(e) => handleInputValueChange(e.target.value, 'quantity')}
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
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};
