import { useState } from "react";
import { useNavigate } from "react-router";
import { UsersCards } from "./UsersCards";
import { SimpleGrid, Box, Button, useDisclosure, Flex } from "@chakra-ui/react";
import { UserCreate } from "./UserCreate";

export const Users = ({ users: initialUsers }) => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [users, setUsers] = useState(initialUsers);

  const handleNavigateToUser = (id) => {
    navigate(`/users/${id}`);
  };

  const handleUserCreated = (newUser) => {
    setUsers((prev) => [...prev, newUser]); // agregamos a la lista
  };

  return (
    <Box
      minH="100vh"
      bgGradient="linear(to-br, rgba(0, 0, 0, 0),rgba(74, 21, 21, 0.35))"
      px={6}
      py={8}
    >
      {/* Botón para crear usuario */}
      <Flex justify="flex-end" mb={4}>
        <Button colorScheme="teal" onClick={onOpen}>
          Agregar Usuario
        </Button>
      </Flex>

      <SimpleGrid columns={[1, 2, 3, 4]} spacing={6}>
        {users.map((c) => (
          <UsersCards
            key={c._id}
            id={c._id}
            name={c.name}
            surname={c.surname}
            username={c.username}
            email={c.email}
            phone={c.phone}
            role={c.role}
            password={c.password}
            navigateToUserHandler={handleNavigateToUser}
          />
        ))}
      </SimpleGrid>

      {/* Modal de creación */}
      <UserCreate
        isOpen={isOpen}
        onClose={onClose}
        onUserCreated={handleUserCreated}
      />
    </Box>
  );
};
