import React, { useEffect, useState } from 'react'
import { saveCategory, updateCategory } from '../../services';
import toast from 'react-hot-toast';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalCloseButton,
    Button,
    Input,
    FormControl,
    FormLabel,
    useDisclosure,
    InputGroup,
    Select
} from '@chakra-ui/react';

const CategoryFormModal = ({ isOpen, onClose, categorySaved, categoryToEdit }) => {
    const [form, setForm] = useState({
        name: ""
    });

    useEffect(() => {
        if (categoryToEdit) {
            setForm({
                name: String(categoryToEdit.name) || ""
            });
        } else {
            setForm({
                name: ""
            })
        }
    }, [categoryToEdit, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        if (!form.name.trim()) {
            return toast.error("El nombre es obligatorio", {
                style: {
                    background: 'red',
                    color: 'white',
                    whiteSpace: 'pre-line'
                }
            });
        }

        let res;
        if (categoryToEdit) {
            res = await updateCategory(categoryToEdit._id, {name: form.name});
        } else {
            res = await saveCategory({name: form.name})
        }        

        if (res?.error) {
            return toast.error(res.msg, {
                style: {
                    background: 'red',
                    color: 'white',
                    whiteSpace: 'pre-line'
                }
            });
        }

        toast.success(categoryToEdit ? "Categoria actualizada correctamente" : "Categoria guardada correctamente", {
            style: {
                background: 'green',
                color: 'white'
            }
        });
        onClose();
        categorySaved();
    }
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{categoryToEdit ? 'Editar categoria' : 'Nueva categoria'}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl mb={4} isRequired >
                            <FormLabel>Nombre</FormLabel>
                            <Input
                                placeholder="Nombre de la categoria"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
                            Guardar
                        </Button>
                        <Button onClick={onClose}>Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default CategoryFormModal
