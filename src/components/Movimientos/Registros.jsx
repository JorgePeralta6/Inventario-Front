import React, { useEffect, useState } from 'react';
import {
  Table, Thead, Tbody, Tr, Th, Td, TableCaption, Box, Heading,
  Button, useColorModeValue, Input, HStack, useDisclosure
} from '@chakra-ui/react';
import { useMovimientos } from '../../shared/hooks';
import { EditMovementModal } from './EditMovementModal';

const MovimientosTableComponent = () => {
  const { tableData, movimientos, getMovimientos } = useMovimientos();
  const [hasFetched, setHasFetched] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedMovement, setSelectedMovement] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const entradaBg = useColorModeValue('green.300', 'green.500');
  const salidaBg = useColorModeValue('red.300', 'red.500');
  const entradaHover = useColorModeValue('green.400', 'green.400');
  const salidaHover = useColorModeValue('red.400', 'red.400');

  const fetchData = () => {
    if (startDate && endDate) {
      const isoStart = new Date(startDate).toISOString();
      const isoEnd = new Date(endDate).toISOString();
      getMovimientos({ startDate: isoStart, endDate: isoEnd });
    } else {
      getMovimientos();
    }
  };

  const handleRowClick = (movimiento) => {
    // Solo abrir modal si es una salida
    if (movimiento.tipo === 'Salida') {
      setSelectedMovement(movimiento);
      onOpen();
    }
  };

  const handleUpdateSuccess = () => {
    fetchData(); // Recargar los datos
  };

  const sortedData = [...tableData].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

  useEffect(() => {
    if (!hasFetched) {
      fetchData();
      setHasFetched(true);
    }
  }, [hasFetched]);

  return (
    <Box p={4}>
      <Heading as="h2" mb={4}>Movimientos de Productos</Heading>

      <HStack spacing={4} mb={4}>
        <Input
          type="datetime-local"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <Input
          type="datetime-local"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <Button onClick={fetchData} colorScheme="blue">Filtrar</Button>
      </HStack>

      <Table colorScheme="teal">
        <TableCaption>Movimientos registrados en el sistema</TableCaption>
        <Thead>
          <Tr>
            <Th>Producto</Th>
            <Th>Cantidad</Th>
            <Th>Empleado</Th> 
            <Th>Fecha</Th>
            <Th>Razón</Th>
            <Th>Destino</Th>
            <Th>Tipo</Th>
          </Tr>
        </Thead>
        <Tbody>
          {sortedData.map((movimiento, index) => (
            <Tr
              key={index}
              bg={movimiento.tipo === 'Entrada' ? entradaBg : salidaBg}
              _hover={{ 
                bg: movimiento.tipo === 'Entrada' ? entradaHover : salidaHover,
                cursor: movimiento.tipo === 'Salida' ? 'pointer' : 'default',
                transform: movimiento.tipo === 'Salida' ? 'scale(1.01)' : 'none',
                transition: 'all 0.2s'
              }}
              onClick={() => handleRowClick(movimiento)}
            >
              <Td>{movimiento.producto}</Td>
              <Td>{movimiento.cantidad}</Td>
              <Td>{movimiento.empleado}</Td>
              <Td>{movimiento.fecha}</Td>
              <Td>{movimiento.razon}</Td>
              <Td>{movimiento.destino}</Td>
              <Td>{movimiento.tipo}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <EditMovementModal
        isOpen={isOpen}
        onClose={onClose}
        movement={selectedMovement}
        onSuccess={handleUpdateSuccess}
      />
    </Box>
  );
};

export default MovimientosTableComponent;