import {
  Button,
  Card,
  CardBody,
  Image,
  Text,
  Badge,
  Stack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useColorModeValue
} from "@chakra-ui/react";

export const ProductCard = ({ product, handleEditProduct, handleDeleteProduct }) => {
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const bgStock = useColorModeValue('blue.900', 'blue.100')
  const bgDesc = useColorModeValue('black', 'yellow.200')
  const bgDate = useColorModeValue('gray.700', 'white')

  return (
    <>
      <Card
        cursor="pointer"
        boxShadow="md"
        borderRadius="lg"
        maxW="300px"
        transition="all 0.3s ease"
        _hover={{
          transform: "scale(1.05)",
          boxShadow: "xl",
        }}
        onClick={onOpen} 
      >
        <Image
          src={product.image}
          alt={product.name}
          objectFit="cover"
          height="200px"
          width="100%"
          borderTopRadius="lg"
        />
        <CardBody p={4}>
          <Stack spacing={1}>
            <Text fontSize="xl" fontWeight="bold">
              {product.name}
            </Text>
            <Badge colorScheme="purple" width="fit-content">
              {product.category}
            </Badge>
            <Text
              fontSize="sm"
              color={product.stock > 0 ? bgStock : "red.500"}
              fontWeight={"bold"}
            >
              Stock: {product.stock}
            </Text>
          </Stack>
        </CardBody>
      </Card>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent borderRadius="lg">
          <ModalHeader fontSize="xl" fontWeight="bold" color="gray.700">
            {product.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody p={4}>
            <Stack spacing={3}>
              <Image
                src={product.image}
                alt={product.name}
                maxH="400px"
                objectFit="cover"
                width="100%"
                borderRadius="md"
              />
              <Text fontSize="lg" fontWeight="bold">
                {product.name}
              </Text>
              <Badge colorScheme="purple" width="fit-content" fontWeight={"bold"} >
                {product.category}
              </Badge>
              <Text
                fontSize="sm"
                color={product.stock > 0 ? bgStock : "red.500"}
                fontWeight={"bold"}
              >
                Stock: {product.stock}
              </Text>
              <Text fontSize="sm" color={bgDesc} fontWeight={"bold"} >
                {product.description}
              </Text>
              <Text fontSize="sm" color={bgDate} fontWeight={"bold"} >
                {product.entryDate}
              </Text>
            </Stack>
          </ModalBody>
          <ModalFooter justifyContent="flex-start">
            <Button
              colorScheme="teal"
              mr={3}
              onClick={() => {
                onClose();
                handleEditProduct(product); 
              }}
            >
              Editar
            </Button>
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => {
                onDeleteOpen();
              }}
            >
              Eliminar
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cerrar
            </Button>
            <Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>¿Estás seguro?</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  Esta acción eliminará el producto <strong>{product.name}</strong>. ¿Deseás continuar?
                </ModalBody>

                <ModalFooter>
                  <Button
                    colorScheme="red"
                    onClick={async () => {
                      await handleDeleteProduct(product._id, { confirm: "YES" });
                      onDeleteClose();
                    }}
                  >
                    Sí, eliminar
                  </Button>
                  <Button variant="ghost" onClick={onDeleteClose}>
                    Cancelar
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>

          </ModalFooter>
        </ModalContent>
      </Modal>

    </>
  );
};