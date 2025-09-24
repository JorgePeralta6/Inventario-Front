import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useProduct } from "../../shared/hooks";
import { 
  Heading,
  useColorModeValue,
  Box
} from '@chakra-ui/react';

const BarListComponent = () => {
  const { products, getProducts, isFetching } = useProduct();
  const [chartData, setChartData] = useState([]);
  const bgText = useColorModeValue('black', 'black')
  const bgBar = useColorModeValue('#BFBBB4', '#77867E')

  useEffect(() => {
    if (!products && !isFetching) {
      getProducts();
    }
  }, [getProducts, products, isFetching]);

  useEffect(() => {
    if (products && products.length > 0) {
      const filteredData = products.map((product) => ({
        name: product.name,
        sales: product.sales,
      }));
      setChartData(filteredData);
    }
  }, [products]);

  if (isFetching || !products) {
    return (
      <div style={{ width: '100vh', height: '50vh' }}>
        <ResponsiveContainer>
          <BarChart data={[]} />
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <Box 
      width="100%" 
      height="50vh" 
      mt={5} 
      mb={12}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Heading as="h2" mb={3} color={bgText}>
        Ventas por Producto
      </Heading>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="sales" fill={bgBar} />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default BarListComponent;
