'use client';

import {
    Heading,
    Avatar,
    Box,
    Center,
    Text,
    Stack,
    Button,
    Badge,
    useColorModeValue,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    useDisclosure,
} from '@chakra-ui/react';
import CategoryFormModal from './CategoryModalForm';

export const CategoryCard = ({
    category,
    handleEditCategory,
    handleDeleteCategory

}) => {

    const {
        isOpen: isDeleteOpen,
        onOpen: onDeleteOpen,
        onClose: onDeleteClose,
    } = useDisclosure();
    const { isOpen, onOpen, onClose } = useDisclosure();


    return (
        <Center py={6}>
            <Box
                maxW="320px"
                w="full"
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow="2xl"
                rounded="lg"
                p={6}
                textAlign="center"
                transition="transform 0.3s ease, box-shadow 0.3s ease"
                onClick={() => handleEditCategory(category)}
                _hover={{
                    transform: 'scale(1.05)',
                    boxShadow: '3xl',
                }}
            >
                <Heading fontSize="2xl" fontFamily="body">
                    {category.name}
                </Heading>

                <Stack mt={2} direction="row" spacing={4}>
                    <Button
                        flex={1}
                        fontSize="sm"
                        rounded="full"
                        bg="red.400"
                        color="white"
                        boxShadow="0px 1px 25px -5px rgb(239 68 68 / 48%), 0 10px 10px -5px rgb(239 68 68 / 43%)"
                        _hover={{
                            bg: 'red.500',
                        }}
                        _focus={{
                            bg: 'red.700',
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            onDeleteOpen();
                        }}
                    >
                        Delete
                    </Button>
                    <Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>¿Estás seguro?</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                Esta acción eliminará la categoria <strong>{category.name}</strong>. ¿Deseás continuar?
                            </ModalBody>

                            <ModalFooter>
                                <Button
                                    colorScheme="red"
                                    onClick={async () => {
                                        await handleDeleteCategory(category._id);
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

                </Stack>
                <CategoryFormModal isOpen={isOpen} onClose={onClose} />
            </Box>
        </Center>
    );
}

export default CategoryCard;