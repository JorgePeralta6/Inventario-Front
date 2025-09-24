'use client'

import { useEffect } from 'react';
import { 
  Container, 
  Grid, 
  GridItem, 
  Spinner, 
  Stat, 
  StatLabel, 
  StatNumber, 
  StatHelpText, 
  HStack, 
  Badge,
  Box,
  useColorModeValue
} from '@chakra-ui/react';
import { useStats, useTotalClients, useEarnings } from '../../shared/hooks'; // Asegúrate que la ruta esté correcta
import { TriangleUpIcon, TriangleDownIcon } from '@chakra-ui/icons';

function StatsHeader() {
  const { stats, isFetching, getStats } = useStats();
  const { totalClients, isFetching: isFetchingClients, getTotalClients } = useTotalClients();
  const { earnings, isFetching: isFetchingEarnings, fetchEarnings } = useEarnings();

  useEffect(() => {
    getStats();
    getTotalClients();
    fetchEarnings();  // Traer ingresos totales con el hook
  }, []);

  return (
    <Container py={5} maxW={'container.xl'}>
      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(5, 1fr)',
        }}
        gap={4}
      >
        <GridItem w="100%">
          {isFetching ? (
            <Spinner size="xl" />
          ) : (
            <Box bg="white" p={4} borderRadius="lg" boxShadow="sm" textColor={useColorModeValue('black', 'black')} >
              <Stat>
                <StatLabel>Ventas totales</StatLabel>
                <HStack>
                  <StatNumber>{stats?.totalVentas ?? 0}</StatNumber>
                  <Badge colorScheme="green">
                    <HStack spacing={1}>
                      <TriangleUpIcon boxSize={3} />
                    </HStack>
                  </Badge>
                </HStack>
                <StatHelpText>Desde el inicio de la tienda</StatHelpText>
              </Stat>
            </Box>
          )}
        </GridItem>

        <GridItem w="100%">
          {isFetching ? (
            <Spinner size="xl" />
          ) : (
            <Box bg="white" p={4} borderRadius="lg" boxShadow="sm" textColor={useColorModeValue('black', 'black')} >
              <Stat>
                <StatLabel>Inventario total</StatLabel>
                <HStack>
                  <StatNumber>{stats?.totalInventario ?? 0}</StatNumber>
                  <Badge colorScheme="red">
                    <HStack spacing={1}>
                      <TriangleDownIcon boxSize={3} />
                    </HStack>
                  </Badge>
                </HStack>
                <StatHelpText>Desde el mes pasado</StatHelpText>
              </Stat>
            </Box>
          )}
        </GridItem>

        <GridItem w="100%">
          {isFetchingEarnings ? (
            <Spinner size="xl" />
          ) : (
            <Box bg="white" p={4} borderRadius="lg" boxShadow="sm" textColor={useColorModeValue('black', 'black')} >
              <Stat>
                <StatLabel>Ingresos totales</StatLabel>
                <HStack>
                  <StatNumber>Q{earnings ?? 0}</StatNumber>
                  <Badge colorScheme="green">
                    <HStack spacing={1}>
                      <TriangleUpIcon boxSize={3} />
                    </HStack>
                  </Badge>
                </HStack>
                <StatHelpText>Ingresos totales de las ventas</StatHelpText>
              </Stat>
            </Box>
          )}
        </GridItem>

        <GridItem w="100%">
          {(isFetching || isFetchingClients) ? (
            <Spinner size="xl" />
          ) : (
            <Box bg="white" p={4} borderRadius="lg" boxShadow="sm" textColor={useColorModeValue('black', 'black')} >
              <Stat>
                <StatLabel>Clientes total</StatLabel>
                <HStack>
                  <StatNumber>{totalClients ?? 0}</StatNumber>
                  <Badge colorScheme="green">
                    <HStack spacing={1}>
                      <TriangleUpIcon boxSize={3} />
                    </HStack>
                  </Badge>
                </HStack>
                <StatHelpText>Total de clientes</StatHelpText>
              </Stat>
            </Box>
          )}
        </GridItem>

        <GridItem w="100%">
          {isFetching ? (
            <Spinner size="xl" />
          ) : (
            <Box bg="white" p={4} borderRadius="lg" boxShadow="sm" textColor={useColorModeValue('black', 'black')} >
              <Stat>
                <StatLabel>Promedio de procesamiento</StatLabel>
                <HStack>
                  <StatNumber>10 mins</StatNumber>
                  <Badge colorScheme="red">
                    <HStack spacing={1}>
                      <TriangleDownIcon boxSize={3} />
                    </HStack>
                  </Badge>
                </HStack>
                <StatHelpText>Tiempo en procesar productos</StatHelpText>
              </Stat>
            </Box>
          )}
        </GridItem>
      </Grid>
    </Container>
  );
}

export default StatsHeader;
