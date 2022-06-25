import React from 'react';
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Bar,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
const BarChartComponent = ({ data }) => {
  return (
    <ResponsiveContainer width='100%' height={250}>
      <BarChart data={data} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray='3 3 ' />
        <XAxis dataKey='month' />
        <YAxis allowDecimals={false} />
        <Legend />
        <Tooltip />
        <Bar
          dataKey='totalAmount'
          name={'monthly spending'}
          fill='#2cb1bc'
          barSize={75}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
