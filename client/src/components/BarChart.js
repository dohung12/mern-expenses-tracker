import React from 'react';
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
const BarChartComponent = ({ data }) => {
  return (
    <ResponsiveContainer width='100%' height={250}>
      <BarChart data={data} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray='3 3 ' />
        <XAxis dataKey='date' />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar
          dataKey='totalAmount'
          name={'monthly spending'}
          fill='#00897b'
          barSize={75}
          label={{ color: 'white' }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
