import React from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';
import ProductList from './ProductList';

const Sidebar = () => {

  const bgBack = useColorModeValue('white', '#585441')

  return (
    <>
    <Box
      position="fixed"
      top="0"
      left="0"
      w="220px"
      h="100vh"
      bg={bgBack}
      p={3}
      overflowY="auto"
      zIndex={10}
    >
      <ProductList />
    </Box>
    </>
    );
};

export default Sidebar;


