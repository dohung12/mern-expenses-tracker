import { useState, useEffect } from 'react';
import { FaLocationArrow } from 'react-icons/fa';
import { useAuthFetch } from '../hooks';
import { BarChart, AreaChart } from './index';
const MonthlySpendingChart = () => {
  const [showBarChart, setShowBarChart] = useState(true);
  const [data, setData] = useState(null);

  const authFetch = useAuthFetch();

  const fetchMonthlySpending = async () => {
    try {
      const { data } = await authFetch.get('/expenses/stats');
      setData(data.monthlySpending);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMonthlySpending();
  }, []);

  return (
    <>
      <hgroup>
        <h2>Expenses monthly</h2>
        <a
          href='#'
          onClick={() => {
            setShowBarChart(!showBarChart);
          }}
        >
          <FaLocationArrow /> Switch to{' '}
          {showBarChart ? 'Area Chart' : 'Bar Chart'}
        </a>
      </hgroup>
      {showBarChart ? <BarChart data={data} /> : <AreaChart data={data} />}
    </>
  );
};

export default MonthlySpendingChart;
