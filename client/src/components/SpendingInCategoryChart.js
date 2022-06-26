import { useEffect, useState } from 'react';
import { useAuthFetch } from '../hooks';
import { FormRow, PieChartComponent } from './index';
import { DateTime } from 'luxon';
import { thisMonth } from '../utils/dateTime';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-top: 1rem;

  .chart-legend {
    text-align: center;
    margin-bottom: 0;
  }
`;

const initState = {
  incurred_on_from: '',
  incurred_on_to: '',
  spendingInCat: null,
};

const SpendingInCategoryChart = () => {
  const [values, setValues] = useState(initState);
  const { incurred_on_from, incurred_on_to, spendingInCat } = values;
  const authFetch = useAuthFetch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const fetchCategorizeSpending = async (incurred_on_from, incurred_on_to) => {
    try {
      const url = `/expenses/stats/category?incurred_on_from=${incurred_on_from}&incurred_on_to=${incurred_on_to}`;
      const { data } = await authFetch.get(url);
      setValues({ ...values, spendingInCat: data.result });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let from = new Date(incurred_on_from);
    let to = new Date(incurred_on_to);
    fetchCategorizeSpending(from.toISOString(), to.toISOString());
  };

  useEffect(() => {
    const { from, to } = thisMonth;
    fetchCategorizeSpending(from.toISOString(), to.toISOString());
  }, []);

  return (
    <Wrapper>
      <h2>Expenses in categories</h2>

      <form action='' onSubmit={handleSubmit}>
        <FormRow
          handleChange={handleChange}
          name='incurred_on_from'
          labelText={'From'}
          type='date'
          value={incurred_on_from}
        />
        <FormRow
          handleChange={handleChange}
          name='incurred_on_to'
          labelText={'To'}
          type='date'
          value={incurred_on_to}
        />
        <button type='submit'>Search</button>
      </form>
      <h4 className='chart-legend'>
        From{' '}
        {DateTime.fromJSDate(thisMonth.from).toLocaleString(DateTime.DATE_MED)}{' '}
        to {DateTime.fromJSDate(thisMonth.to).toLocaleString(DateTime.DATE_MED)}
      </h4>
      {spendingInCat && <PieChartComponent data={spendingInCat} />}
    </Wrapper>
  );
};

export default SpendingInCategoryChart;
