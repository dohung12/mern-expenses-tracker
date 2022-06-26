import React from 'react';
import {
  AreaChart,
  linearGradient,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const AreaChartComponent = ({ data }) => {
  let getMax;

  if (data) {
    getMax = data.reduce((acc, curr) => {
      return Math.max(acc, curr.totalAmount);
    }, 0);
  }
  return (
    <ResponsiveContainer width='100%' height={300}>
      <AreaChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <defs>
          <linearGradient x1='0' y1='0' x2='0' y2='1'>
            <stop offset='5%' stopColor='#00897b' stopOpacity={0.8} />
            <stop offset='95%' stopColor='#00897b' stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey='month' />
        <YAxis type='number' domain={[0, getMax]} />
        <CartesianGrid strokeDasharray='3 3' />
        <Tooltip />
        <Area
          type='monotone'
          dataKey='totalAmount'
          name={'monthly spending'}
          stroke='#00897b'
          fill='#b3dcd7'
          label={{ color: '#00897b' }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChartComponent;
