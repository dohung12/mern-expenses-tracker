import { useEffect, useState } from 'react';
import { ExpensesContainer } from '../components/index';
import { DateTime } from 'luxon';
import { useAppContext } from '../context/appContext';
import { useGetExpenses } from '../hooks';
import createSearchUrl from '../utils/createSearchUrl';
import Wrapper from '../assets/Wrapper/DashboardPageWrapper';

const initState = {
  date: new Date(),
  type: 'date',
  page: 1,
  inputDate: '',
  showInputDate: false,
};

const Dashboard = () => {
  const { state } = useAppContext();
  const getExpenses = useGetExpenses();

  const [values, setValues] = useState(initState);
  const { date, type, page, inputDate, showInputDate } = values;

  const total = state.expenses.reduce((acc, curr) => {
    return (acc += curr.amount);
  }, 0);

  const toggleShowInputDate = () => {
    setValues({ ...values, showInputDate: !showInputDate });
  };

  const handleSetDate = (e) => {
    setValues({ ...values, inputDate: e.target.value });
  };

  const setYesterday = () => {
    const today = new Date();
    const y = today.getFullYear();
    const m = today.getMonth();
    const d = today.getDate();
    const result = new Date(y, m, d - 1);
    setValues({ ...values, date: result, type: 'date' });
  };

  const setThisWeek = () => {
    const today = new Date();
    setValues({ ...values, date: today, type: 'week' });
  };

  const setThisMonth = () => {
    const today = new Date();
    setValues({ ...values, date: today, type: 'month' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputDate) {
      const newDate = new Date(inputDate.split('-').join(','));
      setValues({
        date: newDate,
        type: 'date',
      });
    }
    toggleShowInputDate();
  };

  const getTimeStamps = (arg, type) => {
    // get  timestamps of
    // 00:00 of start date
    // 00:00 of the day after end date
    const date = new Date(arg);
    const y = date.getFullYear();
    const m = date.getMonth();
    const d = date.getDate();
    let begin, end;

    if (type === 'date') {
      begin = new Date(y, m, d);
      end = new Date(y, m, d + 1);
    } else if (type === 'week') {
      const dayOfWeek = date.getDay();
      begin = new Date(y, m, d - dayOfWeek);
      end = new Date(y, m, d + 7 - dayOfWeek);
    } else if (type === 'month') {
      begin = new Date(y, m, 1);
      end = new Date(y, m + 1, 1);
    }

    if (begin && end) {
      begin = begin.toISOString();
      end = end.toISOString();
    }

    return [begin, end];
  };

  useEffect(() => {
    const [incurred_on_from, incurred_on_to] = getTimeStamps(date, type);
    const url = createSearchUrl({ incurred_on_from, incurred_on_to, page });

    // console.log(url);
    getExpenses(url);
  }, [date, page]);

  return (
    <Wrapper>
      <div className='aside'>
        <div className='info'>
          <hgroup>
            <h1 className='header'>{date.getDate()}</h1>
            <h6>
              {DateTime.fromJSDate(date).toLocaleString(DateTime.DATE_MED)}
            </h6>
            {/* TODO */}
            <h2 className='total'>{total.toFixed(2)}$</h2>
            <h4>You have spent </h4>
          </hgroup>
        </div>
        <div className='select-date'>
          <a
            href='#today'
            onClick={() => {
              setValues({ ...values, date: new Date(), type: 'date' });
            }}
          >
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
          <a href='#' onClick={toggleShowInputDate}>
            Choose a date
          </a>
          {showInputDate && (
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
          )}
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
