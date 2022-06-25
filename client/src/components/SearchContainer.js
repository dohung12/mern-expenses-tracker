import { FormRow, Alert } from './index';
import { useAppContext } from '../context/appContext';
import { useAlert } from '../hooks';
import Wrapper from '../assets/Wrapper/SearchContainerWrapper';

const sortOptions = [
  'latest',
  'oldest',
  'a-z',
  'z-a',
  'amount: low to high',
  'amount: high to low',
];

const SearchContainer = ({ values, setValues, setBackToDefault }) => {
  const { state } = useAppContext();
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
  const categoryOptions = state.categories.map((category) => {
    return category.title;
  });

  const [alert, displayAlert] = useAlert();

  const handleChange = (e) => {
    const { name, value } = e.target;
    // RESET PAGINATION WHEN START SEARCHING
    setValues({
      ...values,
      [name]: value,
      page: 1,
    });
  };
  const handleClearBtn = (e) => {
    e.preventDefault();
    setBackToDefault();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // CREATE INCURRED_ON_FROM VARIABLES WHEN DATE AND TIME TRUTHY
    if (incurred_on_date_from && incurred_on_time_from) {
      const temp = new Date(
        incurred_on_date_from + ' ' + incurred_on_time_from
      );
      setValues({
        ...values,
        incurred_on_from: temp.toISOString(),
      });
    }
    // CREATE INCURRED_ON_TO VARIABLES WHEN DATE AND TIME TRUTHY
    if (incurred_on_date_to && incurred_on_time_to) {
      const temp = new Date(incurred_on_date_to + ' ' + incurred_on_time_to);
      setValues({
        ...values,
        incurred_on_to: temp.toISOString(),
      });
    }

    // ALERT NONLOGICAL SEARCH
    if (
      values.incurred_on_from &&
      values.incurred_on_to &&
      values.incurred_on_from > values.incurred_on_to
    ) {
      displayAlert('Starting time must not later than end time', 'danger');
    } else if (
      values.amountFrom &&
      values.amountTo &&
      values.amountFrom > values.amountTo
    ) {
      displayAlert('Starting amount must not larger than end amount', 'danger');
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
