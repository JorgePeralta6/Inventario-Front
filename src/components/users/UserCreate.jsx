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
    Text,
    InputGroup,
    InputRightElement,
    IconButton
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { register as registerRequest } from "../../services";
import toast from "react-hot-toast";
import {
    validateUsername,
    validateEmail,
    validatePassword,
    validateConfirPassword,
    validateUsernameMessage,
    emailValidationMessage,
    validatePasswordMessage,
    passwordConfirmationMessage,
} from "../../shared/validators";

export const UserCreate = ({ isOpen, onClose, onUserCreated }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfir, setShowPasswordConfir] = useState(false);

    const [formState, setFormState] = useState({
        name: { value: "", isValid: false, showError: false },
        surname: { value: "", isValid: false, showError: false },
        username: { value: "", isValid: false, showError: false },
        phone: { value: "", isValid: false, showError: false },
        email: { value: "", isValid: false, showError: false },
        password: { value: "", isValid: false, showError: false },
        passwordConfir: { value: "", isValid: false, showError: false },
        role: { value: "EMPLOYEE_ROLE", isValid: true, showError: false },
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState((prev) => ({
            ...prev,
            [name]: { ...prev[name], value },
        }));
    };

    const handleValidation = (e) => {
        const { name, value } = e.target;
        let isValid = false;

        switch (name) {
            case "email":
                isValid = validateEmail(value);
                break;
            case "name":
            case "surname":
            case "phone":
                isValid = value.trim().length > 0;
                break;
            case "username":
                isValid = validateUsername(value);
                break;
            case "password":
                isValid = validatePassword(value);
                break;
            case "passwordConfir":
                isValid = validateConfirPassword(formState.password.value, value);
                break;
            case "role":
                isValid = true;
                break;
            default:
                break;
        }

        setFormState((prev) => ({
            ...prev,
            [name]: { ...prev[name], isValid, showError: !isValid },
        }));
    };

    const handleSave = async () => {
        const invalidField = Object.keys(formState).find((f) => !formState[f].isValid);
        if (invalidField) {
            return toast.error("Por favor completa los campos correctamente", {
                style: { background: "red", color: "white" },
            });
        }

        try {
            const payload = {
                name: formState.name.value,
                surname: formState.surname.value,
                username: formState.username.value,
                phone: formState.phone.value,
                email: formState.email.value,
                password: formState.password.value,
                role: formState.role.value,
            };

            const response = await registerRequest(payload);

            if (!response.success) {
                return toast.error(response.message, {
                    style: { background: "red", color: "white", whiteSpace: "pre-line" },
                });
            }

            toast.success("Usuario creado con éxito!", {
                style: { background: "green", color: "white" },
            });

            onUserCreated(response.data.userDetails);
            onClose();
        } catch (error) {
            console.error(error);
            toast.error("Error al crear usuario");
        }
    };

    const isDisabled =
        !formState.name.isValid ||
        !formState.surname.isValid ||
        !formState.username.isValid ||
        !formState.phone.isValid ||
        !formState.email.isValid ||
        !formState.password.isValid ||
        !formState.passwordConfir.isValid;

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent mx="auto" my="auto">
                <ModalHeader>Crear Usuario</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <SimpleGrid columns={2} spacing={4}>
                        {[
                            { field: "name", label: "Nombre" },
                            { field: "surname", label: "Apellido" },
                            { field: "username", label: "Usuario" },
                            { field: "phone", label: "Teléfono" },
                            { field: "email", label: "Correo" },
                        ].map(({ field, label }) => (
                            <FormControl key={field}>
                                <FormLabel>{label}</FormLabel>
                                <Input
                                    name={field} // sigue siendo la variable para el backend
                                    value={formState[field].value}
                                    onChange={handleInputChange}
                                    onBlur={handleValidation}
                                />
                                {formState[field].showError && (
                                    <Text color="red.400" fontSize="sm">
                                        {field === "email" ? emailValidationMessage : validateUsernameMessage}
                                    </Text>
                                )}
                            </FormControl>
                        ))}

                        {/* Contraseña */}
                        <FormControl>
                            <FormLabel>Contraseña</FormLabel>
                            <InputGroup>
                                <Input
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    value={formState.password.value}
                                    onChange={handleInputChange}
                                    onBlur={handleValidation}
                                />
                                <InputRightElement>
                                    <IconButton
                                        icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                                        size="sm"
                                        onClick={() => setShowPassword(!showPassword)}
                                    />
                                </InputRightElement>
                            </InputGroup>
                            {formState.password.showError && (
                                <Text color="red.400" fontSize="sm">
                                    {validatePasswordMessage}
                                </Text>
                            )}
                        </FormControl>

                        {/* Confirmar Contraseña */}
                        <FormControl>
                            <FormLabel>Confirmar Contraseña</FormLabel>
                            <InputGroup>
                                <Input
                                    name="passwordConfir"
                                    type={showPasswordConfir ? "text" : "password"}
                                    value={formState.passwordConfir.value}
                                    onChange={handleInputChange}
                                    onBlur={handleValidation}
                                />
                                <InputRightElement>
                                    <IconButton
                                        icon={showPasswordConfir ? <ViewOffIcon /> : <ViewIcon />}
                                        size="sm"
                                        onClick={() => setShowPasswordConfir(!showPasswordConfir)}
                                    />
                                </InputRightElement>
                            </InputGroup>
                            {formState.passwordConfir.showError && (
                                <Text color="red.400" fontSize="sm">
                                    {passwordConfirmationMessage}
                                </Text>
                            )}
                        </FormControl>
                    </SimpleGrid>

                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" onClick={handleSave} isDisabled={isDisabled}>
                        Guardar
                    </Button>
                    <Button ml={3} variant="ghost" onClick={onClose}>
                        Cancelar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
