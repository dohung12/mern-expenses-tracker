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
  let getMax;

  if (data) {
    getMax = data.reduce((acc, curr) => {
      return Math.max(acc, curr.totalAmount);
    }, 0);
  }

  return (
    <ResponsiveContainer width='100%' height={300}>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='date' />
        <YAxis type='number' domain={[0, getMax]} />
        <Tooltip />
        <Bar
          dataKey='totalAmount'
          fill='#00897b'
          barSize={75}
          label={{ color: 'white' }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
