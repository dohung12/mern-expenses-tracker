import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BarChart } from '../components/index';
import { useAuthFetch } from '../hooks';

const Wrapper = styled.div`
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  text-transform: capitalize;
`;

const Stats = () => {
  const [values, setValues] = useState({});
  const authFetch = useAuthFetch();

  const fetchData = async () => {
    try {
      const { data } = await authFetch.get('/expenses/stats');
      setValues(data.monthlySpending);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();

    return () => {};
  }, []);

  return (
    <Wrapper>
      <h1>Stats</h1>

      <BarChart data={values} />
    </Wrapper>
  );
};

export default Stats;
