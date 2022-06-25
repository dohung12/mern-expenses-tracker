import { useEffect, useState } from 'react';

import styled from 'styled-components';
import { ExpensesContainer } from '../components/index';

import { DateTime } from 'luxon';
import { useGetExpenses } from '../hooks';
import createSearchUrl from '../utils/createSearchUrl';
import { useAppContext } from '../context/appContext';

const Wrapper = styled.div`
  display: flex;
  gap: 2rem;
  background-color: transparent !important;

  .aside {
    width: 250px;
    height: fit-content;
    background-color: #fff;
    display: flex;
    flex-direction: column;

    gap: 2rem;
    padding: 1rem;

    border-radius: 0.5rem;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
    margin-bottom: 1rem;

    .select-date {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      input {
        /* width: fit-content; */
      }

      form,
      button {
        margin-bottom: 0;
      }
    }

    .info {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      width: fit-content;
      .header {
        font-size: 5rem;
        margin-bottom: 0;
      }
      .total {
        color: var(--primary);
      }
      hgroup,
      hgroup > :last-child {
        margin-bottom: 0;
      }

      border-bottom: 1px solid var(--primary);
    }
  }

  .expenses {
    width: calc(100% - 300px);
  }
`;

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
    // get  timestamps of 00:00 this date to 00:00 the following date
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
