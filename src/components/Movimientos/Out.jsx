import { useState, useEffect } from "react";
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
import { useSalida } from "../../shared/hooks";
import { useProduct } from "../../shared/hooks/useProducts";

export const Out = ({ switchOutHandler }) => {
  const { registrarMovimientoSalida, isLoading } = useSalida();
  const { getProducts, products } = useProduct();
  const [productList, setProductList] = useState([]);

  const [formState, setFormState] = useState({
    productId: { value: "", isValid: true, showError: false },
    quantity: { value: "", isValid: true, showError: false },
    reason: { value: "", isValid: true, showError: false },
    destiny: { value: "", isValid: true, showError: false },
  });

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    if (products) {
      setProductList(products);
    }
  }, [products]);

  const handleInputValueChange = (value, field) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: { ...prevState[field], value },
    }));
  };

  const handleOutSubmit = (e) => {
    e.preventDefault();
    registrarMovimientoSalida(
      formState.productId.value,
      formState.quantity.value,
      formState.reason.value,
      formState.destiny.value
    );
  };

  const formBackground = useColorModeValue("white", "gray.700");
  const labelColor = useColorModeValue("gray.700", "gray.200");
  const buttonColor = useColorModeValue("red.500", "red.800");

  return (
    <Flex minH="100vh" align="center" justify="center" p={8}>
      <Stack spacing={8} align="center" zIndex={1}>
        <Box
          bg={formBackground}
          p={8}
          borderRadius="md"
          boxShadow="dark-lg"
          maxW="md"
          w="full"
        >
          <Stack spacing={4}>
            <Heading fontSize="3xl" textAlign="center">
              Registrar Salida
            </Heading>
            <form onSubmit={handleOutSubmit}>
              <VStack spacing={4}>
                <FormControl>
                  <FormLabel color={labelColor}>Producto</FormLabel>
                  <Select
                    placeholder="Selecciona un producto"
                    value={formState.productId.value}
                    onChange={(e) =>
                      handleInputValueChange(e.target.value, "productId")
                    }
                  >
                    {productList.map((product) => (
                      <option key={product._id} value={product._id}>
                        {product.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel color={labelColor}>Cantidad</FormLabel>
                  <Input
                    type="number"
                    value={formState.quantity.value}
                    onChange={(e) =>
                      handleInputValueChange(e.target.value, "quantity")
                    }
                  />
                </FormControl>

                <FormControl>
                  <FormLabel color={labelColor}>Motivo</FormLabel>
                  <Input
                    type="text"
                    value={formState.reason.value}
                    onChange={(e) =>
                      handleInputValueChange(e.target.value, "reason")
                    }
                  />
                </FormControl>

                <FormControl>
                  <FormLabel color={labelColor}>Destino</FormLabel>
                  <Input
                    type="text"
                    value={formState.destiny.value}
                    onChange={(e) =>
                      handleInputValueChange(e.target.value, "destiny")
                    }
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
                  Registrar Salida
                </Button>
                <Button variant="outline" onClick={switchOutHandler}>
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
