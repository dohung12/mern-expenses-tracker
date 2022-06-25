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
  return (
    <ResponsiveContainer width='100%' height={250}>
      <AreaChart data={data} margin={{ top: 50 }}>
        <defs>
          <linearGradient x1='0' y1='0' x2='0' y2='1'>
            <stop offset='5%' stopColor='#00897b' stopOpacity={0.8} />
            <stop offset='95%' stopColor='#00897b' stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey='month' />
        <YAxis />
        <CartesianGrid strokeDasharray='3 3' />
        <Tooltip />
        <Area
          type='monotone'
          dataKey='totalAmount'
          name={'monthly spending'}
          stroke='#00897b'
          fill='#b3dcd7'
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChartComponent;
