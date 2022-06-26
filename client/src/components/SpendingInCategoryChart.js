import { useEffect, useState } from 'react';
import { useAuthFetch } from '../hooks';
import { FormRow, PieChartComponent } from './index';
import { DateTime } from 'luxon';
import { THIS_MONTH, getMultipleDatesRange } from '../utils/dateTime';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-top: 1rem;

  .chart-legend {
    text-align: center;
    margin-bottom: 0;
  }

  form {
    flex-direction: column;

    @media (min-width: 600px) {
      flex-direction: row;
    }
  }
`;

const initState = {
  input_from: '',
  input_to: '',
  isLoading: false,
};

const SpendingInCategoryChart = () => {
  const [values, setValues] = useState(initState);
  const [date, setDate] = useState({
    incurred_on_from: THIS_MONTH.from,
    incurred_on_to: THIS_MONTH.to,
  });
  const [data, setData] = useState(null);
  const { isLoading, input_from, input_to } = values;
  const { incurred_on_from, incurred_on_to } = date;
  const authFetch = useAuthFetch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const fetchCategorizeSpending = async (incurred_on_from, incurred_on_to) => {
    setValues({ ...values, isLoading: true });
    try {
      const url = `/expenses/stats/category?incurred_on_from=${incurred_on_from}&incurred_on_to=${incurred_on_to}`;
      const { data } = await authFetch.get(url);
      setData(data.result);
    } catch (error) {
      console.log(error);
    }
    setValues({ ...values, isLoading: false });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (input_from && input_to) {
      const newFrom = new Date(input_from.split('-').join(','));
      const newTo = new Date(input_to.split('-').join(','));
      const { from, to } = getMultipleDatesRange(newFrom, newTo);
      setDate({
        incurred_on_from: from,
        incurred_on_to: to,
      });
      fetchCategorizeSpending(from.toISOString(), to.toISOString());
    }
  };

  useEffect(() => {
    const { from, to } = THIS_MONTH;
    fetchCategorizeSpending(from.toISOString(), to.toISOString());
  }, []);

  return (
    <Wrapper>
      <h2>Expenses in categories</h2>

      <form action='' onSubmit={handleSubmit}>
        <FormRow
          handleChange={handleChange}
          name='input_from'
          labelText={'From'}
          type='date'
          value={input_from}
        />
        <FormRow
          handleChange={handleChange}
          name='input_to'
          labelText={'To'}
          type='date'
          value={input_to}
        />
        <button aria-busy={isLoading} type='submit' disabled={isLoading}>
          {isLoading ? '' : 'Searching'}
        </button>
      </form>
      <h3 className='chart-legend'>
        {DateTime.fromJSDate(incurred_on_from).toLocaleString(
          DateTime.DATE_MED
        )}
        {' - '}
        {DateTime.fromJSDate(incurred_on_to)
          .minus({ days: 1 })
          .toLocaleString(DateTime.DATE_MED)}
      </h3>
      {data && <PieChartComponent data={data} />}
    </Wrapper>
  );
};

export default SpendingInCategoryChart;
