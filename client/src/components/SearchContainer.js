import { useState } from 'react';
import { FormRow, Alert } from './index';
import { useAppContext } from '../context/appContext';
import { useAlert, useGetExpenses } from '../hooks';
import Wrapper from '../assets/Wrapper/SearchContainerWrapper';

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

const SearchContainer = ({ setNumOfPages }) => {
  const { state } = useAppContext();
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
      getExpenses(url);
    }
  };

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
          <button onClick={handleSubmit}>Search</button>
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchContainer;
