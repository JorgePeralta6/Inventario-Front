import {
    Heading,
    Avatar,
    Box,
    Center,
    Image,
    Flex,
    Text,
    Stack,
    Button,
    useColorModeValue,
    useDisclosure
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { UsersModify } from './UserModify';
import { deleteUser, updateUser } from '../../services';

export const UsersCards = ({
    id,
    name,
    surname,
    username,
    email,
    phone,
    role,
    password,
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { id: routeId } = useParams();

    const navigate = useNavigate();

    const location = useLocation();

    const [userData, setUserData] = useState({
        id,
        name,
        surname,
        username,
        email,
        phone,
        role,
        password
    });

    useEffect(() => {
        if (routeId === String(id)) {
            onOpen();
        }
    }, [routeId, id, onOpen]);

    const handleCloseModal = () => {
        onClose();
        if (location.pathname !== '/users') {
            navigate('/users');
        }
    };

    const handleSaveSettings = async (newData) => {
        console.log('Datos actualizados:', newData);

        const response = await updateUser(newData.id, newData);
        if (response && !response.error) {
            setUserData(response.data)
            handleCloseModal();
            window.location.reload();
        } else {
            console.error('Error en updateUser:', response.e.response?.data || response.e);
        }
    };

    const handleDeleteSettings = async (oldData) => {
        console.log(oldData);

        const response = await deleteUser(oldData.id);
        if (response && !response.error) {
            handleCloseModal();
            window.location.reload();
        }
    }

    const handleModifyClick = () => {
        navigate(`/users/${id}`);
    };

    return (
        <>
            <Center py={6}>
                <Box
                    maxW={'270px'}
                    w={'full'}
                    bg={useColorModeValue('white', 'gray.800')}
                    boxShadow={'2xl'}
                    rounded={'md'}
                    overflow={'hidden'}
                    transition="transform 0.3s ease, box-shadow 0.3s ease"
                    _hover={{
                        transform: 'scale(1.05)',
                        boxShadow: '3xl',
                    }}
                >
                    {/* Banner de paisaje aleatorio */}
                    <Image
                        h={'120px'}
                        w={'full'}
                        src={`https://picsum.photos/400/200?random=${id}`}
                        objectFit="cover"
                        alt={`Banner de ${name}`}
                    />

                    {/* Avatar por defecto */}
                    <Flex justify={'center'} mt={-12}>
                        <Avatar
                            size={'xl'}
                            css={{ border: '2px solid white' }}
                        />
                    </Flex>

                    <Box p={6} >
                        <Stack spacing={0} align={'center'} mb={5}>
                            <Heading fontSize={'2xl'} fontWeight={500}>
                                {name} {surname}
                            </Heading>
                            <Text color={'gray.500'}>{email}</Text>
                        </Stack>

                        <Stack direction={'row'} justify={'center'} spacing={6}>
                            <Stack spacing={0} align={'center'}>
                                <Text fontWeight={600}>Role</Text>
                                <Text fontSize={'sm'} color={'gray.500'}>
                                    {role}
                                </Text>
                            </Stack>
                            <Stack spacing={0} align={'center'}>
                                <Text fontWeight={600}>Phone</Text>
                                <Text fontSize={'sm'} color={'gray.500'}>
                                    {phone}
                                </Text>
                            </Stack>
                        </Stack>

                        <Button
                            w={'full'}
                            mt={8}
                            bg={useColorModeValue('#151f21', 'gray.900')}
                            color={'white'}
                            rounded={'md'}
                            onClick={handleModifyClick}
                            _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
                        >
                            Modify
                        </Button>
                    </Box>
                </Box>

                {isOpen && (
                    <UsersModify
                        settings={userData}
                        saveSettings={handleSaveSettings}
                        isOpen={isOpen}
                        onClose={handleCloseModal}
                        deleteSettings={handleDeleteSettings}
                    />
                )}
            </Center>
        </>
    );
};
