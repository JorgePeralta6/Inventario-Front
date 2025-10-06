"use client";

import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Text,
  HStack,
  Image
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { logout } from "../shared/hooks";

const NavLink = ({ children, to }) => {
  const navLinkHover = useColorModeValue("gray.200", "gray.700");
  return (
    <Box
      as="div"
      px={3}
      py={2}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: navLinkHover,
      }}
    >
      <Link to={to}>{children}</Link>
    </Box>
  );
};

const NavLogo = () => {
  return (
    <Image
      src="https://i.ibb.co/wNmNDkxf/logo-2024-color.png"
      boxSize="90px"
      objectFit="contain"
      mr={2}
      alt="Logo"
    />
  )
}


export default function NavBar() {
  const { colorMode, toggleColorMode } = useColorMode();

  const { user, refreshUser } = useContext(UserContext);

  const bgColor = useColorModeValue("gray.100", "gray.900");


  const handleLogout = () => {
    logout();
    refreshUser();
  }

  if (!user) {
    return null;
  }

  return (
    <Box bg={bgColor} w="100%">
      <Flex
        maxW="auto"
        mx="auto"
        px={6}
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <HStack spacing={8} alignItems={"center"}>
          <NavLogo />
          <Link to={'/dashboard'} >
            <Box fontWeight="bold" fontSize="xl">
              Almacen
            </Box>
          </Link>
          {user.role === 'ADMIN_ROLE' ? (
            <HStack as="nav" spacing={8} display={{ base: "none", md: "flex" }}>
              <NavLink to="/users">Usuarios</NavLink>
              <NavLink to="/products">Inventario</NavLink>
              <NavLink to="/movimientos">Movimientos</NavLink>
              <NavLink to="/category">Categorias</NavLink>
            </HStack>
          ) : (
            <HStack as="nav" spacing={8} display={{ base: "none", md: "flex" }}>
              <NavLink to="/products">Inventario</NavLink>
              <NavLink to="/movimientos">Movimientos</NavLink>
              <NavLink to="/category">Categorias</NavLink>
            </HStack>
          )}
        </HStack>

        <Flex alignItems={"center"}>
          <Stack direction={"row"} spacing={6}>
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>

            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar size={"sm"} />
              </MenuButton>
              <MenuList alignItems={"center"}>
                <br />
                <Center>
                  <Avatar size={"2xl"} />
                </Center>
                <br />
                <Center>
                  <Text fontWeight="bold" pr='5%' pl='5%'>{user.username} <br /> {user.email} </Text>
                </Center>
                <br />
                <MenuDivider />
                <MenuItem onClick={handleLogout} >Logout</MenuItem>
              </MenuList>
            </Menu>
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
}