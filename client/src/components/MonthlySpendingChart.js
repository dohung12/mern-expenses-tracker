import { useState } from 'react';
import { BarChart, AreaChart } from './index';

const MonthlySpendingChart = ({ chartData }) => {
  const [showBarChart, setShowBarChart] = useState(true);

  return (
    <>
      <hgroup>
        <h2>Monthly Spending Total</h2>
        <a
          href='#'
          onClick={() => {
            setShowBarChart(!showBarChart);
          }}
        >
          Switch to {showBarChart ? 'Area Chart' : 'Bar Chart'}
        </a>
      </hgroup>
      {showBarChart ? (
        <BarChart data={chartData} />
      ) : (
        <AreaChart data={chartData} />
      )}
    </>
  );
};

export default MonthlySpendingChart;
