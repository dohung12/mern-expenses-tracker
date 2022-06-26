import styled from 'styled-components';
import {
  MonthlySpendingChart,
  SpendingInCategoryChart,
} from '../components/index';

const Wrapper = styled.div`
  padding: 2rem 2.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  text-transform: capitalize;
`;

const Stats = () => {
  return (
    <Wrapper>
      <MonthlySpendingChart />
      <SpendingInCategoryChart />
    </Wrapper>
  );
};

export default Stats;
