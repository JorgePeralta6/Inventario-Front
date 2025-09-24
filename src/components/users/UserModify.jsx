import { useState, useEffect } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    FormControl,
    FormLabel,
    Input,
    SimpleGrid,
    useDisclosure,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    Select
} from "@chakra-ui/react";
import { useRef } from "react";
import toast from "react-hot-toast";

export const UsersModify = ({ isOpen, onClose, settings, saveSettings, deleteSettings }) => {
    const [formState, setFormState] = useState(settings);

    const {
        isOpen: isAlertOpen,
        onOpen: onAlertOpen,
        onClose: onAlertClose
    } = useDisclosure();

    const cancelRef = useRef();

    useEffect(() => {
        setFormState(settings);
    }, [settings]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        saveSettings(formState);
    };

    const handleDelete = async () => {
        await deleteSettings(formState);
        onAlertClose();
        onClose();
        window.location.reload();
    };


    const handleClose = () => {
        onClose();
    };

    return (
        <>
            <Modal isOpen={isOpen} onClose={handleClose}>
                <ModalOverlay />
                <ModalContent mx='auto' my='auto' >
                    <ModalHeader>Edit User</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <SimpleGrid columns={2} spacing={4}>
                            {["name", "surname", "username", "phone", "email", "password", "role"].map((field) => (
                                <FormControl key={field}>
                                    <FormLabel>{field.charAt(0).toUpperCase() + field.slice(1)}</FormLabel>
                                    {field === "role" ? (
                                        <Select name="role" value={formState.role} onChange={handleInputChange}>
                                            <option value="ADMIN_ROLE">ADMIN</option>
                                            <option value="EMPLOYEE_ROLE">EMPLEADO</option>
                                        </Select>
                                    ) : (
                                        <Input name={field} value={formState[field]} onChange={handleInputChange} />
                                    )}
                                </FormControl>
                            ))}

                        </SimpleGrid>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" onClick={handleSave}>Save</Button>
                        <Button ml={3} variant="ghost" onClick={handleClose}>Cancel</Button>
                        <Button ml={3} colorScheme="red" onClick={onAlertOpen}>Delete</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <AlertDialog
                isOpen={isAlertOpen}
                leastDestructiveRef={cancelRef}
                onClose={onAlertClose}
                
            >
                <AlertDialogOverlay>
                    <AlertDialogContent mx='auto' my='auto' >
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Confirm Delete
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            Estas seguro de eliminar el usuario?
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onAlertClose}>
                                Cancel
                            </Button>
                            <Button colorScheme="red" onClick={handleDelete} ml={3}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
};
