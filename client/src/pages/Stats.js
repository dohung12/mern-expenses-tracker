import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BarChart, AreaChart } from '../components/index';
import { useAuthFetch } from '../hooks';

const Wrapper = styled.div`
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  text-transform: capitalize;
`;

const Stats = () => {
  const [chartData, setChartData] = useState({});
  const authFetch = useAuthFetch();
  const [showBarChart, setShowBarChart] = useState(true);

  const fetchData = async () => {
    try {
      const { data } = await authFetch.get('/expenses/stats');
      setChartData(data.monthlySpending);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Wrapper>
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
    </Wrapper>
  );
};

export default Stats;
