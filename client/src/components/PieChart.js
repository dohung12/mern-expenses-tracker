import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Tooltip,
  Legend,
  Cell,
} from 'recharts';

const PieChartComponent = ({ data }) => {
  const COLORS = [
    '#003f5c',
    '#2f4b7c',
    '#665191',
    '#a05195',
    '#d45087',
    '#f95d6a',
    '#ff7c43',
    '#ffa600',
  ];

  return (
    <ResponsiveContainer width='100%' height={500}>
      <PieChart>
        <Pie
          data={data}
          dataKey='totalAmount'
          nameKey='category'
          cx='50%'
          cy='50%'
          outerRadius={150}
          fill='#82ca9d'
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartComponent;
