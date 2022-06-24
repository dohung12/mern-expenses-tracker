import { useState, useEffect } from 'react';
import { FormRow, Alert } from './index';
import { useAppContext } from '../context/appContext';
import styled from 'styled-components';
import {
  useAlert,
  useAuthFetch,
  useSetupExpenses,
  useGetExpenses,
} from '../hooks';
const Wrapper = styled.details`
  padding: 2rem 2.5rem;
  background-color: #fff;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  border-radius: 5px;
  margin-bottom: 2rem;

  summary {
    border-bottom: 2px solid var(--primary);
    .header {
      display: inline-block;
      margin-bottom: 1rem;
    }
    ::after {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3C!--! Font Awesome Pro 6.1.1 by %40fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons  Inc. --%3E%3Cpath d='M256 0C114.6 0 0 114.6 0 256c0 141.4 114.6 256 256 256s256-114.6 256-256C512 114.6 397.4 0 256 0zM358.6 278.6l-112 112c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25L290.8 256L201.4 166.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l112 112C364.9 239.6 368 247.8 368 256S364.9 272.4 358.6 278.6z'/%3E%3C/svg%3E");
      background-size: 1.5rem auto;
      width: 1.5rem;
      height: 1.5rem;
    }
  }

  label,
  option,
  select {
    text-transform: capitalize;
  }

  .header,
  form {
    margin-bottom: 0;
  }
`;
const initState = {
  title: '',
  category: 'all',
  incurred_on_date_from: '',
  incurred_on_time_from: '',
  incurred_on_date_to: '',
  incurred_on_time_to: '',
  amountFrom: 0,
  amountTo: 0,
  sort: 'latest',
};
const sortOptions = [
  'latest',
  'oldest',
  'a-z',
  'z-a',
  'amount: low to high',
  'amount: high to low',
];

const SearchContainer = () => {
  const { state } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState(initState);
  const {
    title,
    category,
    incurred_on_date_from,
    incurred_on_date_to,
    incurred_on_time_from,
    incurred_on_time_to,
    amountFrom,
    amountTo,
    sort,
  } = values;

  const getExpenses = useGetExpenses();
  const setupExpenses = useSetupExpenses();
  const authFetch = useAuthFetch();
  const categoryOptions = state.categories.map((category) => {
    return category.title;
  });

  const [alert, displayAlert] = useAlert();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleClearBtn = (e) => {
    e.preventDefault();
    setValues(initState);
  };
  const fetchQuery = async (url) => {
    setIsLoading(true);
    try {
      const { data } = await authFetch.get(url);
      setupExpenses(data.expenses);
      setValues(initState);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // CREATE INCURRED_ON_FROM VARIABLES WHEN DATE AND TIME TRUTHY
    let incurred_on_from;
    if (incurred_on_date_from && incurred_on_time_from) {
      incurred_on_from = new Date(
        incurred_on_date_from + ' ' + incurred_on_time_from
      );
      incurred_on_from = incurred_on_from.toISOString();
    }
    // CREATE INCURRED_ON_TO VARIABLES WHEN DATE AND TIME TRUTHY
    let incurred_on_to;
    if (incurred_on_date_to && incurred_on_time_to) {
      incurred_on_to = new Date(
        incurred_on_date_to + ' ' + incurred_on_time_to
      );
      incurred_on_to = incurred_on_to.toISOString();
    }

    let url = `/expenses?title=${title}&category=${category}&sort=${sort}`;
    if (incurred_on_from) {
      url += `&incurred_on_from=${incurred_on_from}`;
    }
    if (incurred_on_to) {
      url += `&incurred_on_to=${incurred_on_to}`;
    }
    if (amountFrom) {
      url += `&amount_from=${amountFrom}`;
    }
    if (amountTo) {
      url += `&amount_to=${amountTo}`;
    }

    // ALERT NONLOGICAL SEARCH
    if (
      incurred_on_from &&
      incurred_on_to &&
      incurred_on_from > incurred_on_to
    ) {
      displayAlert('Starting time must not later than end time', 'danger');
    } else if (amountFrom && amountTo && amountFrom > amountTo) {
      displayAlert('Starting amount must not larger than end amount', 'danger');
    } else {
      fetchQuery(url);
    }
  };

  useEffect(() => {
    getExpenses();
  }, []);

  return (
    <Wrapper>
      <summary>
        <h2 className='header'>Search Form</h2>
      </summary>
      {alert.showAlert && (
        <Alert alertText={alert.alertText} alertType={alert.alertType} />
      )}
      <form action=''>
        <div className='grid'>
          <FormRow
            name={'title'}
            placeholder='Search for title'
            handleChange={handleChange}
            type='text'
            value={values.title}
          />
          <div>
            <label htmlFor='category'>Category</label>
            <select
              onChange={handleChange}
              value={values.category}
              name='category'
            >
              {['all', ...categoryOptions].map((option, index) => {
                return (
                  <option value={option} key={index}>
                    {option}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label htmlFor={'sort'}>Sort</label>
            <select onChange={handleChange} value={values.sort} name={'sort'}>
              {sortOptions.map((sortOption, index) => {
                return (
                  <option value={sortOption} key={index}>
                    {sortOption}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        {/* Date range */}
        <div className='grid'>
          <div>
            <h6 className='header'>Date From</h6>
            <div className='grid'>
              <FormRow
                name={'incurred_on_date_from'}
                handleChange={handleChange}
                labelText={'Date'}
                type={'date'}
                key='incurred_on_date_from'
                value={values.incurred_on_date_from}
              />
              <FormRow
                name={'incurred_on_time_from'}
                handleChange={handleChange}
                labelText={'time'}
                type={'time'}
                key='incurred_on_time_from'
                value={values.incurred_on_time_from}
              />
            </div>
          </div>
          <div>
            <h6 className='header'>Date To</h6>
            <div className='grid'>
              <FormRow
                name={'incurred_on_date_to'}
                handleChange={handleChange}
                labelText={'Date'}
                type={'date'}
                key='incurred_on_date_to'
                value={values.incurred_on_date_to}
              />
              <FormRow
                name={'incurred_on_time_to'}
                handleChange={handleChange}
                labelText={'time'}
                type={'time'}
                key='incurred_on_time_to'
                value={values.incurred_on_time_to}
              />
            </div>
          </div>
        </div>

        {/* Amount range */}
        <div className='grid'>
          <FormRow
            name={'amountFrom'}
            placeholder='Amount from'
            handleChange={handleChange}
            type='number'
            value={values.amountFrom}
            labelText='amount from'
          />
          <FormRow
            name={'amountTo'}
            placeholder='Amount to'
            handleChange={handleChange}
            type='number'
            value={values.amountTo}
            labelText='amount to'
          />
          <button className='contrast' onClick={handleClearBtn}>
            Clear Filter
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            aria-busy={isLoading}
          >
            {isLoading ? '' : 'Search'}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchContainer;
