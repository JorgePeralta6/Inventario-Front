import NavBar from "../NavBar";
import { Category } from "./Category";
import { useCategories } from "../../shared/hooks/useCategories";
import {
    useDisclosure,
    Flex,
    Button,
    Text,
    Box
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import CategoryFormModal from "./CategoryModalForm";
import { deleteCategory } from "../../services";
import toast from "react-hot-toast";
import { CategorySeacrh } from "./CategorySearch";
import { motion } from "framer-motion";

const CategoryPage = () => {
    const { getCategories, categories, isFetching, total } = useCategories();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [selectedCategories, setSelectedCategories] = useState(null);
    const [desde, setDesde] = useState(0);
    const limite = 12;
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredCategories, setFilteredCategories] = useState([]);

    const MotionBox = motion.create(Box);

    const backgroundVariants = {
        initial: {
            background: 'linear-gradient(135deg,rgb(197, 71, 71),rgba(161, 196, 253, 0.34))',
            transition: { duration: 1 },
        },
        animate: {
            background: 'linear-gradient(135deg, rgba(161, 196, 253, 0.34), rgb(197, 71, 71))',
            transition: { duration: 1 },
        },
    };

    useEffect(() => {
        getCategories({ limite, desde });
    }, [desde]);

    useEffect(() => {
        if (searchTerm) {
            setFilteredCategories(
                categories.filter(category => category.name.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        } else {
            setFilteredCategories(categories || []);
        }
    }, [searchTerm, categories]);

    const handleEditCategory = (category) => {
        setSelectedCategories(category);
        onOpen();
    };

    const handleAddCategory = () => {
        setSelectedCategories(null);
        onOpen();
    };

    const handleDeleteCategory = async (id) => {
        let res = await deleteCategory(id);

        if (res?.error) {
            return toast.error(res.msg, {
                style: {
                    background: 'red',
                    color: 'white',
                    whiteSpace: 'pre-line',
                }
            });
        }

        toast.success('Categoria eliminada con éxito!', {
            style: {
                background: 'green',
                color: 'white'
            }
        });

        onClose();
        await getCategories({ limite, desde });
    };

    const handleSearch = async (term) => {
        setSearchTerm(term);
        if (term.trim()) {
            await getCategories({ limite: 0, desde: 0 });
        } else {
            await getCategories({ limite, desde });
        }
    }

    const handleCategorySaved = async () => {
        await getCategories({ limite, desde });
    };

    const handlePrev = () => {
        if (desde - limite >= 0) {
            setDesde(desde - limite);
        }
    };

    const handleNext = () => {
        if (desde + limite < total) {
            setDesde(desde + limite);
        }
    };

    return (
        <>
            <NavBar />
            <MotionBox
                variants={backgroundVariants}
                initial="initial"
                animate="animate"
                minH="100vh"
                p={4}
            >
                <Flex
                    h="10vh"
                    justifyContent="flex-end"
                    alignItems="center"
                    px={8}
                >
                    <Box p={6} width='500px'>
                        <CategorySeacrh onSearch={handleSearch} />
                    </Box>

                    <Button
                        px={4}
                        fontSize="md"
                        rounded="full"
                        bg="gray.400"
                        color="white"
                        boxShadow="0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                        _hover={{ bg: 'gray.500' }}
                        _focus={{ bg: 'gray.500' }}
                        onClick={handleAddCategory}
                    >
                        Agregar
                    </Button>
                </Flex>

                {isFetching ? (
                    "Cargando categorias..."
                ) : filteredCategories.length > 0 ? (
                    <Category
                        category={filteredCategories}
                        handleEditCategory={handleEditCategory}
                        handleDeleteCategory={handleDeleteCategory}
                    />
                ) : (
                    "No se encontraron categorias."
                )}

                <Flex justifyContent="center" alignItems="center" mt={6} gap={4} m={10} >
                    <Button onClick={handlePrev} isDisabled={desde === 0}>
                        Anterior
                    </Button>
                    <Text>
                        Página {Math.floor(desde / limite) + 1} de {Math.ceil(total / limite) || 1}
                    </Text>
                    <Button onClick={handleNext} isDisabled={desde + limite >= total}>
                        Siguiente
                    </Button>
                </Flex>

                <CategoryFormModal
                    isOpen={isOpen}
                    onClose={onClose}
                    categorySaved={handleCategorySaved}
                    categoryToEdit={selectedCategories}
                />
            </MotionBox>

        </>
    );
};

export default CategoryPage;
