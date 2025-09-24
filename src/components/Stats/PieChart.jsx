import React from 'react';
import { PieChart as ReChartPie, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { usePercentage } from '../../shared/hooks'; // Asegúrate de que la ruta sea correcta

const PieChartComponent = () => {
  const { percentage, isFetching, getPercentage } = usePercentage();

  React.useEffect(() => {
    getPercentage(); // Llama a la función para obtener los porcentajes al montar el componente
  }, [getPercentage]);

  const COLORS = ['#A8C0BA', '#77867E', '#585441', '#D8D7D4'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  if (isFetching) {
    return <div>Cargando datos del porcentaje...</div>; // O algún otro indicador de carga
  }

  if (!percentage || percentage.length === 0) {
    return <div>No hay datos de porcentaje disponibles.</div>; // O algún otro mensaje si no hay datos
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ReChartPie width={400} height={300}>
        <Pie
          data={percentage} // Usamos el estado 'percentage' del hook
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={150}
          fill="#8884d8"
          dataKey="value" // Asegúrate de que la clave 'value' exista en los datos del API
          nameKey="name" // Asegúrate de que la clave 'name' exista en los datos del API
        >
          {percentage.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend />
        <Tooltip formatter={(value, name) => [`${value} unidades`, name]} />
      </ReChartPie>
    </ResponsiveContainer>
  );
};

export default PieChartComponent;