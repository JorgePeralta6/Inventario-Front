import { useNavigate } from "react-router";
import { UsersCards } from "./UsersCards";
import { SimpleGrid, Box } from "@chakra-ui/react";
import Footer from "../dashboard/Footer";

export const Users = ({ users }) => {
    const navigate = useNavigate();

    const handleNavigateToUser = (id) => {
        navigate(`/users/${id}`);
    };

    return (
        <Box
            minH="100vh"
            bgGradient="linear(to-br, rgba(0, 0, 0, 0),rgba(74, 21, 21, 0.35))"
            px={6}
            py={8}
        >
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
        </Box>
    );
};
