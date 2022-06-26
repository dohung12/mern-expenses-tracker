import { useEffect, useState } from 'react';
import { ExpensesContainer } from '../components/index';
import { DateTime } from 'luxon';
import { useAppContext } from '../context/appContext';
import { useGetExpenses } from '../hooks';
import createSearchUrl from '../utils/createSearchUrl';
import {
  THIS_MONTH,
  THIS_WEEK,
  TODAY_RANGE,
  YESTERDAY,
  getDateRange,
} from '../utils/dateTime';
import Wrapper from '../assets/Wrapper/DashboardPageWrapper';

const initState = {
  page: 1,
  type: 'date',
  inputDate: '',
  incurred_on_from: TODAY_RANGE.from,
  incurred_on_to: TODAY_RANGE.to,
};

const Dashboard = () => {
  const { state } = useAppContext();
  const getExpenses = useGetExpenses();

  const [values, setValues] = useState(initState);
  const { page, inputDate, incurred_on_from, incurred_on_to, type } = values;

  const handleSetDate = (e) => {
    setValues({ ...values, inputDate: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputDate) {
      const newDate = new Date(inputDate.split('-').join(','));
      const { from, to } = getDateRange(newDate);
      setValues({
        ...values,
        type: 'date',
        incurred_on_from: from,
        incurred_on_to: to,
      });
    }
  };

  const setToday = () => {
    setValues({
      ...values,
      type: 'date',
      incurred_on_from: TODAY_RANGE.from,
      incurred_on_to: TODAY_RANGE.to,
    });
  };

  const setYesterday = () => {
    setValues({
      ...values,
      type: 'date',
      incurred_on_from: YESTERDAY.from,
      incurred_on_to: YESTERDAY.to,
    });
  };

  const setThisWeek = () => {
    setValues({
      ...values,
      type: 'week',
      incurred_on_from: THIS_WEEK.from,
      incurred_on_to: THIS_WEEK.to,
    });
  };

  const setThisMonth = () => {
    setValues({
      ...values,
      type: 'month',
      incurred_on_from: THIS_MONTH.from,
      incurred_on_to: THIS_MONTH.to,
    });
  };

  useEffect(() => {
    const url = createSearchUrl({
      incurred_on_from: incurred_on_from.toISOString(),
      incurred_on_to: incurred_on_to.toISOString(),
      page,
    });
    getExpenses(url);
  }, [incurred_on_from, page]);

  return (
    <Wrapper>
      <div className='aside'>
        <div className='info'>
          <hgroup>
            {type === 'date' ? (
              <>
                <h1 className='header'>{incurred_on_from.getDate()}</h1>
                <h6>
                  {DateTime.fromJSDate(incurred_on_from).toLocaleString(
                    DateTime.DATE_MED
                  )}
                </h6>
              </>
            ) : (
              <>
                <h3>
                  {DateTime.fromJSDate(incurred_on_from).toLocaleString(
                    DateTime.DATE_MED
                  )}
                  {' - '}
                  {DateTime.fromJSDate(incurred_on_to)
                    .minus({ days: 1 })
                    .toLocaleString(DateTime.DATE_MED)}
                </h3>
              </>
            )}

            {/* TODO */}
            <h2 className='total'>{state.totalAmount.toFixed(2)}$</h2>
            <h4>You have spent </h4>
          </hgroup>
        </div>
        <div className='select-date'>
          <a href='#today' onClick={setToday}>
            Today
          </a>
          <a href='#yesterday' onClick={setYesterday}>
            Yesterday
          </a>
          <a href='#this_week' onClick={setThisWeek}>
            This week
          </a>
          <a href='#this_month' onClick={setThisMonth}>
            This month
          </a>
          <a href='#'>Choose a date</a>
          <form action=''>
            <input
              type='date'
              name='date'
              value={inputDate}
              onChange={handleSetDate}
            />
            <button type='submit' onClick={handleSubmit}>
              Search
            </button>
          </form>
        </div>
      </div>
      <div className='expenses'>
        <ExpensesContainer
          page={page}
          setPage={(page) => {
            setValues({ ...values, page });
          }}
        />
      </div>
    </Wrapper>
  );
};

export default Dashboard;
